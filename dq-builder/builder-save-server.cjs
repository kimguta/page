"use strict";

const http = require("http");
const https = require("https");
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const zlib = require("zlib");
const { spawn } = require("child_process");

const HOST = process.env.DQ_BUILDER_HOST || "127.0.0.1";
const PORT = Number(process.env.DQ_BUILDER_PORT || 5510);
const MAX_BODY_SIZE = 2 * 1024 * 1024;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const WEBAPP_ROOT = path.resolve(__dirname, "../..");
const SAVE_PATH = "/page/dq-builder/builder/header-source.do";
const IMAGE_UPLOAD_PATH = "/page/dq-builder/builder/image-upload.do";
const CONTENT_FILE_PATH = "/page/dq-builder/builder/content-file.do";
const SYNC_EVENTS_PATH = "/page/dq-builder/builder/sync-events.do";
const PROJECT_BUILD_PATH = "/page/dq-builder/builder/project-build.do";
const PROJECT_DOWNLOAD_PATH = "/page/dq-builder/builder/project-download.do";
const PROJECT_LIST_PATH = "/page/dq-builder/builder/project-list.do";
const SHARE_STATUS_PATH = "/page/dq-builder/builder/share-status.do";
const SHARE_START_PATH = "/page/dq-builder/builder/share-start.do";
const SHARE_STOP_PATH = "/page/dq-builder/builder/share-stop.do";
const PAGE_FILES = ["page/dq-builder/index.html", "page/dq-builder/sub.html"];
const HEADER_START = "<!-- BUILDER:HEADER:START -->";
const HEADER_END = "<!-- BUILDER:HEADER:END -->";
const FOOTER_START = "<!-- BUILDER:FOOTER:START -->";
const FOOTER_END = "<!-- BUILDER:FOOTER:END -->";
const OVERRIDES_START = "<!-- BUILDER:OVERRIDES:START -->";
const OVERRIDES_END = "<!-- BUILDER:OVERRIDES:END -->";
const CONTENT_START = "<!-- BUILDER:CONTENT:START -->";
const CONTENT_END = "<!-- BUILDER:CONTENT:END -->";
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm"
};

let tunnelProcess = null;
let tunnelUrl = "";
let tunnelStartPromise = null;
const syncClients = new Set();

function requestPath(request) {
  return new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`).pathname;
}

function isAllowedOrigin(request) {
  const origin = request.headers.origin;
  if (!origin) return true;
  if (/^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?$/i.test(origin)) return true;
  try {
    const requestHost = new URL(`http://${request.headers.host || `${HOST}:${PORT}`}`);
    return new URL(origin).hostname === requestHost.hostname;
  } catch (error) {
    return false;
  }
}

function sendJson(request, response, status, body) {
  const origin = request.headers.origin;
  if (origin && isAllowedOrigin(request)) response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.statusCode = status;
  response.end(JSON.stringify(body));
}

function openSyncStream(request, response) {
  const origin = request.headers.origin;
  if (origin) response.setHeader("Access-Control-Allow-Origin", origin);
  response.statusCode = 200;
  response.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  response.setHeader("Cache-Control", "no-cache, no-transform");
  response.setHeader("Connection", "keep-alive");
  response.setHeader("X-Accel-Buffering", "no");
  response.flushHeaders?.();
  response.write(`retry: 2000\nevent: ready\ndata: ${JSON.stringify({ connected: true })}\n\n`);
  syncClients.add(response);

  const keepAlive = setInterval(() => response.write(": keep-alive\n\n"), 20000);
  request.on("close", () => {
    clearInterval(keepAlive);
    syncClients.delete(response);
  });
}

function broadcastSaved(source) {
  const data = JSON.stringify({
    clientId: String(source.clientId || "").slice(0, 100),
    page: source.page,
    savedAt: Date.now()
  });
  for (const client of syncClients) {
    try {
      client.write(`event: builder-save\ndata: ${data}\n\n`);
    } catch (error) {
      syncClients.delete(client);
    }
  }
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = "";
    request.setEncoding("utf8");
    request.on("data", chunk => {
      size += Buffer.byteLength(chunk);
      if (size > MAX_BODY_SIZE) {
        reject(new Error("저장할 소스가 너무 큽니다."));
        request.destroy();
        return;
      }
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("JSON 형식이 올바르지 않습니다."));
      }
    });
    request.on("error", reject);
  });
}

function readBinary(request, maximumSize) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on("data", chunk => {
      size += chunk.length;
      if (size > maximumSize) {
        reject(new Error("이미지는 10MB 이하만 업로드할 수 있습니다."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

function uploadedImageExtension(request) {
  const contentType = String(request.headers["content-type"] || "").split(";", 1)[0].toLowerCase();
  return {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp"
  }[contentType] || "";
}

async function saveUploadedImage(request) {
  const extension = uploadedImageExtension(request);
  if (!extension) throw new Error("JPG, PNG, GIF, WEBP 이미지만 업로드할 수 있습니다.");
  const image = await readBinary(request, MAX_IMAGE_SIZE);
  if (!image.length) throw new Error("업로드할 이미지 파일이 비어 있습니다.");

  let originalName = "image";
  try {
    originalName = decodeURIComponent(String(request.headers["x-file-name"] || "image"));
  } catch (error) {}
  const baseName = path.basename(originalName, path.extname(originalName))
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "image";
  const fileName = `${baseName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
  const uploadDirectory = path.join(WEBAPP_ROOT, "page/dq-builder/images/uploads");
  await fs.mkdir(uploadDirectory, { recursive: true });
  await fs.writeFile(path.join(uploadDirectory, fileName), image, { flag: "wx" });
  return `/page/dq-builder/images/uploads/${fileName}`;
}

function replaceBuilderSection(html, startMarker, endMarker, content, relativePath) {
  const startIndex = html.indexOf(startMarker);
  const endIndex = html.indexOf(endMarker, startIndex + startMarker.length);
  if (startIndex < 0 || endIndex < 0 || html.indexOf(startMarker, startIndex + startMarker.length) >= 0
      || html.indexOf(endMarker, endIndex + endMarker.length) >= 0) {
    throw new Error(`${relativePath}에서 빌더 저장 구간을 찾을 수 없습니다.`);
  }
  return html.slice(0, startIndex + startMarker.length)
    + "\n" + content.trim() + "\n"
    + html.slice(endIndex);
}

function normalizeSubContentFiles(files) {
  if (files == null) return [];
  if (!Array.isArray(files) || files.length > 50) throw new Error("개별 콘텐츠 파일 목록이 올바르지 않습니다.");
  return files.map(file => {
    if (!file || typeof file.fileName !== "string" || typeof file.title !== "string" || typeof file.content !== "string") {
      throw new Error("개별 콘텐츠 파일 데이터가 올바르지 않습니다.");
    }
    const fileName = path.basename(file.fileName.trim());
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,79}\.html$/i.test(fileName) || fileName !== file.fileName.trim()) {
      throw new Error("개별 콘텐츠 파일명은 영문, 숫자, 하이픈, 밑줄만 사용할 수 있습니다.");
    }
    if (file.content.length > 500000) throw new Error(`${fileName} 콘텐츠가 허용 크기를 초과했습니다.`);
    return { fileName, title: file.title.slice(0, 120), content: file.content };
  });
}

function normalizeSubpageConfig(config) {
  if (config == null) return null;
  if (!config || typeof config !== "object" || Array.isArray(config)) throw new Error("서브페이지 공통 설정이 올바르지 않습니다.");
  const allowed = {
    visualStyle: ["gradient", "split", "minimal", "band", "outline"],
    visualFilterStyle: ["theme", "dark", "muted", "light", "contrast"],
    breadcrumbStyle: ["bar", "floating", "boxed", "minimal", "steps"],
    headingStyle: ["line", "accent", "center", "box", "side"],
    fontScale: ["large", "normal", "small"],
    title2Style: ["symbol", "bar", "underline", "box", "diamond", "image"],
    title3Style: ["dot", "dash", "diamond", "line", "pill", "image"],
    listStyle: ["bar", "dot", "check", "diamond", "square", "image"]
  };
  const normalized = {};
  Object.keys(allowed).forEach(key => {
    normalized[key] = allowed[key].includes(config[key]) ? config[key] : allowed[key][0];
  });
  normalized.visualFilterEnabled = config.visualFilterEnabled !== false;
  ["visualBackgroundImage", "title2Image", "title3Image", "listImage"].forEach(key => {
    const value = String(config[key] || "").trim();
    if (value && !/^\/(?:page\/ui\/images\/uploads\/)[a-zA-Z0-9._-]+$/.test(value)) throw new Error("업로드 이미지 경로가 올바르지 않습니다.");
    normalized[key] = value;
  });
  return normalized;
}

function updateSubpageConfig(html, config) {
  if (!config) return html;
  const attributes = {
    "data-sub-visual-style": config.visualStyle,
    "data-sub-visual-background-image": config.visualBackgroundImage,
    "data-sub-visual-has-background": config.visualBackgroundImage ? "true" : "false",
    "data-sub-visual-filter-enabled": config.visualFilterEnabled ? "true" : "false",
    "data-sub-visual-filter-style": config.visualFilterStyle,
    "data-sub-breadcrumb-style": config.breadcrumbStyle,
    "data-sub-heading-style": config.headingStyle,
    "data-sub-font-scale": config.fontScale,
    "data-sub-title2-style": config.title2Style,
    "data-sub-title3-style": config.title3Style,
    "data-sub-list-style": config.listStyle,
    "data-sub-title2-image": config.title2Image,
    "data-sub-title3-image": config.title3Image,
    "data-sub-list-image": config.listImage
  };
  return html.replace(/<main\b([^>]*\bid=["']sub["'][^>]*)>/i, (tag, inner) => {
    let updated = `<main${inner}>`;
    Object.entries(attributes).forEach(([name, rawValue]) => {
      const value = String(rawValue || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");
      const pattern = new RegExp(`\\s${name}=(?:"[^"]*"|'[^']*')`, "i");
      if (pattern.test(updated)) updated = updated.replace(pattern, ` ${name}="${value}"`);
      else updated = updated.replace(/>$/, ` ${name}="${value}">`);
    });
    return updated;
  });
}

async function createSubContentFile(source) {
  const file = normalizeSubContentFiles([source])[0];
  const contentDirectory = path.join(WEBAPP_ROOT, "page/dq-builder/content");
  await fs.mkdir(contentDirectory, { recursive: true });
  const safeTitle = file.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const content = file.content.trim() || `<h4 class="titLv"><span>${safeTitle}</span></h4><div class="pgraph">콘텐츠 내용을 입력해 주세요.</div>`;
  await fs.writeFile(path.join(contentDirectory, file.fileName), `${content}\n`, { encoding: "utf8", flag: "wx" });
  return file.fileName;
}

async function saveSource(source) {
  if (!source || typeof source.headerHtml !== "string" || typeof source.headerCss !== "string"
      || typeof source.footerHtml !== "string" || typeof source.footerCss !== "string"
      || typeof source.contentHtml !== "string" || !["index.html", "sub.html"].includes(source.page)
      || typeof source.elementCss !== "string" || !Array.isArray(source.elementOverrides)
      || !source.headerHtml.trim() || !source.headerCss.trim()
      || !source.footerHtml.trim() || !source.footerCss.trim()) {
    throw new Error("저장할 사이트 편집 데이터가 올바르지 않습니다.");
  }
  if (source.elementOverrides.length > 500 || source.elementCss.length > 500000) {
    throw new Error("요소 편집 데이터가 허용 범위를 초과했습니다.");
  }
  const subContentFiles = normalizeSubContentFiles(source.subContentFiles);
  const subpageConfig = normalizeSubpageConfig(source.subpageConfig);

  const overrideJson = JSON.stringify(source.elementOverrides, null, 2).replace(/<\/script/gi, "<\\/script");
  const contentPage = `page/dq-builder/${source.page}`;
  const updatedPages = await Promise.all(PAGE_FILES.map(async relativePath => {
    const filePath = path.join(WEBAPP_ROOT, relativePath);
    let html = await fs.readFile(filePath, "utf8");
    html = replaceBuilderSection(html, HEADER_START, HEADER_END, source.headerHtml, relativePath);
    html = replaceBuilderSection(html, FOOTER_START, FOOTER_END, source.footerHtml, relativePath);
    html = replaceBuilderSection(html, OVERRIDES_START, OVERRIDES_END, overrideJson, relativePath);
    if (relativePath === contentPage) html = replaceBuilderSection(html, CONTENT_START, CONTENT_END, source.contentHtml, relativePath);
    if (relativePath === "page/dq-builder/sub.html" && subpageConfig) html = updateSubpageConfig(html, subpageConfig);
    return { filePath, html };
  }));

  const contentDirectory = path.join(WEBAPP_ROOT, "page/dq-builder/content");
  await fs.mkdir(contentDirectory, { recursive: true });
  await Promise.all([
    fs.writeFile(path.join(WEBAPP_ROOT, "page/dq-builder/css/header-builder.css"), source.headerCss, "utf8"),
    fs.writeFile(path.join(WEBAPP_ROOT, "page/dq-builder/css/footer-builder.css"), source.footerCss, "utf8"),
    fs.writeFile(path.join(WEBAPP_ROOT, "page/dq-builder/css/custom-builder.css"), source.elementCss, "utf8"),
    ...updatedPages.map(page => fs.writeFile(page.filePath, page.html, "utf8")),
    ...subContentFiles.map(file => fs.writeFile(path.join(contentDirectory, file.fileName), `${file.content.trim()}\n`, "utf8"))
  ]);
}

const BUILD_RUNTIME_FILES = [
  "css/swiper-bundle.min.css",
  "css/app.css",
  "css/header-builder.css",
  "css/footer-builder.css",
  "css/index.css",
  "css/sub.css",
  "css/content-ui.css",
  "css/content-builder.css",
  "css/custom-builder.css",
  "js/swiper-bundle.min.js",
  "js/lenis.js",
  "js/app.js",
  "js/navigation.js",
  "js/smooth-scroll.js",
  "js/components.js",
  "js/index.js"
];

const BUILD_EXCLUDED_FILES = new Set([
  "css/editor.css",
  "js/editor.js",
  "js/content-builder.js",
  "builder-save-server.cjs"
]);

function normalizeProjectName(value) {
  const name = String(value || "").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]{1,48}$/.test(name)) {
    throw new Error("프로젝트명은 영문 소문자 또는 숫자로 시작하고, 영문·숫자·하이픈·밑줄 2~49자로 입력해 주세요.");
  }
  if (["common", "dq-builder"].includes(name)) throw new Error("사용할 수 없는 프로젝트명입니다.");
  return name;
}

function replaceBuilderPath(source, projectName) {
  return String(source).replace(/\/page\/dq-builder/g, `/page/${projectName}`);
}

function stripEditorAssets(html) {
  return String(html)
    .replace(/^\s*<link\b[^>]*\/editor\.css(?:\?[^"']*)?["'][^>]*>\s*$/gim, "")
    .replace(/^\s*<script\b[^>]*\/editor\.js(?:\?[^"']*)?["'][^>]*><\/script>\s*$/gim, "");
}

function stripBuilderMetadata(html) {
  return String(html)
    .replace(/\s*<script\b(?=[^>]*\bid=["']dq-builder-overrides["'])[^>]*>[\s\S]*?<\/script>\s*/gi, "\n")
    .replace(/\s*<!--\s*BUILDER:[A-Z-]+:(?:START|END)\s*-->\s*/gi, "\n");
}

function escapeHtmlAttribute(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function safeModuleFileName(value) {
  const safe = String(value || "module").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "");
  return safe || "module";
}

function replaceDivByAttribute(html, attribute, value, replacement) {
  const escapedValue = String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const openPattern = new RegExp(`<div\\b(?=[^>]*\\b${attribute}=["']${escapedValue}["'])[^>]*>`, "i");
  const match = openPattern.exec(html);
  if (!match) return html;
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = match.index + match[0].length;
  let depth = 1;
  let tag;
  while ((tag = tagPattern.exec(html))) {
    if (/^<\/div/i.test(tag[0])) depth -= 1;
    else if (!/\/>$/.test(tag[0])) depth += 1;
    if (depth === 0) return html.slice(0, match.index) + replacement + html.slice(tagPattern.lastIndex);
  }
  return html;
}

function applyBuiltRootStyle(html, state) {
  const gap = Math.max(0, Math.min(200, Number(state && state.sectionGap) || 0));
  const background = String(state && state.background || "#ffffff").replace(/[;<>]/g, "");
  return String(html).replace(/<(main)\b(?=[^>]*\bdata-builder-content-root\b)([^>]*)>/i, (match, tag, attributes) => {
    const variables = `--content-section-gap:${gap}px;--content-background:${background};`;
    if (/\bstyle=["'][^"']*["']/i.test(attributes)) {
      return `<${tag}${attributes.replace(/\bstyle=(["'])([^"']*)\1/i, (styleMatch, quote, styleValue) => `style=${quote}${variables}${styleValue}${quote}`)}>`;
    }
    return `<${tag}${attributes} style="${variables}">`;
  });
}

function compileBuiltContentState(html, projectName) {
  const statePattern = /\s*<script\b(?=[^>]*\bdata-builder-content-state\b)[^>]*>([\s\S]*?)<\/script\s*>\s*/i;
  const match = statePattern.exec(String(html));
  if (!match) {
    return {
      html: String(html).replace(/^\s*<script\b[^>]*\/js\/content-builder\.js(?:\?[^"']*)?["'][^>]*><\/script>\s*$/gim, `  <script src="/page/${projectName}/js/content-runtime.js"></script>`),
      modules: []
    };
  }

  let state;
  try {
    state = JSON.parse(match[1].trim() || "{}");
  } catch (error) {
    throw new Error(`빌드 콘텐츠 상태를 읽지 못했습니다: ${error.message}`);
  }

  const modules = [];
  let output = applyBuiltRootStyle(String(html), state);
  const sections = Array.isArray(state.sections) ? state.sections : [];
  sections.forEach(section => {
    const cells = Array.isArray(section && section.cells) ? section.cells : [];
    cells.forEach(cell => {
      const module = cell && cell.module;
      if (!module || module.type !== "code" || !module.id) return;
      const fileName = safeModuleFileName(module.id);
      const hasScript = !!String(module.js || "").trim();
      const host = `<div class="dq-code-host dq-code-host--built" data-code-module-id="${escapeHtmlAttribute(module.id)}"${hasScript ? ` data-built-code-src="/page/${projectName}/modules/${fileName}.js"` : ""}>
  <template data-built-code-template>
    <link rel="stylesheet" href="/page/${projectName}/modules/${fileName}.css">
    ${String(module.html || "").trim()}
  </template>
</div>`;
      output = replaceDivByAttribute(output, "data-code-module-id", module.id, host);
      modules.push({
        id: String(module.id),
        fileName,
        css: `:host { display: block; min-width: 0; }\n.dq-code-error { margin: 12px 0; padding: 12px; white-space: pre-wrap; background: #fff0f0; color: #b42318; font: 12px/1.5 monospace; }\n${String(module.css || "").trim()}\n`,
        js: String(module.js || "").trim()
      });
    });
  });

  output = output
    .replace(statePattern, "\n")
    .replace(/^\s*<script\b[^>]*\/js\/content-builder\.js(?:\?[^"']*)?["'][^>]*><\/script>\s*$/gim, `  <script src="/page/${projectName}/js/content-runtime.js"></script>`);
  return { html: output, modules };
}

function contentRuntime() {
  return `/** 빌드된 직접 작성 요소와 콘텐츠 모션 초기화 */
(function (window, document) {
  "use strict";

  function showError(root, message) {
    var error = document.createElement("pre");
    error.className = "dq-code-error";
    error.textContent = "JS 오류: " + message;
    root.appendChild(error);
  }

  function initCodeModules(scope) {
    Array.prototype.forEach.call(scope.querySelectorAll("[data-code-module-id]"), function (host) {
      if (host.dataset.codeReady === "true") return;
      var template = host.querySelector("template[data-built-code-template]");
      if (!template) return;
      host.dataset.codeReady = "true";
      var root = host.shadowRoot || host.attachShadow({ mode: "open" });
      root.appendChild(template.content.cloneNode(true));
      var source = host.getAttribute("data-built-code-src");
      if (!source) return;
      window.fetch(source, { cache: "no-cache" }).then(function (response) {
        if (!response.ok) throw new Error(response.status + " " + response.statusText);
        return response.text();
      }).then(function (code) {
        var cleanup = new window.Function("root", "host", '"use strict";\\n' + code)(root, host);
        if (typeof cleanup === "function") host._dqCodeCleanup = cleanup;
      }).catch(function (error) { showError(root, error.message); });
    });
  }

  function runCountUp(element, reducedMotion) {
    if (element.dataset.countReady === "true") return;
    element.dataset.countReady = "true";
    var original = element.textContent.trim();
    var match = original.match(/[-+]?\\d[\\d,]*(?:\\.\\d+)?/);
    if (!match || reducedMotion) return;
    var target = Number(match[0].replace(/,/g, ""));
    if (!Number.isFinite(target)) return;
    var prefix = original.slice(0, match.index);
    var suffix = original.slice(match.index + match[0].length);
    var decimals = (match[0].split(".")[1] || "").length;
    var useComma = match[0].indexOf(",") > -1;
    var start = null;
    function format(value) {
      var fixed = decimals ? value.toFixed(decimals) : String(Math.round(value));
      if (useComma) {
        var parts = fixed.split(".");
        parts[0] = Number(parts[0]).toLocaleString("ko-KR");
        fixed = parts.join(".");
      }
      return prefix + fixed + suffix;
    }
    element.textContent = format(0);
    function frame(time) {
      if (start == null) start = time;
      var progress = Math.min(1, (time - start) / 1200);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = format(target * eased);
      if (progress < 1) window.requestAnimationFrame(frame);
      else element.textContent = original;
    }
    window.requestAnimationFrame(frame);
  }

  function initMotion(scope) {
    var reducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    var modules = Array.prototype.filter.call(scope.querySelectorAll(".dq-motion, .dq-module--stats"), function (module) {
      return module.dataset.motionReady !== "true";
    });
    function reveal(module) {
      module.classList.add("is-in-view");
      Array.prototype.forEach.call(module.querySelectorAll("[data-count-up]"), function (element) { runCountUp(element, reducedMotion); });
    }
    if (reducedMotion || typeof window.IntersectionObserver !== "function") {
      modules.forEach(function (module) { module.dataset.motionReady = "true"; reveal(module); });
      return;
    }
    var observer = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: "0px 0px -5%" });
    modules.forEach(function (module) {
      module.dataset.motionReady = "true";
      if (module.classList.contains("dq-motion")) module.classList.add("is-motion-ready");
      observer.observe(module);
    });
  }

  function init() {
    initCodeModules(document);
    initMotion(document);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}(window, document));
`;
}

function formatBuiltHtml(html) {
  const source = String(html || "").replace(/\r\n?/g, "\n").trim();
  const rawPattern = /<!--[^]*?-->|<![^>]*>|<script\b[^>]*>[^]*?<\/script\s*>|<style\b[^>]*>[^]*?<\/style\s*>|<pre\b[^>]*>[^]*?<\/pre\s*>|<textarea\b[^>]*>[^]*?<\/textarea\s*>|<[^>]+>|[^<]+/gi;
  const tokens = source.match(rawPattern) || [];
  const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
  const inlineTags = new Set(["a", "abbr", "b", "bdi", "bdo", "button", "cite", "code", "data", "del", "em", "i", "ins", "kbd", "label", "mark", "q", "s", "samp", "small", "span", "strong", "sub", "sup", "svg", "time", "u", "use", "var"]);
  const simpleTextTags = new Set(["a", "button", "caption", "code", "dd", "dt", "em", "figcaption", "h1", "h2", "h3", "h4", "h5", "h6", "label", "legend", "li", "option", "p", "small", "span", "strong", "td", "th", "time", "title"]);
  const lines = [];
  let depth = 0;
  let pending = "";

  function indentation(level = depth) {
    return "  ".repeat(Math.max(0, level));
  }

  function flushPending() {
    const value = pending.trim();
    if (value) lines.push(indentation() + value);
    pending = "";
  }

  function normalizedTag(token) {
    return token.replace(/\s+/g, " ").replace(/\s+>/g, ">").trim();
  }

  function tagName(token) {
    const match = token.match(/^<\/?\s*([a-z0-9:-]+)/i);
    return match ? match[1].toLowerCase() : "";
  }

  function writeRawScript(token) {
    const match = token.match(/^(<script\b[^>]*>)([^]*)(<\/script\s*>)$/i);
    if (!match || !/\btype=["']application\/json["']/i.test(match[1])) {
      lines.push(indentation() + token.trim());
      return;
    }
    lines.push(indentation() + normalizedTag(match[1]));
    try {
      const formatted = JSON.stringify(JSON.parse(match[2].trim() || "{}"), null, 2);
      formatted.split("\n").forEach(line => lines.push(indentation(depth + 1) + line));
    } catch (error) {
      match[2].trim().split("\n").forEach(line => lines.push(indentation(depth + 1) + line));
    }
    lines.push(indentation() + match[3].trim());
  }

  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token) continue;

    if (/^<script\b/i.test(token)) {
      flushPending();
      writeRawScript(token);
      continue;
    }
    if (/^<(?:style|pre|textarea)\b/i.test(token) || /^<!--/.test(token) || /^<![^-]/.test(token)) {
      flushPending();
      lines.push(indentation() + token.trim());
      continue;
    }
    if (token.charAt(0) !== "<") {
      const text = token.replace(/\s+/g, " ").trim();
      if (text) {
        const separator = pending && /^\s/.test(token) && !/\s$/.test(pending) ? " " : "";
        pending += separator + text;
      }
      continue;
    }

    const name = tagName(token);
    const closing = /^<\//.test(token);
    const selfClosing = /\/\s*>$/.test(token) || voidTags.has(name);
    const inline = inlineTags.has(name);
    const clean = normalizedTag(token);

    if (!pending && !closing && !selfClosing && simpleTextTags.has(name)) {
      const textToken = tokens[index + 1];
      const closeToken = tokens[index + 2];
      if (textToken && textToken.charAt(0) !== "<" && closeToken && new RegExp(`^<\\/\\s*${name}\\s*>$`, "i").test(closeToken.trim())) {
        flushPending();
        const text = textToken.replace(/\s+/g, " ").trim();
        lines.push(indentation() + clean + text + normalizedTag(closeToken));
        index += 2;
        continue;
      }
    }

    if (closing) {
      if (inline) {
        pending += clean;
      } else {
        flushPending();
        depth = Math.max(0, depth - 1);
        lines.push(indentation() + clean);
      }
      continue;
    }

    if (inline || (selfClosing && inlineTags.has(name))) {
      pending += clean;
      continue;
    }

    flushPending();
    lines.push(indentation() + clean);
    if (!selfClosing) depth += 1;
  }

  flushPending();
  return lines.join("\n") + "\n";
}

function replaceElementById(html, id, replacement) {
  const openPattern = new RegExp(`<div\\b[^>]*\\bid=["']${id}["'][^>]*>`, "i");
  const match = openPattern.exec(html);
  if (!match) throw new Error(`#${id} 영역을 찾지 못했습니다.`);
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = match.index + match[0].length;
  let depth = 1;
  let tag;
  while ((tag = tagPattern.exec(html))) {
    if (/^<\/div/i.test(tag[0])) depth -= 1;
    else if (!/\/>$/.test(tag[0])) depth += 1;
    if (depth === 0) return html.slice(0, match.index) + replacement + html.slice(tagPattern.lastIndex);
  }
  throw new Error(`#${id} 닫는 태그를 찾지 못했습니다.`);
}

function contentFileNames(subHtml) {
  const names = new Set();
  const patterns = [
    /data-sub-content-file=["']([^"']+\.html)["']/gi,
    /include-html=["'][^"']*\/content\/([^/"']+\.html)["']/gi
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(subHtml))) {
      const name = path.basename(match[1]);
      if (/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.html$/.test(name)) names.add(name);
    }
  }
  return Array.from(names);
}

function collectBuilderAssets(source, sourceRelativePath, assets) {
  const text = String(source || "");
  let match;
  const absolutePattern = /\/page\/dq-builder\/([^"'()\s<>?#]+)/g;
  while ((match = absolutePattern.exec(text))) assets.add(match[1].replace(/\\/g, "/"));
  const urlPattern = /url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  while ((match = urlPattern.exec(text))) {
    const value = match[1].trim().split(/[?#]/)[0];
    if (!value || /^(?:data:|https?:|\/\/|#|\/page\/common\/)/i.test(value)) continue;
    if (value.startsWith("/page/dq-builder/")) {
      assets.add(value.slice("/page/dq-builder/".length));
      continue;
    }
    if (value.startsWith("/")) continue;
    assets.add(path.posix.normalize(path.posix.join(path.posix.dirname(sourceRelativePath), value)));
  }
}

function selectedFonts(html) {
  const match = String(html).match(/data-theme-font=["']([^"']+)["']/i);
  return new Set(["Pretendard", "Noto Sans KR", match ? match[1] : "Pretendard"]);
}

function filteredFontCss(source, families) {
  const blocks = String(source).match(/@font-face\s*{[\s\S]*?}/gi) || [];
  const selected = blocks.filter(block => Array.from(families).some(family => {
    const escaped = family.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`font-family\\s*:\\s*["']${escaped}["']`, "i").test(block);
  }));
  return `@charset "utf-8";\n\n${selected.join("\n\n")}\n`;
}

function contentListRuntime(projectName) {
  return `/** list.txt 기반 서브 콘텐츠 로더와 하단 선택기 */
(function (window, document) {
  "use strict";
  var area;
  var picker;
  var currentFile = "";

  function isSafeFileName(file) {
    return /^[^\\/\\?#<>"'\\u0000-\\u001f]+\\.html$/i.test(file);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function readFiles() {
    return window.fetch(area.dataset.contentList, { cache: "no-store" }).then(function (response) {
      if (!response.ok) throw new Error("content/list.txt를 불러오지 못했습니다.");
      return response.text();
    }).then(function (text) {
      return text.split(/\\r?\\n/).map(function (line) { return line.trim(); })
        .filter(function (line, index, files) {
          return isSafeFileName(line) && files.indexOf(line) === index;
        });
    });
  }

  function renderList(files) {
    var list = picker.querySelector("[data-built-content-list]");
    if (!files.length) {
      list.innerHTML = '<p class="dq-built-content-picker__empty">content/list.txt에 등록된 콘텐츠가 없습니다.</p>';
      return;
    }
    list.innerHTML = files.map(function (file) {
      var active = file === currentFile ? " is-active" : "";
      var current = file === currentFile ? ' aria-current="page"' : "";
      return '<button type="button" class="dq-built-content-picker__item' + active + '" data-built-content-file="' + escapeHtml(file) + '"' + current + '><span>' + escapeHtml(file.replace(/\\.html$/i, "")) + '</span><small>' + escapeHtml(file) + '</small></button>';
    }).join("");
  }

  function closePicker() {
    picker.querySelector("[data-built-content-modal]").hidden = true;
  }

  function bindPicker() {
    if (!picker || picker.dataset.bound === "true") return;
    picker.dataset.bound = "true";
    picker.addEventListener("click", function (event) {
      if (event.target.closest("[data-built-content-open]")) {
        var modal = picker.querySelector("[data-built-content-modal]");
        modal.hidden = false;
        picker.querySelector("[data-built-content-list]").innerHTML = '<p class="dq-built-content-picker__empty">목록을 불러오는 중입니다.</p>';
        readFiles().then(renderList).catch(function (error) {
          picker.querySelector("[data-built-content-list]").innerHTML = '<p class="dq-built-content-picker__empty">' + error.message + '</p>';
        });
        return;
      }
      if (event.target.closest("[data-built-content-close]") || event.target === picker.querySelector("[data-built-content-modal]")) {
        closePicker();
        return;
      }
      var contentButton = event.target.closest("[data-built-content-file]");
      if (!contentButton) return;
      var url = new URL(window.location.href);
      url.searchParams.set("content", contentButton.dataset.builtContentFile);
      window.location.href = url.href;
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !picker.querySelector("[data-built-content-modal]").hidden) closePicker();
    });
  }

  window.DQContentList = {
    prepare: async function () {
      area = document.querySelector("[data-content-list]");
      picker = document.querySelector("[data-built-content-picker]");
      if (!area) return;
      var files = await readFiles();
      var requested = new URLSearchParams(window.location.search).get("content") || files[0] || "";
      if (files.indexOf(requested) < 0) requested = files[0] || "";
      currentFile = requested;
      if (picker) {
        bindPicker();
        renderList(files);
      }
      if (!requested) {
        area.innerHTML = '<p class="include-error">content/list.txt에 콘텐츠 파일을 추가해 주세요.</p>';
        return;
      }
      area.innerHTML = '<section class="sub-content-block" data-runtime-content="' + escapeHtml(requested) + '" include-html="/page/${projectName}/content/' + encodeURIComponent(requested) + '"></section>';
    }
  };
}(window, document));
`;
}

function contentPickerCss() {
  return `@charset "utf-8";

.dq-built-content-picker { position: fixed; right: 24px; bottom: 24px; z-index: 3500; margin: 0; padding: 0; }
.dq-built-content-picker__open { min-height: 42px; padding: 0 18px; border: 0; border-radius: 8px; background: #292d35; color: #fff; font: 700 14px/1 Pretendard, sans-serif; cursor: pointer; }
.dq-built-content-picker__open { box-shadow: 0 10px 30px rgb(0 0 0 / 24%); }
.dq-built-content-picker__open:hover { background: #000; transform: translateY(-1px); }
.dq-built-content-picker__modal { position: fixed; inset: 0; z-index: 4000; display: grid; padding: 24px; place-items: center; background: rgb(15 17 22 / 62%); backdrop-filter: blur(4px); }
.dq-built-content-picker__modal[hidden] { display: none; }
.dq-built-content-picker__dialog { box-sizing: border-box; width: min(560px, 100%); max-height: min(720px, 84vh); padding: 26px; overflow: auto; border-radius: 16px; background: #fff; color: #22252b; box-shadow: 0 24px 80px rgb(0 0 0 / 30%); }
.dq-built-content-picker__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
.dq-built-content-picker__head strong { display: block; font-size: 21px; }
.dq-built-content-picker__head p { margin: 5px 0 0; color: #747b87; font-size: 12px; }
.dq-built-content-picker__close { width: 36px; height: 36px; border: 0; border-radius: 50%; background: #eef0f4; color: #34373e; font-size: 20px; cursor: pointer; }
.dq-built-content-picker__list { display: grid; gap: 8px; }
.dq-built-content-picker__item { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%; padding: 13px 14px; border: 1px solid #dfe3e9; border-radius: 9px; background: #fff; color: #292d35; text-align: left; cursor: pointer; }
.dq-built-content-picker__item:hover { border-color: #6558f5; background: #f7f6ff; }
.dq-built-content-picker__item.is-active { border-color: #6558f5; background: #eeecff; color: #493dd2; }
.dq-built-content-picker__item span { font-weight: 700; }
.dq-built-content-picker__item small { color: #858b96; }
.dq-built-content-picker__empty { margin: 0; padding: 28px 16px; border-radius: 9px; background: #f5f6f8; color: #747b87; text-align: center; }
@media (max-width: 640px) { .dq-built-content-picker { right: 14px; bottom: 14px; } .dq-built-content-picker__modal { padding: 14px; } .dq-built-content-picker__dialog { padding: 20px; } .dq-built-content-picker__item { align-items: flex-start; flex-direction: column; gap: 3px; } }
@media print { .dq-built-content-picker { display: none !important; } }
`;
}

function projectReadme(projectName) {
  return `# ${projectName}\n\nDQ Builder에서 생성한 실작업용 프로젝트입니다. 편집기와 저장 서버는 포함하지 않습니다.\n\n## Live Server\n\nwebapp 폴더를 Live Server 루트로 열고 다음 주소를 사용합니다.\n\n- /page/${projectName}/index.html\n- /page/${projectName}/sub.html\n\n## 직접 작성 요소\n\n직접 작성 요소의 HTML은 해당 페이지의 template 태그에, CSS와 JS는 modules 폴더에 분리되어 있습니다.\n\n## 서브 콘텐츠 추가\n\n1. content 폴더에 영문 파일명으로 HTML을 생성합니다.\n2. content/list.txt에 파일명을 한 줄로 추가합니다.\n3. sub.html 하단의 콘텐츠 목록 버튼에서 선택하거나 sub.html?content=파일명.html로 엽니다. 목록 버튼은 열 때마다 list.txt를 새로 읽습니다.\n\n## JSP·백엔드 연동 시 정리\n\nsub.html에서 \`DEV PREVIEW\` 주석으로 감싼 콘텐츠 목록 CSS·HTML·JS는 Live Server 미리보기 전용입니다. 실제 include 또는 JSP 데이터로 교체한 뒤 해당 주석 범위와 css/content-picker.css, js/content-list.js 파일을 삭제할 수 있습니다.\n`;
}

async function writeBuildText(root, relativePath, content) {
  const destination = path.join(root, relativePath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, content, "utf8");
}

async function isBuildProjectRoot(directory) {
  return fsSync.existsSync(path.join(directory, "index.html"))
    && fsSync.existsSync(path.join(directory, "sub.html"))
    && fsSync.existsSync(path.join(directory, "content/list.txt"));
}

async function listBuildProjects() {
  const pageRoot = path.join(WEBAPP_ROOT, "page");
  const entries = await fs.readdir(pageRoot, { withFileTypes: true });
  const projects = [];
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".") || ["common", "dq-builder"].includes(entry.name)) continue;
    if (!/^[a-z0-9][a-z0-9_-]{1,48}$/.test(entry.name)) continue;
    const directory = path.join(pageRoot, entry.name);
    if (!await isBuildProjectRoot(directory)) continue;
    const stat = await fs.stat(directory);
    const files = await listFiles(directory, directory);
    projects.push({ name: entry.name, modifiedAt: stat.mtime.toISOString(), fileCount: files.length });
  }
  return projects.sort((left, right) => right.modifiedAt.localeCompare(left.modifiedAt));
}

async function clearDirectory(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    await fs.rm(path.join(directory, entry.name), { recursive: true, force: true });
  }
}

async function buildProject(rawName, overwrite = false) {
  const projectName = normalizeProjectName(rawName);
  const pageRoot = path.join(WEBAPP_ROOT, "page");
  const targetRoot = path.join(pageRoot, projectName);
  const targetExists = fsSync.existsSync(targetRoot);
  if (targetExists && !overwrite) throw new Error(`page/${projectName} 폴더가 이미 있습니다. 기존 프로젝트 업데이트를 선택해 주세요.`);
  if (targetExists && !await isBuildProjectRoot(targetRoot)) throw new Error(`page/${projectName} 폴더는 DQ 빌드 프로젝트가 아니어서 덮어쓸 수 없습니다.`);

  const sourceRoot = path.join(WEBAPP_ROOT, "page/dq-builder");
  const tempRoot = path.join(pageRoot, `.dq-build-${projectName}-${Date.now()}`);
  const assets = new Set();
  try {
    let indexHtml = await fs.readFile(path.join(sourceRoot, "index.html"), "utf8");
    let subHtml = await fs.readFile(path.join(sourceRoot, "sub.html"), "utf8");
    const contentFiles = contentFileNames(subHtml).filter(name => fsSync.existsSync(path.join(sourceRoot, "content", name)));
    if (!contentFiles.length) throw new Error("빌드할 서브 콘텐츠 파일이 없습니다.");

    collectBuilderAssets(indexHtml, "index.html", assets);
    collectBuilderAssets(subHtml, "sub.html", assets);
    indexHtml = replaceBuilderPath(stripBuilderMetadata(stripEditorAssets(indexHtml)), projectName);
    subHtml = replaceBuilderPath(stripBuilderMetadata(stripEditorAssets(subHtml)), projectName);
    const compiledIndex = compileBuiltContentState(indexHtml, projectName);
    const compiledSub = compileBuiltContentState(subHtml, projectName);
    indexHtml = compiledIndex.html;
    subHtml = compiledSub.html;
    const codeModules = new Map();
    [...compiledIndex.modules, ...compiledSub.modules].forEach(module => codeModules.set(module.id, module));
    subHtml = replaceElementById(subHtml, "contentsArea", `<!-- DEV PREVIEW: JSP·백엔드 연동 시 이 영역을 실제 콘텐츠 include로 교체하세요. -->\n          <div id="contentsArea" data-content-list="/page/${projectName}/content/list.txt"></div>\n          <div class="dq-built-content-picker" data-built-content-picker>\n            <button type="button" class="dq-built-content-picker__open" data-built-content-open>콘텐츠 목록</button>\n            <div class="dq-built-content-picker__modal" data-built-content-modal hidden>\n              <div class="dq-built-content-picker__dialog" role="dialog" aria-modal="true" aria-label="서브 콘텐츠 목록">\n                <div class="dq-built-content-picker__head"><div><strong>서브 콘텐츠 목록</strong><p>content/list.txt에 등록된 파일을 표시합니다.</p></div><button type="button" class="dq-built-content-picker__close" data-built-content-close aria-label="닫기">×</button></div>\n                <div class="dq-built-content-picker__list" data-built-content-list></div>\n              </div>\n            </div>\n          </div>\n          <!-- /DEV PREVIEW: 실제 include 적용 후 위 미리보기 UI를 삭제할 수 있습니다. -->`);
    subHtml = subHtml.replace(/<\/head>/i, `  <!-- DEV PREVIEW: JSP·백엔드 연동 시 콘텐츠 목록 UI와 함께 삭제하세요. -->\n  <link rel="stylesheet" href="/page/${projectName}/css/content-picker.css">\n  <!-- /DEV PREVIEW -->\n</head>`);
    subHtml = subHtml.replace(/<\/body>/i, `  <!-- DEV PREVIEW: Live Server 콘텐츠 목록용입니다. JSP·백엔드 연동 시 삭제하세요. -->\n  <script src="/page/${projectName}/js/content-list.js"></script>\n  <!-- /DEV PREVIEW -->\n</body>`);

    for (const relativePath of BUILD_RUNTIME_FILES) {
      const sourcePath = path.join(sourceRoot, relativePath);
      if (!fsSync.existsSync(sourcePath)) continue;
      let content = await fs.readFile(sourcePath, "utf8");
      collectBuilderAssets(content, relativePath, assets);
      content = replaceBuilderPath(content, projectName);
      if (relativePath === "js/app.js") {
        content = content.replace("async function boot() {\n    await includeHtml();", "async function boot() {\n    if (window.DQContentList) await window.DQContentList.prepare(DQ);\n    await includeHtml();");
        content = content
          .replace(/\n  function applyBuilderOverrides\(\) \{[\s\S]*?\n  \}\n\n  async function boot/, "\n  async function boot")
          .replace(/^\s*applyBuilderOverrides\(\);\s*$/gm, "");
      }
      await writeBuildText(tempRoot, relativePath, content);
    }

    const fontSource = await fs.readFile(path.join(sourceRoot, "css/fonts.css"), "utf8");
    const fontCss = filteredFontCss(fontSource, selectedFonts(indexHtml));
    collectBuilderAssets(fontCss, "css/fonts.css", assets);
    await writeBuildText(tempRoot, "css/fonts.css", fontCss);

    for (const fileName of contentFiles) {
      const relativePath = `content/${fileName}`;
      let content = await fs.readFile(path.join(sourceRoot, relativePath), "utf8");
      collectBuilderAssets(content, relativePath, assets);
      content = replaceBuilderPath(content, projectName);
      await writeBuildText(tempRoot, relativePath, content);
    }
    await writeBuildText(tempRoot, "content/list.txt", `${contentFiles.join("\n")}\n`);
    await writeBuildText(tempRoot, "js/content-list.js", contentListRuntime(projectName));
    await writeBuildText(tempRoot, "js/content-runtime.js", contentRuntime());
    await writeBuildText(tempRoot, "css/content-picker.css", contentPickerCss());
    await writeBuildText(tempRoot, "README.md", projectReadme(projectName));
    for (const module of codeModules.values()) {
      await writeBuildText(tempRoot, `modules/${module.fileName}.css`, module.css);
      if (module.js) await writeBuildText(tempRoot, `modules/${module.fileName}.js`, `${module.js}\n`);
    }

    for (const relativePath of assets) {
      if (!relativePath || relativePath.startsWith("..") || relativePath.toLowerCase().endsWith(".html") || BUILD_EXCLUDED_FILES.has(relativePath) || BUILD_RUNTIME_FILES.includes(relativePath) || relativePath === "css/fonts.css") continue;
      const sourcePath = path.join(sourceRoot, relativePath);
      if (!sourcePath.startsWith(sourceRoot + path.sep) || !fsSync.existsSync(sourcePath) || !fsSync.statSync(sourcePath).isFile()) continue;
      const destination = path.join(tempRoot, relativePath);
      await fs.mkdir(path.dirname(destination), { recursive: true });
      await fs.copyFile(sourcePath, destination);
    }

    // 변환된 진입 HTML은 리소스 수집이 끝난 뒤 마지막에 기록해 원본 링크가 덮어쓰지 못하게 합니다.
    await writeBuildText(tempRoot, "index.html", formatBuiltHtml(indexHtml));
    await writeBuildText(tempRoot, "sub.html", formatBuiltHtml(subHtml));

    if (targetExists) {
      const backupRoot = path.join(pageRoot, `.dq-backup-${projectName}-${Date.now()}`);
      await fs.cp(targetRoot, backupRoot, { recursive: true, force: true });
      try {
        await clearDirectory(targetRoot);
        await fs.cp(tempRoot, targetRoot, { recursive: true, force: true });
      } catch (error) {
        await clearDirectory(targetRoot).catch(() => {});
        await fs.cp(backupRoot, targetRoot, { recursive: true, force: true }).catch(() => {});
        throw error;
      }
      await fs.rm(tempRoot, { recursive: true, force: true }).catch(() => {});
      await fs.rm(backupRoot, { recursive: true, force: true }).catch(() => {});
    } else {
      await fs.rename(tempRoot, targetRoot);
    }
    const files = await listFiles(targetRoot, targetRoot);
    return {
      projectName,
      fileCount: files.length,
      previewUrl: `/page/${projectName}/index.html`,
      updated: targetExists
    };
  } catch (error) {
    await fs.rm(tempRoot, { recursive: true, force: true }).catch(() => {});
    throw error;
  }
}

async function listFiles(root, directory, prefix = "") {
  const results = [];
  const entries = await fs.readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) results.push(...await listFiles(root, fullPath, relativePath));
    else if (entry.isFile()) results.push({ fullPath, relativePath });
  }
  return results;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    table[index] = value >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let value = 0xffffffff;
  for (const byte of buffer) value = CRC_TABLE[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

function dosTimeDate(date) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    day: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate()
  };
}

async function createProjectZip(projectName) {
  const normalized = normalizeProjectName(projectName);
  const projectRoot = path.join(WEBAPP_ROOT, "page", normalized);
  if (!fsSync.existsSync(projectRoot)) throw new Error("먼저 프로젝트를 빌드해 주세요.");
  const roots = [
    { directory: path.join(WEBAPP_ROOT, "page/common"), prefix: "page/common" },
    { directory: projectRoot, prefix: `page/${normalized}` }
  ];
  const entries = [];
  for (const root of roots) {
    if (!fsSync.existsSync(root.directory)) continue;
    const files = await listFiles(root.directory, root.directory);
    for (const file of files) entries.push({ ...file, zipPath: path.posix.join(root.prefix, file.relativePath) });
  }

  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const entry of entries) {
    const data = await fs.readFile(entry.fullPath);
    const compressedCandidate = zlib.deflateRawSync(data, { level: 6 });
    const useCompression = compressedCandidate.length < data.length;
    const compressed = useCompression ? compressedCandidate : data;
    const method = useCompression ? 8 : 0;
    const name = Buffer.from(entry.zipPath.replace(/\\/g, "/"), "utf8");
    const stat = await fs.stat(entry.fullPath);
    const stamp = dosTimeDate(stat.mtime);
    const checksum = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(method, 8); local.writeUInt16LE(stamp.time, 10); local.writeUInt16LE(stamp.day, 12);
    local.writeUInt32LE(checksum, 14); local.writeUInt32LE(compressed.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
    localParts.push(local, name, compressed);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(method, 10); central.writeUInt16LE(stamp.time, 12); central.writeUInt16LE(stamp.day, 14);
    central.writeUInt32LE(checksum, 16); central.writeUInt32LE(compressed.length, 20); central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28); central.writeUInt16LE(0, 30); central.writeUInt16LE(0, 32); central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36); central.writeUInt32LE(0, 38); central.writeUInt32LE(offset, 42);
    centralParts.push(central, name);
    offset += local.length + name.length + compressed.length;
  }
  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6);
  end.writeUInt16LE(entries.length, 8); end.writeUInt16LE(entries.length, 10);
  end.writeUInt32LE(centralSize, 12); end.writeUInt32LE(offset, 16); end.writeUInt16LE(0, 20);
  return Buffer.concat([...localParts, ...centralParts, end]);
}

function findCloudflared() {
  const executableName = process.platform === "win32" ? "cloudflared.exe" : "cloudflared";
  const candidates = [
    process.env.DQ_CLOUDFLARED,
    process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "DQBuilder", executableName),
    path.join(__dirname, "tools", executableName)
  ].filter(Boolean);
  return candidates.find(candidate => fsSync.existsSync(candidate)) || "cloudflared";
}

function checkTunnelHealth() {
  if (!tunnelUrl) return Promise.resolve(false);
  return new Promise(resolve => {
    const request = https.request(tunnelUrl + "/page/dq-builder/index.html", { method: "HEAD", timeout: 6000 }, response => {
      response.resume();
      resolve(response.statusCode >= 200 && response.statusCode < 400);
    });
    request.on("timeout", () => {
      request.destroy();
      resolve(false);
    });
    request.on("error", () => resolve(false));
    request.end();
  });
}

async function startTunnel() {
  if (tunnelProcess && tunnelUrl) return tunnelUrl;
  if (tunnelStartPromise) return tunnelStartPromise;

  tunnelStartPromise = new Promise((resolve, reject) => {
    const executable = findCloudflared();
    let settled = false;
    let output = "";
    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      if (tunnelProcess) tunnelProcess.kill();
      tunnelProcess = null;
      reject(new Error("외부 공유 주소 생성 시간이 초과됐습니다."));
    }, 30000);

    try {
      tunnelProcess = spawn(executable, ["tunnel", "--url", `http://${HOST}:${PORT}`], {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
        env: Object.assign({}, process.env, {
          TUNNEL_TRANSPORT_PROTOCOL: "http2",
          TUNNEL_EDGE_IP_VERSION: "4",
          TUNNEL_RETRIES: "20"
        })
      });
    } catch (error) {
      clearTimeout(timeout);
      tunnelProcess = null;
      reject(new Error("cloudflared 실행 파일을 찾지 못했습니다."));
      return;
    }

    const inspectOutput = chunk => {
      output = (output + chunk.toString()).slice(-12000);
      const match = output.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
      if (!match || settled) return;
      settled = true;
      clearTimeout(timeout);
      tunnelUrl = match[0];
      resolve(tunnelUrl);
    };
    tunnelProcess.stdout.on("data", inspectOutput);
    tunnelProcess.stderr.on("data", inspectOutput);
    tunnelProcess.on("error", error => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      tunnelProcess = null;
      reject(new Error(error.code === "ENOENT" ? "cloudflared 실행 파일을 찾지 못했습니다." : error.message));
    });
    tunnelProcess.on("exit", code => {
      const wasSettled = settled;
      tunnelProcess = null;
      tunnelUrl = "";
      if (!wasSettled) {
        settled = true;
        clearTimeout(timeout);
        reject(new Error(`외부 공유 터널이 종료됐습니다. (${code == null ? "unknown" : code})`));
      }
    });
  }).finally(() => {
    tunnelStartPromise = null;
  });
  return tunnelStartPromise;
}

function stopTunnel() {
  if (tunnelProcess) tunnelProcess.kill();
  tunnelProcess = null;
  tunnelUrl = "";
}

async function serveStatic(request, response, pathname) {
  if (pathname === "/") {
    response.statusCode = 302;
    response.setHeader("Location", "/page/dq-builder/index.html");
    response.end();
    return;
  }
  if (!pathname.startsWith("/page/") || /(?:^|\/)(?:WEB-INF|builder-save-server\.cjs)(?:\/|$)/i.test(pathname)
      || /\.(?:cjs|ps1)$/i.test(pathname)) {
    response.statusCode = 404;
    response.end("Not Found");
    return;
  }
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname).replace(/^\/+/, "");
  } catch (error) {
    response.statusCode = 400;
    response.end("Bad Request");
    return;
  }
  const filePath = path.resolve(WEBAPP_ROOT, decodedPath);
  if (!filePath.startsWith(WEBAPP_ROOT + path.sep)) {
    response.statusCode = 403;
    response.end("Forbidden");
    return;
  }
  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) throw new Error("not-file");
    response.statusCode = 200;
    response.setHeader("Content-Type", MIME_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream");
    response.setHeader("Cache-Control", "no-store");
    response.end(await fs.readFile(filePath));
  } catch (error) {
    response.statusCode = 404;
    response.end("Not Found");
  }
}

const server = http.createServer(async (request, response) => {
  const pathname = requestPath(request);
  if (!isAllowedOrigin(request)) {
    sendJson(request, response, 403, { success: false, message: "허용되지 않은 요청입니다." });
    return;
  }

  if (request.method === "OPTIONS" && [SAVE_PATH, IMAGE_UPLOAD_PATH, CONTENT_FILE_PATH, PROJECT_BUILD_PATH, SHARE_START_PATH, SHARE_STOP_PATH].includes(pathname)) {
    response.statusCode = 204;
    response.setHeader("Access-Control-Allow-Origin", request.headers.origin || `http://${HOST}:${PORT}`);
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, X-DQ-Builder, X-File-Name");
    response.setHeader("Access-Control-Max-Age", "600");
    response.end();
    return;
  }

  if (request.method === "GET" && pathname === SHARE_STATUS_PATH) {
    const sharing = !!(tunnelProcess && tunnelUrl);
    const healthy = sharing ? await checkTunnelHealth() : false;
    sendJson(request, response, 200, { success: true, sharing, healthy, url: sharing ? tunnelUrl + "/page/dq-builder/index.html" : "" });
    return;
  }

  if (request.method === "GET" && pathname === SYNC_EVENTS_PATH) {
    openSyncStream(request, response);
    return;
  }

  if (request.method === "GET" && pathname === PROJECT_LIST_PATH) {
    try {
      const projects = await listBuildProjects();
      sendJson(request, response, 200, { success: true, projects });
    } catch (error) {
      sendJson(request, response, 500, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "POST" && pathname === PROJECT_BUILD_PATH && request.headers["x-dq-builder"] === "1") {
    try {
      const source = await readJson(request);
      const result = await buildProject(source.projectName, source.overwrite === true);
      sendJson(request, response, 200, { success: true, ...result, message: result.updated ? `page/${result.projectName} 프로젝트를 업데이트했습니다.` : `page/${result.projectName} 실작업 폴더를 생성했습니다.` });
    } catch (error) {
      sendJson(request, response, 400, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "GET" && pathname === PROJECT_DOWNLOAD_PATH) {
    try {
      const requestUrl = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);
      const projectName = normalizeProjectName(requestUrl.searchParams.get("project"));
      const archive = await createProjectZip(projectName);
      const origin = request.headers.origin;
      if (origin) response.setHeader("Access-Control-Allow-Origin", origin);
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/zip");
      response.setHeader("Content-Disposition", `attachment; filename="${projectName}-page.zip"`);
      response.setHeader("Content-Length", archive.length);
      response.setHeader("Cache-Control", "no-store");
      response.end(archive);
    } catch (error) {
      sendJson(request, response, 400, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "POST" && pathname === SHARE_START_PATH && request.headers["x-dq-builder"] === "1") {
    try {
      const url = await startTunnel();
      sendJson(request, response, 200, { success: true, sharing: true, healthy: true, url: url + "/page/dq-builder/index.html" });
    } catch (error) {
      sendJson(request, response, 503, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "POST" && pathname === SHARE_STOP_PATH && request.headers["x-dq-builder"] === "1") {
    stopTunnel();
    sendJson(request, response, 200, { success: true, sharing: false, url: "" });
    return;
  }

  if (request.method === "POST" && pathname === SAVE_PATH && request.headers["x-dq-builder"] === "1") {
    try {
      const source = await readJson(request);
      await saveSource(source);
      sendJson(request, response, 200, { success: true, contentSaved: true, version: 3, message: "사이트 편집 데이터와 개별 콘텐츠 파일을 저장했습니다." });
      broadcastSaved(source);
    } catch (error) {
      sendJson(request, response, 400, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "POST" && pathname === IMAGE_UPLOAD_PATH && request.headers["x-dq-builder"] === "1") {
    try {
      const url = await saveUploadedImage(request);
      sendJson(request, response, 200, { success: true, url });
    } catch (error) {
      sendJson(request, response, 400, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "POST" && pathname === CONTENT_FILE_PATH && request.headers["x-dq-builder"] === "1") {
    try {
      const fileName = await createSubContentFile(await readJson(request));
      sendJson(request, response, 200, { success: true, fileName });
    } catch (error) {
      sendJson(request, response, 400, { success: false, message: error.message });
    }
    return;
  }

  if (request.method === "GET" || request.method === "HEAD") {
    await serveStatic(request, response, pathname);
    return;
  }

  sendJson(request, response, 404, { success: false, message: "지원하지 않는 요청입니다." });
});

process.on("exit", stopTunnel);
process.on("SIGINT", () => {
  stopTunnel();
  process.exit(0);
});

server.listen(PORT, HOST, () => {
  console.log(`DQ SITE BUILDER server: http://${HOST}:${PORT}/page/dq-builder/index.html`);
});
