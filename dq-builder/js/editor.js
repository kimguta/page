/**
 * DQ constrained site builder
 * 고정된 Header / Content / Footer 안에서 허용된 설정만 편집합니다.
 */
(function (window, document) {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  if (params.get("builderCanvas") === "1" || !window.DQTemplate) return;

  window.DQTemplate.use("site-builder", function (DQ) {
    var SITE_ICONS = "/page/dq-builder/images/icons/site-icons.svg";
    var EDITOR_ICONS = "/page/dq-builder/images/icons/editor-icons.svg";
    var LOGO_IMAGE_BASE = "/page/dq-builder/images/";
    var FONT_OPTIONS = ["Pretendard", "Noto Sans KR", "Spoqa Han Sans", "GmarketSans", "S-CoreDream", "Paperlogy", "NanumSquareNeo", "Elice", "SebangGothic", "PyeongChang", "MaruBuri", "ChosunNm", "SokchoBadaDotum", "Jalnan"];
    var THEME_PRESETS = {
      calm: { label: "차분함", description: "기관·기업에 안정적인 저채도 스타일", color1: "#416B63", color2: "#203C37", color3: "#9DBDB4", pageBackground: "#F3F7F5", surface: "#FFFFFF", surfaceAlt: "#E8F0ED", textColor: "#1E302D", mutedColor: "#657A75", lineColor: "#D8E3DF", shadow: "0 14px 38px rgba(35,69,61,.10)", radiusStyle: "soft", buttonStyle: "filled", motionStyle: "soft" },
      bright: { label: "밝고 친근함", description: "서비스·교육에 어울리는 산뜻한 스타일", color1: "#2563EB", color2: "#172554", color3: "#F59E0B", pageBackground: "#F7FAFF", surface: "#FFFFFF", surfaceAlt: "#EAF2FF", textColor: "#172033", mutedColor: "#667085", lineColor: "#DCE6F5", shadow: "0 16px 42px rgba(37,99,235,.12)", radiusStyle: "round", buttonStyle: "filled", motionStyle: "soft" },
      vivid: { label: "화려함", description: "행사·브랜드에 강한 색감과 깊이", color1: "#7C3AED", color2: "#2E1065", color3: "#F43F5E", pageBackground: "#FFF8FC", surface: "#FFFFFF", surfaceAlt: "#F5EAFE", textColor: "#251535", mutedColor: "#74657E", lineColor: "#E9DDF0", shadow: "0 20px 50px rgba(124,58,237,.18)", radiusStyle: "round", buttonStyle: "gradient", motionStyle: "emphasis" },
      dynamic: { label: "역동적", description: "캠페인·프로모션에 선명하고 빠른 스타일", color1: "#FF4D00", color2: "#111827", color3: "#00B8D9", pageBackground: "#F8FAFC", surface: "#FFFFFF", surfaceAlt: "#EEF2F6", textColor: "#111827", mutedColor: "#5F6B7A", lineColor: "#D8DEE7", shadow: "8px 8px 0 rgba(17,24,39,.13)", radiusStyle: "square", buttonStyle: "gradient", motionStyle: "emphasis" },
      dark: { label: "어두운 분위기", description: "테크·콘텐츠에 몰입감 있는 다크 스타일", color1: "#8B5CF6", color2: "#090B12", color3: "#22D3EE", pageBackground: "#0C1018", surface: "#151B26", surfaceAlt: "#1D2634", textColor: "#F4F7FB", mutedColor: "#A7B0C0", lineColor: "#2D3849", shadow: "0 20px 55px rgba(0,0,0,.38)", radiusStyle: "soft", buttonStyle: "filled", motionStyle: "soft" },
      elegant: { label: "고급스러움", description: "문화·호텔·프리미엄 브랜드 스타일", color1: "#8A6D3B", color2: "#1D1A17", color3: "#C8B07C", pageBackground: "#F6F2EA", surface: "#FFFCF7", surfaceAlt: "#EDE5D8", textColor: "#29231C", mutedColor: "#756B5E", lineColor: "#DED3C2", shadow: "0 18px 45px rgba(59,45,28,.13)", radiusStyle: "square", buttonStyle: "outline", motionStyle: "soft" },
      neon: { label: "네온 임팩트", description: "공연·게임·테크 홍보에 강렬한 네온 스타일", color1: "#B7FF2A", color2: "#070A12", color3: "#FF2E93", pageBackground: "#070A12", surface: "#101522", surfaceAlt: "#182033", textColor: "#F7FAFF", mutedColor: "#AEB8CC", lineColor: "#33405A", shadow: "0 0 0 1px rgba(183,255,42,.28), 0 20px 60px rgba(255,46,147,.22)", radiusStyle: "square", buttonStyle: "gradient", motionStyle: "emphasis" },
      pop: { label: "팝 캠페인", description: "축제·이벤트·상품 홍보에 대담한 컬러 스타일", color1: "#2457FF", color2: "#171717", color3: "#FF3D8D", pageBackground: "#FFF9E8", surface: "#FFFFFF", surfaceAlt: "#FFF36D", textColor: "#171717", mutedColor: "#515151", lineColor: "#171717", shadow: "6px 6px 0 rgba(23,23,23,.92)", radiusStyle: "round", buttonStyle: "gradient", motionStyle: "emphasis" },
      editorial: { label: "볼드 에디토리얼", description: "전시·패션·포트폴리오에 잡지 같은 대비", color1: "#E63224", color2: "#111111", color3: "#D8FF3E", pageBackground: "#F1EEE6", surface: "#FAF8F1", surfaceAlt: "#DED9CF", textColor: "#111111", mutedColor: "#5D5A54", lineColor: "#111111", shadow: "0 18px 0 rgba(17,17,17,.10)", radiusStyle: "square", buttonStyle: "filled", motionStyle: "emphasis" },
      cinematic: { label: "시네마틱", description: "몰입형 브랜드·콘텐츠 홍보에 극적인 다크 스타일", color1: "#FF5A1F", color2: "#050816", color3: "#21D4FD", pageBackground: "#050816", surface: "#0E1426", surfaceAlt: "#17213A", textColor: "#F7F8FC", mutedColor: "#A8B2C8", lineColor: "#293550", shadow: "0 28px 80px rgba(0,0,0,.52)", radiusStyle: "soft", buttonStyle: "gradient", motionStyle: "emphasis" }
    };
    var storageKey = "dq-builder-v10:" + window.location.pathname;
    var reopenAfterSaveKey = "dq-builder-reopen-after-save:" + window.location.pathname;
    var syncReloadKey = "dq-builder-sync-reload:" + window.location.pathname;
    var uploadRecoveryKey = "dq-builder-upload-recovery:" + window.location.pathname;

    function builderServerUrl(endpoint) {
      var configured = String(window.DQ_BUILDER_SERVER || document.documentElement.dataset.builderServer || "").trim();
      if (configured) return new URL(endpoint, configured.replace(/\/?$/, "/")).href;
      var protocol = window.location.protocol === "https:" ? "https:" : "http:";
      return protocol + "//" + window.location.hostname + ":5510/page/dq-builder/builder/" + String(endpoint || "").replace(/^\//, "");
    }
    // 새 탭이 기존 탭의 sessionStorage를 복제해도 서로 다른 작업자로
    // 인식되도록 페이지 인스턴스마다 고유 ID를 발급합니다.
    var syncClientId = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : "client-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    var pendingUploadRecovery = null;
    var canvasDocument = null;
    var canvasWindow = null;
    var state = null;
    var selectedLayer = "header-style";
    var selectedMenuId = null;
    var history = [];
    var historyIndex = -1;
    var canvasSetupDone = false;
    var canvasWaitTimer = null;
    var lastCanvasError = null;
    var editMode = "idle";
    var selectionMode = false;
    var hoveredCanvasElement = null;
    var selectedStructureElement = null;
    var selectedElementKey = null;
    var selectedContentSectionId = null;
    var selectedContentCellId = null;
    var selectedSubContentId = null;
    var basicUiSourceHtml = "";
    var subContentSourceCache = {};

    function subContentCacheKey(block) {
      return String(block && (block.dataset.subContentFile || block.dataset.subContentBlock) || "");
    }

    function decodeSubContentCss(style) {
      if (!style) return "";
      var raw = style.getAttribute("data-sub-content-css-raw");
      if (raw == null) return style.textContent || "";
      try { return decodeURIComponent(raw); }
      catch (error) { return style.textContent || ""; }
    }

    function rememberSubContentSources(sourceDocument) {
      if (!sourceDocument) return;
      sourceDocument.querySelectorAll("#contentsArea > [data-sub-content-block]").forEach(function (block) {
        var key = subContentCacheKey(block);
        if (!key) return;
        var copy = block.cloneNode(true);
        var style = copy.querySelector(":scope > style[data-sub-content-css]");
        var scriptTemplate = copy.querySelector(":scope > template[data-sub-content-js]");
        var css = decodeSubContentCss(style);
        var js = scriptTemplate ? scriptTemplate.textContent || "" : "";
        if (style) style.remove();
        if (scriptTemplate) scriptTemplate.remove();
        var html = copy.innerHTML.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
        if (String(html || "").trim() || String(css || "").trim() || String(js || "").trim()) {
          subContentSourceCache[key] = { html: html, css: css, js: js };
        }
      });
    }

    function splitCssSelectors(selectorText) {
      var selectors = [];
      var start = 0;
      var depth = 0;
      var quote = "";
      for (var index = 0; index < selectorText.length; index += 1) {
        var character = selectorText[index];
        if (quote) {
          if (character === "\\") index += 1;
          else if (character === quote) quote = "";
        } else if (character === '"' || character === "'") quote = character;
        else if (character === "(" || character === "[") depth += 1;
        else if (character === ")" || character === "]") depth = Math.max(0, depth - 1);
        else if (character === "," && depth === 0) {
          selectors.push(selectorText.slice(start, index));
          start = index + 1;
        }
      }
      selectors.push(selectorText.slice(start));
      return selectors;
    }

    function findCssBrace(css, start, target) {
      var quote = "";
      var comment = false;
      for (var index = start; index < css.length; index += 1) {
        var character = css[index];
        var next = css[index + 1];
        if (comment) {
          if (character === "*" && next === "/") { comment = false; index += 1; }
        } else if (quote) {
          if (character === "\\") index += 1;
          else if (character === quote) quote = "";
        } else if (character === "/" && next === "*") { comment = true; index += 1; }
        else if (character === '"' || character === "'") quote = character;
        else if (character === target) return index;
      }
      return -1;
    }

    function findCssRuleEnd(css, openIndex) {
      var depth = 1;
      var cursor = openIndex + 1;
      while (cursor < css.length) {
        var nextOpen = findCssBrace(css, cursor, "{");
        var nextClose = findCssBrace(css, cursor, "}");
        if (nextClose < 0) return css.length - 1;
        if (nextOpen > -1 && nextOpen < nextClose) { depth += 1; cursor = nextOpen + 1; }
        else { depth -= 1; if (!depth) return nextClose; cursor = nextClose + 1; }
      }
      return css.length - 1;
    }

    function scopeSubContentCss(css, block) {
      css = String(css || "");
      if (!css.trim()) return "";
      var fileName = String(block.fileName || "").replace(/["\\]/g, "\\$&");
      var blockId = String(block.id || "").replace(/["\\]/g, "\\$&");
      var scope = fileName ? '[data-sub-content-file="' + fileName + '"]' : '[data-sub-content-block="' + blockId + '"]';

      function scopeRules(source) {
        var output = "";
        var cursor = 0;
        while (cursor < source.length) {
          var open = findCssBrace(source, cursor, "{");
          if (open < 0) return output + source.slice(cursor);
          var close = findCssRuleEnd(source, open);
          var header = source.slice(cursor, open);
          var body = source.slice(open + 1, close);
          var trimmed = header.trim();
          if (!trimmed) output += header + "{" + body + "}";
          else if (/^@(media|supports|container|layer|document)\b/i.test(trimmed)) output += header + "{" + scopeRules(body) + "}";
          else if (/^@/i.test(trimmed)) output += header + "{" + body + "}";
          else {
            var leading = header.match(/^\s*/)[0];
            var scopedHeader = splitCssSelectors(trimmed).map(function (selector) {
              selector = selector.trim();
              if (!selector) return selector;
              if (selector.indexOf(scope) === 0) return selector;
              if (/:host\b/.test(selector)) return selector.replace(/:host\b/g, scope);
              if (/:scope\b/.test(selector)) return selector.replace(/:scope\b/g, scope);
              return scope + " " + selector;
            }).join(", ");
            output += leading + scopedHeader + "{" + body + "}";
          }
          cursor = close + 1;
        }
        return output;
      }

      return scopeRules(css);
    }

    function buildSubContentStyle(block) {
      var css = String(block.css || "");
      if (!css.trim()) return "";
      return '<style data-sub-content-css data-sub-content-css-raw="' + escapeHtml(encodeURIComponent(css)) + '">' + String(scopeSubContentCss(css, block)).replace(/<\/style/gi, "<\\/style") + '</style>';
    }

    function readBasicUiSource(sourceDocument) {
      if (!sourceDocument) return "";
      var sourceBlock = sourceDocument.querySelector('#contentsArea > [data-sub-content-type="basic"]');
      if (!sourceBlock) return "";
      var copy = sourceBlock.cloneNode(true);
      var style = copy.querySelector(":scope > style[data-sub-content-css]");
      var scriptTemplate = copy.querySelector(":scope > template[data-sub-content-js]");
      if (style) style.remove();
      if (scriptTemplate) scriptTemplate.remove();
      var html = copy.innerHTML.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
      if (String(html || "").trim()) basicUiSourceHtml = html;
      return basicUiSourceHtml;
    }

    function icon(name, type) {
      var sprite = type === "site" ? SITE_ICONS : EDITOR_ICONS;
      return '<svg class="builder-icon" aria-hidden="true"><use href="' + sprite + "#" + name + '"></use></svg>';
    }

    function escapeHtml(value) {
      return String(value == null ? "" : value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function clone(value) {
      return JSON.parse(JSON.stringify(value));
    }

    function readableText(element) {
      var copy = element.cloneNode(true);
      copy.querySelectorAll("svg, script, style").forEach(function (node) { node.remove(); });
      return copy.textContent.replace(/\s+/g, " ").trim();
    }

    function directChild(element, selector) {
      return Array.prototype.find.call(element.children, function (child) { return child.matches(selector); }) || null;
    }

    function safeUtilityHtml(html) {
      var template = document.createElement("template");
      template.innerHTML = String(html || "");
      template.content.querySelectorAll("script, style, iframe, object, embed").forEach(function (node) { node.remove(); });
      template.content.querySelectorAll("*").forEach(function (node) {
        Array.from(node.attributes).forEach(function (attribute) {
          if (/^on/i.test(attribute.name)) node.removeAttribute(attribute.name);
        });
      });
      return template.innerHTML;
    }

    function logoFileValue(path) {
      var value = String(path || "");
      return value.indexOf(LOGO_IMAGE_BASE) === 0 ? value.slice(LOGO_IMAGE_BASE.length) : value;
    }

    function resolveLogoPath(path) {
      var value = String(path || "").trim();
      if (!value) return "";
      if (/^(?:data:|blob:|https?:\/\/|\/)/i.test(value)) return value;
      return LOGO_IMAGE_BASE + value.replace(/^\.\//, "");
    }

    function siteSvg(name, className) {
      return '<svg' + (className ? ' class="' + className + '"' : "") + ' aria-hidden="true"><use href="' + SITE_ICONS + '#' + name + '"></use></svg>';
    }

    function buildDepthHtml(items, depth) {
      if (!items || !items.length) return "";
      var className = depth === 2 ? "gnb-depth2" : "gnb-depth3";
      var lines = ['<ul class="' + className + '">'];
      items.forEach(function (item) {
        lines.push("  <li>");
        lines.push('    <a href="' + escapeHtml(item.href || "#") + '">' + escapeHtml(item.label || "메뉴") + "</a>");
        if (depth === 2) {
          var childHtml = buildDepthHtml(item.children, 3);
          if (childHtml) lines.push(childHtml.split("\n").map(function (line) { return "    " + line; }).join("\n"));
        }
        lines.push("  </li>");
      });
      lines.push("</ul>");
      return lines.join("\n");
    }

    function buildHeaderFile() {
      var data = state.header;
      var theme = ensureThemeData(state.theme);
      var lines = [
        '<div class="site-header__config" hidden data-gnb-mode="' + escapeHtml(data.navigation.mode || "single") + '" data-gnb-indicator="' + escapeHtml(/^(?:underline|overline|side|pill|dot)$/.test(data.navigation.indicatorStyle) ? data.navigation.indicatorStyle : "underline") + '" data-gnb-indicator-use-theme="' + String(data.navigation.indicatorUseTheme !== false) + '" data-gnb-indicator-color="' + escapeHtml(data.navigation.indicatorColor || theme.color1) + '" data-scroll-hide="' + String(data.hideOnScroll !== false) + '" data-utility-mobile-visible="' + String(!!data.utility.mobileVisible) + '" data-search-mode="' + escapeHtml(data.actions.searchMode === "link" ? "link" : "panel") + '" data-search-href="' + escapeHtml(data.actions.searchHref || "#") + '" data-sitemap-layout="' + escapeHtml(data.sitemap.layout || "horizontal") + '" data-sitemap-background="' + escapeHtml(data.sitemap.background || "#1f1029") + '" data-sitemap-depth1-color="' + escapeHtml(data.sitemap.depth1Color || "#ffffff") + '" data-sitemap-depth23-color="' + escapeHtml(data.sitemap.depth23Color || "#ffffff") + '" data-sitemap-use-theme="' + String(theme.applyToSitemap !== false) + '" data-theme-design="' + escapeHtml(theme.designStyle || "custom") + '" data-theme-color-1="' + escapeHtml(theme.color1) + '" data-theme-color-2="' + escapeHtml(theme.color2) + '" data-theme-color-3="' + escapeHtml(theme.color3) + '" data-theme-font="' + escapeHtml(safeFontFamily(theme.fontFamily)) + '" data-theme-content-width="' + Math.max(960, Math.min(1600, Number(theme.contentMaxWidth) || 1200)) + '" data-theme-radius="' + escapeHtml(theme.radiusStyle || "soft") + '" data-theme-button="' + escapeHtml(theme.buttonStyle || "outline") + '" data-theme-motion="' + escapeHtml(theme.motionStyle || "soft") + '"></div>',
        '<div class="site-header__utility"' + (data.utility.visible ? "" : " hidden") + '>',
        '  <div class="site-header__inner">',
        '    <div class="utility-content">'
      ];

      data.utility.items.filter(function (item) { return item.type !== "button"; }).forEach(function (item) {
        if (item.type === "html") lines.push('      <span class="utility-html">' + safeUtilityHtml(item.html) + "</span>");
        else lines.push("      <span>" + escapeHtml(item.label) + "</span>");
      });
      lines.push("    </div>", '    <div class="utility-links">');
      data.utility.items.filter(function (item) { return item.type === "button"; }).forEach(function (item) {
        var loginIcon = /로그인/.test(item.label || "") ? siteSvg("login") : "";
        lines.push('      <a href="' + escapeHtml(item.href || "#") + '"' + (loginIcon ? ' class="utility-login"' : "") + ">" + loginIcon + "<span>" + escapeHtml(item.label) + "</span></a>");
      });
      lines.push("    </div>", "  </div>", "</div>", "", '<div class="site-header__main">', '  <div class="site-header__inner">', '    <h1 class="site-logo">');

      if (data.logo.useImage && data.logo.imagePath) {
        lines.push('      <a href="' + escapeHtml(data.logo.href || "#") + '"><img class="site-logo__image" src="' + escapeHtml(resolveLogoPath(data.logo.imagePath)) + '" alt="' + escapeHtml(data.logo.text || "사이트 로고") + '"></a>');
      } else {
        lines.push('      <a href="' + escapeHtml(data.logo.href || "#") + '">' + escapeHtml(data.logo.text || "SITE LOGO") + "</a>");
      }
      lines.push("    </h1>", "", '    <nav class="gnb" aria-label="주요 메뉴" data-lenis-prevent>', '      <strong class="sitemap-title">' + escapeHtml(data.sitemap.title || "DQ PROJECT / ALL MENU") + '</strong>', '      <ul class="gnb-depth1">');

      data.navigation.items.forEach(function (menu) {
        var target = menu.newWindow ? ' target="_blank" rel="noopener noreferrer"' : "";
        var externalIcon = menu.newWindow ? siteSvg("external", "gnb-link__external") : "";
        lines.push(
          '        <li class="gnb-item">',
          '          <a href="' + escapeHtml(menu.href || "#") + '" class="gnb-link"' + target + '><span>' + escapeHtml(menu.label || "메뉴") + "</span>" + externalIcon + "</a>"
        );
        var depthHtml = buildDepthHtml(menu.children, 2);
        if (depthHtml) lines.push(depthHtml.split("\n").map(function (line) { return "          " + line; }).join("\n"));
        lines.push("        </li>");
      });

      lines.push("      </ul>", "    </nav>", "", '    <div class="site-header__actions">');
      var searchMode = data.actions.searchMode === "link" ? "link" : "panel";
      var searchHref = data.actions.searchHref || "#";
      if (searchMode === "link") lines.push('      <a class="header-search" data-search-mode="link" href="' + escapeHtml(searchHref) + '" aria-label="검색 페이지 이동"' + (data.actions.search ? "" : " hidden") + '>' + siteSvg("search") + '<span class="blind">검색 페이지 이동</span></a>');
      else lines.push('      <button type="button" class="header-search" data-search-mode="panel" aria-expanded="false" aria-controls="header-search-panel" aria-label="검색 열기"' + (data.actions.search ? "" : " hidden") + '>' + siteSvg("search") + '<span class="blind">검색 열기</span></button>');
      var allowedIcons = ["user", "login", "logout", "home", "search", "sitemap", "external", "download", "play", "pause"];
      data.actions.items.forEach(function (action) {
        var actionIcon = allowedIcons.indexOf(action.icon) > -1 ? action.icon : "user";
        var target = action.newWindow ? ' target="_blank" rel="noopener noreferrer"' : "";
        lines.push('      <a class="header-custom-action builder-header-action" href="' + escapeHtml(action.href || "#") + '" aria-label="' + escapeHtml(action.label || "바로가기") + '"' + target + ">" + siteSvg(actionIcon) + "</a>");
      });
      if (data.actions.sitemap) lines.push('      <button type="button" class="site-map-toggle" aria-expanded="false" aria-label="사이트맵 열기">' + siteSvg("sitemap") + '<span class="blind">사이트맵 열기</span></button>');
      else lines.push('      <button type="button" class="site-map-toggle" aria-expanded="false" aria-label="사이트맵 열기" hidden>' + siteSvg("sitemap") + '<span class="blind">사이트맵 열기</span></button>');
      lines.push('      <button type="button" class="mobile-menu" aria-expanded="false" aria-label="전체 메뉴 열기">' + siteSvg("menu") + "</button>", "    </div>", "  </div>", "</div>", '<div class="header-search-panel" id="header-search-panel" hidden>', '  <form class="header-search-panel__form" action="' + escapeHtml(searchHref) + '" method="get" role="search">', '    <label class="blind" for="header-search-query">검색어</label>', '    <input id="header-search-query" name="q" type="search" placeholder="검색어를 입력하세요" autocomplete="off">', '    <button type="submit" class="header-search-panel__submit" aria-label="검색">' + siteSvg("search") + '<span>검색</span></button>', '    <button type="button" class="header-search-panel__close" data-search-close aria-label="검색창 닫기">' + siteSvg("close") + '</button>', "  </form>", "</div>", '<div class="gnb-backdrop"></div>', "");
      return lines.join("\n");
    }

    function buildHeaderCssFile() {
      var data = state.header;
      var theme = ensureThemeData(state.theme);
      var radiusValues = themeRadiusValues(theme.radiusStyle);
      var motionValues = themeMotionValues(theme.motionStyle);
      var buttonValues = themeButtonValues(theme.buttonStyle, theme);
      var actionStyle = data.actions.style;
      var logoWidth = Math.max(60, Math.min(400, Number(data.logo.imageWidth) || 180));
      return [
        "/* 사이트 편집기에서 생성한 헤더 스타일입니다. */",
        ":root {",
        "  --theme-color-1: " + theme.color1 + ";",
        "  --theme-color-2: " + theme.color2 + ";",
        "  --theme-color-3: " + theme.color3 + ";",
        "  --theme-page-bg: " + theme.pageBackground + ";",
        "  --theme-surface: " + theme.surface + ";",
        "  --theme-surface-alt: " + theme.surfaceAlt + ";",
        "  --theme-text: " + theme.textColor + ";",
        "  --theme-muted: " + theme.mutedColor + ";",
        "  --theme-line: " + theme.lineColor + ";",
        "  --theme-shadow: " + theme.shadow + ";",
        "  --content-layout-width: " + Math.max(960, Math.min(1600, Number(theme.contentMaxWidth) || 1200)) + "px;",
        "  --theme-radius-sm: " + radiusValues.small + ";",
        "  --theme-radius-md: " + radiusValues.medium + ";",
        "  --theme-radius-lg: " + radiusValues.large + ";",
        "  --theme-radius-pill: " + radiusValues.pill + ";",
        "  --theme-button-background: " + buttonValues.background + ";",
        "  --theme-button-border: " + buttonValues.border + ";",
        "  --theme-button-color: " + buttonValues.color + ";",
        "  --theme-motion-fast: " + motionValues.fast + ";",
        "  --theme-motion-lift: " + motionValues.lift + ";",
        "  --gnb-motion-base: " + motionValues.base + ";",
        "  --gnb-motion-fade: " + motionValues.fade + ";",
        "  --gnb-motion-height: " + motionValues.height + ";",
        "  --header-layout-width: " + Math.max(960, Math.min(1920, Number(data.maxWidth) || 1280)) + "px;",
        "  --header-main-height: " + Math.max(64, Math.min(120, Number(data.height) || 84)) + "px;",
        "}",
        "html { background: var(--theme-page-bg); }",
        "body { color: var(--theme-text); background: var(--theme-page-bg); font-family: \"" + safeFontFamily(theme.fontFamily) + "\", \"Noto Sans KR\", sans-serif; }",
        "#header { background-color: " + rgba(data.background, data.opacity) + "; --gnb-depth1-color: " + data.navigation.color + "; --gnb-indicator-color: " + (data.navigation.indicatorUseTheme !== false ? "var(--theme-color-1)" : (data.navigation.indicatorColor || theme.color1)) + "; --sitemap-background: " + (data.sitemap.background || "#1f1029") + "; --sitemap-depth1-color: " + (data.sitemap.depth1Color || "#ffffff") + "; --sitemap-depth23-color: " + (data.sitemap.depth23Color || "#ffffff") + "; }",
        "#header .site-header__utility { color: " + data.utility.color + "; background-color: " + rgba(data.utility.background, data.utility.opacity) + "; }",
        "#header .site-header__main > .site-header__inner { height: var(--header-main-height); }",
        "#header .site-logo a { color: " + data.logo.color + "; font-size: " + data.logo.size + "px; --logo-mobile-font-size: " + data.logo.mobileSize + "px; }",
        data.logo.useImage && data.logo.imagePath ? "#header .site-logo { width: " + logoWidth + "px; max-width: 40%; }" : "",
        data.logo.useImage && data.logo.imagePath ? "#header .site-logo__image { width: " + logoWidth + "px; }" : "",
        "#header .gnb-link { color: " + data.navigation.color + "; font-size: " + data.navigation.size + "px; }",
        "#header .gnb-depth2 > li > a { color: " + data.navigation.depth2Color + "; font-size: " + data.navigation.depth2Size + "px; }",
        "#header .gnb-depth3 a { color: " + data.navigation.depth3Color + "; font-size: " + data.navigation.depth3Size + "px; }",
        "#header .site-header__actions {",
        "  --header-action-border-width: " + (actionStyle.borderVisible ? "1px" : "0px") + ";",
        "  --header-action-border-color: " + actionStyle.borderColor + ";",
        "  --header-action-background: " + actionStyle.background + ";",
        "  --header-action-color: " + actionStyle.color + ";",
        "  --header-action-size: " + actionStyle.size + "px;",
        "  --header-action-icon-size: " + actionStyle.iconSize + "px;",
        "  --header-action-radius: " + actionStyle.radius + "px;",
        "}",
        ""
      ].filter(Boolean).join("\n");
    }

    function buildFooterFile() {
      var data = state.footer;
      var lines = [
        '<div class="site-footer__top">',
        '  <div class="site-footer__inner">',
        '    <nav class="footer-links" aria-label="하단 메뉴">'
      ];
      data.links.forEach(function (link) {
        lines.push('      <a href="' + escapeHtml(link.href || "#") + '">' + escapeHtml(link.label) + "</a>");
      });
      lines.push("    </nav>", "", '    <details class="family-site"' + (data.related.visible ? "" : " hidden") + ">", '      <summary class="family-site__toggle">' + escapeHtml(data.related.label || "관련 사이트") + "</summary>", '      <ul class="family-site__list">');
      data.related.items.forEach(function (item) {
        lines.push('        <li><a href="' + escapeHtml(item.href || "#") + '">' + escapeHtml(item.label) + "</a></li>");
      });
      lines.push("      </ul>", "    </details>", "  </div>", "</div>", "", '<div class="site-footer__bottom">', '  <div class="site-footer__inner">', '    <div class="footer-brand">');
      if (data.logo.useImage && data.logo.imagePath) {
        lines.push('      <strong><img class="footer-brand__image" src="' + escapeHtml(resolveLogoPath(data.logo.imagePath)) + '" alt="' + escapeHtml(data.logo.text || "사이트 로고") + '"></strong>');
      } else {
        lines.push("      <strong>" + escapeHtml(data.logo.text || "SITE LOGO") + "</strong>");
      }
      lines.push("    </div>", '    <div class="footer-info">', "      <address>" + escapeHtml(data.info.address) + "</address>", "      <p>" + escapeHtml(data.info.contact) + "</p>", '      <p class="copyright">' + escapeHtml(data.info.copyright) + "</p>", "    </div>", "  </div>", "</div>", "");
      return lines.join("\n");
    }

    function buildFooterCssFile() {
      var data = state.footer;
      var logoWidth = Math.max(60, Math.min(400, Number(data.logo.imageWidth) || 180));
      return [
        "/* 사이트 편집기에서 생성한 푸터 스타일입니다. */",
        ":root { --footer-layout-width: " + Math.max(960, Math.min(1920, Number(data.maxWidth) || 1280)) + "px; }",
        "#footer { color: " + data.color + "; background-color: " + data.background + "; }",
        "#footer .footer-links a, #footer .footer-info, #footer .copyright { color: " + data.color + "; }",
        "#footer .footer-links a:first-child, #footer .family-site__toggle, #footer .footer-brand strong { color: " + data.color + "; }",
        "#footer .family-site__toggle { background-color: " + data.background + "; }",
        "#footer .site-footer__bottom .site-footer__inner { min-height: " + Math.max(120, Math.min(360, Number(data.height) || 180)) + "px; }",
        data.logo.useImage && data.logo.imagePath ? "#footer .footer-brand { width: " + logoWidth + "px; min-width: 0; }" : "",
        data.logo.useImage && data.logo.imagePath ? "#footer .footer-brand__image { display: block; width: " + logoWidth + "px; max-width: 100%; height: auto; }" : "",
        "@media (max-width: 640px) {",
        "  #footer .site-footer__top .site-footer__inner { padding: 18px 0; }",
        "  #footer .footer-links, #footer .footer-info { font-size: 12px; }",
        "  #footer .footer-info { line-height: 1.65; }",
        "  #footer .footer-links { gap: 7px 14px; }",
        "  #footer .site-footer__bottom .site-footer__inner { min-height: 0; padding: 28px 0 34px; gap: 18px; }",
        "  #footer .footer-brand { width: auto; min-width: 0; max-width: 55%; }",
        "  #footer .footer-brand strong { font-size: 20px; }",
        "  #footer .footer-brand__image { width: auto; max-width: 100%; max-height: 40px; }",
        "  #footer .family-site__toggle { height: 36px; font-size: 13px; }",
        "  #footer .family-site__list a { padding: 10px 12px; font-size: 12px; }",
        "}",
        ""
      ].filter(Boolean).join("\n");
    }

    async function saveWithProjectServer(source) {
      var saveUrl = new URL("builder/header-source.do", window.location.href);
      var requestOptions = {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-DQ-Builder": "1"
        },
        body: JSON.stringify(source)
      };
      var response;
      try {
        response = await window.fetch(saveUrl.href, requestOptions);
      } catch (error) {
        response = null;
      }
      if (!response || response.status === 404 || response.status === 405 || response.status === 501) {
        response = await window.fetch(builderServerUrl("header-source.do"), requestOptions);
      }
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success) throw new Error(result.message || "HTTP " + response.status);
      if (result.contentSaved !== true) throw new Error("저장 서버가 이전 버전입니다. 저장 서버를 다시 시작해 주세요.");
    }

    async function saveStateToFiles() {
      var saveButton = document.querySelector("[data-builder-file-save]");
      if (saveButton) saveButton.disabled = true;

      try {
        if (isSubPage) {
          applySubpageState();
          syncLegacySubSections();
        }
        var source = {
          clientId: syncClientId,
          headerHtml: buildHeaderFile(),
          headerCss: buildHeaderCssFile(),
          footerHtml: buildFooterFile(),
          footerCss: buildFooterCssFile(),
          page: document.documentElement.dataset.builderPage || "index.html",
          contentHtml: window.DQContentBuilder ? window.DQContentBuilder.buildHtml(isSubPage ? buildSavedSubpageContentState() : (state.content || { sections: [] })) : "",
          subContentFiles: buildSubContentFiles(),
          subpageConfig: isSubPage ? {
            visualStyle: state.subpage.visualStyle,
            visualBackgroundImage: state.subpage.visualBackgroundImage ? resolveLogoPath(state.subpage.visualBackgroundImage) : "",
            visualFilterEnabled: state.subpage.visualFilterEnabled !== false,
            visualFilterStyle: state.subpage.visualFilterStyle || "theme",
            breadcrumbStyle: state.subpage.breadcrumbStyle,
            headingStyle: state.subpage.headingStyle,
            fontScale: state.subpage.fontScale,
            title2Style: state.subpage.title2Style,
            title3Style: state.subpage.title3Style,
            listStyle: state.subpage.listStyle,
            title2Image: state.subpage.title2Image ? resolveLogoPath(state.subpage.title2Image) : "",
            title3Image: state.subpage.title3Image ? resolveLogoPath(state.subpage.title3Image) : "",
            listImage: state.subpage.listImage ? resolveLogoPath(state.subpage.listImage) : ""
          } : null,
          elementOverrides: state.elementOverrides || [],
          elementCss: buildElementCssFile()
        };
        window.sessionStorage.setItem(reopenAfterSaveKey, JSON.stringify({
          expires: Date.now() + 15000,
          selectedLayer: selectedLayer,
          selectedElementKey: selectedElementKey
        }));
        await saveWithProjectServer(source);
        window.localStorage.removeItem(storageKey);
        showToast("페이지 요소와 헤더·푸터 편집값을 파일에 저장했습니다.");
        window.setTimeout(function () {
          window.sessionStorage.removeItem(reopenAfterSaveKey);
        }, 10000);
      } catch (error) {
        window.sessionStorage.removeItem(reopenAfterSaveKey);
        if (error && error.name === "AbortError") {
          showToast("파일 저장을 취소했습니다.");
          return;
        }
        console.error("사이트 편집기 파일 저장 오류:", error);
        showToast("파일 저장 실패: " + (error.message || "프로젝트 서버 실행 상태를 확인해 주세요."));
      } finally {
        if (saveButton) saveButton.disabled = false;
      }
    }

    function captureDepthItems(list, childListClass) {
      if (!list) return [];
      return Array.from(list.children).filter(function (item) { return item.tagName === "LI"; }).map(function (item) {
        var link = directChild(item, "a");
        var childList = childListClass ? directChild(item, "." + childListClass) : null;
        return {
          id: unique(childListClass === "gnb-depth3" ? "depth2" : "depth3"),
          label: link ? readableText(link) : "새 메뉴",
          href: link ? link.getAttribute("href") || "#" : "#",
          children: childList ? captureDepthItems(childList, null) : []
        };
      });
    }

    function toHex(color, fallback) {
      if (!color || color === "transparent") return fallback;
      if (color.charAt(0) === "#") return color.slice(0, 7);
      var values = color.match(/\d+/g);
      if (!values || values.length < 3) return fallback;
      return "#" + values.slice(0, 3).map(function (value) {
        return Number(value).toString(16).padStart(2, "0");
      }).join("");
    }

    function alphaPercent(color) {
      if (!color || color === "transparent") return 0;
      var match = color.match(/rgba\([^)]*,\s*([\d.]+)\)/);
      return match ? Math.round(Number(match[1]) * 100) : 100;
    }

    function rgba(hex, opacity) {
      var value = hex.replace("#", "");
      return "rgba(" +
        parseInt(value.slice(0, 2), 16) + ", " +
        parseInt(value.slice(2, 4), 16) + ", " +
        parseInt(value.slice(4, 6), 16) + ", " +
        (Number(opacity) / 100) + ")";
    }

    function contrastColor(hex) {
      var value = String(hex || "#000000").replace("#", "");
      var red = parseInt(value.slice(0, 2), 16) || 0;
      var green = parseInt(value.slice(2, 4), 16) || 0;
      var blue = parseInt(value.slice(4, 6), 16) || 0;
      return (red * 299 + green * 587 + blue * 114) / 1000 > 150 ? "#1b1b1b" : "#ffffff";
    }

    function safeFontFamily(value) {
      return FONT_OPTIONS.indexOf(value) > -1 ? value : "Pretendard";
    }

    function themeRadiusValues(style) {
      if (style === "square") return { small: "0px", medium: "0px", large: "0px", pill: "0px" };
      if (style === "round") return { small: "10px", medium: "16px", large: "26px", pill: "999px" };
      return { small: "6px", medium: "10px", large: "18px", pill: "999px" };
    }

    function themeMotionValues(style) {
      if (style === "none") return { fast: ".01ms", base: ".01ms", fade: ".01ms", height: ".01ms", lift: "0px" };
      if (style === "emphasis") return { fast: ".28s", base: ".52s", fade: ".34s", height: ".58s", lift: "-10px" };
      return { fast: ".2s", base: ".41s", fade: ".27s", height: ".46s", lift: "-6px" };
    }

    function themeButtonValues(style, theme) {
      if (style === "filled") return { background: theme.color1, border: theme.color1, color: contrastColor(theme.color1) };
      if (style === "gradient") return { background: "linear-gradient(135deg, " + theme.color1 + ", " + theme.color3 + ")", border: "transparent", color: contrastColor(theme.color1) };
      return { background: "transparent", border: theme.color1, color: theme.color1 };
    }

    function ensureThemeData(theme) {
      var data = theme || {};
      var preset = THEME_PRESETS[data.designStyle] || { pageBackground: "#FFFFFF", surface: "#FFFFFF", surfaceAlt: "#F5F6F8", textColor: "#222222", mutedColor: "#666666", lineColor: "#E3E5E8", shadow: "0 14px 38px rgba(0,0,0,.10)" };
      data.designStyle = data.designStyle || "custom";
      ["pageBackground", "surface", "surfaceAlt", "textColor", "mutedColor", "lineColor", "shadow"].forEach(function (key) {
        if (!data[key]) data[key] = preset[key];
      });
      return data;
    }

    function applyThemePreset(name) {
      var preset = THEME_PRESETS[name];
      if (!preset || !state || !state.theme) return;
      var previous = ensureThemeData(state.theme);
      var oldBackgrounds = ["#ffffff", String(previous.pageBackground || "").toLowerCase(), String(previous.surface || "").toLowerCase()];
      Object.keys(preset).forEach(function (key) {
        if (key !== "label" && key !== "description") state.theme[key] = preset[key];
      });
      state.theme.fontFamily = { calm: "Pretendard", bright: "Paperlogy", vivid: "GmarketSans", dynamic: "S-CoreDream", dark: "Pretendard", elegant: "MaruBuri", neon: "GmarketSans", pop: "Jalnan", editorial: "S-CoreDream", cinematic: "Pretendard" }[name] || state.theme.fontFamily;
      state.theme.designStyle = name;
      if (state.content && Array.isArray(state.content.sections)) {
        state.content.sections.forEach(function (section) {
          if (!section.background || oldBackgrounds.indexOf(String(section.background).toLowerCase()) > -1) section.background = preset.surface;
        });
      }
      state.header.background = preset.surface;
      state.header.opacity = 100;
      state.header.logo.color = preset.color1;
      state.header.navigation.color = preset.textColor;
      state.header.navigation.depth2Color = preset.textColor;
      state.header.navigation.depth3Color = preset.mutedColor;
      state.header.utility.background = preset.surfaceAlt;
      state.header.utility.color = preset.mutedColor;
      state.header.actions.style.background = preset.surface;
      state.header.actions.style.color = preset.textColor;
      state.header.actions.style.borderColor = preset.lineColor;
      state.header.actions.style.borderVisible = true;
      state.footer.background = preset.color2;
      state.footer.color = contrastColor(preset.color2);
    }

    function unique(prefix) {
      return DQ.uniqueId(prefix || "builder-item");
    }

    var launcher = document.createElement("button");
    launcher.type = "button";
    launcher.className = "builder-launcher";
    launcher.innerHTML = icon("edit") + "<span>사이트 편집</span>";

    var isSubPage = /\/sub\.html$/i.test(window.location.pathname);
    var launcherGroup = document.createElement("div");
    launcherGroup.className = "builder-launcher-group";
    var pageEditorLink = document.createElement("a");
    pageEditorLink.className = "builder-page-switch";
    pageEditorLink.href = isSubPage ? "/page/dq-builder/index.html?openBuilder=1" : "/page/dq-builder/sub.html?openBuilder=1";
    pageEditorLink.target = "_blank";
    pageEditorLink.rel = "noopener noreferrer";
    pageEditorLink.innerHTML = icon("external", "site") + "<span>" + (isSubPage ? "메인페이지 편집" : "서브페이지 편집") + "</span>";
    pageEditorLink.setAttribute("aria-label", (isSubPage ? "메인페이지" : "서브페이지") + " 편집을 새 창에서 열기");
    launcherGroup.appendChild(pageEditorLink);
    launcherGroup.appendChild(launcher);

    var builder = document.createElement("div");
    builder.className = "site-builder";
    builder.setAttribute("aria-hidden", "true");
    builder.innerHTML = [
      '<header class="builder-topbar">',
      '  <div class="builder-topbar__brand">',
      '    <button type="button" class="builder-icon-button" data-builder-close aria-label="편집기 닫기">' + icon("close", "site") + '</button>',
      '    <div><strong>DQ SITE BUILDER</strong><span>제한형 사이트 편집기</span></div>',
      '  </div>',
      '  <div class="builder-device-switch" aria-label="미리보기 기기">',
      '    <button type="button" class="is-active" data-device="desktop" aria-label="데스크톱">' + icon("desktop") + '</button>',
      '    <button type="button" data-device="tablet" aria-label="태블릿">' + icon("tablet") + '</button>',
      '    <button type="button" data-device="mobile" aria-label="모바일">' + icon("mobile") + '</button>',
      '  </div>',
      '  <div class="builder-topbar__actions">',
      '    <button type="button" class="builder-text-button builder-text-button--clear" data-clear-element-styles title="상세 편집에서 직접 추가한 CSS와 스타일 효과를 모두 제거합니다">' + icon("delete") + '<span>수동 스타일 제거</span></button>',
      '    <button type="button" class="builder-icon-button" data-history="undo" aria-label="실행 취소">' + icon("undo") + '</button>',
      '    <button type="button" class="builder-icon-button" data-history="redo" aria-label="다시 실행">' + icon("redo") + '</button>',
      '    <div class="builder-edit-mode-switch" role="group" aria-label="편집 모드">',
      '      <button type="button" class="builder-text-button" data-builder-mode="structure" aria-pressed="false" title="다시 누르면 일반 조작 상태로 해제됩니다">' + icon("section") + '<span>구성 편집</span></button>',
      '      <button type="button" class="builder-text-button" data-builder-mode="detail" data-builder-select aria-pressed="false" title="다시 누르면 일반 조작 상태로 해제됩니다">' + icon("edit") + '<span>상세 편집</span></button>',
      '      <button type="button" class="builder-text-button" data-builder-mode="preview" data-builder-preview aria-pressed="false">' + icon("preview") + '<span>미리보기</span></button>',
      '    </div>',
      '    <button type="button" class="builder-text-button builder-text-button--primary" data-builder-file-save title="페이지 요소와 헤더·푸터 편집값 저장">' + icon("download", "site") + '<span>파일 저장</span></button>',
      '    <button type="button" class="builder-text-button builder-text-button--build" data-builder-project-build title="편집기를 제외한 실작업용 프로젝트 생성">' + icon("section") + '<span>프로젝트 빌드</span></button>',
      '    <button type="button" class="builder-text-button" data-builder-project-download disabled title="page/common과 빌드 프로젝트를 ZIP으로 저장">' + icon("download", "site") + '<span>ZIP 저장</span></button>',
      '  </div>',
      '</header>',
      '<div class="builder-workspace">',
      '  <aside class="builder-sidebar builder-sidebar--layers">',
      '    <div class="builder-sidebar__head"><span>LAYERS</span><strong>사이트 구조</strong></div>',
      '    <nav class="builder-layer-tree" aria-label="사이트 구조">',
      '      <button type="button" class="builder-layer builder-layer--root builder-layer--toggle" data-layer-toggle="theme" aria-expanded="false">' + icon("palette") + '<span>전체 스타일</span>' + icon("chevron-down", "site") + '</button>',
      '      <div class="builder-layer-children builder-layer-children--theme" data-layer-group="theme">',
      '        <button type="button" class="builder-layer" data-layer="theme-palette"><span class="builder-layer__line"></span><span>전체 테마</span></button>',
      '        <button type="button" class="builder-layer" data-layer="theme-font"><span class="builder-layer__line"></span><span>사이트 폰트</span></button>',
      '        <button type="button" class="builder-layer" data-layer="theme-layout"><span class="builder-layer__line"></span><span>레이아웃</span></button>',
      '        <button type="button" class="builder-layer" data-layer="theme-components"><span class="builder-layer__line"></span><span>컴포넌트</span></button>',
      '        <button type="button" class="builder-layer" data-layer="theme-motion"><span class="builder-layer__line"></span><span>모션</span></button>',
      '      </div>',
      '      <button type="button" class="builder-layer builder-layer--root builder-layer--toggle" data-layer-toggle="header" aria-expanded="false">' + icon("header") + '<span>헤더</span>' + icon("chevron-down", "site") + '</button>',
      '      <div class="builder-layer-children" data-layer-group="header">',
      '        <button type="button" class="builder-layer is-selected" data-layer="header-style"><span class="builder-layer__line"></span><span>기본 스타일</span></button>',
      '        <button type="button" class="builder-layer" data-layer="utility"><span class="builder-layer__line"></span><span>유틸리티</span></button>',
      '        <button type="button" class="builder-layer" data-layer="logo"><span class="builder-layer__line"></span><span>로고</span></button>',
      '        <button type="button" class="builder-layer" data-layer="navigation"><span class="builder-layer__line"></span><span>내비게이션</span></button>',
      '        <button type="button" class="builder-layer" data-layer="sitemap"><span class="builder-layer__line"></span><span>사이트맵</span></button>',
      '        <button type="button" class="builder-layer" data-layer="actions"><span class="builder-layer__line"></span><span>우측 버튼</span></button>',
      '      </div>',
      '      <button type="button" class="builder-layer builder-layer--root builder-layer--toggle" data-layer-toggle="content" aria-expanded="false">' + icon("section") + '<span>' + (isSubPage ? '서브페이지' : '콘텐츠') + '</span>' + icon("chevron-down", "site") + '</button>',
      '      <div class="builder-layer-children" data-layer-group="content">',
      (isSubPage
        ? '        <button type="button" class="builder-layer" data-layer="subpage-common"><span class="builder-layer__line"></span><span>서브 공통 요소</span></button><button type="button" class="builder-layer" data-layer="subpage-contents"><span class="builder-layer__line"></span><span>개별 콘텐츠</span></button>'
        : '        <button type="button" class="builder-layer" data-layer="content-sections"><span class="builder-layer__line"></span><span>섹션 구성</span></button>'),
      '      </div>',
      '      <button type="button" class="builder-layer builder-layer--root builder-layer--toggle" data-layer-toggle="footer" aria-expanded="false">' + icon("footer") + '<span>푸터</span>' + icon("chevron-down", "site") + '</button>',
      '      <div class="builder-layer-children builder-layer-children--footer" data-layer-group="footer">',
      '        <button type="button" class="builder-layer" data-layer="footer-style"><span class="builder-layer__line"></span><span>기본 스타일</span></button>',
      '        <button type="button" class="builder-layer" data-layer="footer-logo"><span class="builder-layer__line"></span><span>로고</span></button>',
      '        <button type="button" class="builder-layer" data-layer="footer-related"><span class="builder-layer__line"></span><span>관련 사이트</span></button>',
      '      </div>',
      '    </nav>',
      '    <div class="builder-share">',
      '      <button type="button" class="builder-share__start" data-builder-share>' + icon("preview") + '<span>공유 작업</span></button>',
      '      <div class="builder-share__panel" data-builder-share-panel hidden>',
      '        <strong data-builder-share-status>외부 공유가 꺼져 있습니다.</strong>',
      '        <input type="text" data-builder-share-url readonly aria-label="외부 공유 주소">',
      '        <div><button type="button" data-builder-share-copy>주소 복사</button><button type="button" data-builder-share-stop>공유 종료</button></div>',
      '      </div>',
      '    </div>',
      '    <p class="builder-sidebar__note">상위 메뉴를 눌러 편집 항목을 열고 닫을 수 있습니다.</p>',
      '  </aside>',
      '  <main class="builder-canvas-area">',
      '    <div class="builder-canvas-toolbar"><span class="js-canvas-label">Desktop · 100%</span><span class="builder-canvas-status"><i></i> 실시간 미리보기</span></div>',
      '    <div class="builder-canvas-stage" data-device-stage="desktop">',
      '      <iframe class="builder-canvas" title="사이트 편집 미리보기"></iframe>',
      '      <div class="builder-canvas-loading"><span></span><p>사이트를 불러오는 중입니다.</p></div>',
      '    </div>',
      '  </main>',
      '  <aside class="builder-sidebar builder-sidebar--inspector">',
      '    <div class="builder-sidebar__head"><span>INSPECTOR</span><strong class="js-inspector-title">헤더 설정</strong></div>',
      '    <div class="builder-inspector js-builder-inspector" data-lenis-prevent data-lenis-prevent-wheel data-lenis-prevent-touch></div>',
      '  </aside>',
      '</div>',
      '<div class="builder-toast" role="status" aria-live="polite"></div>',
      '<div class="builder-project-modal" data-builder-project-modal hidden>',
      '  <form class="builder-project-modal__dialog" data-builder-project-form role="dialog" aria-modal="true" aria-labelledby="builder-project-title" aria-describedby="builder-project-description">',
      '    <strong id="builder-project-title">실작업 프로젝트 빌드</strong>',
      '    <p id="builder-project-description">편집기와 저장 서버를 제외하고 실제 페이지에 필요한 코드만 새 프로젝트 폴더에 생성합니다.</p>',
      '    <label>기존 프로젝트 업데이트<select name="existingProject" data-builder-existing-project><option value="">새 프로젝트 만들기</option></select><small>기존 프로젝트를 선택하면 해당 폴더를 최신 빌드 결과로 교체합니다.</small></label>',
      '    <div class="builder-project-modal__or"><span>또는</span></div>',
      '    <label>프로젝트 폴더명<input type="text" name="projectName" required minlength="2" maxlength="49" pattern="[a-z0-9][a-z0-9_-]+" placeholder="example-project" autocomplete="off"><small>영문 소문자·숫자·하이픈·밑줄만 사용할 수 있습니다.</small></label>',
      '    <div class="builder-project-modal__notice" data-builder-project-notice>현재 편집 내용을 먼저 <b>파일 저장</b>한 뒤 빌드해 주세요.</div>',
      '    <div class="builder-project-modal__status" data-builder-project-status aria-live="polite"></div>',
      '    <div class="builder-project-modal__actions"><button type="button" data-builder-project-cancel>닫기</button><button type="submit">빌드하기</button></div>',
      '  </form>',
      '</div>',
      '<div class="builder-project-modal" data-builder-zip-modal hidden>',
      '  <form class="builder-project-modal__dialog builder-project-modal__dialog--compact" data-builder-zip-form role="dialog" aria-modal="true" aria-labelledby="builder-zip-title" aria-describedby="builder-zip-description">',
      '    <strong id="builder-zip-title">ZIP 프로젝트 선택</strong>',
      '    <p id="builder-zip-description">다운로드할 프로젝트를 선택해 주세요. page/common과 선택한 프로젝트 폴더만 압축합니다.</p>',
      '    <label>프로젝트<select name="zipProject" data-builder-zip-project required></select></label>',
      '    <div class="builder-project-modal__actions"><button type="button" data-builder-zip-cancel>닫기</button><button type="submit">ZIP 다운로드</button></div>',
      '  </form>',
      '</div>'
    ].join("");

    document.body.appendChild(launcherGroup);
    document.body.appendChild(builder);

    var desktopNotice = document.createElement("div");
    desktopNotice.className = "builder-desktop-notice";
    desktopNotice.hidden = true;
    desktopNotice.innerHTML = [
      '<div class="builder-desktop-notice__dialog" role="dialog" aria-modal="true" aria-labelledby="builder-desktop-notice-title">',
      '  <strong id="builder-desktop-notice-title">PC에서 사용 가능합니다.</strong>',
      '  <p>사이트 편집기는 화면 너비 1000px보다 큰 PC 환경에서 이용해 주세요.</p>',
      '  <button type="button" data-builder-desktop-notice-close>확인</button>',
      '</div>'
    ].join("");
    document.body.appendChild(desktopNotice);

    var iframe = builder.querySelector(".builder-canvas");
    var inspector = builder.querySelector(".js-builder-inspector");
    var inspectorTitle = builder.querySelector(".js-inspector-title");
    var loading = builder.querySelector(".builder-canvas-loading");
    var toast = builder.querySelector(".builder-toast");
    var shareButton = builder.querySelector("[data-builder-share]");
    var sharePanel = builder.querySelector("[data-builder-share-panel]");
    var shareStatus = builder.querySelector("[data-builder-share-status]");
    var shareUrlInput = builder.querySelector("[data-builder-share-url]");
    var projectModal = builder.querySelector("[data-builder-project-modal]");
    var projectForm = builder.querySelector("[data-builder-project-form]");
    var projectStatus = builder.querySelector("[data-builder-project-status]");
    var projectDownloadButton = builder.querySelector("[data-builder-project-download]");
    var projectNotice = builder.querySelector("[data-builder-project-notice]");
    var existingProjectSelect = builder.querySelector("[data-builder-existing-project]");
    var zipModal = builder.querySelector("[data-builder-zip-modal]");
    var zipForm = builder.querySelector("[data-builder-zip-form]");
    var zipProjectSelect = builder.querySelector("[data-builder-zip-project]");
    var lastBuiltProjectStorageKey = "dq-builder-last-built-project-v1";
    var lastBuiltProject = "";
    var availableProjects = [];

    function setLastBuiltProject(projectName) {
      var normalized = String(projectName || "").trim().toLowerCase();
      if (!/^[a-z0-9][a-z0-9_-]{1,48}$/.test(normalized)) return;
      lastBuiltProject = normalized;
      projectDownloadButton.disabled = false;
      projectDownloadButton.title = "page/common과 page/" + normalized + " 폴더를 ZIP으로 저장";
      try {
        window.localStorage.setItem(lastBuiltProjectStorageKey, normalized);
      } catch (error) {}
    }

    function projectOptionMarkup(projects, selectedName, emptyLabel) {
      var options = emptyLabel == null ? "" : '<option value="">' + escapeHtml(emptyLabel) + '</option>';
      return options + projects.map(function (project) {
        return '<option value="' + escapeHtml(project.name) + '"' + (project.name === selectedName ? ' selected' : '') + '>' + escapeHtml(project.name) + ' · ' + project.fileCount + '개 파일</option>';
      }).join("");
    }

    function applyProjectList(projects) {
      availableProjects = Array.isArray(projects) ? projects : [];
      var existingSelection = existingProjectSelect.value;
      existingProjectSelect.innerHTML = projectOptionMarkup(availableProjects, existingSelection, "새 프로젝트 만들기");
      if (!availableProjects.some(function (project) { return project.name === lastBuiltProject; })) {
        if (availableProjects.length) setLastBuiltProject(availableProjects[0].name);
        else lastBuiltProject = "";
      }
      projectDownloadButton.disabled = !availableProjects.length;
      if (!availableProjects.length) projectDownloadButton.title = "먼저 프로젝트를 빌드해 주세요.";
    }

    try {
      setLastBuiltProject(window.localStorage.getItem(lastBuiltProjectStorageKey));
    } catch (error) {}

    async function shareRequest(endpoint, method) {
      var options = { method: method || "GET", cache: "no-store" };
      if (options.method !== "GET") {
        options.headers = { "Content-Type": "application/json", "X-DQ-Builder": "1" };
        options.body = "{}";
      }
      var response;
      try {
        response = await window.fetch(new URL("builder/" + endpoint, window.location.href).href, options);
      } catch (error) {
        response = null;
      }
      if (!response || response.status === 404 || response.status === 405 || response.status === 501) {
        response = await window.fetch(builderServerUrl(endpoint), options);
      }
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success) throw new Error(result.message || "HTTP " + response.status);
      return result;
    }

    function projectEndpoint(endpoint) {
      if (window.location.port === "5502" || ((window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") && window.location.port !== "5510")) {
        return builderServerUrl(endpoint);
      }
      return new URL("builder/" + endpoint, window.location.href).href;
    }

    async function projectListRequest() {
      var response;
      try {
        response = await window.fetch(new URL("builder/project-list.do", window.location.href).href, { cache: "no-store" });
      } catch (error) {
        response = null;
      }
      if (!response || response.status === 404 || response.status === 405 || response.status === 501) {
        response = await window.fetch(builderServerUrl("project-list.do"), { cache: "no-store" });
      }
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success) throw new Error(result.message || "HTTP " + response.status);
      applyProjectList(result.projects);
      return availableProjects;
    }

    async function buildProjectRequest(projectName, overwrite) {
      var options = {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-DQ-Builder": "1" },
        body: JSON.stringify({ projectName: projectName, overwrite: overwrite === true })
      };
      var response;
      try {
        response = await window.fetch(new URL("builder/project-build.do", window.location.href).href, options);
      } catch (error) {
        response = null;
      }
      if (!response || response.status === 404 || response.status === 405 || response.status === 501) {
        response = await window.fetch(builderServerUrl("project-build.do"), options);
      }
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success) throw new Error(result.message || "HTTP " + response.status);
      return result;
    }

    async function openProjectBuild() {
      projectModal.hidden = false;
      projectStatus.textContent = "프로젝트 목록을 확인하고 있습니다...";
      var input = projectForm.elements.projectName;
      input.value = "";
      input.readOnly = false;
      existingProjectSelect.value = "";
      try {
        await projectListRequest();
        projectStatus.textContent = "";
      } catch (error) {
        projectStatus.textContent = "프로젝트 목록 확인 실패: " + error.message;
      }
      updateProjectBuildMode();
      window.setTimeout(function () { existingProjectSelect.focus(); }, 0);
    }

    function closeProjectBuild() {
      projectModal.hidden = true;
      var trigger = builder.querySelector("[data-builder-project-build]");
      if (builder.classList.contains("is-open") && trigger) trigger.focus();
    }

    function updateProjectBuildMode() {
      var selectedName = existingProjectSelect.value;
      var input = projectForm.elements.projectName;
      var submitButton = projectForm.querySelector('[type="submit"]');
      var typedName = String(input.value || "").trim().toLowerCase();
      var typedExisting = !selectedName && availableProjects.some(function (project) { return project.name === typedName; });
      if (selectedName) {
        input.value = selectedName;
        input.readOnly = true;
        submitButton.textContent = "업데이트 빌드";
        projectNotice.innerHTML = '<b>주의:</b> page/' + escapeHtml(selectedName) + ' 폴더를 새 빌드 결과로 교체합니다. 폴더에서 수동 수정한 파일도 교체됩니다.';
      } else if (typedExisting) {
        input.readOnly = false;
        submitButton.textContent = "업데이트 빌드";
        projectNotice.innerHTML = '<b>주의:</b> 같은 이름의 page/' + escapeHtml(typedName) + ' 폴더가 있어 새 빌드 결과로 교체합니다. 폴더에서 수동 수정한 파일도 교체됩니다.';
      } else {
        input.readOnly = false;
        submitButton.textContent = "빌드하기";
        projectNotice.innerHTML = '현재 편집 내용을 먼저 <b>파일 저장</b>한 뒤 빌드해 주세요.';
      }
    }

    function downloadProject(projectName) {
      if (!projectName) {
        showToast("먼저 프로젝트를 빌드해 주세요.");
        return;
      }
      setLastBuiltProject(projectName);
      var anchor = document.createElement("a");
      anchor.href = projectEndpoint("project-download.do?project=" + encodeURIComponent(projectName));
      anchor.download = projectName + "-page.zip";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      showToast("page/common과 page/" + projectName + " ZIP 생성을 시작했습니다.");
    }

    async function openProjectDownload() {
      try {
        var projects = await projectListRequest();
        if (!projects.length) {
          showToast("먼저 프로젝트를 빌드해 주세요.");
          return;
        }
        if (projects.length === 1) {
          downloadProject(projects[0].name);
          return;
        }
        zipProjectSelect.innerHTML = projectOptionMarkup(projects, lastBuiltProject || projects[0].name);
        zipModal.hidden = false;
        window.setTimeout(function () { zipProjectSelect.focus(); }, 0);
      } catch (error) {
        showToast("프로젝트 목록 확인 실패: " + error.message);
      }
    }

    function closeProjectDownload() {
      zipModal.hidden = true;
      if (builder.classList.contains("is-open")) projectDownloadButton.focus();
    }

    projectListRequest().catch(function () {});

    async function uploadContentImage(file) {
      if (!file || !/^image\/(?:jpeg|png|gif|webp)$/i.test(file.type)) throw new Error("JPG, PNG, GIF, WEBP 이미지만 업로드할 수 있습니다.");
      if (file.size > 10 * 1024 * 1024) throw new Error("이미지는 10MB 이하만 업로드할 수 있습니다.");
      var options = {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "X-DQ-Builder": "1",
          "X-File-Name": encodeURIComponent(file.name)
        },
        body: file
      };
      var response;
      try {
        response = await window.fetch(new URL("builder/image-upload.do", window.location.href).href, options);
      } catch (error) {
        response = null;
      }
      if (!response || response.status === 404 || response.status === 405 || response.status === 501) {
        response = await window.fetch(builderServerUrl("image-upload.do"), options);
      }
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success || !result.url) throw new Error(result.message || "HTTP " + response.status);
      return result.url;
    }

    async function createSubContentFile(block) {
      var css = String(block.css || "").replace(/<\/style/gi, "<\\/style");
      var js = String(block.js || "").replace(/<\/template/gi, "<\\/template");
      var payload = {
        fileName: block.fileName,
        title: block.title || block.label,
        content: (css ? '<style data-sub-content-css>' + css + '</style>' : '') + block.html + (js ? '<template data-sub-content-js>' + js + '</template>' : '')
      };
      var options = { method: "POST", headers: { "Content-Type": "application/json", "X-DQ-Builder": "1" }, body: JSON.stringify(payload) };
      var response;
      try {
        response = await window.fetch(new URL("builder/content-file.do", window.location.href).href, options);
      } catch (error) {
        response = null;
      }
      if (!response || response.status === 404 || response.status === 405 || response.status === 501) {
        response = await window.fetch(builderServerUrl("content-file.do"), options);
      }
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success) throw new Error(result.message || "HTTP " + response.status);
      return result;
    }

    function renderShareState(result, revealPanel) {
      var sharing = !!(result && result.sharing && result.url);
      sharePanel.hidden = revealPanel === false;
      shareButton.classList.toggle("is-active", sharing);
      shareStatus.textContent = sharing ? (result.healthy === false ? "외부 공유 재연결 중" : "외부 공유 중") : "외부 공유가 꺼져 있습니다.";
      shareUrlInput.value = sharing ? result.url : "";
      shareUrlInput.hidden = !sharing;
      builder.querySelector("[data-builder-share-copy]").hidden = !sharing;
      builder.querySelector("[data-builder-share-stop]").hidden = !sharing;
    }

    async function startExternalShare() {
      shareButton.disabled = true;
      sharePanel.hidden = false;
      shareStatus.textContent = "외부 공유 주소를 만드는 중입니다...";
      try {
        var result = await shareRequest("share-start.do", "POST");
        renderShareState(result, true);
        showToast("외부 공유 주소를 만들었습니다.");
      } catch (error) {
        shareStatus.textContent = "공유 시작 실패: " + error.message;
        showToast("공유 시작 실패: " + error.message);
      } finally {
        shareButton.disabled = false;
      }
    }

    async function stopExternalShare() {
      try {
        var result = await shareRequest("share-stop.do", "POST");
        renderShareState(result, true);
        showToast("외부 공유를 종료했습니다.");
      } catch (error) {
        showToast("공유 종료 실패: " + error.message);
      }
    }

    async function copyExternalShareUrl() {
      if (!shareUrlInput.value) return;
      try {
        await window.navigator.clipboard.writeText(shareUrlInput.value);
      } catch (error) {
        shareUrlInput.hidden = false;
        shareUrlInput.select();
        document.execCommand("copy");
      }
      showToast("외부 공유 주소를 복사했습니다.");
    }

    function isolateInspectorScroll(event) {
      event.stopPropagation();
    }

    inspector.addEventListener("wheel", isolateInspectorScroll, { passive: true });
    inspector.addEventListener("touchmove", isolateInspectorScroll, { passive: true });

    function canvasUrl() {
      var url = new URL(window.location.href);
      url.searchParams.set("builderCanvas", "1");
      return url.href;
    }

    function pageName(targetWindow) {
      return ((targetWindow || window).location.pathname.split("/").pop() || "index.html").toLowerCase();
    }

    function readElementOverrides() {
      var source = canvasDocument.querySelector("#dq-builder-overrides");
      if (!source) return [];
      try {
        var value = JSON.parse(source.textContent.replace(/<!--\s*BUILDER:OVERRIDES:(?:START|END)\s*-->/g, "").trim() || "[]");
        if (!Array.isArray(value)) return [];
        return value.map(function (override) {
          var baseStyle = override.styles && override.styles.base || { values: {}, customCss: "", effects: {} };
          baseStyle.effects = baseStyle.effects || {};
          override.styles = { base: baseStyle };
          if (typeof override.applyToGroup !== "boolean") override.applyToGroup = true;
          return override;
        });
      } catch (error) {
        console.warn("요소 편집 데이터를 읽지 못했습니다.", error);
        return [];
      }
    }

    function selectorToken(value) {
      if (canvasWindow.CSS && typeof canvasWindow.CSS.escape === "function") return canvasWindow.CSS.escape(value);
      return String(value).replace(/[^a-zA-Z0-9_-]/g, function (character) {
        return "\\" + character.charCodeAt(0).toString(16) + " ";
      });
    }

    function hasStableElementId(element) {
      return !!(element.id && !/^(?:swiper|slick|dq-|ui-id-)/i.test(element.id));
    }

    function elementSegment(element) {
      if (hasStableElementId(element)) return "#" + selectorToken(element.id);
      var tag = element.tagName.toLowerCase();
      var classes = Array.from(element.classList).filter(function (name) {
        return !/^(?:is-|js-|swiper|slick|dq-builder-)/.test(name);
      }).slice(0, 2);
      var segment = tag + classes.map(function (name) { return "." + selectorToken(name); }).join("");
      var parent = element.parentElement;
      if (parent) {
        var sameTag = Array.from(parent.children).filter(function (child) { return child.tagName === element.tagName; });
        if (sameTag.length > 1) segment += ":nth-of-type(" + (sameTag.indexOf(element) + 1) + ")";
      }
      return segment;
    }

    function buildElementSelector(element) {
      var parts = [];
      var current = element;
      while (current && current !== canvasDocument.body && current !== canvasDocument.documentElement) {
        var segment = elementSegment(current);
        parts.unshift(segment);
        if (hasStableElementId(current)) break;
        current = current.parentElement;
      }
      return parts.join(" > ");
    }

    function elementScope(element) {
      return element.closest("#header, #footer") ? "shared" : "page";
    }

    function buildCommonElementSelector(element) {
      var tag = element.tagName.toLowerCase();
      var classes = Array.from(element.classList).filter(function (name) {
        return !/^(?:is-|js-|swiper|slick|dq-builder-)/.test(name);
      }).slice(0, 2);
      var selector = tag + classes.map(function (name) { return "." + selectorToken(name); }).join("");
      if (!classes.length && element.parentElement) {
        var parentClasses = Array.from(element.parentElement.classList).filter(function (name) {
          return !/^(?:is-|js-|swiper|slick|dq-builder-)/.test(name);
        }).slice(0, 2);
        if (parentClasses.length) {
          selector = element.parentElement.tagName.toLowerCase()
            + parentClasses.map(function (name) { return "." + selectorToken(name); }).join("")
            + " > " + tag;
        }
      }
      if (element.closest("#header")) return "#header " + selector;
      if (element.closest("#footer")) return "#footer " + selector;
      return selector;
    }

    function getSelectedOverride() {
      if (!state || !selectedElementKey) return null;
      return (state.elementOverrides || []).find(function (item) { return item.key === selectedElementKey; }) || null;
    }

    function isTextEditable(element) {
      return element && !element.children.length && !/^(?:IMG|INPUT|TEXTAREA|SELECT|OPTION|VIDEO|AUDIO|CANVAS|SVG|USE)$/.test(element.tagName);
    }

    function sanitizeCustomDeclarations(value) {
      return String(value || "")
        .replace(/<\/?style[^>]*>/gi, "")
        .replace(/@(?:import|charset|namespace)[^;]*;?/gi, "")
        .replace(/[{}]/g, "")
        .trim();
    }

    function responsivePixelValue(value, minimumRatio) {
      if (!/px/i.test(value || "")) return value;
      return String(value).replace(/(-?\d*\.?\d+)px/gi, function (match, numberText) {
        var number = Number(numberText);
        if (!Number.isFinite(number) || number <= 0) return match;
        var minimum = Math.round(number * minimumRatio * 100) / 100;
        var fluid = Math.round(number / 12 * 1000) / 1000;
        return "clamp(" + minimum + "px, " + fluid + "vw, " + number + "px)";
      });
    }

    function responsiveStyleValue(name, value) {
      if (["fontSize", "padding", "margin"].indexOf(name) < 0) return value;
      return responsivePixelValue(value, name === "fontSize" ? 0.78 : 0.65);
    }

    function responsiveCustomDeclarations(value) {
      return String(value || "").replace(/(^|[;\n])(\s*)(font-size|padding(?:-(?:top|right|bottom|left))?|margin(?:-(?:top|right|bottom|left))?|gap|row-gap|column-gap)(\s*:\s*)([^;\n]+)/gi,
        function (match, boundary, spacing, property, colon, propertyValue) {
          var ratio = property.toLowerCase() === "font-size" ? 0.78 : 0.65;
          return boundary + spacing + property + colon + responsivePixelValue(propertyValue, ratio);
        });
    }

    function styleDeclarations(values, customCss, effects) {
      var propertyNames = {
        color: "color",
        backgroundColor: "background-color",
        fontSize: "font-size",
        fontWeight: "font-weight",
        lineHeight: "line-height",
        textAlign: "text-align",
        padding: "padding",
        margin: "margin",
        borderRadius: "border-radius"
      };
      var declarations = Object.keys(propertyNames).map(function (name) {
        var value = values && values[name];
        return value ? "  " + propertyNames[name] + ": " + responsiveStyleValue(name, value) + ";" : "";
      }).filter(Boolean);
      var filterValues = [];
      effects = effects || {};
      if (effects.invert) filterValues.push("invert(1)");
      if (effects.grayscale) filterValues.push("grayscale(1)");
      if (effects.brighten) filterValues.push("brightness(1.15)");
      if (effects.dropShadow) filterValues.push("drop-shadow(0 4px 8px rgba(0, 0, 0, .28))");
      if (filterValues.length) declarations.push("  filter: " + filterValues.join(" ") + ";");
      var custom = sanitizeCustomDeclarations(customCss);
      if (custom) declarations.push("  " + responsiveCustomDeclarations(custom).replace(/;?\s*$/, ";").replace(/\n/g, "\n  "));
      return declarations;
    }

    function buildElementCssFile() {
      var rules = [];
      (state.elementOverrides || []).forEach(function (override) {
        var selectedCssSelector = (override.applyToGroup ? override.groupSelector : override.selector) || override.selector;
        selectedCssSelector = String(selectedCssSelector || "").replace(/[{}]/g, "").trim();
        if (!selectedCssSelector) return;
        var cssSelector = override.scope === "shared"
          ? selectedCssSelector
          : 'html[data-builder-page="' + override.page + '"] ' + selectedCssSelector;
        var styleData = override.styles && override.styles.base || {};
        var declarations = styleDeclarations(styleData.values, styleData.customCss, styleData.effects);
        if (declarations.length) rules.push(cssSelector + " {\n" + declarations.join("\n") + "\n}");
      });
      var lines = ["/* 사이트 편집기에서 선택한 요소의 사용자 스타일입니다. */"];
      if (rules.length) lines.push("", rules.join("\n\n"));
      return lines.join("\n") + "\n";
    }

    function applyElementOverrides() {
      if (!canvasDocument || !state) return;
      // The canvas is driven by the editable override state. Disable the
      // already-saved stylesheet here so removals are visible before saving.
      canvasDocument.querySelectorAll('link[href*="/custom-builder.css"]').forEach(function (link) {
        link.disabled = true;
      });
      var styleElement = canvasDocument.querySelector("#dq-builder-live-styles");
      if (!styleElement) {
        styleElement = canvasDocument.createElement("style");
        styleElement.id = "dq-builder-live-styles";
        canvasDocument.head.appendChild(styleElement);
      }
      styleElement.textContent = buildElementCssFile();
      var currentPage = pageName(canvasWindow);
      (state.elementOverrides || []).forEach(function (override) {
        if (override.scope !== "shared" && override.page !== currentPage) return;
        var element;
        try { element = canvasDocument.querySelector(override.selector); } catch (error) { return; }
        if (!element) return;
        if (typeof override.text === "string") element.textContent = override.text;
        Object.keys(override.attributes || {}).forEach(function (name) {
          if (["href", "src", "alt", "title"].indexOf(name) > -1) element.setAttribute(name, override.attributes[name]);
        });
      });
      var selected = getSelectedOverride();
      clearCanvasSelectionHighlight();
      if (selected && selectedLayer === "element" && !builder.classList.contains("is-preview")) {
        var highlightSelector = (selected.applyToGroup ? selected.groupSelector : selected.selector) || selected.selector;
        try {
          canvasDocument.querySelectorAll(highlightSelector).forEach(function (element) { element.classList.add("dq-builder-selected"); });
        } catch (error) {}
      } else if (editMode === "structure" && selectedStructureElement && selectedStructureElement.isConnected) {
        selectedStructureElement.classList.add("dq-builder-structure-selected");
      }
    }

    function clearCanvasSelectionHighlight() {
      if (!canvasDocument) return;
      canvasDocument.querySelectorAll(".dq-builder-selected, .dq-builder-hover, .dq-builder-structure-selected, .dq-builder-structure-hover").forEach(function (element) {
        element.classList.remove("dq-builder-selected", "dq-builder-hover", "dq-builder-structure-selected", "dq-builder-structure-hover");
      });
      hoveredCanvasElement = null;
    }

    function resetCanvasHeaderPosition() {
      if (!canvasDocument) return;
      var canvasHeader = canvasDocument.querySelector("#header");
      if (canvasHeader) canvasHeader.classList.remove("is-scroll-hidden");
    }

    function resetPageHeaderPosition() {
      var pageHeader = document.querySelector("#header");
      if (pageHeader) pageHeader.classList.remove("is-scroll-hidden");
    }

    function setSelectionMode(active) {
      selectionMode = !!active;
      var button = builder.querySelector("[data-builder-select]");
      button.setAttribute("aria-pressed", String(selectionMode));
      builder.classList.toggle("is-selecting", selectionMode);
      if (!selectionMode && hoveredCanvasElement) {
        hoveredCanvasElement.classList.remove("dq-builder-hover", "dq-builder-structure-hover");
        hoveredCanvasElement = null;
      }
      if (!selectionMode) clearCanvasSelectionHighlight();
    }

    function setBuilderMode(mode) {
      editMode = /^(?:idle|structure|detail|preview)$/.test(mode) ? mode : "idle";
      builder.classList.toggle("is-preview", editMode === "preview");
      setSelectionMode(editMode === "detail");
      builder.querySelectorAll("[data-builder-mode]").forEach(function (button) {
        var active = button.dataset.builderMode === editMode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      if (editMode === "preview") {
        clearCanvasSelectionHighlight();
      } else {
        applyElementOverrides();
        if (editMode === "structure" && selectedStructureElement && selectedStructureElement.isConnected) {
          selectedStructureElement.classList.add("dq-builder-structure-selected");
        }
      }
    }

    function structureContext(element) {
      if (!element || !element.closest) return null;
      var header = element.closest("#header");
      if (header) {
        if (element.closest(".site-header__utility")) return { layer: "utility", element: element.closest(".site-header__utility") };
        if (element.closest(".site-logo")) return { layer: "logo", element: element.closest(".site-logo") };
        if (element.closest(".site-map-toggle")) return { layer: "sitemap", element: element.closest(".site-map-toggle") };
        if (element.closest(".site-header__actions, .header-search-panel")) return { layer: "actions", element: element.closest(".site-header__actions, .header-search-panel") };
        if (element.closest(".gnb")) return { layer: "navigation", element: element.closest(".gnb") };
        return { layer: "header-style", element: header };
      }

      var footer = element.closest("#footer");
      if (footer) {
        if (element.closest(".footer-brand")) return { layer: "footer-logo", element: element.closest(".footer-brand") };
        if (element.closest(".family-site")) return { layer: "footer-related", element: element.closest(".family-site") };
        return { layer: "footer-style", element: footer };
      }

      if (isSubPage) {
        var subBlock = element.closest("[data-sub-content-block]");
        if (subBlock) return { layer: "subpage-content-item", subContentId: subBlock.dataset.subContentBlock, element: subBlock };
        if (element.closest("#contentsArea")) return { layer: "subpage-contents", element: element.closest("#contentsArea") };
        var subCommon = element.closest(".sub-visual, .breadcrumb, .page-heading");
        if (subCommon) return { layer: "subpage-common", element: subCommon };
      } else {
        var contentCell = element.closest("[data-cell-id]");
        var section = element.closest("[data-section-id]");
        if (section && contentCell) return { layer: "content-section", sectionId: section.dataset.sectionId, cellId: contentCell.dataset.cellId, element: contentCell };
        if (section) return { layer: "content-section", sectionId: section.dataset.sectionId, element: section };
      }
      return null;
    }

    function revealStructureInspector(context) {
      window.requestAnimationFrame(function () {
        if (context && context.cellId) {
          var cellCard = inspector.querySelector('[data-content-cell-id="' + context.cellId + '"]');
          if (cellCard) {
            var inspectorRect = inspector.getBoundingClientRect();
            var cellRect = cellCard.getBoundingClientRect();
            inspector.scrollTop = Math.max(0, inspector.scrollTop + cellRect.top - inspectorRect.top - 12);
            return;
          }
        }
        inspector.scrollTop = 0;
      });
    }

    function revealSelectedLayer() {
      var groupName = selectedLayerGroup();
      builder.querySelectorAll("[data-layer-toggle]").forEach(function (button) {
        var active = button.dataset.layerToggle === groupName;
        button.setAttribute("aria-expanded", String(active));
      });
      builder.querySelectorAll("[data-layer-group]").forEach(function (panel) {
        panel.classList.toggle("is-open", panel.dataset.layerGroup === groupName);
      });
      window.requestAnimationFrame(function () {
        var selectedButton = builder.querySelector("[data-layer].is-selected");
        if (selectedButton) selectedButton.scrollIntoView({ block: "nearest" });
      });
    }

    function selectCanvasStructure(element) {
      var context = structureContext(element);
      if (!context) return;
      selectedLayer = context.layer;
      if (context.sectionId) selectedContentSectionId = context.sectionId;
      selectedContentCellId = context.cellId || null;
      if (context.subContentId) selectedSubContentId = context.subContentId;
      selectedStructureElement = context.element;
      clearCanvasSelectionHighlight();
      renderInspector();
      revealStructureInspector(context);
      revealSelectedLayer();
      if (isSubPage) setSubContentPreview(context.subContentId || "");
      if (selectedStructureElement) selectedStructureElement.classList.add("dq-builder-structure-selected");
    }

    function selectCanvasElement(element) {
      if (!element || element.closest("#dq-builder-overrides") || /^(?:HTML|BODY|SCRIPT|STYLE|LINK|META)$/.test(element.tagName)) return;
      var selector = buildElementSelector(element);
      var scope = elementScope(element);
      var currentPage = pageName(canvasWindow);
      var key = scope + ":" + (scope === "shared" ? "all" : currentPage) + ":" + selector;
      var overrides = state.elementOverrides || (state.elementOverrides = []);
      var override = overrides.find(function (item) { return item.key === key; });
      if (!override) {
        override = {
          key: key,
          selector: selector,
          groupSelector: buildCommonElementSelector(element),
          applyToGroup: true,
          scope: scope,
          page: currentPage,
          tag: element.tagName.toLowerCase(),
          label: (element.className && typeof element.className === "string" ? element.className.split(/\s+/)[0] : "") || element.tagName.toLowerCase(),
          text: undefined,
          originalText: isTextEditable(element) ? element.textContent : undefined,
          attributes: {},
          originalAttributes: {},
          styles: { base: { values: {}, customCss: "", effects: {} } }
        };
        overrides.push(override);
      }
      override.attributes = override.attributes || {};
      override.groupSelector = override.groupSelector || buildCommonElementSelector(element);
      if (typeof override.applyToGroup !== "boolean") override.applyToGroup = true;
      override.originalAttributes = override.originalAttributes || {};
      override.styles = override.styles || { base: { values: {}, customCss: "", effects: {} } };
      if (!override.styles.base) override.styles.base = { values: {}, customCss: "", effects: {} };
      override.styles.base.effects = override.styles.base.effects || {};
      override.canEditText = isTextEditable(element);
      override.currentText = override.canEditText ? element.textContent : "";
      ["href", "src", "alt", "title"].forEach(function (name) {
        if (element.hasAttribute(name) && override.attributes[name] == null) {
          override.attributes[name] = element.getAttribute(name);
          override.originalAttributes[name] = element.getAttribute(name);
        }
      });
      selectedElementKey = key;
      selectedLayer = "element";
      applyElementOverrides();
      renderInspector();
      pushHistory();
    }

    function bindCanvasSelection() {
      var selectionStyle = canvasDocument.querySelector("#dq-builder-selection-style");
      if (!selectionStyle) {
        selectionStyle = canvasDocument.createElement("style");
        selectionStyle.id = "dq-builder-selection-style";
        selectionStyle.textContent = ".dq-builder-hover{outline:2px solid #ff4d8d!important;outline-offset:-2px!important;cursor:crosshair!important}.dq-builder-selected{outline:2px solid #ff4d8d!important;outline-offset:-2px!important}.dq-builder-structure-hover{outline:2px solid #695cff!important;outline-offset:-2px!important;cursor:pointer!important}.dq-builder-structure-selected{outline:3px solid #695cff!important;outline-offset:-3px!important}";
        canvasDocument.head.appendChild(selectionStyle);
      }
      canvasDocument.addEventListener("mouseover", function (event) {
        if (editMode === "preview" || editMode === "idle") return;
        if (hoveredCanvasElement) hoveredCanvasElement.classList.remove("dq-builder-hover", "dq-builder-structure-hover");
        var target = event.target.nodeType === 1 ? event.target : event.target.parentElement;
        if (editMode === "detail") {
          hoveredCanvasElement = target;
          if (hoveredCanvasElement) hoveredCanvasElement.classList.add("dq-builder-hover");
        } else {
          var context = structureContext(target);
          hoveredCanvasElement = context && context.element;
          if (hoveredCanvasElement) hoveredCanvasElement.classList.add("dq-builder-structure-hover");
        }
      }, true);
      canvasDocument.addEventListener("mouseout", function (event) {
        if (editMode === "preview" || editMode === "idle" || !hoveredCanvasElement) return;
        hoveredCanvasElement.classList.remove("dq-builder-hover", "dq-builder-structure-hover");
        hoveredCanvasElement = null;
      }, true);
      canvasDocument.addEventListener("click", function (event) {
        if (editMode === "preview" || editMode === "idle") return;
        var target = event.target.nodeType === 1 ? event.target : event.target.parentElement;
        if (editMode === "structure" && !structureContext(target)) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (target) target.classList.remove("dq-builder-hover", "dq-builder-structure-hover");
        hoveredCanvasElement = null;
        if (editMode === "detail") selectCanvasElement(target);
        else selectCanvasStructure(target);
      }, true);
    }

    function openBuilder() {
      builder.classList.add("is-open");
      builder.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("is-builder-open");
      setBuilderMode(editMode);
      resetPageHeaderPosition();
      if (DQ.smoothScroll && typeof DQ.smoothScroll.stop === "function") DQ.smoothScroll.stop();
      if (!iframe.getAttribute("src")) iframe.setAttribute("src", canvasUrl());
      else if (!canvasSetupDone) waitForCanvas(0);
      else resetCanvasHeaderPosition();
      shareRequest("share-status.do", "GET").then(function (result) {
        renderShareState(result, false);
      }).catch(function () {});
    }

    function closeBuilder() {
      closeProjectBuild();
      setBuilderMode("idle");
      clearCanvasSelectionHighlight();
      builder.classList.remove("is-open", "is-preview");
      builder.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("is-builder-open");
      resetPageHeaderPosition();
      if (DQ.smoothScroll && typeof DQ.smoothScroll.start === "function") DQ.smoothScroll.start();
      launcher.focus();
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("is-visible");
      window.clearTimeout(showToast.timer);
      showToast.timer = window.setTimeout(function () {
        toast.classList.remove("is-visible");
      }, 2200);
    }

    function syncEventsUrl() {
      if (window.location.port === "5502" || ((window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost") && window.location.port !== "5510")) {
        return builderServerUrl("sync-events.do");
      }
      return new URL("builder/sync-events.do", window.location.href).href;
    }

    function connectRealtimeSync() {
      if (!window.EventSource) return;
      var events = new window.EventSource(syncEventsUrl());
      events.addEventListener("builder-save", function (event) {
        var update;
        try { update = JSON.parse(event.data || "{}"); }
        catch (error) { return; }
        if (!update || update.clientId === syncClientId) return;
        window.sessionStorage.setItem(syncReloadKey, JSON.stringify({
          expires: Date.now() + 15000,
          reopen: builder.classList.contains("is-open"),
          selectedLayer: selectedLayer,
          selectedElementKey: selectedElementKey
        }));
        showToast("다른 사용자가 저장했습니다. 최신 내용으로 동기화합니다.");
        window.setTimeout(function () { window.location.reload(); }, 700);
      });
    }

    var SUB_CONTENT_LIBRARY = {
      basic: {
        label: "기본 UI 전체",
        description: "content/0content-ui.html의 개발·기획 UI 전체",
        html: ""
      },
      custom: {
        label: "직접 작성 콘텐츠",
        description: "제목과 HTML·CSS·JS를 직접 작성하고 파일로 저장",
        html: '<div class="custom-content"><h4 class="titLv"><span>새 콘텐츠</span></h4><p class="pgraph">HTML을 입력해 콘텐츠를 작성해 주세요.</p></div>',
        css: '.custom-content { padding: 32px; border: 1px solid var(--theme-line); background: var(--theme-surface); }',
        js: ''
      },
      text: {
        label: "제목 · 문단 · 목록",
        description: "기획 문서의 기본 제목과 계층형 목록",
        html: '<h4 class="titLv"><span>콘텐츠 제목</span></h4><div class="pgraph">페이지 내용을 설명하는 문장을 입력합니다.</div><h5 class="titLv2">레벨 2 타이틀</h5><h5 class="titLv3">레벨 3 타이틀</h5><ul class="listLv"><li>첫 번째 목록 내용입니다.</li><li>두 번째 목록 내용입니다.<ul class="listLv2"><li>하위 목록 내용입니다.</li></ul></li></ul>'
      },
      table: {
        label: "정보 테이블",
        description: "반응형 기본 데이터 표",
        html: '<h5 class="titLv2">테이블</h5><div class="skinTb-wrapper"><table class="skinTb width768"><caption class="blind">정보 안내 표</caption><thead><tr><th scope="col">구분</th><th scope="col">내용</th><th scope="col">담당</th><th scope="col">비고</th></tr></thead><tbody><tr><th scope="row">항목 1</th><td>내용을 입력합니다.</td><td>담당부서</td><td>-</td></tr><tr><th scope="row">항목 2</th><td>내용을 입력합니다.</td><td>담당부서</td><td>-</td></tr></tbody></table></div>'
      },
      board: {
        label: "게시판 목록",
        description: "검색·목록·페이지 이동이 포함된 게시판",
        html: '<h5 class="titLv2">게시판</h5><div class="boSrchArea"><div class="boMeta"><span class="boMeta-pt">총</span> 2건</div><form class="boSrch"><fieldset><legend class="blind">게시물 검색</legend><select class="boSrch-selectBox skinSelectBox"><option>제목</option><option>제목 + 내용</option></select><input type="text" class="boSrch-iptTxt skinIptTxt"><input type="submit" value="검색" class="boSrch-btnBo skinBtnBo skinBtnBo-data-pos"></fieldset></form></div><table class="skinTb skinTb-data-resList skinTb-data-bgEven"><caption class="blind">게시판 목록</caption><thead><tr><th scope="col">번호</th><th scope="col" class="skinTb-sbj">제목</th><th scope="col">작성자</th><th scope="col">등록일</th></tr></thead><tbody><tr><td class="skinTxa-center">1</td><td class="skinTb-sbj"><a href="#">게시물 제목이 들어갑니다.</a></td><td class="skinTxa-center">관리자</td><td class="skinTxa-center">2026-08-06</td></tr><tr><td class="skinTxa-center">2</td><td class="skinTb-sbj"><a href="#">게시물 제목이 들어갑니다.</a></td><td class="skinTxa-center">관리자</td><td class="skinTxa-center">2026-08-05</td></tr></tbody></table><div class="pager"><a href="#" class="pager-link pager-link-data-prev">이전</a><a href="#" class="pager-link active">1</a><a href="#" class="pager-link">2</a><a href="#" class="pager-link pager-link-data-next">다음</a></div>'
      },
      view: {
        label: "게시판 상세",
        description: "제목 정보와 본문을 보여주는 상세 화면",
        html: '<h5 class="titLv2">게시물 상세</h5><div class="skinTb skinMb-small skinTb-data-resList skinTb-data-bgSbj"><div class="skinTb-tr"><div class="skinTb-th col2">제목</div><div class="skinTb-td skinTb-sbj">게시물의 제목이 들어갑니다.</div></div><div class="skinTb-tr"><div class="skinTb-th col2">작성자</div><div class="skinTb-td col2">관리자</div><div class="skinTb-th col2">등록일</div><div class="skinTb-td col2">2026-08-06</div></div><div class="skinTb-tr"><div class="skinTb-td skinTb-conts"><p>게시물의 상세 내용이 들어갑니다.</p></div></div></div><div class="skinTxa-right"><a href="#" class="skinBtnBo">목록으로</a></div>'
      },
      form: {
        label: "작성 폼",
        description: "제목·작성자·내용·첨부파일 입력 폼",
        html: '<h5 class="titLv2">작성 폼</h5><div class="skinTb skinTb-data-resWrite"><div class="skinTb-tr"><div class="skinTb-th col2"><label>제목 <em class="skinColor-red">*</em></label></div><div class="skinTb-td"><input type="text" class="skinIptTxt col12"></div></div><div class="skinTb-tr"><div class="skinTb-th col2"><label>작성자 <em class="skinColor-red">*</em></label></div><div class="skinTb-td"><input type="text" class="skinIptTxt"></div></div><div class="skinTb-tr"><div class="skinTb-th col2"><label>내용 <em class="skinColor-red">*</em></label></div><div class="skinTb-td"><textarea class="col12" rows="8"></textarea></div></div></div><div class="skinTxa-right"><a href="#" class="skinBtnBo">목록으로</a> <a href="#" class="skinBtnBo skinBtnBo-data-pos">등록하기</a></div>'
      },
      notice: {
        label: "안내 박스 · 버튼",
        description: "강조 안내문과 이동 버튼",
        html: '<h5 class="titLv2">이용 안내</h5><div class="imptBox"><p class="pgraph">이 영역에 이용자가 꼭 확인해야 할 안내 내용을 입력합니다.</p></div><p><span class="contsBtn"><a href="#">자세히 보기</a></span> <a href="#" class="skinBtnBo skinBtnBo-data-pos">신청하기</a></p>'
      }
    };

    function defaultSubContentHtml(title) {
      var safeTitle = escapeHtml(title || "새로 생성한 콘텐츠");
      return '<h4 class="titLv"><span>' + safeTitle + '</span></h4><div class="pgraph">콘텐츠 내용을 입력해 주세요.</div>';
    }

    function ensureGeneratedSubContentDefaults(blocks) {
      (blocks || []).forEach(function (block) {
        if (block.type !== "custom" || !block.saveAsFile) return;
        var html = String(block.html || "").trim();
        if (!html || /^<!--[\s\S]*?-->$/.test(html) || /class=["']include-error["']/.test(html)) block.html = defaultSubContentHtml(block.title || block.label);
      });
      return blocks;
    }

    function splitLegacySubContent(contentsArea) {
      return [{
        id: unique("subcontent"),
        type: "basic",
        label: "기본 UI 콘텐츠",
        title: "기본 UI 콘텐츠",
        html: contentsArea.innerHTML,
        css: "",
        js: "",
        fileName: "0content-ui.html",
        saveAsFile: false
      }];
    }

    function captureSubpageState() {
      if (!isSubPage || !canvasDocument) return null;
      var root = canvasDocument.querySelector("#sub");
      var contentsArea = canvasDocument.querySelector("#contentsArea");
      rememberSubContentSources(document);
      readBasicUiSource(canvasDocument);
      var wrapped = contentsArea ? Array.from(contentsArea.querySelectorAll(":scope > [data-sub-content-block]")) : [];
      var blocks = wrapped.map(function (block) {
        var copy = block.cloneNode(true);
        var style = copy.querySelector(":scope > style[data-sub-content-css]");
        var scriptTemplate = copy.querySelector(":scope > template[data-sub-content-js]");
        var cacheKey = subContentCacheKey(block);
        var cached = subContentSourceCache[cacheKey] || null;
        var css = decodeSubContentCss(style);
        var js = scriptTemplate ? scriptTemplate.textContent : "";
        if (style) style.remove();
        if (scriptTemplate) scriptTemplate.remove();
        var html = copy.innerHTML.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
        if (block.hasAttribute("include-html") && cached) {
          if (!String(html || "").trim()) html = cached.html;
          if (!String(css || "").trim()) css = cached.css;
          if (!String(js || "").trim()) js = cached.js;
        }
        return {
          id: block.dataset.subContentBlock || unique("subcontent"),
          type: block.dataset.subContentType || "custom",
          label: block.dataset.subContentLabel || "개별 콘텐츠",
          title: block.dataset.subContentTitle || block.dataset.subContentLabel || "개별 콘텐츠",
          html: html,
          css: css,
          js: js,
          fileName: block.dataset.subContentFile || "",
          assetImage: block.dataset.subContentImage || "",
          saveAsFile: block.dataset.subContentSave === "true"
        };
      });
      var originalHtml = contentsArea ? contentsArea.innerHTML : "";
      if (!blocks.length && contentsArea) blocks = splitLegacySubContent(contentsArea);
      ensureGeneratedSubContentDefaults(blocks);
      var basicBlock = blocks.find(function (block) { return block.type === "basic"; });
      var basicUiHtml = basicBlock && String(basicBlock.html || "").trim() ? basicBlock.html : root && root._dqBasicUiHtml || basicUiSourceHtml || "";
      if (root && basicUiHtml) root._dqBasicUiHtml = basicUiHtml;
      return {
        visualStyle: root && root.dataset.subVisualStyle || "gradient",
        visualBackgroundImage: root && root.dataset.subVisualBackgroundImage || "",
        visualFilterEnabled: !root || root.dataset.subVisualFilterEnabled !== "false",
        visualFilterStyle: root && root.dataset.subVisualFilterStyle || "theme",
        breadcrumbStyle: root && root.dataset.subBreadcrumbStyle || "bar",
        headingStyle: root && root.dataset.subHeadingStyle || "line",
        fontScale: root && root.dataset.subFontScale || "normal",
        title2Style: root && root.dataset.subTitle2Style || "symbol",
        title3Style: root && root.dataset.subTitle3Style || "dot",
        listStyle: root && root.dataset.subListStyle || "bar",
        title2Image: root && root.dataset.subTitle2Image || "",
        title3Image: root && root.dataset.subTitle3Image || "",
        listImage: root && root.dataset.subListImage || "",
        blocks: blocks,
        basicUiHtml: basicUiHtml || (!wrapped.length ? originalHtml : "")
      };
    }

    function syncLegacySubSections() {
      if (!isSubPage || !state.content || !canvasDocument) return;
      state.content.sections.forEach(function (section) {
        if (!section.legacy || !section.cells[0] || !section.cells[0].module) return;
        var element = canvasDocument.querySelector('[data-section-id="' + section.id + '"]');
        if (element) section.cells[0].module.html = element.outerHTML;
      });
    }

    function applySubpageState() {
      if (!isSubPage || !state.subpage || !canvasDocument) return;
      var root = canvasDocument.querySelector("#sub");
      var contentsArea = canvasDocument.querySelector("#contentsArea");
      if (!root || !contentsArea) return;
      root.dataset.subVisualStyle = state.subpage.visualStyle || "gradient";
      root.dataset.subVisualBackgroundImage = state.subpage.visualBackgroundImage || "";
      root.dataset.subVisualHasBackground = state.subpage.visualBackgroundImage ? "true" : "false";
      root.dataset.subVisualFilterEnabled = state.subpage.visualFilterEnabled === false ? "false" : "true";
      root.dataset.subVisualFilterStyle = state.subpage.visualFilterStyle || "theme";
      root.style.setProperty("--sub-visual-background-image", state.subpage.visualBackgroundImage ? 'url("' + String(state.subpage.visualBackgroundImage).replace(/["\\]/g, "\\$&") + '")' : "none");
      root.dataset.subBreadcrumbStyle = state.subpage.breadcrumbStyle || "bar";
      root.dataset.subHeadingStyle = state.subpage.headingStyle || "line";
      root.dataset.subFontScale = state.subpage.fontScale || "normal";
      root.dataset.subTitle2Style = state.subpage.title2Style || "symbol";
      root.dataset.subTitle3Style = state.subpage.title3Style || "dot";
      root.dataset.subListStyle = state.subpage.listStyle || "bar";
      root.dataset.subTitle2Image = state.subpage.title2Image || "";
      root.dataset.subTitle3Image = state.subpage.title3Image || "";
      root.dataset.subListImage = state.subpage.listImage || "";
      root.style.setProperty("--sub-title2-image", state.subpage.title2Image ? 'url("' + String(state.subpage.title2Image).replace(/["\\]/g, "\\$&") + '")' : "none");
      root.style.setProperty("--sub-title3-image", state.subpage.title3Image ? 'url("' + String(state.subpage.title3Image).replace(/["\\]/g, "\\$&") + '")' : "none");
      root.style.setProperty("--sub-list-image", state.subpage.listImage ? 'url("' + String(state.subpage.listImage).replace(/["\\]/g, "\\$&") + '")' : "none");
      readBasicUiSource(canvasDocument);
      var safeBasicUiHtml = state.subpage.basicUiHtml || root._dqBasicUiHtml || basicUiSourceHtml || "";
      var stateBlocks = state.subpage.blocks || (state.subpage.blocks = []);
      var stateBasicBlock = stateBlocks.find(function (block) { return block.type === "basic"; });
      if (!stateBasicBlock && safeBasicUiHtml) {
        stateBasicBlock = {
          id: "subcontent-basic-ui",
          type: "basic",
          label: "기본 UI 콘텐츠",
          title: "기본 UI 콘텐츠",
          html: safeBasicUiHtml,
          css: "",
          js: "",
          fileName: "0content-ui.html",
          assetImage: "",
          saveAsFile: false
        };
        stateBlocks.unshift(stateBasicBlock);
      }
      if (stateBasicBlock && !String(stateBasicBlock.html || "").trim() && safeBasicUiHtml) stateBasicBlock.html = safeBasicUiHtml;
      if (stateBasicBlock && String(stateBasicBlock.html || "").trim()) safeBasicUiHtml = stateBasicBlock.html;
      state.subpage.basicUiHtml = safeBasicUiHtml;
      root._dqBasicUiHtml = safeBasicUiHtml;
      if (safeBasicUiHtml) basicUiSourceHtml = safeBasicUiHtml;
      contentsArea.removeAttribute("include-html");
      contentsArea.innerHTML = stateBlocks.map(function (block) {
        var js = String(block.js || "").replace(/<\/template/gi, "<\\/template");
        var blockHtml = block.type === "basic" && !String(block.html || "").trim() ? safeBasicUiHtml : block.html;
        if (block.type === "basic" && blockHtml) block.html = blockHtml;
        return '<section class="sub-content-block" data-sub-content-block="' + escapeHtml(block.id) + '" data-sub-content-type="' + escapeHtml(block.type) + '" data-sub-content-label="' + escapeHtml(block.label) + '" data-sub-content-title="' + escapeHtml(block.title || block.label) + '" data-sub-content-file="' + escapeHtml(block.fileName || "") + '" data-sub-content-image="' + escapeHtml(block.assetImage || "") + '" data-sub-content-save="' + String(!!block.saveAsFile) + '">' + buildSubContentStyle(block) + blockHtml + (js ? '<template data-sub-content-js>' + js + '</template>' : '') + '</section>';
      }).join("");
      if (typeof canvasWindow.DQInitSubContentUi === "function") canvasWindow.DQInitSubContentUi();
      contentsArea.querySelectorAll("[data-sub-content-block]").forEach(function (blockElement) {
        var block = state.subpage.blocks.find(function (item) { return item.id === blockElement.dataset.subContentBlock; });
        if (!block || !String(block.js || "").trim() || blockElement.dataset.subContentJsReady === "true") return;
        blockElement.dataset.subContentJsReady = "true";
        try {
          blockElement._dqSubCleanup = Function("root", "host", String(block.js))(blockElement, blockElement) || null;
        } catch (error) {
          console.error("개별 콘텐츠 JS 실행 오류:", error);
        }
      });
      syncLegacySubSections();
      setSubContentPreview(selectedLayer === "subpage-content-item" ? selectedSubContentId : "");
    }

    function setSubContentPreview(blockId) {
      if (!isSubPage || !canvasDocument) return;
      canvasDocument.querySelectorAll("#contentsArea > [data-sub-content-block]").forEach(function (element) {
        element.hidden = !!blockId && element.dataset.subContentBlock !== blockId;
      });
    }

    function buildSubContentFiles() {
      if (!isSubPage || !state.subpage) return [];
      return (state.subpage.blocks || []).filter(function (block) { return block.saveAsFile && block.fileName; }).map(function (block) {
        var js = String(block.js || "").replace(/<\/template/gi, "<\\/template");
        return {
          fileName: block.fileName,
          title: block.title || block.label,
          content: buildSubContentStyle(block) + block.html + (js ? '<template data-sub-content-js>' + js + '</template>' : '')
        };
      });
    }

    function externalizeSubContentMarkup(markup) {
      var template = document.createElement("template");
      template.innerHTML = String(markup || "");
      template.content.querySelectorAll("[data-sub-content-block]").forEach(function (element) {
        var block = (state.subpage.blocks || []).find(function (item) { return item.id === element.dataset.subContentBlock; });
        if (!block || !block.fileName) return;
        element.innerHTML = "";
        element.removeAttribute("hidden");
        element.removeAttribute("style");
        element.setAttribute("include-html", "/page/dq-builder/content/" + block.fileName);
      });
      return template.innerHTML;
    }

    function buildSavedSubpageContentState() {
      var saved = JSON.parse(JSON.stringify(state.content || { sections: [] }));
      (saved.sections || []).forEach(function (section) {
        var module = section.cells && section.cells[0] && section.cells[0].module;
        if (section.legacy && module && module.type === "custom") module.html = externalizeSubContentMarkup(module.html);
      });
      return saved;
    }

    function captureState() {
      var header = canvasDocument.querySelector("#header");
      var utility = header.querySelector(".site-header__utility");
      var headerInner = header.querySelector(".site-header__main .site-header__inner");
      var logo = header.querySelector(".site-logo a");
      var logoImage = logo.querySelector("img");
      var navigation = header.querySelector(".gnb");
      var navigationLink = navigation.querySelector(".gnb-link");
      var navigationDepth2Link = navigation.querySelector(".gnb-depth2 > li > a");
      var navigationDepth3Link = navigation.querySelector(".gnb-depth3 a");
      var sitemapTitle = navigation.querySelector(".sitemap-title");
      var searchButton = header.querySelector(".header-search");
      var sitemapButton = header.querySelector(".site-map-toggle");
      var actionStyleTarget = searchButton || sitemapButton;
      var actionStyles = actionStyleTarget ? canvasWindow.getComputedStyle(actionStyleTarget) : null;
      var actionIcon = actionStyleTarget && actionStyleTarget.querySelector("svg");
      var savedConfig = header.querySelector(".site-header__config");
      var rootStyles = canvasWindow.getComputedStyle(canvasDocument.documentElement);
      var headerColor = canvasWindow.getComputedStyle(header).backgroundColor;
      var utilityColor = canvasWindow.getComputedStyle(utility).backgroundColor;
      var rootWidth = rootStyles.getPropertyValue("--header-layout-width").trim();
      var bodyFontStack = canvasWindow.getComputedStyle(canvasDocument.body).fontFamily;
      var savedFont = savedConfig && FONT_OPTIONS.indexOf(savedConfig.dataset.themeFont) > -1 ? savedConfig.dataset.themeFont : "";
      var primaryBodyFont = (bodyFontStack.split(",")[0] || "").trim().replace(/^["']|["']$/g, "");
      var detectedFont = savedFont || FONT_OPTIONS.find(function (fontName) { return fontName === primaryBodyFont; }) || "Pretendard";
      var radiusMedium = parseFloat(rootStyles.getPropertyValue("--theme-radius-md")) || 0;
      var inferredRadiusStyle = radiusMedium === 0 ? "square" : radiusMedium >= 16 ? "round" : "soft";
      var buttonBackground = rootStyles.getPropertyValue("--theme-button-background").trim();
      var inferredButtonStyle = /gradient/i.test(buttonBackground) ? "gradient" : /^(?:transparent|rgba\(0,\s*0,\s*0,\s*0\))$/i.test(buttonBackground) ? "outline" : "filled";
      var motionLift = parseFloat(rootStyles.getPropertyValue("--theme-motion-lift")) || 0;
      var inferredMotionStyle = motionLift === 0 ? "none" : motionLift <= -9 ? "emphasis" : "soft";
      var footer = canvasDocument.querySelector("#footer");
      var footerBottomInner = footer.querySelector(".site-footer__bottom .site-footer__inner");
      var footerBrand = footer.querySelector(".footer-brand strong");
      var footerLogoImage = footerBrand && footerBrand.querySelector("img");
      var familySite = footer.querySelector(".family-site");
      var footerInfo = footer.querySelector(".footer-info");
      var footerRootWidth = canvasWindow.getComputedStyle(canvasDocument.documentElement).getPropertyValue("--footer-layout-width").trim();

      var utilityItems = [];
      utility.querySelectorAll(".site-header__inner > span, .utility-content > span, .utility-links > a, .utility-links > button").forEach(function (element) {
        utilityItems.push({
          id: unique("utility"),
          type: element.classList.contains("utility-html") ? "html" : element.matches("a, button") ? "button" : "text",
          label: readableText(element),
          html: element.classList.contains("utility-html") ? element.innerHTML : "",
          href: element.getAttribute("href") || "#"
        });
      });

      var menus = [];
      header.querySelectorAll(".gnb-depth1 > .gnb-item").forEach(function (item) {
        var link = directChild(item, ".gnb-link");
        var depth2 = directChild(item, ".gnb-depth2");
        menus.push({
          id: unique("menu"),
          label: link ? link.textContent.trim() : "메뉴",
          href: link ? link.getAttribute("href") || "#" : "#",
          newWindow: !!(link && link.target === "_blank"),
          children: captureDepthItems(depth2, "gnb-depth3")
        });
      });

      return {
        elementOverrides: readElementOverrides(),
        content: window.DQContentBuilder ? window.DQContentBuilder.capture(canvasDocument) : { sections: [] },
        subpage: captureSubpageState(),
        theme: {
          designStyle: savedConfig && savedConfig.dataset.themeDesign || "custom",
          color1: toHex(savedConfig && savedConfig.dataset.themeColor1 || rootStyles.getPropertyValue("--theme-color-1").trim(), "#5a1c7e"),
          color2: toHex(savedConfig && savedConfig.dataset.themeColor2 || rootStyles.getPropertyValue("--theme-color-2").trim(), "#3e1259"),
          color3: toHex(savedConfig && savedConfig.dataset.themeColor3 || rootStyles.getPropertyValue("--theme-color-3").trim(), "#c68be5"),
          fontFamily: detectedFont,
          applyToSitemap: !savedConfig || savedConfig.dataset.sitemapUseTheme !== "false",
          contentMaxWidth: parseInt(savedConfig && savedConfig.dataset.themeContentWidth, 10) || parseInt(rootStyles.getPropertyValue("--content-layout-width"), 10) || 1200,
          radiusStyle: savedConfig && /^(?:square|soft|round)$/.test(savedConfig.dataset.themeRadius) ? savedConfig.dataset.themeRadius : inferredRadiusStyle,
          buttonStyle: savedConfig && /^(?:outline|filled|gradient)$/.test(savedConfig.dataset.themeButton) ? savedConfig.dataset.themeButton : inferredButtonStyle,
          motionStyle: savedConfig && /^(?:none|soft|emphasis)$/.test(savedConfig.dataset.themeMotion) ? savedConfig.dataset.themeMotion : inferredMotionStyle,
          pageBackground: toHex(rootStyles.getPropertyValue("--theme-page-bg").trim(), "#ffffff"),
          surface: toHex(rootStyles.getPropertyValue("--theme-surface").trim(), "#ffffff"),
          surfaceAlt: toHex(rootStyles.getPropertyValue("--theme-surface-alt").trim(), "#f5f6f8"),
          textColor: toHex(rootStyles.getPropertyValue("--theme-text").trim(), "#222222"),
          mutedColor: toHex(rootStyles.getPropertyValue("--theme-muted").trim(), "#666666"),
          lineColor: toHex(rootStyles.getPropertyValue("--theme-line").trim(), "#e3e5e8"),
          shadow: rootStyles.getPropertyValue("--theme-shadow").trim() || "0 14px 38px rgba(0,0,0,.1)"
        },
        header: {
          background: toHex(headerColor, "#ffffff"),
          opacity: alphaPercent(headerColor),
          maxWidth: /px$/i.test(rootWidth) ? parseInt(rootWidth, 10) : Math.round(headerInner.getBoundingClientRect().width),
          height: Math.round(headerInner.getBoundingClientRect().height),
          hideOnScroll: savedConfig ? savedConfig.dataset.scrollHide !== "false" : true,
          utility: {
            visible: !utility.hidden,
            mobileVisible: savedConfig ? savedConfig.dataset.utilityMobileVisible !== "false" : true,
            background: toHex(utilityColor, "#f7f7f8"),
            opacity: alphaPercent(utilityColor),
            color: toHex(canvasWindow.getComputedStyle(utility).color, "#777777"),
            items: utilityItems
          },
          logo: {
            text: logoImage ? logoImage.getAttribute("alt") || "로고" : readableText(logo),
            href: logo.getAttribute("href") || "#",
            color: toHex(canvasWindow.getComputedStyle(logo).color, "#5a1c7e"),
            size: parseInt(canvasWindow.getComputedStyle(logo).fontSize, 10) || 24,
            mobileSize: parseInt(canvasWindow.getComputedStyle(logo).getPropertyValue("--logo-mobile-font-size"), 10) || 20,
            useImage: !!logoImage,
            imagePath: logoImage ? logoFileValue(logoImage.getAttribute("src") || "") : "",
            imageWidth: logoImage ? Math.round(logoImage.getBoundingClientRect().width) || 180 : 180
          },
          navigation: {
            mode: savedConfig && savedConfig.dataset.gnbMode ? savedConfig.dataset.gnbMode : header.dataset.gnbMode || "single",
            indicatorStyle: savedConfig && /^(?:underline|overline|side|pill|dot)$/.test(savedConfig.dataset.gnbIndicator) ? savedConfig.dataset.gnbIndicator : (/^(?:underline|overline|side|pill|dot)$/.test(header.dataset.gnbIndicator) ? header.dataset.gnbIndicator : "underline"),
            indicatorUseTheme: !savedConfig || savedConfig.dataset.gnbIndicatorUseTheme !== "false",
            indicatorColor: toHex(savedConfig && savedConfig.dataset.gnbIndicatorColor || rootStyles.getPropertyValue("--theme-color-1").trim(), "#5a1c7e"),
            previewOpen: false,
            color: navigationLink ? toHex(canvasWindow.getComputedStyle(navigationLink).color, "#222222") : "#222222",
            size: navigationLink ? parseInt(canvasWindow.getComputedStyle(navigationLink).fontSize, 10) || 18 : 18,
            depth2Color: navigationDepth2Link ? toHex(canvasWindow.getComputedStyle(navigationDepth2Link).color, "#333333") : "#333333",
            depth2Size: navigationDepth2Link ? parseInt(canvasWindow.getComputedStyle(navigationDepth2Link).fontSize, 10) || 15 : 15,
            depth3Color: navigationDepth3Link ? toHex(canvasWindow.getComputedStyle(navigationDepth3Link).color, "#555555") : "#555555",
            depth3Size: navigationDepth3Link ? parseInt(canvasWindow.getComputedStyle(navigationDepth3Link).fontSize, 10) || 14 : 14,
            items: menus
          },
          sitemap: {
            background: savedConfig && savedConfig.dataset.sitemapBackground ? savedConfig.dataset.sitemapBackground : "#1f1029",
            title: sitemapTitle ? readableText(sitemapTitle) : "DQ PROJECT / ALL MENU",
            layout: savedConfig && savedConfig.dataset.sitemapLayout === "vertical" ? "vertical" : "horizontal",
            depth1Color: savedConfig && savedConfig.dataset.sitemapDepth1Color ? savedConfig.dataset.sitemapDepth1Color : "#ffffff",
            depth23Color: savedConfig && savedConfig.dataset.sitemapDepth23Color ? savedConfig.dataset.sitemapDepth23Color : "#ffffff"
          },
          actions: {
            search: searchButton ? !searchButton.hidden : false,
            searchMode: savedConfig && savedConfig.dataset.searchMode === "link" ? "link" : (searchButton && searchButton.dataset.searchMode === "link" ? "link" : "panel"),
            searchHref: savedConfig && savedConfig.dataset.searchHref ? savedConfig.dataset.searchHref : (searchButton && searchButton.getAttribute("href")) || "#",
            sitemap: sitemapButton ? !sitemapButton.hidden : false,
            style: {
              borderVisible: actionStyles ? parseFloat(actionStyles.borderTopWidth) > 0 && actionStyles.borderTopStyle !== "none" : true,
              borderColor: actionStyles ? toHex(actionStyles.borderTopColor, "#dddddd") : "#dddddd",
              background: actionStyles ? toHex(actionStyles.backgroundColor, "#ffffff") : "#ffffff",
              color: actionStyles ? toHex(actionStyles.color, "#444444") : "#444444",
              size: actionStyles ? Math.round(actionStyleTarget.getBoundingClientRect().width) || 42 : 42,
              iconSize: actionIcon ? Math.round(actionIcon.getBoundingClientRect().width) || 21 : 21,
              radius: actionStyles ? parseInt(actionStyles.borderRadius, 10) || 0 : 8
            },
            items: Array.from(header.querySelectorAll(".builder-header-action")).map(function (button) {
              var use = button.querySelector("use");
              var iconHref = use ? use.getAttribute("href") || "" : "";
              return {
                id: unique("action"),
                label: button.getAttribute("aria-label") || readableText(button) || "바로가기",
                href: button.getAttribute("href") || "#",
                icon: iconHref.split("#")[1] || "user",
                newWindow: button.target === "_blank"
              };
            })
          }
        },
        footer: {
          background: toHex(canvasWindow.getComputedStyle(footer).backgroundColor, "#24262b"),
          color: toHex(canvasWindow.getComputedStyle(footer).color, "#c8cbd1"),
          maxWidth: /px$/i.test(footerRootWidth) ? parseInt(footerRootWidth, 10) : Math.round(footerBottomInner.getBoundingClientRect().width),
          height: Math.round(footerBottomInner.getBoundingClientRect().height) || 180,
          logo: {
            text: footerLogoImage ? footerLogoImage.getAttribute("alt") || "사이트 로고" : readableText(footerBrand),
            useImage: !!footerLogoImage,
            imagePath: footerLogoImage ? logoFileValue(footerLogoImage.getAttribute("src") || "") : "",
            imageWidth: footerLogoImage ? Math.round(footerLogoImage.getBoundingClientRect().width) || 180 : 180
          },
          related: {
            visible: familySite ? !familySite.hidden : false,
            label: familySite ? readableText(familySite.querySelector(".family-site__toggle")) : "관련 사이트",
            items: familySite ? Array.from(familySite.querySelectorAll(".family-site__list a")).map(function (link) {
              return { label: readableText(link), href: link.getAttribute("href") || "#" };
            }) : []
          },
          links: Array.from(footer.querySelectorAll(".footer-links a")).map(function (link) {
            return { label: readableText(link), href: link.getAttribute("href") || "#" };
          }),
          info: {
            address: readableText(footerInfo.querySelector("address")),
            contact: readableText(footerInfo.querySelector("p:not(.copyright)")),
            copyright: readableText(footerInfo.querySelector(".copyright"))
          }
        }
      };
    }

    function applyState() {
      if (!canvasDocument || !state) return;
      var header = canvasDocument.querySelector("#header");
      var utility = header.querySelector(".site-header__utility");
      var utilityInner = utility.querySelector(".site-header__inner");
      var logo = header.querySelector(".site-logo a");
      var logoContainer = header.querySelector(".site-logo");
      var headerInner = header.querySelector(".site-header__main .site-header__inner");
      var navigation = header.querySelector(".gnb");
      var depth1 = navigation.querySelector(".gnb-depth1");
      var data = state.header;
      var themeData = ensureThemeData(state.theme || { color1: "#5a1c7e", color2: "#3e1259", color3: "#c68be5", fontFamily: "Pretendard", applyToSitemap: true, contentMaxWidth: 1200, radiusStyle: "soft", buttonStyle: "outline", motionStyle: "soft", designStyle: "custom" });
      state.theme = themeData;
      if (!data.sitemap) data.sitemap = { background: "#1f1029", title: "DQ PROJECT / ALL MENU", layout: "horizontal", depth1Color: "#ffffff", depth23Color: "#ffffff" };
      if (themeData.applyToSitemap !== false) {
        data.sitemap.background = themeData.color2;
        data.sitemap.depth1Color = themeData.color3;
        data.sitemap.depth23Color = contrastColor(themeData.color2);
      }
      var footer = canvasDocument.querySelector("#footer");
      var footerData = state.footer;
      var utilityShouldDisplay = data.utility.visible && (canvasWindow.innerWidth > DQ.config.mobileBreakpoint || data.utility.mobileVisible);
      var provisionalUtilityHeight = utilityShouldDisplay ? 36 : 0;
      var radiusValues = themeRadiusValues(themeData.radiusStyle);
      var motionValues = themeMotionValues(themeData.motionStyle);
      var buttonValues = themeButtonValues(themeData.buttonStyle, themeData);

      canvasDocument.documentElement.style.setProperty("--theme-color-1", themeData.color1);
      canvasDocument.documentElement.style.setProperty("--theme-color-2", themeData.color2);
      canvasDocument.documentElement.style.setProperty("--theme-color-3", themeData.color3);
      canvasDocument.documentElement.style.setProperty("--theme-page-bg", themeData.pageBackground);
      canvasDocument.documentElement.style.setProperty("--theme-surface", themeData.surface);
      canvasDocument.documentElement.style.setProperty("--theme-surface-alt", themeData.surfaceAlt);
      canvasDocument.documentElement.style.setProperty("--theme-text", themeData.textColor);
      canvasDocument.documentElement.style.setProperty("--theme-muted", themeData.mutedColor);
      canvasDocument.documentElement.style.setProperty("--theme-line", themeData.lineColor);
      canvasDocument.documentElement.style.setProperty("--theme-shadow", themeData.shadow);
      canvasDocument.documentElement.dataset.designTheme = themeData.designStyle || "custom";
      canvasDocument.documentElement.style.setProperty("--content-layout-width", themeData.contentMaxWidth + "px");
      canvasDocument.documentElement.style.setProperty("--theme-radius-sm", radiusValues.small);
      canvasDocument.documentElement.style.setProperty("--theme-radius-md", radiusValues.medium);
      canvasDocument.documentElement.style.setProperty("--theme-radius-lg", radiusValues.large);
      canvasDocument.documentElement.style.setProperty("--theme-radius-pill", radiusValues.pill);
      canvasDocument.documentElement.style.setProperty("--theme-button-background", buttonValues.background);
      canvasDocument.documentElement.style.setProperty("--theme-button-border", buttonValues.border);
      canvasDocument.documentElement.style.setProperty("--theme-button-color", buttonValues.color);
      canvasDocument.documentElement.style.setProperty("--theme-motion-fast", motionValues.fast);
      canvasDocument.documentElement.style.setProperty("--theme-motion-lift", motionValues.lift);
      canvasDocument.documentElement.style.setProperty("--gnb-motion-base", motionValues.base);
      canvasDocument.documentElement.style.setProperty("--gnb-motion-fade", motionValues.fade);
      canvasDocument.documentElement.style.setProperty("--gnb-motion-height", motionValues.height);
      canvasDocument.body.style.fontFamily = '"' + safeFontFamily(themeData.fontFamily) + '", "Noto Sans KR", sans-serif';
      canvasDocument.body.style.color = themeData.textColor;
      canvasDocument.body.style.backgroundColor = themeData.pageBackground;
      header.style.backgroundColor = rgba(data.background, data.opacity);
      canvasDocument.documentElement.style.setProperty("--header-layout-width", data.maxWidth + "px");
      canvasDocument.documentElement.style.setProperty("--header-main-height", data.height + "px");
      canvasDocument.documentElement.style.setProperty("--header-utility-height", provisionalUtilityHeight + "px");
      canvasDocument.documentElement.style.setProperty("--header-total-height", (data.height + provisionalUtilityHeight) + "px");
      header.style.setProperty("--header-main-height", data.height + "px");
      header.style.setProperty("--header-utility-height", provisionalUtilityHeight + "px");
      header.style.setProperty("--header-total-height", (data.height + provisionalUtilityHeight) + "px");
      header.style.setProperty("--sitemap-background", data.sitemap.background || "#1f1029");
      header.style.setProperty("--gnb-depth1-color", data.navigation.color || "#222222");
      header.style.setProperty("--sitemap-depth1-color", data.sitemap.depth1Color || "#ffffff");
      header.style.setProperty("--sitemap-depth23-color", data.sitemap.depth23Color || "#ffffff");
      header.dataset.sitemapLayout = data.sitemap.layout === "vertical" ? "vertical" : "horizontal";
      headerInner.style.height = data.height + "px";

      utility.hidden = !data.utility.visible;
      header.classList.toggle("is-utility-mobile-visible", !!data.utility.mobileVisible);
      var savedHeaderConfig = header.querySelector(".site-header__config");
      if (savedHeaderConfig) {
        savedHeaderConfig.dataset.gnbMode = data.navigation.mode || "single";
        savedHeaderConfig.dataset.gnbIndicator = /^(?:underline|overline|side|pill|dot)$/.test(data.navigation.indicatorStyle) ? data.navigation.indicatorStyle : "underline";
        savedHeaderConfig.dataset.gnbIndicatorUseTheme = String(data.navigation.indicatorUseTheme !== false);
        savedHeaderConfig.dataset.gnbIndicatorColor = data.navigation.indicatorColor || themeData.color1;
        savedHeaderConfig.dataset.scrollHide = String(data.hideOnScroll !== false);
        savedHeaderConfig.dataset.utilityMobileVisible = String(!!data.utility.mobileVisible);
        savedHeaderConfig.dataset.searchMode = data.actions.searchMode === "link" ? "link" : "panel";
        savedHeaderConfig.dataset.searchHref = data.actions.searchHref || "#";
        savedHeaderConfig.dataset.sitemapLayout = data.sitemap.layout === "vertical" ? "vertical" : "horizontal";
        savedHeaderConfig.dataset.sitemapBackground = data.sitemap.background || "#1f1029";
        savedHeaderConfig.dataset.sitemapDepth1Color = data.sitemap.depth1Color || "#ffffff";
        savedHeaderConfig.dataset.sitemapDepth23Color = data.sitemap.depth23Color || "#ffffff";
        savedHeaderConfig.dataset.sitemapUseTheme = String(themeData.applyToSitemap !== false);
        savedHeaderConfig.dataset.themeDesign = themeData.designStyle || "custom";
        savedHeaderConfig.dataset.themeColor1 = themeData.color1;
        savedHeaderConfig.dataset.themeColor2 = themeData.color2;
        savedHeaderConfig.dataset.themeColor3 = themeData.color3;
        savedHeaderConfig.dataset.themeFont = safeFontFamily(themeData.fontFamily);
        savedHeaderConfig.dataset.themeContentWidth = String(themeData.contentMaxWidth);
        savedHeaderConfig.dataset.themeRadius = themeData.radiusStyle || "soft";
        savedHeaderConfig.dataset.themeButton = themeData.buttonStyle || "outline";
        savedHeaderConfig.dataset.themeMotion = themeData.motionStyle || "soft";
      }
      utility.style.backgroundColor = rgba(data.utility.background, data.utility.opacity);
      utility.style.color = data.utility.color;
      utilityInner.innerHTML = "";
      var utilityContent = canvasDocument.createElement("div");
      utilityContent.className = "utility-content";
      var utilityLinks = canvasDocument.createElement("div");
      utilityLinks.className = "utility-links";
      data.utility.items.forEach(function (item) {
        if (item.type === "button") {
          var link = canvasDocument.createElement("a");
          link.href = item.href || "#";
          link.textContent = item.label;
          utilityLinks.appendChild(link);
        } else if (item.type === "html") {
          var htmlElement = canvasDocument.createElement("span");
          htmlElement.className = "utility-html";
          htmlElement.innerHTML = safeUtilityHtml(item.html);
          utilityContent.appendChild(htmlElement);
        } else {
          var text = canvasDocument.createElement("span");
          text.textContent = item.label;
          utilityContent.appendChild(text);
        }
      });
      utilityInner.appendChild(utilityContent);
      utilityInner.appendChild(utilityLinks);

      logo.innerHTML = "";
      logo.href = data.logo.href || "#";
      logo.style.color = data.logo.color;
      logo.style.fontSize = data.logo.size + "px";
      logo.style.setProperty("--logo-mobile-font-size", data.logo.mobileSize + "px");
      if (data.logo.useImage && data.logo.imagePath) {
        var logoImage = canvasDocument.createElement("img");
        logoImage.className = "site-logo__image";
        logoImage.src = resolveLogoPath(data.logo.imagePath);
        logoImage.alt = data.logo.text || "사이트 로고";
        logoImage.style.width = data.logo.imageWidth + "px";
        logo.appendChild(logoImage);
        logoContainer.style.width = data.logo.imageWidth + "px";
        logoContainer.style.maxWidth = "40%";
      } else {
        logo.textContent = data.logo.text;
        logoContainer.style.width = "";
        logoContainer.style.maxWidth = "";
      }

      header.dataset.gnbMode = data.navigation.mode || "single";
      header.dataset.gnbIndicator = /^(?:underline|overline|side|pill|dot)$/.test(data.navigation.indicatorStyle) ? data.navigation.indicatorStyle : "underline";
      header.style.setProperty("--gnb-indicator-color", data.navigation.indicatorUseTheme !== false ? "var(--theme-color-1)" : (data.navigation.indicatorColor || themeData.color1));
      navigation.style.setProperty("--editor-navigation-color", data.navigation.color);
      var sitemapTitle = navigation.querySelector(".sitemap-title");
      if (!sitemapTitle) {
        sitemapTitle = canvasDocument.createElement("strong");
        sitemapTitle.className = "sitemap-title";
        navigation.insertBefore(sitemapTitle, depth1);
      }
      sitemapTitle.textContent = data.sitemap.title || "DQ PROJECT / ALL MENU";
      depth1.innerHTML = "";
      data.navigation.items.forEach(function (menu) {
        var item = canvasDocument.createElement("li");
        item.className = "gnb-item";
        var link = canvasDocument.createElement("a");
        link.className = "gnb-link";
        link.href = menu.href || "#";
        link.style.fontSize = data.navigation.size + "px";
        link.style.color = data.navigation.color;
        var label = canvasDocument.createElement("span");
        label.textContent = menu.label;
        link.appendChild(label);
        if (menu.newWindow) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.insertAdjacentHTML("beforeend", '<svg class="gnb-link__external" aria-hidden="true"><use href="' + SITE_ICONS + '#external"></use></svg>');
        }
        item.appendChild(link);
        if (menu.children && menu.children.length) {
          var depth2 = canvasDocument.createElement("ul");
          depth2.className = "gnb-depth2";
          menu.children.forEach(function (depth2Data) {
            var depth2Item = canvasDocument.createElement("li");
            var depth2Link = canvasDocument.createElement("a");
            depth2Link.href = depth2Data.href || "#";
            depth2Link.textContent = depth2Data.label;
            depth2Link.style.color = data.navigation.depth2Color;
            depth2Link.style.fontSize = data.navigation.depth2Size + "px";
            depth2Item.appendChild(depth2Link);
            if (depth2Data.children && depth2Data.children.length) {
              var depth3 = canvasDocument.createElement("ul");
              depth3.className = "gnb-depth3";
              depth2Data.children.forEach(function (depth3Data) {
                var depth3Item = canvasDocument.createElement("li");
                var depth3Link = canvasDocument.createElement("a");
                depth3Link.href = depth3Data.href || "#";
                depth3Link.textContent = depth3Data.label;
                depth3Link.style.color = data.navigation.depth3Color;
                depth3Link.style.fontSize = data.navigation.depth3Size + "px";
                depth3Item.appendChild(depth3Link);
                depth3.appendChild(depth3Item);
              });
              depth2Item.appendChild(depth3);
            }
            depth2.appendChild(depth2Item);
          });
          item.appendChild(depth2);
        }
        depth1.appendChild(item);
      });

      var forceGnbPreview = data.navigation.previewOpen === true;
      var previewMenuItems = Array.from(depth1.querySelectorAll(":scope > .gnb-item"));
      var previewMenuIndex = data.navigation.items.findIndex(function (menu) { return menu.id === selectedMenuId; });
      if (previewMenuIndex < 0 || !previewMenuItems[previewMenuIndex] || !previewMenuItems[previewMenuIndex].querySelector(".gnb-depth2")) {
        previewMenuIndex = previewMenuItems.findIndex(function (item) { return !!item.querySelector(".gnb-depth2"); });
      }
      header.classList.toggle("is-builder-gnb-open", forceGnbPreview);
      previewMenuItems.forEach(function (item, index) {
        item.classList.toggle("is-builder-open", forceGnbPreview && (data.navigation.mode === "all" || index === previewMenuIndex));
      });
      if (forceGnbPreview) header.style.setProperty("--gnb-panel-height", data.navigation.mode === "single-full" ? "220px" : "350px");

      var searchButton = header.querySelector(".header-search");
      var sitemapButton = header.querySelector(".site-map-toggle");
      var searchMode = data.actions.searchMode === "link" ? "link" : "panel";
      var expectedSearchTag = searchMode === "link" ? "A" : "BUTTON";
      if (!searchButton || searchButton.tagName !== expectedSearchTag) {
        var replacementSearchButton = canvasDocument.createElement(searchMode === "link" ? "a" : "button");
        replacementSearchButton.className = "header-search";
        replacementSearchButton.insertAdjacentHTML("beforeend", '<svg aria-hidden="true"><use href="' + SITE_ICONS + '#search"></use></svg><span class="blind"></span>');
        if (searchButton) searchButton.replaceWith(replacementSearchButton);
        else header.querySelector(".site-header__actions").insertBefore(replacementSearchButton, sitemapButton || header.querySelector(".mobile-menu"));
        searchButton = replacementSearchButton;
      }
      searchButton.hidden = !data.actions.search;
      searchButton.dataset.searchMode = searchMode;
      if (searchMode === "link") {
        searchButton.href = data.actions.searchHref || "#";
        searchButton.setAttribute("aria-label", "검색 페이지 이동");
        searchButton.removeAttribute("aria-expanded");
        searchButton.removeAttribute("aria-controls");
      } else {
        searchButton.type = "button";
        searchButton.setAttribute("aria-label", "검색 열기");
        searchButton.setAttribute("aria-expanded", "false");
        searchButton.setAttribute("aria-controls", "header-search-panel");
      }
      var searchBlindText = searchButton.querySelector(".blind");
      if (searchBlindText) searchBlindText.textContent = searchMode === "link" ? "검색 페이지 이동" : "검색 열기";
      var searchPanel = header.querySelector(".header-search-panel");
      if (!searchPanel) {
        searchPanel = canvasDocument.createElement("div");
        searchPanel.className = "header-search-panel";
        searchPanel.id = "header-search-panel";
        searchPanel.hidden = true;
        searchPanel.innerHTML = '<form class="header-search-panel__form" method="get" role="search"><label class="blind" for="header-search-query">검색어</label><input id="header-search-query" name="q" type="search" placeholder="검색어를 입력하세요" autocomplete="off"><button type="submit" class="header-search-panel__submit" aria-label="검색"><svg aria-hidden="true"><use href="' + SITE_ICONS + '#search"></use></svg><span>검색</span></button><button type="button" class="header-search-panel__close" data-search-close aria-label="검색창 닫기"><svg aria-hidden="true"><use href="' + SITE_ICONS + '#close"></use></svg></button></form>';
        header.querySelector(".site-header__main").insertAdjacentElement("afterend", searchPanel);
      }
      searchPanel.hidden = true;
      var searchForm = searchPanel.querySelector("form");
      if (searchForm) searchForm.action = data.actions.searchHref || "#";
      header.classList.remove("is-search-open");
      if (sitemapButton) sitemapButton.hidden = !data.actions.sitemap;
      header.querySelectorAll(".builder-header-action").forEach(function (button) { button.remove(); });
      var actionArea = header.querySelector(".site-header__actions");
      var mobileButton = header.querySelector(".mobile-menu");
      var actionStyle = data.actions.style;
      actionArea.style.setProperty("--header-action-border-width", actionStyle.borderVisible ? "1px" : "0px");
      actionArea.style.setProperty("--header-action-border-color", actionStyle.borderColor);
      actionArea.style.setProperty("--header-action-background", actionStyle.background);
      actionArea.style.setProperty("--header-action-color", actionStyle.color);
      actionArea.style.setProperty("--header-action-size", actionStyle.size + "px");
      actionArea.style.setProperty("--header-action-icon-size", actionStyle.iconSize + "px");
      actionArea.style.setProperty("--header-action-radius", actionStyle.radius + "px");
      var allowedActionIcons = ["user", "login", "logout", "home", "search", "sitemap", "external", "download", "play", "pause"];
      (data.actions.items || []).forEach(function (action) {
        var customButton = canvasDocument.createElement("a");
        customButton.className = "header-custom-action builder-header-action";
        customButton.href = action.href || "#";
        customButton.setAttribute("aria-label", action.label || "바로가기");
        if (action.newWindow) {
          customButton.target = "_blank";
          customButton.rel = "noopener noreferrer";
        }
        var actionIcon = allowedActionIcons.indexOf(action.icon) > -1 ? action.icon : "user";
        customButton.insertAdjacentHTML("beforeend", '<svg aria-hidden="true"><use href="' + SITE_ICONS + '#' + actionIcon + '"></use></svg>');
        actionArea.insertBefore(customButton, sitemapButton || mobileButton);
      });

      footer.style.backgroundColor = footerData.background;
      footer.style.color = footerData.color;
      canvasDocument.documentElement.style.setProperty("--footer-layout-width", footerData.maxWidth + "px");
      footer.querySelectorAll(".footer-links a, .copyright").forEach(function (element) {
        element.style.color = footerData.color;
      });
      var footerBottomInner = footer.querySelector(".site-footer__bottom .site-footer__inner");
      footerBottomInner.style.minHeight = footerData.height + "px";
      var familySite = footer.querySelector(".family-site");
      if (familySite) {
        familySite.hidden = !footerData.related.visible;
        familySite.classList.remove("is-open");
        familySite.removeAttribute("open");
        var familyToggle = familySite.querySelector(".family-site__toggle");
        if (familyToggle) {
          if (familyToggle.matches("button")) familyToggle.setAttribute("aria-expanded", "false");
          familyToggle.style.color = footerData.color;
          familyToggle.style.backgroundColor = footerData.background;
        }
      }
      var footerBrand = footer.querySelector(".footer-brand");
      var footerBrandContent = footerBrand.querySelector("strong");
      footerBrandContent.style.color = footerData.color;
      footerBrandContent.innerHTML = "";
      if (footerData.logo.useImage && footerData.logo.imagePath) {
        var footerLogoImage = canvasDocument.createElement("img");
        footerLogoImage.className = "footer-brand__image";
        footerLogoImage.src = resolveLogoPath(footerData.logo.imagePath);
        footerLogoImage.alt = footerData.logo.text || "사이트 로고";
        footerLogoImage.style.width = footerData.logo.imageWidth + "px";
        footerLogoImage.style.maxWidth = "100%";
        footerLogoImage.style.height = "auto";
        footerBrandContent.appendChild(footerLogoImage);
        footerBrand.style.width = footerData.logo.imageWidth + "px";
        footerBrand.style.minWidth = "0";
      } else {
        footerBrandContent.textContent = footerData.logo.text;
        footerBrand.style.width = "";
        footerBrand.style.minWidth = "";
      }
      var measuredMainHeight = header.querySelector(".site-header__main").getBoundingClientRect().height;
      var measuredUtilityHeight = data.utility.visible ? utility.getBoundingClientRect().height : 0;
      canvasDocument.documentElement.style.setProperty("--header-main-height", measuredMainHeight + "px");
      canvasDocument.documentElement.style.setProperty("--header-utility-height", measuredUtilityHeight + "px");
      canvasDocument.documentElement.style.setProperty("--header-total-height", (measuredMainHeight + measuredUtilityHeight) + "px");
      header.style.setProperty("--header-main-height", measuredMainHeight + "px");
      header.style.setProperty("--header-utility-height", measuredUtilityHeight + "px");
      header.style.setProperty("--header-total-height", (measuredMainHeight + measuredUtilityHeight) + "px");
      canvasDocument.dispatchEvent(new canvasWindow.CustomEvent("dq:gnb-changed"));
      if (isSubPage && state.subpage && !pendingUploadRecovery) {
        var liveSubpage = captureSubpageState();
        if (liveSubpage && liveSubpage.blocks && liveSubpage.blocks.length) state.subpage.blocks = liveSubpage.blocks;
      }
      if (window.DQContentBuilder) window.DQContentBuilder.render(canvasDocument, state.content || { sections: [] });
      applySubpageState();
      syncLegacySubSections();
      applyElementOverrides();
      resetCanvasHeaderPosition();
      canvasWindow.requestAnimationFrame(function () {
        var refreshedMainHeight = header.querySelector(".site-header__main").getBoundingClientRect().height;
        var refreshedUtilityHeight = data.utility.visible && canvasWindow.getComputedStyle(utility).display !== "none" ? utility.getBoundingClientRect().height : 0;
        canvasDocument.documentElement.style.setProperty("--header-main-height", refreshedMainHeight + "px");
        canvasDocument.documentElement.style.setProperty("--header-utility-height", refreshedUtilityHeight + "px");
        canvasDocument.documentElement.style.setProperty("--header-total-height", (refreshedMainHeight + refreshedUtilityHeight) + "px");
        header.style.setProperty("--header-main-height", refreshedMainHeight + "px");
        header.style.setProperty("--header-utility-height", refreshedUtilityHeight + "px");
        header.style.setProperty("--header-total-height", (refreshedMainHeight + refreshedUtilityHeight) + "px");
        canvasDocument.dispatchEvent(new canvasWindow.CustomEvent("dq:gnb-changed"));
        applyElementOverrides();
        resetCanvasHeaderPosition();
      });
    }

    function pushHistory() {
      var serialized = JSON.stringify(state);
      if (history[historyIndex] === serialized) return;
      history = history.slice(0, historyIndex + 1);
      history.push(serialized);
      historyIndex = history.length - 1;
      updateHistoryButtons();
    }

    function updateHistoryButtons() {
      builder.querySelector('[data-history="undo"]').disabled = historyIndex <= 0;
      builder.querySelector('[data-history="redo"]').disabled = historyIndex >= history.length - 1;
    }

    function restoreHistory(index) {
      if (index < 0 || index >= history.length) return;
      historyIndex = index;
      state = JSON.parse(history[historyIndex]);
      applyState();
      resetCanvasHeaderPosition();
      renderInspector();
      updateHistoryButtons();
    }

    function field(label, input) {
      return '<label class="builder-field"><span>' + label + "</span>" + input + "</label>";
    }

    function colorField(label, path, value) {
      return field(label, '<input type="color" data-bind="' + path + '" value="' + escapeHtml(value) + '">');
    }

    function rangeField(label, path, value, min, max, unit) {
      return '<label class="builder-field builder-field--range"><span>' + label + '<output>' + escapeHtml(value) + unit + '</output></span><div class="builder-range-controls"><input type="range" data-bind="' + path + '" data-range-control="slider" value="' + escapeHtml(value) + '" min="' + min + '" max="' + max + '" step="1"><span class="builder-range-number"><input type="number" data-bind="' + path + '" data-range-control="number" value="' + escapeHtml(value) + '" min="' + min + '" max="' + max + '" step="1" aria-label="' + escapeHtml(label) + ' 직접 입력"><em>' + unit + '</em></span></div></label>';
    }

    function switchField(label, path, checked) {
      return '<label class="builder-switch"><span>' + label + '</span><input type="checkbox" data-bind="' + path + '"' + (checked ? " checked" : "") + '><i></i></label>';
    }

    function inspectorSection(title, description, body) {
      return '<section class="builder-inspector-section"><div class="builder-inspector-section__head"><strong>' + title + '</strong><p>' + description + '</p></div><div class="builder-inspector-section__body">' + body + "</div></section>";
    }

    function renderThemeInspector() {
      inspectorTitle.textContent = "전체 테마";
      var data = ensureThemeData(state.theme);
      var presets = Object.keys(THEME_PRESETS).map(function (key) {
        var preset = THEME_PRESETS[key];
        return '<label class="builder-theme-preset"><input type="radio" name="design-theme" data-bind="theme.designStyle" value="' + key + '"' + (data.designStyle === key ? ' checked' : '') + '><span><i><b style="background:' + preset.color1 + '"></b><b style="background:' + preset.color2 + '"></b><b style="background:' + preset.color3 + '"></b></i><strong>' + preset.label + '</strong><small>' + preset.description + '</small></span></label>';
      }).join("");
      var preview = '<div class="builder-theme-preview"><i style="background:' + data.color1 + '"></i><i style="background:' + data.color2 + '"></i><i style="background:' + data.color3 + '"></i></div>';
      return inspectorSection("전체 디자인 테마", "색상·배경·카드·버튼·모션 분위기를 한 번에 바꿉니다.", '<div class="builder-theme-presets">' + presets + '</div>' + (data.designStyle === "custom" ? '<p class="builder-empty">현재 개별 조정된 사용자 테마입니다.</p>' : '')) +
        inspectorSection("테마 팔레트", "프리셋 적용 후 프로젝트 색상에 맞게 다시 조정할 수 있습니다.", preview + colorField("테마색 1 · 주색", "theme.color1", data.color1) + colorField("테마색 2 · 진한 배경", "theme.color2", data.color2) + colorField("테마색 3 · 강조색", "theme.color3", data.color3) + switchField("사이트맵에 테마 자동 적용", "theme.applyToSitemap", data.applyToSitemap !== false)) +
        inspectorSection("적용 범위", "테마색은 GNB 상태·막대기·호버와 사이트맵 기본 배경·포인트에 적용됩니다.", '<p class="builder-empty">개별 메뉴나 사이트맵에서 설정한 값은 이후 별도로 조정할 수 있습니다.</p>');
    }

    function renderThemeFontInspector() {
      inspectorTitle.textContent = "사이트 폰트";
      var data = state.theme;
      var fontOptions = FONT_OPTIONS.map(function (fontName) {
        return '<option value="' + escapeHtml(fontName) + '"' + (data.fontFamily === fontName ? " selected" : "") + ' style="font-family: &quot;' + escapeHtml(fontName) + '&quot;">' + escapeHtml(fontName) + '</option>';
      }).join("");
      return inspectorSection("사이트 폰트", "업로드한 폰트 CSS에서 선택합니다.", field("기본 폰트", '<select data-bind="theme.fontFamily">' + fontOptions + '</select>') + '<p class="builder-font-sample" style="font-family: &quot;' + escapeHtml(data.fontFamily) + '&quot;">가나다라마바사 ABC 123</p>');
    }

    function renderThemeLayoutInspector() {
      inspectorTitle.textContent = "레이아웃";
      var data = state.theme;
      return inspectorSection("콘텐츠 레이아웃", "사이트 콘텐츠의 공통 폭을 설정합니다.", rangeField("콘텐츠 최대 너비", "theme.contentMaxWidth", data.contentMaxWidth, 960, 1600, "px"));
    }

    function renderThemeComponentsInspector() {
      inspectorTitle.textContent = "컴포넌트";
      var data = state.theme;
      var radiusSelect = field("모서리 스타일", '<select data-bind="theme.radiusStyle"><option value="square"' + (data.radiusStyle === "square" ? " selected" : "") + '>각지게</option><option value="soft"' + (data.radiusStyle === "soft" ? " selected" : "") + '>부드럽게</option><option value="round"' + (data.radiusStyle === "round" ? " selected" : "") + '>둥글게</option></select>');
      var buttonSelect = field("버튼 스타일", '<select data-bind="theme.buttonStyle"><option value="outline"' + (data.buttonStyle === "outline" ? " selected" : "") + '>외곽선</option><option value="filled"' + (data.buttonStyle === "filled" ? " selected" : "") + '>채움</option><option value="gradient"' + (data.buttonStyle === "gradient" ? " selected" : "") + '>테마 혼합</option></select>');
      return inspectorSection("컴포넌트 스타일", "사이트 전반의 형태와 버튼 표현", radiusSelect + buttonSelect);
    }

    function renderThemeMotionInspector() {
      inspectorTitle.textContent = "모션";
      var data = state.theme;
      var motionSelect = field("애니메이션 강도", '<select data-bind="theme.motionStyle"><option value="none"' + (data.motionStyle === "none" ? " selected" : "") + '>없음</option><option value="soft"' + (data.motionStyle === "soft" ? " selected" : "") + '>부드럽게</option><option value="emphasis"' + (data.motionStyle === "emphasis" ? " selected" : "") + '>강조</option></select>');
      return inspectorSection("모션", "메뉴와 주요 컴포넌트의 움직임", motionSelect);
    }

    function renderHeaderInspector() {
      inspectorTitle.textContent = "헤더 기본 스타일";
      var data = state.header;
      return inspectorSection("배경", "헤더 전체의 배경과 투명도", colorField("배경색", "header.background", data.background) + rangeField("투명도", "header.opacity", data.opacity, 0, 100, "%")) +
        inspectorSection("크기", "사이트 폭과 헤더 높이", rangeField("최대 너비", "header.maxWidth", data.maxWidth, 960, 1920, "px") + rangeField("헤더 높이", "header.height", data.height, 64, 120, "px")) +
        inspectorSection("스크롤 동작", "모든 화면 크기와 편집 미리보기에 동일하게 적용됩니다.", switchField("헤더 스크롤 다운 시 숨기기", "header.hideOnScroll", data.hideOnScroll !== false));
    }

    function renderUtilityInspector() {
      inspectorTitle.textContent = "유틸리티";
      var data = state.header.utility;
      var items = data.items.map(function (item) {
        var control;
        if (item.type === "html") control = '<textarea data-utility-field="html" aria-label="HTML 코드">' + escapeHtml(item.html || "") + '</textarea>';
        else if (item.type === "button") control = '<div class="builder-utility-fields"><input type="text" value="' + escapeHtml(item.label) + '" data-utility-field="label" aria-label="버튼명"><input type="text" value="' + escapeHtml(item.href || "#") + '" data-utility-field="href" aria-label="버튼 링크"></div>';
        else control = '<input type="text" value="' + escapeHtml(item.label) + '" data-utility-field="label" aria-label="유틸리티 문구">';
        return '<div class="builder-collection-row' + (item.type === "html" ? ' is-html' : '') + '" data-utility-id="' + item.id + '">' + icon("drag") + control + '<button type="button" data-remove-utility="' + item.id + '" aria-label="삭제">' + icon("delete") + "</button></div>";
      }).join("");

      return inspectorSection("영역", "상단 안내 영역 표시 설정", switchField("유틸리티 사용", "header.utility.visible", data.visible) + switchField("태블릿·모바일에서도 표시", "header.utility.mobileVisible", data.mobileVisible)) +
        inspectorSection("스타일", "배경과 글자색", colorField("배경색", "header.utility.background", data.background) + rangeField("투명도", "header.utility.opacity", data.opacity, 0, 100, "%") + colorField("글자색", "header.utility.color", data.color)) +
        inspectorSection("요소", "문구·링크·안전한 HTML을 관리합니다.", '<div class="builder-collection">' + (items || '<p class="builder-empty">등록된 요소가 없습니다.</p>') + '</div><div class="builder-add-row"><button type="button" data-add-utility="text">' + icon("add") + '문구</button><button type="button" data-add-utility="button">' + icon("add") + '버튼</button><button type="button" data-add-utility="html">' + icon("add") + "HTML</button></div>");
    }

    function renderLogoInspector() {
      inspectorTitle.textContent = "로고";
      var data = state.header.logo;
      var resolvedImage = data.imagePath ? resolveLogoPath(data.imagePath) : "";
      var imageControl = '<div class="builder-logo-upload">' + (data.useImage && resolvedImage ? '<img src="' + escapeHtml(resolvedImage) + '" alt="로고 미리보기">' : '<span>등록된 이미지 로고가 없습니다.</span>') + '<small>JPG·PNG·GIF·WEBP 이미지를 업로드하면 헤더 로고로 바로 적용됩니다.</small><div class="builder-logo-upload__actions"><label><span>' + (data.imagePath ? '로고 이미지 교체' : '로고 이미지 업로드') + '</span><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-logo-upload="header"></label><button type="button" data-remove-logo-image' + (data.imagePath ? '' : ' disabled') + '>이미지 삭제</button></div></div>';
      return inspectorSection("콘텐츠", "텍스트 로고를 유지하거나 이미지를 직접 업로드합니다.", field("로고 텍스트 / 이미지 alt", '<input type="text" data-bind="header.logo.text" value="' + escapeHtml(data.text) + '">') + field("링크", '<input type="text" data-bind="header.logo.href" value="' + escapeHtml(data.href) + '">') + imageControl) +
        inspectorSection("크기", "이미지는 자동 축소되고 텍스트는 기기별로 조절합니다.", rangeField("이미지 너비", "header.logo.imageWidth", data.imageWidth, 60, 400, "px") + colorField("텍스트 색상", "header.logo.color", data.color) + rangeField("데스크톱 텍스트", "header.logo.size", data.size, 16, 42, "px") + rangeField("태블릿·모바일 텍스트", "header.logo.mobileSize", data.mobileSize, 14, 30, "px"));
    }

    function renderNavigationInspector() {
      inspectorTitle.textContent = "내비게이션";
      var data = state.header.navigation;
      if (!selectedMenuId && data.items.length) selectedMenuId = data.items[0].id;
      var selected = data.items.find(function (item) { return item.id === selectedMenuId; });
      var rows = data.items.map(function (item, index) {
        return '<div class="builder-menu-row' + (item.id === selectedMenuId ? " is-selected" : "") + '" data-menu-id="' + item.id + '">' +
          '<button type="button" class="builder-menu-row__select" data-select-menu="' + item.id + '">' + icon("drag") + '<span>' + escapeHtml(item.label) + '</span></button>' +
          '<div class="builder-menu-row__actions"><button type="button" data-move-menu="up" aria-label="위로 이동"' + (index === 0 ? " disabled" : "") + '>' + icon("chevron-up", "site") + '</button><button type="button" data-move-menu="down" aria-label="아래로 이동"' + (index === data.items.length - 1 ? " disabled" : "") + '>' + icon("chevron-down", "site") + '</button><button type="button" data-remove-menu="' + item.id + '" aria-label="삭제">' + icon("delete") + "</button></div></div>";
      }).join("");
      var newWindowSwitch = selected ? switchField("새 창으로 열기 " + icon("external", "site"), "selectedMenu.newWindow", selected.newWindow).replace('data-bind="selectedMenu.newWindow"', 'data-menu-field="newWindow"') : "";
      var details = selected ? field("메뉴명", '<input type="text" data-menu-field="label" value="' + escapeHtml(selected.label) + '">') + field("링크", '<input type="text" data-menu-field="href" value="' + escapeHtml(selected.href) + '">') + newWindowSwitch : '<p class="builder-empty">메뉴를 추가해 주세요.</p>';
      var depthRows = "";
      if (selected) {
        depthRows = selected.children.map(function (depth2) {
          var depth3Rows = (depth2.children || []).map(function (depth3) {
            return '<div class="builder-depth3-row" data-depth3-id="' + depth3.id + '"><input type="text" data-depth-field="label" value="' + escapeHtml(depth3.label) + '" aria-label="3뎁스 메뉴명"><input type="text" data-depth-field="href" value="' + escapeHtml(depth3.href) + '" aria-label="3뎁스 링크"><button type="button" data-remove-depth3 aria-label="3뎁스 삭제">' + icon("delete") + '</button></div>';
          }).join("");
          return '<div class="builder-depth-card" data-depth2-id="' + depth2.id + '"><div class="builder-depth-card__head"><strong>2뎁스</strong><button type="button" data-remove-depth2 aria-label="2뎁스 삭제">' + icon("delete") + '</button></div>' + field("메뉴명", '<input type="text" data-depth-field="label" value="' + escapeHtml(depth2.label) + '">') + field("링크", '<input type="text" data-depth-field="href" value="' + escapeHtml(depth2.href) + '">') + '<div class="builder-depth3-list">' + depth3Rows + '</div><button type="button" class="builder-sub-add" data-add-depth3>' + icon("add") + '3뎁스 추가</button></div>';
        }).join("");
      }
      var modeSelect = field("메뉴 열림 방식", '<select data-bind="header.navigation.mode"><option value="single"' + (data.mode === "single" ? " selected" : "") + '>개별 드롭다운</option><option value="single-full"' + (data.mode === "single-full" ? " selected" : "") + '>선택 메뉴 전체 폭</option><option value="all"' + (data.mode === "all" ? " selected" : "") + '>전체 메뉴 한 번에</option></select>');
      var indicatorStyle = /^(?:underline|overline|side|pill|dot)$/.test(data.indicatorStyle) ? data.indicatorStyle : "underline";
      var indicatorSelect = field("1뎁스 오버 표시", '<select data-bind="header.navigation.indicatorStyle"><option value="underline"' + (indicatorStyle === "underline" ? " selected" : "") + '>하단 바</option><option value="overline"' + (indicatorStyle === "overline" ? " selected" : "") + '>상단 바</option><option value="side"' + (indicatorStyle === "side" ? " selected" : "") + '>좌측 표시</option><option value="pill"' + (indicatorStyle === "pill" ? " selected" : "") + '>배경 강조</option><option value="dot"' + (indicatorStyle === "dot" ? " selected" : "") + '>하단 점</option></select><small>마우스 오버·키보드 포커스·열린 메뉴에 동일하게 표시됩니다.</small>') + switchField("테마 1번 색상 사용", "header.navigation.indicatorUseTheme", data.indicatorUseTheme !== false) + (data.indicatorUseTheme === false ? colorField("오버 표시 색상", "header.navigation.indicatorColor", data.indicatorColor || state.theme.color1) : '<p class="builder-empty">현재 테마 1번 색상이 자동 적용됩니다.</p>');

      return inspectorSection("동작", "사이트에 맞는 펼침 방식과 1뎁스 오버 표시를 선택합니다.", modeSelect + indicatorSelect + switchField("편집 중 메뉴 펼쳐 보기", "header.navigation.previewOpen", data.previewOpen === true) + '<small>체크하면 선택한 1뎁스의 호버 상태를 유지해 열린 메뉴를 보면서 수정할 수 있습니다.</small>') +
        inspectorSection("1뎁스 메뉴", "목록은 독립적으로 스크롤됩니다.", '<div class="builder-menu-manager"><div class="builder-menu-list">' + rows + '</div><button type="button" class="builder-menu-add" data-add-menu>' + icon("add") + "1뎁스 추가</button></div>") +
        inspectorSection("2·3뎁스", "선택한 1뎁스의 하위 메뉴", '<div class="builder-depth-manager"><div class="builder-depth-list">' + (depthRows || '<p class="builder-empty">등록된 하위 메뉴가 없습니다.</p>') + '</div>' + (selected ? '<button type="button" class="builder-sub-add is-depth2" data-add-depth2>' + icon("add") + '2뎁스 추가</button>' : '') + '</div>') +
        inspectorSection("선택한 1뎁스", "메뉴명·링크·새 창 설정", details) +
        inspectorSection("타이포그래피", "메뉴 깊이별 글자색과 크기", colorField("1뎁스 글자색", "header.navigation.color", data.color) + rangeField("1뎁스 글자 크기", "header.navigation.size", data.size, 13, 24, "px") + colorField("2뎁스 글자색", "header.navigation.depth2Color", data.depth2Color) + rangeField("2뎁스 글자 크기", "header.navigation.depth2Size", data.depth2Size, 12, 22, "px") + colorField("3뎁스 글자색", "header.navigation.depth3Color", data.depth3Color) + rangeField("3뎁스 글자 크기", "header.navigation.depth3Size", data.depth3Size, 11, 20, "px"));
    }

    function renderSitemapInspector() {
      inspectorTitle.textContent = "사이트맵";
      var data = state.header.sitemap;
      var layoutSelect = field("메뉴 배치", '<select data-bind="header.sitemap.layout"><option value="horizontal"' + (data.layout === "horizontal" ? " selected" : "") + '>가로 배치</option><option value="vertical"' + (data.layout === "vertical" ? " selected" : "") + '>세로 배치</option></select>');
      return inspectorSection("스타일", "전체 화면 사이트맵의 배경과 제목", colorField("배경색", "header.sitemap.background", data.background) + field("제목 문구", '<input type="text" data-bind="header.sitemap.title" value="' + escapeHtml(data.title) + '">') + colorField("1뎁스 글자색", "header.sitemap.depth1Color", data.depth1Color) + colorField("2·3뎁스 글자색", "header.sitemap.depth23Color", data.depth23Color)) +
        inspectorSection("메뉴 레이아웃", "1뎁스 메뉴의 배치 방향을 선택합니다.", layoutSelect) +
        inspectorSection("스크롤", "메뉴가 길어지면 사이트맵 전체 영역이 하나로 스크롤됩니다.", '<p class="builder-empty">각 메뉴 내부에는 별도 스크롤이 생기지 않습니다.</p>');
    }

    function renderActionsInspector() {
      inspectorTitle.textContent = "우측 버튼";
      var data = state.header.actions;
      var availableIcons = ["user", "login", "logout", "home", "search", "sitemap", "external", "download", "play", "pause"];
      var actionItems = (data.items || []).map(function (action, index) {
        var iconOptions = availableIcons.map(function (iconName) {
          return '<label class="builder-icon-option" title="' + iconName + '"><input type="radio" name="action-icon-' + action.id + '" data-action-field="icon" value="' + iconName + '"' + (action.icon === iconName ? " checked" : "") + '><span>' + icon(iconName, "site") + '</span></label>';
        }).join("");
        return '<div class="builder-action-card" data-action-id="' + action.id + '"><div class="builder-action-card__head"><strong>' + icon(action.icon, "site") + escapeHtml(action.label) + '</strong><div class="builder-action-card__controls"><button type="button" data-move-action="up" aria-label="위로 이동"' + (index === 0 ? ' disabled' : '') + '>' + icon("chevron-up", "site") + '</button><button type="button" data-move-action="down" aria-label="아래로 이동"' + (index === data.items.length - 1 ? ' disabled' : '') + '>' + icon("chevron-down", "site") + '</button><button type="button" data-remove-action aria-label="버튼 삭제">' + icon("delete") + '</button></div></div>' + field("버튼명", '<input type="text" data-action-field="label" value="' + escapeHtml(action.label) + '">') + field("링크", '<input type="text" data-action-field="href" value="' + escapeHtml(action.href) + '">') + '<div class="builder-field"><span>아이콘 선택</span><div class="builder-icon-picker">' + iconOptions + '</div></div>' + switchField("새 창으로 열기", "customAction.newWindow", action.newWindow).replace('data-bind="customAction.newWindow"', 'data-action-field="newWindow"') + '</div>';
      }).join("");
      var searchMode = data.searchMode === "link" ? "link" : "panel";
      var searchSettings = field("검색 버튼 동작", '<select data-bind="header.actions.searchMode"><option value="panel"' + (searchMode === "panel" ? " selected" : "") + '>검색창 열기</option><option value="link"' + (searchMode === "link" ? " selected" : "") + '>링크 이동</option></select>') + field(searchMode === "link" ? "이동 주소" : "검색 결과 주소", '<input type="text" data-bind="header.actions.searchHref" value="' + escapeHtml(data.searchHref || "#") + '" placeholder="/search 또는 https://..."><small>' + (searchMode === "link" ? "아이콘을 누르면 이 주소로 바로 이동합니다." : "검색어는 q 파라미터로 이 주소에 전달됩니다.") + '</small>');
      return inspectorSection("기본 버튼", "검색 버튼은 링크 또는 펼쳐지는 검색창으로 사용할 수 있습니다.", switchField(icon("search", "site") + "검색", "header.actions.search", data.search) + searchSettings + switchField(icon("sitemap", "site") + "사이트맵", "header.actions.sitemap", data.sitemap)) +
        inspectorSection("버튼 스타일", "기본 버튼과 추가 버튼에 함께 적용됩니다.", switchField("외곽선 표시", "header.actions.style.borderVisible", data.style.borderVisible) + colorField("외곽선 색상", "header.actions.style.borderColor", data.style.borderColor) + colorField("배경색", "header.actions.style.background", data.style.background) + colorField("아이콘 색상", "header.actions.style.color", data.style.color) + rangeField("버튼 크기", "header.actions.style.size", data.style.size, 32, 64, "px") + rangeField("아이콘 크기", "header.actions.style.iconSize", data.style.iconSize, 14, 34, "px") + rangeField("모서리", "header.actions.style.radius", data.style.radius, 0, 32, "px")) +
        inspectorSection("추가 버튼", "아이콘·링크를 가진 버튼을 추가합니다.", '<div class="builder-action-list">' + (actionItems || '<p class="builder-empty">추가한 버튼이 없습니다.</p>') + '</div><button type="button" class="builder-sub-add" data-add-action>' + icon("add") + '버튼 추가</button>');
    }

    function renderFooterInspector() {
      inspectorTitle.textContent = "푸터 기본 스타일";
      var data = state.footer;
      return inspectorSection("스타일", "푸터 전체의 폭·배경·글자색", rangeField("최대 너비", "footer.maxWidth", data.maxWidth, 960, 1920, "px") + colorField("배경색", "footer.background", data.background) + colorField("글자색", "footer.color", data.color) + rangeField("푸터 본문 높이", "footer.height", data.height, 120, 360, "px"));
    }

    function renderFooterLogoInspector() {
      inspectorTitle.textContent = "푸터 로고";
      var data = state.footer;
      var resolvedImage = data.logo.imagePath ? resolveLogoPath(data.logo.imagePath) : "";
      var imageControl = '<div class="builder-logo-upload">' + (data.logo.useImage && resolvedImage ? '<img src="' + escapeHtml(resolvedImage) + '" alt="푸터 로고 미리보기">' : '<span>등록된 이미지 로고가 없습니다.</span>') + '<small>JPG·PNG·GIF·WEBP 이미지를 업로드하면 푸터 로고로 바로 적용됩니다.</small><div class="builder-logo-upload__actions"><label><span>' + (data.logo.imagePath ? '로고 이미지 교체' : '로고 이미지 업로드') + '</span><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-logo-upload="footer"></label><button type="button" data-remove-footer-logo-image' + (data.logo.imagePath ? '' : ' disabled') + '>이미지 삭제</button></div></div>';
      return inspectorSection("로고", "텍스트 로고를 유지하거나 이미지를 직접 업로드합니다.", field("로고 텍스트 / 이미지 alt", '<input type="text" data-bind="footer.logo.text" value="' + escapeHtml(data.logo.text) + '">') + imageControl + rangeField("이미지 너비", "footer.logo.imageWidth", data.logo.imageWidth, 60, 400, "px"));
    }

    function renderFooterRelatedInspector() {
      inspectorTitle.textContent = "관련 사이트";
      var data = state.footer;
      return inspectorSection("관련 사이트", "관련 사이트 선택 영역의 표시 여부", switchField("관련 사이트 노출", "footer.related.visible", data.related.visible));
    }

    function subStyleSelect(label, bind, value, options) {
      return field(label, '<select data-bind="' + bind + '">' + options.map(function (option) {
        return '<option value="' + option[0] + '"' + (value === option[0] ? ' selected' : '') + '>' + option[1] + '</option>';
      }).join("") + '</select>');
    }

    function renderSubpageCommonInspector() {
      inspectorTitle.textContent = "서브 공통 요소";
      var data = state.subpage || (state.subpage = captureSubpageState());
      var visualBackground = '<div class="builder-logo-upload">' + (data.visualBackgroundImage ? '<img src="' + escapeHtml(data.visualBackgroundImage) + '" alt="서브페이지 제목 배경 미리보기">' : '<span>등록된 배경 이미지가 없습니다.</span>') + '<small>업로드한 이미지는 서브페이지 제목 영역의 중앙에 맞춰 자동으로 채워집니다.</small><div class="builder-logo-upload__actions"><label><span>' + (data.visualBackgroundImage ? '배경 이미지 교체' : '배경 이미지 업로드') + '</span><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-sub-visual-upload></label><button type="button" data-remove-sub-visual-image' + (data.visualBackgroundImage ? '' : ' disabled') + '>이미지 삭제</button></div></div>';
      return inspectorSection("상단 공통 요소", "기존 구조를 유지하면서 각 요소의 배치와 여백을 바꿉니다.",
        subStyleSelect("기본 폰트 크기", "subpage.fontScale", data.fontScale, [["large", "크게"], ["normal", "보통"], ["small", "작게"]]) +
        visualBackground +
        switchField("배경 이미지 필터 사용", "subpage.visualFilterEnabled", data.visualFilterEnabled !== false) +
        subStyleSelect("배경 이미지 필터", "subpage.visualFilterStyle", data.visualFilterStyle || "theme", [["theme", "01 테마색"], ["dark", "02 어둡게"], ["muted", "03 흐리게"], ["light", "04 밝게"], ["contrast", "05 강한 대비"]]) +
        subStyleSelect("서브페이지 제목", "subpage.visualStyle", data.visualStyle, [["gradient", "01 그라데이션 비주얼"], ["split", "02 좌우 분할"], ["minimal", "03 미니멀 여백형"], ["band", "04 테마 컬러 밴드"], ["outline", "05 아웃라인 카드형"]]) +
        subStyleSelect("현재 위치", "subpage.breadcrumbStyle", data.breadcrumbStyle, [["bar", "01 기본 하단 바"], ["floating", "02 비주얼 겹침형"], ["boxed", "03 항목 박스형"], ["minimal", "04 미니멀 텍스트형"], ["steps", "05 단계 강조형"]]) +
        subStyleSelect("콘텐츠 제목", "subpage.headingStyle", data.headingStyle, [["line", "01 하단 라인"], ["accent", "02 좌측 포인트"], ["center", "03 가운데 정렬"], ["box", "04 배경 박스"], ["side", "05 번호·사이드형"]]));
    }

    function renderSubpageContentsInspector() {
      inspectorTitle.textContent = "개별 콘텐츠";
      return inspectorSection("새 콘텐츠 생성", "본문 맨 아래와 좌측 개별 콘텐츠 하위에 새 형제 메뉴를 만듭니다.", '<button type="button" class="builder-sub-content-create" data-sub-content-create><strong>+ 새 콘텐츠 생성</strong><span>HTML · CSS · JS 편집기와 content 폴더 파일을 함께 생성합니다.</span></button>');
    }

    function subBulletUploadField(key, label, value) {
      return '<div class="builder-sub-bullet-upload"><strong>' + label + '</strong><div class="builder-sub-bullet-upload__preview">' +
        (value ? '<img src="' + escapeHtml(value) + '" alt="적용 중인 블릿 이미지">' : '<span>기본 블릿 사용 중</span>') + '</div><div class="builder-content-image-field">' +
        '<label><span>' + (value ? '블릿 이미지 변경' : '블릿 이미지 업로드') + '</span><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-sub-bullet-upload="' + key + '"></label>' +
        (value ? '<button type="button" data-sub-bullet-remove="' + key + '">이미지 삭제</button>' : '') +
        '</div></div>';
    }

    function renderSubpageContentItemInspector() {
      var data = state.subpage || (state.subpage = captureSubpageState());
      var blocks = data.blocks || [];
      var selected = blocks.find(function (block) { return block.id === selectedSubContentId; }) || blocks[0] || null;
      if (!selected) {
        inspectorTitle.textContent = "개별 콘텐츠";
        return inspectorSection("콘텐츠 없음", "개별 콘텐츠 메뉴에서 새 콘텐츠를 생성해 주세요.", '<p class="builder-empty">편집할 콘텐츠가 없습니다.</p>');
      }
      selectedSubContentId = selected.id;
      inspectorTitle.textContent = selected.title || selected.label;
      if (selected.type === "basic") {
        return inspectorSection("본문 타이틀 · 목록 블릿", "기본 UI 콘텐츠에 사용할 블릿을 고르거나 각 항목에 직접 업로드한 아이콘 이미지를 적용합니다.",
            subStyleSelect("레벨 2 타이틀", "subpage.title2Style", data.title2Style, [["symbol", "01 테마 심볼"], ["bar", "02 세로 막대"], ["underline", "03 제목 밑줄"], ["box", "04 배경 라벨"], ["diamond", "05 다이아몬드"], ["image", "06 업로드 아이콘"]]) +
            subBulletUploadField("title2", "레벨 2 아이콘 이미지", data.title2Image) +
            subStyleSelect("레벨 3 타이틀", "subpage.title3Style", data.title3Style, [["dot", "01 원형 점"], ["dash", "02 짧은 선"], ["diamond", "03 다이아몬드"], ["line", "04 테마 밑줄"], ["pill", "05 필 라벨"], ["image", "06 업로드 아이콘"]]) +
            subBulletUploadField("title3", "레벨 3 아이콘 이미지", data.title3Image) +
            subStyleSelect("목록 블릿", "subpage.listStyle", data.listStyle, [["bar", "01 계층 막대"], ["dot", "02 원형 점"], ["check", "03 체크 표시"], ["diamond", "04 다이아몬드"], ["square", "05 사각형"], ["image", "06 업로드 아이콘"]]) +
            subBulletUploadField("list", "목록 아이콘 이미지", data.listImage));
      }
      var index = blocks.indexOf(selected);
      var fileInfo = selected.type === "basic"
        ? '<p class="builder-empty">기본 UI 원본은 content/0content-ui.html을 불러와 페이지에 적용합니다.</p>'
        : field("생성 파일명", '<input type="text" data-sub-content-field="fileName" value="' + escapeHtml(selected.fileName || "") + '" placeholder="my-content.html"><small>/page/dq-builder/content/ 안에 저장됩니다.</small>');
      var actions = '<div class="builder-sub-content-item-actions" data-sub-content-id="' + selected.id + '">' +
        '<button type="button" data-sub-content-move="up"' + (index === 0 ? ' disabled' : '') + '>위로</button>' +
        '<button type="button" data-sub-content-move="down"' + (index === blocks.length - 1 ? ' disabled' : '') + '>아래로</button>' +
        '<button type="button" class="builder-element-remove" data-sub-content-remove aria-label="콘텐츠 삭제">삭제</button></div>';
      var imageUpload = '<div class="builder-sub-content-image-upload"><div class="builder-content-image-field">' +
        '<input type="text" data-sub-content-image-url value="' + escapeHtml(selected.assetImage || "") + '" placeholder="업로드하면 사용할 이미지 주소가 생성됩니다" readonly>' +
        '<label><span>이미지 업로드</span><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-sub-content-image-upload></label>' +
        (selected.assetImage ? '<button type="button" data-copy-upload-url="' + escapeHtml(selected.assetImage) + '">주소 복사</button>' : '') + '</div><small>생성된 주소를 복사해 HTML의 &lt;img src=&quot;...&quot;&gt;에 넣어 사용하세요.</small></div>';
      return inspectorSection("콘텐츠 설정", "각 하위 메뉴는 독립된 편집기와 파일을 가집니다.",
          field("콘텐츠 제목", '<input type="text" data-sub-content-field="title" value="' + escapeHtml(selected.title || selected.label) + '">') + fileInfo + actions) +
        inspectorSection("콘텐츠 이미지", "이미지를 업로드하면 서버 저장 주소를 자동 생성합니다.", imageUpload) +
        inspectorSection("HTML", "콘텐츠 마크업", field("HTML 소스", '<textarea rows="15" spellcheck="false" data-sub-content-field="html">' + escapeHtml(selected.html || "") + '</textarea>')) +
        inspectorSection("CSS", "이 콘텐츠에만 함께 저장되는 스타일", field("CSS 소스", '<textarea rows="10" spellcheck="false" data-sub-content-field="css">' + escapeHtml(selected.css || "") + '</textarea>')) +
        inspectorSection("JS", "root는 현재 콘텐츠 영역을 가리킵니다.", field("JS 소스", '<textarea rows="10" spellcheck="false" data-sub-content-field="js" placeholder="root.querySelector(...) 사용 가능">' + escapeHtml(selected.js || "") + '</textarea>'));
    }

    function handleSubpageClick(event) {
      if (!isSubPage || !state || !state.subpage) return false;
      var add = event.target.closest("[data-sub-content-create]");
      var select = event.target.closest("[data-sub-content-select]");
      var remove = event.target.closest("[data-sub-content-remove]");
      var move = event.target.closest("[data-sub-content-move]");
      var bulletRemove = event.target.closest("[data-sub-bullet-remove]");
      var visualRemove = event.target.closest("[data-remove-sub-visual-image]");
      if (!add && !select && !remove && !move && !bulletRemove && !visualRemove) return false;
      var blocks = state.subpage.blocks || (state.subpage.blocks = []);
      if (visualRemove) {
        state.subpage.visualBackgroundImage = "";
      } else if (bulletRemove) {
        var bulletKey = bulletRemove.dataset.subBulletRemove;
        state.subpage[bulletKey + "Image"] = "";
        if (state.subpage[bulletKey + "Style"] === "image") state.subpage[bulletKey + "Style"] = bulletKey === "title2" ? "symbol" : bulletKey === "title3" ? "dot" : "bar";
      } else if (add) {
        var blockId = unique("subcontent");
        var number = blocks.filter(function (block) { return block.type !== "basic"; }).length + 1;
        var title = "새로 생성한 콘텐츠 " + number;
        var newBlock = { id: blockId, type: "custom", label: title, title: title, html: defaultSubContentHtml(title), css: "", js: "", fileName: "content-" + Date.now().toString(36) + ".html", assetImage: "", saveAsFile: true };
        blocks.push(newBlock);
        selectedSubContentId = blockId;
        selectedLayer = "subpage-content-item";
        window.sessionStorage.setItem(uploadRecoveryKey, JSON.stringify({
          expires: Date.now() + 15000,
          state: state,
          selectedLayer: selectedLayer,
          selectedContentSectionId: selectedContentSectionId,
          selectedSubContentId: selectedSubContentId,
          recoveryKind: "content-create"
        }));
        window.setTimeout(function () { window.sessionStorage.removeItem(uploadRecoveryKey); }, 5000);
        createSubContentFile(newBlock).then(function () {
          showToast(newBlock.fileName + " 파일을 생성했습니다.");
        }).catch(function (error) {
          showToast("콘텐츠 파일 생성 실패: " + error.message);
        });
      } else {
        var row = event.target.closest("[data-sub-content-id]");
        var index = row ? blocks.findIndex(function (block) { return block.id === row.dataset.subContentId; }) : -1;
        if (select && index > -1) {
          selectedSubContentId = blocks[index].id;
          renderInspector();
          return true;
        }
        if (remove && index > -1) {
          if (selectedSubContentId === blocks[index].id) selectedSubContentId = null;
          blocks.splice(index, 1);
          selectedLayer = "subpage-contents";
        }
        if (move && index > -1) {
          var nextIndex = index + (move.dataset.subContentMove === "up" ? -1 : 1);
          if (nextIndex >= 0 && nextIndex < blocks.length) {
            var moved = blocks.splice(index, 1)[0];
            blocks.splice(nextIndex, 0, moved);
          }
        }
      }
      applySubpageState();
      pushHistory();
      renderInspector();
      return true;
    }

    function handleSubpageInput(event) {
      if (!isSubPage || !state || !state.subpage) return false;
      var fieldName = event.target.dataset.subContentField;
      var checkName = event.target.dataset.subContentCheck;
      if (!fieldName && !checkName) return false;
      var block = state.subpage.blocks.find(function (item) { return item.id === selectedSubContentId; });
      if (!block) return false;
      if (fieldName) {
        block[fieldName] = event.target.value;
        if (fieldName === "title") {
          block.label = event.target.value || "개별 콘텐츠";
          var layerLabel = builder.querySelector('[data-sub-content-layer-item="' + block.id + '"] > span:last-child');
          if (layerLabel) layerLabel.textContent = block.label;
          inspectorTitle.textContent = block.label;
        }
      } else if (checkName) {
        block[checkName] = event.target.checked;
        if (checkName === "saveAsFile" && block.saveAsFile && !block.fileName) block.fileName = "content-" + Date.now().toString(36) + ".html";
      }
      applySubpageState();
      return true;
    }

    function renderContentInspector() {
      inspectorTitle.textContent = "섹션 구성";
      var content = state.content || (state.content = { sections: [] });
      var sections = content.sections || (content.sections = []);
      var selected = sections.find(function (section) { return section.id === selectedContentSectionId; }) || sections[0] || null;
      if (selected && selectedContentSectionId !== selected.id) selectedContentSectionId = selected.id;
      var listHtml = sections.map(function (section, index) {
        return '<div class="builder-content-section-row' + (selected && selected.id === section.id ? ' is-selected' : '') + '" data-content-section-id="' + section.id + '">' +
          '<button type="button" data-content-select><span>' + (index + 1) + '</span><strong>' + escapeHtml(section.name) + '</strong><small>' + escapeHtml(section.layout) + '열 · 최대 ' + (section.maxWidth || 1200) + 'px</small></button>' +
          '<div><button type="button" data-content-move="up" aria-label="위로"' + (index === 0 ? ' disabled' : '') + '>↑</button><button type="button" data-content-move="down" aria-label="아래로"' + (index === sections.length - 1 ? ' disabled' : '') + '>↓</button><button type="button" class="builder-content-delete" data-content-remove>삭제</button></div></div>';
      }).join("");
      var addLayout = '<button type="button" class="builder-layout-add" data-content-add="empty"><span class="builder-layout-add__preview"><i></i><i></i><i></i></span><strong>새 레이아웃 추가</strong><small>너비와 열을 정한 뒤 각 칸에 요소를 넣습니다.</small></button>';
      var result = inspectorSection("1. 레이아웃 만들기", "콘텐츠보다 먼저 영역의 크기와 열을 정합니다.", addLayout) +
        inspectorSection("전체 섹션 설정", "콘텐츠 영역의 배경색과 모든 섹션 사이의 간격을 조정합니다.",
          field("콘텐츠 배경색", '<input type="color" data-content-global-field="background" value="' + escapeHtml(content.background || "#ffffff") + '">') +
          field("섹션 간 여백", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="200" step="4" data-content-global-number="sectionGap" value="' + (content.sectionGap || 0) + '"><em>px</em></div>')) +
        inspectorSection("만든 레이아웃", "선택하거나 순서를 바꾸고 필요 없는 레이아웃은 삭제합니다.", listHtml || '<p class="builder-empty">레이아웃을 추가해 주세요.</p>');
      if (selectedLayer === "content-sections") return result;
      if (!selected) return inspectorSection("섹션 상세 설정", "섹션 구성에서 새 레이아웃을 추가해 주세요.", '<p class="builder-empty">선택된 섹션이 없습니다.</p>');
      inspectorTitle.textContent = selected.name;
      if (selected.legacy) {
        return inspectorSection("기본 콘텐츠", "기존 페이지에 있던 콘텐츠입니다. 그대로 유지하면서 CSS 상세 편집하거나 삭제할 수 있습니다.",
          '<div data-content-section-id="' + selected.id + '">' +
          field("좌측 메뉴 이름", '<input type="text" data-content-section-field="name" value="' + escapeHtml(selected.name) + '">') +
          '<div class="builder-content-cell-card' + (selected.cells[0] && selected.cells[0].id === selectedContentCellId ? ' is-canvas-selected' : '') + '" data-content-cell-index="0" data-content-cell-id="' + escapeHtml(selected.cells[0] && selected.cells[0].id || "") + '"><button type="button" class="builder-content-detail-wide" data-content-detail-edit>영역 CSS 상세 편집</button></div>' +
          '<button type="button" class="builder-element-remove" data-content-remove>이 기본 섹션 삭제</button></div>');
      }
      result = "";
      var layouts = [
        ["1", "1열"], ["2", "2열"], ["3", "3열"]
      ].map(function (layout) {
        return '<label><input type="radio" name="content-layout" data-content-layout value="' + layout[0] + '"' + (selected.layout === layout[0] ? ' checked' : '') + '><span>' + layout[1] + '</span></label>';
      }).join("");
      var cells = selected.cells.map(function (cell, cellIndex) {
        var module = cell.module;
        var typeOptions = Object.keys(window.DQContentBuilder.labels).filter(function (type) { return type !== "custom"; }).map(function (type) {
          return '<option value="' + type + '"' + (module.type === type ? ' selected' : '') + '>' + escapeHtml(window.DQContentBuilder.labels[type]) + '</option>';
        }).join("");
        var moduleFields = '<div class="builder-title-settings">' +
          '<label class="builder-switch"><span>열 제목 표시</span><input type="checkbox" data-content-module-check="showTitle"' + (module.showTitle !== false ? ' checked' : '') + '><i></i></label>' +
          (module.showTitle !== false
            ? field("열 제목", '<input type="text" data-content-module-field="title" value="' + escapeHtml(module.title || "") + '">') +
              field("열 설명", '<textarea rows="2" data-content-module-field="description">' + escapeHtml(module.description || "") + '</textarea>') +
              '<button type="button" class="builder-title-remove" data-content-module-title-remove>열 제목 삭제</button>'
            : '<p class="builder-empty">열 제목이 삭제되었습니다. 위 스위치를 켜면 다시 표시할 수 있습니다.</p>') +
          '</div>';
        if (module.type !== "empty") {
          var variantOptions = (window.DQContentBuilder.variants[module.type] || []).map(function (variant) {
            return '<option value="' + variant[0] + '"' + (module.variant === variant[0] ? ' selected' : '') + '>' + escapeHtml(variant[1]) + '</option>';
          }).join("");
          moduleFields += field("표시 타입", '<select data-content-module-variant>' + variantOptions + '</select>');
          if (module.type === "board") {
            moduleFields += field("오버 효과", '<select data-content-module-field="hoverEffect"><option value="underline"' + (module.hoverEffect === "underline" ? " selected" : "") + '>제목 밑줄</option><option value="lift"' + (module.hoverEffect === "lift" ? " selected" : "") + '>위로 살짝 이동</option><option value="background"' + (module.hoverEffect === "background" ? " selected" : "") + '>배경색 강조</option></select>');
          } else if (module.type === "quick") {
            moduleFields += field("오버 효과", '<select data-content-module-field="hoverEffect"><option value="icon-scale"' + (module.hoverEffect === "icon-scale" ? " selected" : "") + '>아이콘 확대</option><option value="lift"' + (module.hoverEffect === "lift" ? " selected" : "") + '>요소 위로 이동</option><option value="background"' + (module.hoverEffect === "background" ? " selected" : "") + '>배경색 강조</option></select>');
          }
          if (/^(?:visual|quick|cards|banner|imageText|gallery)$/.test(module.type)) {
            moduleFields += field("이미지 맞춤", '<select data-content-module-field="imageFit"><option value="cover"' + (module.imageFit !== "contain" ? ' selected' : '') + '>영역 채우기 (cover)</option><option value="contain"' + (module.imageFit === "contain" ? ' selected' : '') + '>전체 이미지 보기 (contain)</option></select><small>원본 비율은 유지하고 잘림 또는 여백 표시 방식만 바꿉니다.</small>');
          }
          if (/^(?:cards|banner)$/.test(module.type)) {
            moduleFields += '<label class="builder-switch"><span>이미지 영역 높이 직접 지정</span><input type="checkbox" data-content-module-check="useMediaHeight"' + (module.useMediaHeight ? ' checked' : '') + '><i></i></label>' +
              (module.useMediaHeight
                ? field("PC 기준 높이", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="120" max="1000" step="10" data-content-module-number="mediaHeight" value="' + (module.mediaHeight || (module.type === "banner" ? 360 : 320)) + '"><em>px</em></div><small>모바일에서는 화면 폭에 맞춰 설정 높이보다 작게 자동 축소됩니다.</small>')
                : '<small>직접 지정하지 않으면 카드 4:3 비율, 홍보 배너는 표시 타입별 기본 높이를 사용합니다.</small>');
          }
          var animationOptions = [["none", "없음"], ["fade-up", "아래에서 부드럽게"], ["fade", "페이드"], ["slide-left", "왼쪽에서 이동"], ["slide-right", "오른쪽에서 이동"], ["zoom", "확대 등장"], ["stagger", "항목 순차 등장"]].map(function (animation) {
            return '<option value="' + animation[0] + '"' + (module.animation === animation[0] ? ' selected' : '') + '>' + animation[1] + '</option>';
          }).join("");
          moduleFields += field("등장 효과", '<select data-content-module-field="animation">' + animationOptions + '</select><small>전체 테마의 모션 강도에 맞춰 속도가 자동 조정됩니다.</small>');
          if (module.type === "code") {
            moduleFields += '<div class="builder-code-editor"><p>이 요소 안에서 사용할 HTML·CSS·JS를 각각 입력합니다. JS에서는 <code>root</code>와 <code>host</code>를 사용할 수 있습니다. 공유 편집에서는 신뢰할 수 있는 코드만 넣어 주세요.</p>' +
              field("HTML", '<textarea rows="10" spellcheck="false" data-content-module-field="html" placeholder="<div class=&quot;box&quot;>...</div>">' + escapeHtml(module.html || "") + '</textarea>') +
              field("CSS", '<textarea rows="10" spellcheck="false" data-content-module-field="css" placeholder=".box { padding: 24px; }">' + escapeHtml(module.css || "") + '</textarea>') +
              field("JS", '<textarea rows="10" spellcheck="false" data-content-module-field="js" placeholder="root.querySelector(...)">' + escapeHtml(module.js || "") + '</textarea>') + '</div>';
          } else {
          if (/^(?:quick|board|cards|stats|gallery)$/.test(module.type)) {
            moduleFields += field("항목 사이 간격", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="100" step="2" data-content-module-number="gap" value="' + (module.gap || 24) + '"><em>px</em></div><small>화면이 작아지면 자동으로 줄어듭니다.</small>');
          }
          if (module.type === "cards" && selected.layout === "1") {
            moduleFields += '<label class="builder-switch"><span>카드만 화면 전체 너비</span><input type="checkbox" data-content-module-check="fullBleed"' + (module.fullBleed ? ' checked' : '') + '><i></i></label><small>제목은 최대 너비 안에 두고 카드 트랙만 화면 끝까지 확장합니다.</small>';
          } else if (module.type === "cards") {
            moduleFields += '<small>카드 전체 너비 기능은 1열 레이아웃에서 사용할 수 있습니다.</small>';
          }
          var itemRows = module.items.map(function (item, itemIndex) {
            return '<div class="builder-content-item" data-content-item-index="' + itemIndex + '"><div class="builder-content-item__head"><strong>항목 ' + (itemIndex + 1) + '</strong><button type="button" data-content-item-remove aria-label="항목 삭제">×</button></div>' +
              '<input type="text" data-content-item-field="title" value="' + escapeHtml(item.title) + '" placeholder="제목">' +
              '<input type="text" data-content-item-field="text" value="' + escapeHtml(item.text) + '" placeholder="설명 또는 날짜">' +
              '<input type="text" data-content-item-field="href" value="' + escapeHtml(item.href) + '" placeholder="링크">' +
              '<div class="builder-content-image-field"><input type="text" data-content-item-field="image" value="' + escapeHtml(item.image) + '" placeholder="/page/dq-builder/images/... 또는 https://..."><label><span>이미지 업로드</span><input type="file" accept="image/jpeg,image/png,image/gif,image/webp" data-content-item-upload></label></div>' +
              '<input type="text" data-content-item-field="alt" value="' + escapeHtml(item.alt || "") + '" placeholder="이미지 대체텍스트(비우면 항목 제목 사용)">' +
              (module.type === "quick" ? '<input type="text" data-content-item-field="icon" value="' + escapeHtml(item.icon) + '" placeholder="아이콘: home, search, user...">' : '') + '</div>';
          }).join("");
          var canAddItems = !/^(?:text|imageText)$/.test(module.type);
          moduleFields += '<details class="builder-content-details"><summary>항목 내용 편집 <small>' + module.items.length + '개</small></summary><div class="builder-content-items">' + itemRows + '</div>' + (canAddItems ? '<button type="button" class="builder-sub-add" data-content-item-add>+ 항목 추가</button>' : '') + '</details>';
          if (module.items.length > 1) {
            var perViewOptions = [1, 2, 3, 4].map(function (count) { return '<option value="' + count + '"' + (Number(module.slider.perView || 1) === count ? ' selected' : '') + '>' + count + '개</option>'; }).join("");
            var perViewField = /^(?:cards|quick|gallery)$/.test(module.type) ? field("PC 노출 개수", '<select data-content-slider-number="perView">' + perViewOptions + '</select><small>태블릿은 최대 2개, 모바일은 1개로 자동 조정됩니다. 좌우 이동하려면 전체 항목 수가 노출 개수보다 많아야 합니다.</small>') : '';
            var transitionOptions = [["fade", "페이드"], ["slide", "좌우 이동"], ["vertical", "위아래 이동"], ["zoom", "확대 전환"]].map(function (transition) {
              return '<option value="' + transition[0] + '"' + (module.slider.transition === transition[0] ? ' selected' : '') + '>' + transition[1] + '</option>';
            }).join("");
            var controllerGroups = [
              ["이미지 위", [["image-capsule", "캡슐형"], ["image-split", "분리형"], ["image-minimal", "미니멀형"]]],
              ["슬라이드 하단", [["bottom-capsule", "캡슐형"], ["bottom-split", "분리형"], ["bottom-minimal", "미니멀형"]]]
            ];
            var controllerOptions = controllerGroups.map(function (group) {
              return '<optgroup label="' + group[0] + '">' + group[1].map(function (controller) {
                return '<option value="' + controller[0] + '"' + (module.slider.controllerStyle === controller[0] ? ' selected' : '') + '>' + controller[1] + '</option>';
              }).join("") + '</optgroup>';
            }).join("");
            moduleFields += '<details class="builder-content-details"><summary>슬라이드 설정</summary>' +
              field("전환 효과", '<select data-content-slider-option="transition">' + transitionOptions + '</select>') +
              field("컨트롤러 타입", '<select data-content-slider-option="controllerStyle">' + controllerOptions + '</select>') +
              field("전환 시간", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="100" max="3000" step="50" data-content-slider-number="duration" value="' + (module.slider.duration || 650) + '"><em>ms</em></div>') +
              field("자동 재생 간격", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="1000" max="15000" step="500" data-content-slider-number="delay" value="' + (module.slider.delay || 4500) + '"><em>ms</em></div>') +
              '<div class="builder-content-slider"><strong>컨트롤러</strong>' +
              '<label><input type="checkbox" data-content-slider-field="enabled"' + (module.slider.enabled ? ' checked' : '') + '> 사용</label>' +
              '<label><input type="checkbox" data-content-slider-field="arrows"' + (module.slider.arrows ? ' checked' : '') + '> 이전·다음</label>' +
              '<label><input type="checkbox" data-content-slider-field="dots"' + (module.slider.dots ? ' checked' : '') + '> 도트</label>' +
              '<label><input type="checkbox" data-content-slider-field="counter"' + (module.slider.counter ? ' checked' : '') + '> 현재/전체</label>' +
              '<label><input type="checkbox" data-content-slider-field="play"' + (module.slider.play ? ' checked' : '') + '> 재생·정지</label>' +
              '<label><input type="checkbox" data-content-slider-field="autoplay"' + (module.slider.autoplay ? ' checked' : '') + '> 자동 재생</label></div>' + perViewField + '</details>';
          }
          }
        }
        return '<div class="builder-content-cell-card' + (cell.id === selectedContentCellId ? ' is-canvas-selected' : '') + '" data-content-cell-index="' + cellIndex + '" data-content-cell-id="' + escapeHtml(cell.id) + '"><div class="builder-content-cell-card__head"><strong>' + (cellIndex + 1) + '열</strong>' + (module.type !== "empty" ? '<button type="button" data-content-detail-edit>CSS 상세 편집</button>' : '') + '</div>' +
          '<div class="builder-content-type-field">' + field("넣을 요소", '<select data-content-module-type>' + typeOptions + '</select>') + '</div>' + moduleFields + '</div>';
      }).join("");
      result += inspectorSection("2. 레이아웃 설정", "이 영역의 최대 너비와 열 개수를 먼저 정합니다.",
        field("레이아웃 이름", '<input type="text" data-content-section-field="name" value="' + escapeHtml(selected.name) + '">') +
        field("너비 방식", '<select data-content-section-field="width"><option value="wide"' + (selected.width === "wide" ? ' selected' : '') + '>배경 전체 · 내용 최대 너비</option><option value="full"' + (selected.width === "full" ? ' selected' : '') + '>내용까지 전체 화면</option><option value="contained"' + (selected.width === "contained" ? ' selected' : '') + '>최대 너비 박스</option></select>') +
        field("최대 너비", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="760" max="1800" step="10" data-content-section-number="maxWidth" value="' + (selected.maxWidth || 1200) + '"><em>px</em></div>') +
        '<details class="builder-content-details" open><summary>섹션 제목 · 서브 제목</summary>' +
          '<div class="builder-content-heading-settings">' +
            '<label class="builder-switch"><span>섹션 제목 노출</span><input type="checkbox" data-content-section-check="showTitle"' + (selected.showTitle ? ' checked' : '') + '><i></i></label>' +
            (selected.showTitle ? field("섹션 제목", '<input type="text" data-content-section-field="sectionTitle" value="' + escapeHtml(selected.sectionTitle || "") + '">') + field("제목 크기", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="12" max="120" step="1" data-content-section-number="titleSize" value="' + (selected.titleSize || 42) + '"><em>px</em></div>') + field("제목 색상", '<input type="color" data-content-section-field="titleColor" value="' + escapeHtml(selected.titleColor || "#1d2530") + '">') + '<button type="button" class="builder-title-remove" data-content-section-title-remove>섹션 제목 삭제</button>' : '<p class="builder-empty">섹션 제목이 삭제되었습니다. 위 스위치를 켜면 다시 표시할 수 있습니다.</p>') +
            '<label class="builder-switch"><span>서브 제목 노출</span><input type="checkbox" data-content-section-check="showSubtitle"' + (selected.showSubtitle ? ' checked' : '') + '><i></i></label>' +
            (selected.showSubtitle ? field("서브 제목", '<textarea rows="2" data-content-section-field="sectionSubtitle">' + escapeHtml(selected.sectionSubtitle || "") + '</textarea>') + field("서브 제목 크기", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="10" max="72" step="1" data-content-section-number="subtitleSize" value="' + (selected.subtitleSize || 18) + '"><em>px</em></div>') + field("서브 제목 색상", '<input type="color" data-content-section-field="subtitleColor" value="' + escapeHtml(selected.subtitleColor || "#667080") + '">') : '') +
            field("정렬", '<select data-content-section-field="headingAlign"><option value="left"' + (selected.headingAlign === "left" ? ' selected' : '') + '>왼쪽</option><option value="center"' + (selected.headingAlign === "center" ? ' selected' : '') + '>가운데</option><option value="right"' + (selected.headingAlign === "right" ? ' selected' : '') + '>오른쪽</option></select>') +
          '</div></details>' +
        (selected.layout !== "1" ? field("열 사이 간격", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="120" step="2" data-content-section-number="columnGap" value="' + (selected.columnGap == null ? 40 : selected.columnGap) + '"><em>px</em></div><small>화면이 좁아지면 설정값 안에서 자동으로 줄어듭니다.</small>') : '') +
        '<div class="builder-content-padding-grid">' +
          field("위쪽 여백", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="200" step="4" data-content-section-number="paddingTop" value="' + (selected.paddingTop || 0) + '"><em>px</em></div>') +
          field("아래쪽 여백", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="200" step="4" data-content-section-number="paddingBottom" value="' + (selected.paddingBottom || 0) + '"><em>px</em></div>') +
          field("왼쪽 여백", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="200" step="4" data-content-section-number="paddingLeft" value="' + (selected.paddingLeft || 0) + '"><em>px</em></div>') +
          field("오른쪽 여백", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="0" max="200" step="4" data-content-section-number="paddingRight" value="' + (selected.paddingRight || 0) + '"><em>px</em></div>') +
        '</div><small>각 방향의 여백은 화면이 작아지면 설정값 안에서 자동으로 줄어듭니다.</small>' +
        '<label class="builder-switch"><span>섹션 높이 직접 지정</span><input type="checkbox" data-content-section-check="useHeight"' + (selected.useHeight ? ' checked' : '') + '><i></i></label>' +
        '<div class="builder-content-height' + (selected.useHeight ? ' is-enabled' : '') + '">' +
          field("높이", '<div class="builder-range-number builder-range-number--wide"><input type="number" min="1" max="2000" step="1" data-content-section-number="heightValue" value="' + (selected.heightValue || 100) + '"><select data-content-section-field="heightUnit"><option value="px"' + (selected.heightUnit === "px" ? ' selected' : '') + '>px</option><option value="vh"' + (selected.heightUnit === "vh" ? ' selected' : '') + '>vh</option></select></div><small>100vh는 헤더를 제외한 실제 보이는 화면 높이에 맞춥니다.</small>') +
        '</div>' +
        field("배경색", '<input type="color" data-content-section-field="background" value="' + escapeHtml(selected.background) + '">') +
        field("배경 이미지", '<input type="text" data-content-section-field="backgroundImage" value="' + escapeHtml(selected.backgroundImage || "") + '" placeholder="이미지 경로 또는 URL"><small>비워 두면 배경색만 사용합니다.</small>') +
        '<div class="builder-content-layouts"><strong>열 개수</strong><div>' + layouts + '</div></div>') +
        inspectorSection("3. 각 열에 요소 넣기", "빈 열마다 비주얼·게시판·카드·배너 중 필요한 요소를 선택합니다.", cells);
      return result;
    }

    function selectedContentSection() {
      return state && state.content && state.content.sections.find(function (section) { return section.id === selectedContentSectionId; });
    }

    function renderContentState() {
      if (!window.DQContentBuilder || !canvasDocument) return;
      window.DQContentBuilder.render(canvasDocument, state.content || { sections: [] });
      applyElementOverrides();
    }

    function contentContext(target) {
      var section = selectedContentSection();
      var cellCard = target.closest("[data-content-cell-index]");
      var cellIndex = cellCard ? Number(cellCard.dataset.contentCellIndex) : -1;
      var cell = section && cellIndex >= 0 ? section.cells[cellIndex] : null;
      var itemRow = target.closest("[data-content-item-index]");
      var itemIndex = itemRow ? Number(itemRow.dataset.contentItemIndex) : -1;
      return { section: section, cell: cell, cellIndex: cellIndex, item: cell && itemIndex >= 0 ? cell.module.items[itemIndex] : null, itemIndex: itemIndex };
    }

    function handleContentClick(event) {
      var add = event.target.closest("[data-content-add]");
      var row = event.target.closest("[data-content-section-id]");
      var select = event.target.closest("[data-content-select]");
      var move = event.target.closest("[data-content-move]");
      var remove = event.target.closest("[data-content-remove]");
      var itemAdd = event.target.closest("[data-content-item-add]");
      var itemRemove = event.target.closest("[data-content-item-remove]");
      var detail = event.target.closest("[data-content-detail-edit]");
      var sectionTitleRemove = event.target.closest("[data-content-section-title-remove]");
      var moduleTitleRemove = event.target.closest("[data-content-module-title-remove]");
      if (!add && !select && !move && !remove && !itemAdd && !itemRemove && !detail && !sectionTitleRemove && !moduleTitleRemove) return false;
      state.content = state.content || { sections: [] };
      if (add) {
        var newSection = window.DQContentBuilder.createSection(add.dataset.contentAdd);
        state.content.sections.push(newSection);
        selectedContentSectionId = newSection.id;
        selectedLayer = "content-section";
      } else if (select && row) {
        selectedContentSectionId = row.dataset.contentSectionId;
        selectedContentCellId = null;
        selectedLayer = "content-section";
        var selectedCanvasSection = canvasDocument.querySelector('[data-section-id="' + selectedContentSectionId + '"]');
        if (selectedCanvasSection) selectedCanvasSection.scrollIntoView({ block: "center" });
        renderInspector();
        return true;
      } else if (move && row) {
        var sectionIndex = state.content.sections.findIndex(function (section) { return section.id === row.dataset.contentSectionId; });
        var nextSectionIndex = sectionIndex + (move.dataset.contentMove === "up" ? -1 : 1);
        if (nextSectionIndex >= 0 && nextSectionIndex < state.content.sections.length) {
          var movedSection = state.content.sections.splice(sectionIndex, 1)[0];
          state.content.sections.splice(nextSectionIndex, 0, movedSection);
        }
      } else if (remove && row) {
        state.content.sections = state.content.sections.filter(function (section) { return section.id !== row.dataset.contentSectionId; });
        selectedContentSectionId = state.content.sections.length ? state.content.sections[0].id : null;
        selectedLayer = "content-sections";
      } else if (itemAdd) {
        var addContext = contentContext(itemAdd);
        if (addContext.cell) addContext.cell.module.items.push({ title: "새 항목", text: "내용을 입력해 주세요.", href: "#", image: "", alt: "", icon: addContext.cell.module.type === "quick" ? "home" : "" });
      } else if (itemRemove) {
        var removeContext = contentContext(itemRemove);
        if (removeContext.cell && removeContext.cell.module.items.length > 1) removeContext.cell.module.items.splice(removeContext.itemIndex, 1);
      } else if (detail) {
        var detailContext = contentContext(detail);
        var detailTarget = detailContext.cell && canvasDocument.querySelector('[data-cell-id="' + detailContext.cell.id + '"]');
        if (detailTarget) selectCanvasElement(detailTarget);
        return true;
      } else if (sectionTitleRemove) {
        var titleSection = selectedContentSection();
        if (titleSection) {
          titleSection.showTitle = false;
          titleSection.titleVisibilityConfigured = true;
        }
      } else if (moduleTitleRemove) {
        var titleContext = contentContext(moduleTitleRemove);
        if (titleContext.cell) titleContext.cell.module.showTitle = false;
      }
      renderContentState();
      pushHistory();
      renderInspector();
      return true;
    }

    function handleContentInput(event) {
      var target = event.target;
      if (!target.closest("[data-content-section-id], .builder-content-cell-card, .builder-content-layouts") &&
          !target.hasAttribute("data-content-section-field") && !target.hasAttribute("data-content-section-number") && !target.hasAttribute("data-content-section-check") && !target.hasAttribute("data-content-global-number") && !target.hasAttribute("data-content-global-field")) return false;
      if (target.dataset.contentGlobalField) {
        state.content[target.dataset.contentGlobalField] = target.value;
        renderContentState();
        return true;
      }
      if (target.dataset.contentGlobalNumber) {
        state.content[target.dataset.contentGlobalNumber] = Math.max(0, Math.min(200, Number(target.value) || 0));
        renderContentState();
        return true;
      }
      var context = contentContext(target);
      var section = context.section;
      if (!section) return false;
      if (target.dataset.contentSectionField) {
        section[target.dataset.contentSectionField] = target.value;
      } else if (target.dataset.contentSectionCheck) {
        section[target.dataset.contentSectionCheck] = target.checked;
        if (target.dataset.contentSectionCheck === "showTitle") section.titleVisibilityConfigured = true;
        renderContentState();
        renderInspector();
        return true;
      } else if (target.dataset.contentSectionNumber) {
        var sectionNumberName = target.dataset.contentSectionNumber;
        var sectionMinimum = sectionNumberName === "maxWidth" ? 760 : sectionNumberName === "heightValue" ? 1 : sectionNumberName === "titleSize" ? 12 : sectionNumberName === "subtitleSize" ? 10 : 0;
        var sectionMaximum = sectionNumberName === "maxWidth" ? 1800 : sectionNumberName === "columnGap" ? 120 : sectionNumberName === "titleSize" ? 120 : sectionNumberName === "subtitleSize" ? 72 : sectionNumberName === "heightValue" ? (section.heightUnit === "vh" ? 200 : 2000) : 200;
        section[sectionNumberName] = Math.max(sectionMinimum, Math.min(sectionMaximum, Number(target.value) || sectionMinimum));
      } else if (target.hasAttribute("data-content-layout")) {
        window.DQContentBuilder.setLayout(section, target.value);
        renderContentState();
        pushHistory();
        renderInspector();
        return true;
      } else if (target.hasAttribute("data-content-module-type") && context.cell) {
        context.cell.module = window.DQContentBuilder.createModule(target.value);
        section.legacy = false;
        renderContentState();
        pushHistory();
        renderInspector();
        return true;
      } else if (target.hasAttribute("data-content-module-variant") && context.cell) {
        context.cell.module.variant = target.value;
      } else if (target.dataset.contentModuleField && context.cell) {
        context.cell.module[target.dataset.contentModuleField] = target.value;
      } else if (target.dataset.contentModuleNumber && context.cell) {
        var moduleNumberName = target.dataset.contentModuleNumber;
        var moduleNumberMin = moduleNumberName === "mediaHeight" ? 120 : 0;
        var moduleNumberMax = moduleNumberName === "mediaHeight" ? 1000 : 100;
        context.cell.module[moduleNumberName] = Math.max(moduleNumberMin, Math.min(moduleNumberMax, Number(target.value) || moduleNumberMin));
      } else if (target.dataset.contentModuleCheck && context.cell) {
        context.cell.module[target.dataset.contentModuleCheck] = target.checked;
        if (/^(?:showTitle|useMediaHeight)$/.test(target.dataset.contentModuleCheck)) {
          renderContentState();
          pushHistory();
          renderInspector();
          return true;
        }
      } else if (target.dataset.contentItemField && context.item) {
        context.item[target.dataset.contentItemField] = target.value;
      } else if (target.dataset.contentSliderField && context.cell) {
        context.cell.module.slider[target.dataset.contentSliderField] = target.checked;
        if (target.dataset.contentSliderField === "autoplay" && target.checked) context.cell.module.slider.play = true;
      } else if (target.dataset.contentSliderNumber && context.cell) {
        var sliderNumberName = target.dataset.contentSliderNumber;
        var sliderMin = sliderNumberName === "perView" ? 1 : sliderNumberName === "duration" ? 100 : 1000;
        var sliderMax = sliderNumberName === "perView" ? 4 : sliderNumberName === "duration" ? 3000 : 15000;
        context.cell.module.slider[sliderNumberName] = Math.max(sliderMin, Math.min(sliderMax, Number(target.value) || sliderMin));
      } else if (target.dataset.contentSliderOption && context.cell) {
        context.cell.module.slider[target.dataset.contentSliderOption] = target.value;
      } else {
        return false;
      }
      renderContentState();
      return true;
    }

    function renderElementInspector() {
      inspectorTitle.textContent = "선택 요소";
      var override = getSelectedOverride();
      if (!override) return inspectorSection("영역 선택", "상단의 영역 선택 버튼을 누른 뒤 미리보기 요소를 클릭하세요.", '<p class="builder-empty">선택된 요소가 없습니다.</p>');
      var breakpointData = override.styles.base || (override.styles.base = { values: {}, customCss: "" });
      var values = breakpointData.values || (breakpointData.values = {});
      var effects = breakpointData.effects || (breakpointData.effects = {});
      var contentFields = "";
      if (override.canEditText) {
        var textValue = typeof override.text === "string" ? override.text : override.currentText || "";
        contentFields += field("텍스트", '<textarea data-element-content="text" rows="4">' + escapeHtml(textValue) + '</textarea>');
      } else {
        contentFields += '<p class="builder-empty">하위 요소를 포함한 영역입니다. 텍스트 노드를 직접 선택하면 문구를 바꿀 수 있습니다.</p>';
      }
      ["href", "src", "alt", "title"].forEach(function (name) {
        if (Object.prototype.hasOwnProperty.call(override.attributes || {}, name)) {
          contentFields += field(name.toUpperCase(), '<input type="text" data-element-attribute="' + name + '" value="' + escapeHtml(override.attributes[name]) + '">');
        }
      });
      var styleFields = [
        ["글자색", "color", "예: #222222"],
        ["배경색", "backgroundColor", "예: #ffffff"],
        ["글자 크기", "fontSize", "예: 18px"],
        ["글자 굵기", "fontWeight", "예: 400, 700"],
        ["줄 높이", "lineHeight", "예: 1.6"],
        ["정렬", "textAlign", "예: left, center"],
        ["안쪽 여백", "padding", "예: 16px 24px"],
        ["바깥 여백", "margin", "예: 0 0 20px"],
        ["모서리", "borderRadius", "예: 12px"]
      ].map(function (item) {
        return field(item[0], '<input type="text" data-element-style="' + item[1] + '" value="' + escapeHtml(values[item[1]] || "") + '" placeholder="' + item[2] + '">');
      }).join("");
      var effectFields = '<div class="builder-effect-options"><strong>필터 효과</strong><div>' + [
        ["invert", "색상 반전", "invert(1)"],
        ["grayscale", "흑백", "grayscale(1)"],
        ["brighten", "밝게", "brightness(1.15)"],
        ["dropShadow", "드롭 그림자", "drop-shadow"]
      ].map(function (item) {
        return '<label><input type="checkbox" data-element-effect="' + item[0] + '"' + (effects[item[0]] ? " checked" : "") + '><span>' + item[1] + '<small>' + item[2] + '</small></span></label>';
      }).join("") + '</div></div>';
      var scopeLabel = override.scope === "shared"
        ? (override.selector.indexOf("#footer") === 0 ? "모든 페이지 공통 · 푸터" : "모든 페이지 공통 · 헤더")
        : escapeHtml(override.page) + " 전용";
      var identity = '<div class="builder-element-identity"><strong>&lt;' + escapeHtml(override.tag) + '&gt; ' + escapeHtml(override.label) + '</strong><code>' + escapeHtml(override.selector) + '</code><span>' + scopeLabel + '</span></div>';
      var groupTarget = '<label class="builder-css-group-option"><input type="checkbox" data-element-apply-group' + (override.applyToGroup ? " checked" : "") + '><span><strong>같은 요소 전체에 적용</strong><small>' + escapeHtml(override.groupSelector || override.selector) + '</small></span></label>';
      var selectorCss = field("선택자 CSS 선언", '<textarea data-element-custom-css rows="7" placeholder="color: #222;\nfont-size: 20px;\npadding: 8px 12px;">' + escapeHtml(breakpointData.customCss || "") + '</textarea><small class="builder-responsive-note">font-size, padding, margin, gap의 px 값은 화면 너비에 맞춰 자동 축소됩니다.</small>');
      return inspectorSection("선택 영역", "체크하지 않으면 클릭한 요소 하나에만, 체크하면 같은 종류 전체에 적용됩니다.", identity + groupTarget + selectorCss) +
        inspectorSection("콘텐츠", "텍스트와 링크·이미지 속성을 수정합니다.", contentFields) +
        inspectorSection("스타일", "글자 크기와 여백은 화면 너비에 맞춰 자동으로 줄어듭니다.", styleFields + effectFields) +
        inspectorSection("초기화", "이 요소에 저장한 콘텐츠와 스타일을 제거합니다.", '<button type="button" class="builder-element-remove" data-remove-element-override>선택 요소 편집 제거</button>');
    }

    function selectedLayerGroup() {
      if (selectedLayer.indexOf("theme-") === 0) return "theme";
      if (selectedLayer.indexOf("footer-") === 0) return "footer";
      if (selectedLayer.indexOf("subpage-") === 0) return "content";
      if (selectedLayer.indexOf("content-") === 0) return "content";
      return "header";
    }

    function renderContentLayerItems() {
      var group = builder.querySelector('[data-layer-group="content"]');
      if (!group) return;
      group.querySelectorAll('[data-content-layer-section], [data-sub-content-layer-item]').forEach(function (button) { button.remove(); });
      if (isSubPage) {
        var anchor = group.querySelector('[data-layer="subpage-contents"]');
        var reference = anchor;
        (state.subpage && state.subpage.blocks || []).forEach(function (block, index) {
          var button = document.createElement("button");
          button.type = "button";
          button.className = "builder-layer builder-layer--sub-content-item";
          button.dataset.layer = "subpage-content-item";
          button.dataset.subContentLayerItem = block.id;
          button.innerHTML = '<span class="builder-layer__line"></span><span>' + escapeHtml(block.title || block.label || "콘텐츠 " + (index + 1)) + '</span>';
          reference.insertAdjacentElement("afterend", button);
          reference = button;
        });
        return;
      }
      (state.content && state.content.sections || []).forEach(function (section, index) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "builder-layer builder-layer--content-section";
        button.dataset.layer = "content-section";
        button.dataset.contentLayerSection = section.id;
        button.innerHTML = '<span class="builder-layer__line"></span><span>' + escapeHtml(section.name || "섹션 " + (index + 1)) + '</span>';
        group.appendChild(button);
      });
    }

    function renderInspector() {
      if (!state) return;
      renderContentLayerItems();
      var markup;
      if (selectedLayer === "theme" || selectedLayer === "theme-palette") markup = renderThemeInspector();
      else if (selectedLayer === "theme-font") markup = renderThemeFontInspector();
      else if (selectedLayer === "theme-layout") markup = renderThemeLayoutInspector();
      else if (selectedLayer === "theme-components") markup = renderThemeComponentsInspector();
      else if (selectedLayer === "theme-motion") markup = renderThemeMotionInspector();
      else if (selectedLayer === "utility") markup = renderUtilityInspector();
      else if (selectedLayer === "logo") markup = renderLogoInspector();
      else if (selectedLayer === "navigation") markup = renderNavigationInspector();
      else if (selectedLayer === "sitemap") markup = renderSitemapInspector();
      else if (selectedLayer === "actions") markup = renderActionsInspector();
      else if (selectedLayer === "footer" || selectedLayer === "footer-style") markup = renderFooterInspector();
      else if (selectedLayer === "footer-logo") markup = renderFooterLogoInspector();
      else if (selectedLayer === "footer-related") markup = renderFooterRelatedInspector();
      else if (selectedLayer === "content-sections") markup = renderContentInspector();
      else if (selectedLayer === "content-section") markup = renderContentInspector();
      else if (selectedLayer === "subpage-common") markup = renderSubpageCommonInspector();
      else if (selectedLayer === "subpage-contents") markup = renderSubpageContentsInspector();
      else if (selectedLayer === "subpage-content-item") markup = renderSubpageContentItemInspector();
      else if (selectedLayer === "element") markup = renderElementInspector();
      else markup = renderHeaderInspector();
      inspector.innerHTML = markup;
      builder.querySelectorAll("[data-layer]").forEach(function (button) {
        var isSelected = button.dataset.layer === selectedLayer;
        if (button.dataset.contentLayerSection) isSelected = selectedLayer === "content-section" && button.dataset.contentLayerSection === selectedContentSectionId;
        if (button.dataset.subContentLayerItem) isSelected = selectedLayer === "subpage-content-item" && button.dataset.subContentLayerItem === selectedSubContentId;
        button.classList.toggle("is-selected", isSelected);
      });
      var currentGroup = selectedLayerGroup();
      builder.querySelectorAll("[data-layer-toggle]").forEach(function (button) {
        button.classList.toggle("is-current", button.dataset.layerToggle === currentGroup);
      });
    }

    function revealDepthItem(depth2Id) {
      window.requestAnimationFrame(function () {
        var list = inspector.querySelector(".builder-depth-list");
        if (!list) return;
        if (depth2Id) {
          var card = list.querySelector('[data-depth2-id="' + depth2Id + '"]');
          if (card) card.scrollIntoView({ block: "nearest" });
        } else {
          var cards = list.querySelectorAll("[data-depth2-id]");
          if (cards.length) cards[cards.length - 1].scrollIntoView({ block: "nearest" });
        }
      });
    }

    function setByPath(path, value) {
      var parts = path.split(".");
      var target = state;
      parts.slice(0, -1).forEach(function (part) { target = target[part]; });
      target[parts[parts.length - 1]] = value;
    }

    function setLoadingMessage(message, isError) {
      var messageElement = loading.querySelector("p");
      if (messageElement) messageElement.textContent = message;
      loading.classList.toggle("is-error", !!isError);
    }

    function setupCanvas() {
      if (canvasSetupDone) return true;
      canvasWindow = iframe.contentWindow;
      canvasDocument = iframe.contentDocument;
      if (!canvasDocument || !canvasDocument.querySelector("#header .site-logo") || !canvasDocument.querySelector("#footer .footer-brand")) return false;

      readBasicUiSource(document);
      rememberSubContentSources(document);
      readBasicUiSource(canvasDocument);

      var initialState = captureState();
      state = pendingUploadRecovery && pendingUploadRecovery.state ? pendingUploadRecovery.state : initialState;
      if (state.subpage && initialState.subpage) {
        var recoveredBasic = (state.subpage.blocks || []).find(function (block) { return block.type === "basic"; });
        var initialBasic = (initialState.subpage.blocks || []).find(function (block) { return block.type === "basic"; });
        if (!recoveredBasic && initialBasic) {
          state.subpage.blocks = [JSON.parse(JSON.stringify(initialBasic))].concat(state.subpage.blocks || []);
          recoveredBasic = state.subpage.blocks[0];
        }
        if (recoveredBasic && !String(recoveredBasic.html || "").trim() && initialBasic && String(initialBasic.html || "").trim()) recoveredBasic.html = initialBasic.html;
        state.subpage.basicUiHtml = String(recoveredBasic && recoveredBasic.html || initialState.subpage.basicUiHtml || state.subpage.basicUiHtml || "");
      }
      if (state.subpage && state.subpage.blocks) ensureGeneratedSubContentDefaults(state.subpage.blocks);
      selectedContentSectionId = pendingUploadRecovery && pendingUploadRecovery.selectedContentSectionId
        ? pendingUploadRecovery.selectedContentSectionId
        : (state.content && state.content.sections.length ? state.content.sections[0].id : null);
      if (pendingUploadRecovery && pendingUploadRecovery.selectedSubContentId) selectedSubContentId = pendingUploadRecovery.selectedSubContentId;
      try {
        window.localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn("이전 임시 저장 데이터를 정리하지 못했습니다.", error);
      }
      if (!state.header.navigation.items.length) selectedMenuId = null;
      else selectedMenuId = state.header.navigation.items[0].id;
      resetCanvasHeaderPosition();
      history = [];
      historyIndex = -1;
      bindCanvasSelection();
      if (pendingUploadRecovery) applyState();
      else applyElementOverrides();
      pushHistory();
      renderInspector();
      if (pendingUploadRecovery) {
        var recoveryLayerGroup = selectedLayerGroup();
        var recoveryLayerPanel = builder.querySelector('[data-layer-group="' + recoveryLayerGroup + '"]');
        var recoveryLayerToggle = builder.querySelector('[data-layer-toggle="' + recoveryLayerGroup + '"]');
        if (recoveryLayerPanel) recoveryLayerPanel.classList.add("is-open");
        if (recoveryLayerToggle) recoveryLayerToggle.setAttribute("aria-expanded", "true");
        Array.from(inspector.querySelectorAll(".builder-content-details")).forEach(function (details) {
          var summary = details.querySelector("summary");
          if (summary && summary.textContent.indexOf("항목 내용 편집") > -1) details.open = true;
        });
        pendingUploadRecovery = null;
      }
      canvasSetupDone = true;
      lastCanvasError = null;
      window.clearTimeout(canvasWaitTimer);
      loading.classList.add("is-hidden");
      return true;
    }

    function waitForCanvas(attempt) {
      window.clearTimeout(canvasWaitTimer);
      try {
        if (setupCanvas()) return;
      } catch (error) {
        lastCanvasError = error;
        console.error("사이트 편집기 캔버스 초기화 오류:", error);
        if (attempt >= 100) {
          setLoadingMessage("초기화 오류: " + (error && error.message ? error.message : "알 수 없는 오류"), true);
          return;
        }
      }

      if (attempt >= 100) {
        setLoadingMessage(lastCanvasError ? "초기화 오류: " + lastCanvasError.message : "헤더를 불러오지 못했습니다. include 경로를 확인해 주세요.", true);
        return;
      }
      canvasWaitTimer = window.setTimeout(function () {
        waitForCanvas(attempt + 1);
      }, 100);
    }

    launcher.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 1000px)").matches) {
        desktopNotice.hidden = false;
        desktopNotice.querySelector("[data-builder-desktop-notice-close]").focus();
        return;
      }
      openBuilder();
    });
    desktopNotice.addEventListener("click", function (event) {
      if (event.target === desktopNotice || event.target.closest("[data-builder-desktop-notice-close]")) desktopNotice.hidden = true;
    });
    if (params.get("openBuilder") === "1") window.setTimeout(openBuilder, 0);
    builder.querySelector("[data-builder-close]").addEventListener("click", closeBuilder);

    iframe.addEventListener("load", function () {
      canvasSetupDone = false;
      setLoadingMessage("사이트를 불러오는 중입니다.", false);
      loading.classList.remove("is-hidden");
      var childDocument = iframe.contentDocument;
      childDocument.addEventListener("dq:ready", function () { waitForCanvas(0); }, { once: true });
      waitForCanvas(0);
      window.setTimeout(function () {
        if (iframe.contentDocument && iframe.contentDocument.querySelector("#header") && iframe.contentDocument.querySelector("#footer")) {
          loading.classList.add("is-hidden");
        }
      }, 1200);
    });

    builder.addEventListener("click", function (event) {
      var copyUploadButton = event.target.closest("[data-copy-upload-url]");
      var layerToggleButton = event.target.closest("[data-layer-toggle]");
      var layerButton = event.target.closest("[data-layer]");
      var deviceButton = event.target.closest("[data-device]");
      var historyButton = event.target.closest("[data-history]");
      var modeButton = event.target.closest("[data-builder-mode]");
      var selectMenuButton = event.target.closest("[data-select-menu]");
      var removeMenuButton = event.target.closest("[data-remove-menu]");
      var moveMenuButton = event.target.closest("[data-move-menu]");
      var removeUtilityButton = event.target.closest("[data-remove-utility]");
      var addUtilityButton = event.target.closest("[data-add-utility]");
      var removeLogoImageButton = event.target.closest("[data-remove-logo-image]");
      var addDepth2Button = event.target.closest("[data-add-depth2]");
      var addDepth3Button = event.target.closest("[data-add-depth3]");
      var removeDepth2Button = event.target.closest("[data-remove-depth2]");
      var removeDepth3Button = event.target.closest("[data-remove-depth3]");
      var addActionButton = event.target.closest("[data-add-action]");
      var removeActionButton = event.target.closest("[data-remove-action]");
      var moveActionButton = event.target.closest("[data-move-action]");
      var removeFooterLogoImageButton = event.target.closest("[data-remove-footer-logo-image]");

      if (copyUploadButton) {
        window.navigator.clipboard.writeText(copyUploadButton.dataset.copyUploadUrl).then(function () {
          showToast("이미지 주소를 복사했습니다.");
        }).catch(function () {
          showToast("주소를 복사하지 못했습니다. 입력창에서 직접 복사해 주세요.");
        });
        return;
      }
      if (handleSubpageClick(event)) return;
      if (handleContentClick(event)) return;

      if (layerToggleButton) {
        var targetGroup = layerToggleButton.dataset.layerToggle;
        var targetPanel = builder.querySelector('[data-layer-group="' + targetGroup + '"]');
        var willOpen = targetPanel && !targetPanel.classList.contains("is-open");
        builder.querySelectorAll("[data-layer-toggle]").forEach(function (button) {
          button.setAttribute("aria-expanded", "false");
        });
        builder.querySelectorAll("[data-layer-group]").forEach(function (panel) {
          panel.classList.remove("is-open");
        });
        if (willOpen && targetPanel) {
          layerToggleButton.setAttribute("aria-expanded", "true");
          targetPanel.classList.add("is-open");
        }
      } else if (layerButton) {
        selectedLayer = layerButton.dataset.layer;
        if (layerButton.dataset.contentLayerSection) {
          selectedContentSectionId = layerButton.dataset.contentLayerSection;
          selectedContentCellId = null;
        }
        if (layerButton.dataset.subContentLayerItem) selectedSubContentId = layerButton.dataset.subContentLayerItem;
        setBuilderMode("structure");
        if (selectedLayer !== "element") clearCanvasSelectionHighlight();
        renderInspector();
        if (isSubPage && selectedLayer !== "subpage-content-item") setSubContentPreview("");
        var canvasHeaderForLayer = canvasDocument.querySelector("#header");
        var sitemapToggleForLayer = canvasHeaderForLayer && canvasHeaderForLayer.querySelector(".site-map-toggle");
        if (selectedLayer === "sitemap") {
          canvasWindow.scrollTo(0, 0);
          if (canvasHeaderForLayer && !canvasHeaderForLayer.classList.contains("is-sitemap-open") && sitemapToggleForLayer) sitemapToggleForLayer.click();
        } else {
          if (canvasHeaderForLayer && canvasHeaderForLayer.classList.contains("is-sitemap-open") && sitemapToggleForLayer) sitemapToggleForLayer.click();
        }
        if (selectedLayer === "content-section") {
          var selectedContentCanvasSection = canvasDocument.querySelector('[data-section-id="' + selectedContentSectionId + '"]');
          if (selectedContentCanvasSection) selectedContentCanvasSection.scrollIntoView({ block: "center" });
        } else if (selectedLayer === "subpage-contents") {
          setSubContentPreview("");
          var subContents = canvasDocument.querySelector("#contentsArea");
          if (subContents) subContents.scrollIntoView({ block: "start" });
        } else if (selectedLayer === "subpage-content-item") {
          setSubContentPreview(selectedSubContentId);
          var subContentItem = canvasDocument.querySelector('[data-sub-content-block="' + selectedSubContentId + '"]');
          if (subContentItem) subContentItem.scrollIntoView({ block: "center" });
        } else if (selectedLayer.indexOf("footer") === 0) {
          var canvasFooter = canvasDocument.querySelector("#footer");
          if (canvasFooter) canvasFooter.scrollIntoView({ block: "start" });
        } else if (selectedLayer !== "sitemap") {
          canvasWindow.scrollTo(0, 0);
        }
      } else if (deviceButton) {
        builder.querySelectorAll("[data-device]").forEach(function (button) { button.classList.toggle("is-active", button === deviceButton); });
        builder.querySelector(".builder-canvas-stage").dataset.deviceStage = deviceButton.dataset.device;
        builder.querySelector(".js-canvas-label").textContent = deviceButton.dataset.device.charAt(0).toUpperCase() + deviceButton.dataset.device.slice(1) + " · 100%";
        resetCanvasHeaderPosition();
      } else if (historyButton) {
        restoreHistory(historyIndex + (historyButton.dataset.history === "undo" ? -1 : 1));
      } else if (event.target.closest("[data-builder-share]")) {
        if (shareButton.classList.contains("is-active")) sharePanel.hidden = !sharePanel.hidden;
        else startExternalShare();
      } else if (event.target.closest("[data-builder-share-copy]")) {
        copyExternalShareUrl();
      } else if (event.target.closest("[data-builder-share-stop]")) {
        stopExternalShare();
      } else if (modeButton) {
        setBuilderMode(editMode === modeButton.dataset.builderMode ? "idle" : modeButton.dataset.builderMode);
      } else if (event.target.closest("[data-builder-project-build]")) {
        openProjectBuild();
      } else if (event.target.closest("[data-builder-project-cancel]")) {
        closeProjectBuild();
      } else if (event.target.closest("[data-builder-project-download]")) {
        openProjectDownload();
      } else if (event.target.closest("[data-clear-element-styles]")) {
        var clearedStyleCount = 0;
        (state.elementOverrides || []).forEach(function (override) {
          var baseStyle = override.styles && override.styles.base || {};
          var hasValues = Object.keys(baseStyle.values || {}).some(function (key) { return !!baseStyle.values[key]; });
          var hasEffects = Object.keys(baseStyle.effects || {}).some(function (key) { return !!baseStyle.effects[key]; });
          if (hasValues || hasEffects || String(baseStyle.customCss || "").trim()) clearedStyleCount += 1;
          override.styles = { base: { values: {}, customCss: "", effects: {} } };
        });
        applyElementOverrides();
        if (clearedStyleCount) {
          pushHistory();
          renderInspector();
          showToast("직접 추가한 수동 스타일을 모두 제거했습니다. 텍스트 변경은 유지됩니다.");
        } else {
          showToast("제거할 수동 스타일이 없습니다.");
        }
      } else if (event.target.closest("[data-builder-file-save]")) {
        saveStateToFiles();
      } else if (event.target.closest("[data-remove-element-override]")) {
        var removedOverride = getSelectedOverride();
        if (removedOverride) {
          try {
            var removedElement = canvasDocument.querySelector(removedOverride.selector);
            if (removedElement) {
              if (typeof removedOverride.originalText === "string") removedElement.textContent = removedOverride.originalText;
              Object.keys(removedOverride.originalAttributes || {}).forEach(function (name) { removedElement.setAttribute(name, removedOverride.originalAttributes[name]); });
            }
          } catch (error) {}
        }
        state.elementOverrides = (state.elementOverrides || []).filter(function (item) { return item.key !== selectedElementKey; });
        selectedElementKey = null;
        selectedLayer = "header-style";
        applyElementOverrides();
        pushHistory();
        renderInspector();
      } else if (selectMenuButton) {
        selectedMenuId = selectMenuButton.dataset.selectMenu;
        if (state.header.navigation.previewOpen) applyState();
        renderInspector();
      } else if (event.target.closest("[data-add-menu]")) {
        var newMenu = { id: unique("menu"), label: "새 메뉴", href: "#", newWindow: false, children: [] };
        state.header.navigation.items.push(newMenu);
        selectedMenuId = newMenu.id;
        applyState(); pushHistory(); renderInspector();
      } else if (removeMenuButton) {
        state.header.navigation.items = state.header.navigation.items.filter(function (item) { return item.id !== removeMenuButton.dataset.removeMenu; });
        selectedMenuId = state.header.navigation.items.length ? state.header.navigation.items[0].id : null;
        applyState(); pushHistory(); renderInspector();
      } else if (moveMenuButton) {
        var row = moveMenuButton.closest("[data-menu-id]");
        var index = state.header.navigation.items.findIndex(function (item) { return item.id === row.dataset.menuId; });
        var nextIndex = index + (moveMenuButton.dataset.moveMenu === "up" ? -1 : 1);
        if (nextIndex >= 0 && nextIndex < state.header.navigation.items.length) {
          var moved = state.header.navigation.items.splice(index, 1)[0];
          state.header.navigation.items.splice(nextIndex, 0, moved);
          applyState(); pushHistory(); renderInspector();
        }
      } else if (addUtilityButton) {
        var utilityType = addUtilityButton.dataset.addUtility;
        state.header.utility.items.push({ id: unique("utility"), type: utilityType, label: utilityType === "button" ? "새 버튼" : "새 안내 문구", html: utilityType === "html" ? "<strong>새 HTML 요소</strong>" : "", href: "#" });
        applyState(); pushHistory(); renderInspector();
      } else if (removeUtilityButton) {
        state.header.utility.items = state.header.utility.items.filter(function (item) { return item.id !== removeUtilityButton.dataset.removeUtility; });
        applyState(); pushHistory(); renderInspector();
      } else if (removeLogoImageButton) {
        state.header.logo.useImage = false;
        state.header.logo.imagePath = "";
        applyState(); pushHistory(); renderInspector();
      } else if (removeFooterLogoImageButton) {
        state.footer.logo.useImage = false;
        state.footer.logo.imagePath = "";
        applyState(); pushHistory(); renderInspector();
      } else if (addDepth2Button && selectedMenuId) {
        var menuForDepth2 = state.header.navigation.items.find(function (item) { return item.id === selectedMenuId; });
        if (menuForDepth2) menuForDepth2.children.push({ id: unique("depth2"), label: "새 2뎁스", href: "#", children: [] });
        applyState(); pushHistory(); renderInspector();
        revealDepthItem();
      } else if (addDepth3Button && selectedMenuId) {
        var depth2Card = addDepth3Button.closest("[data-depth2-id]");
        var menuForDepth3 = state.header.navigation.items.find(function (item) { return item.id === selectedMenuId; });
        var depth2ForAdd = menuForDepth3 && menuForDepth3.children.find(function (item) { return item.id === depth2Card.dataset.depth2Id; });
        if (depth2ForAdd) depth2ForAdd.children.push({ id: unique("depth3"), label: "새 3뎁스", href: "#", children: [] });
        applyState(); pushHistory(); renderInspector();
        revealDepthItem(depth2Card.dataset.depth2Id);
      } else if (removeDepth2Button && selectedMenuId) {
        var removeDepth2Card = removeDepth2Button.closest("[data-depth2-id]");
        var menuForRemove2 = state.header.navigation.items.find(function (item) { return item.id === selectedMenuId; });
        if (menuForRemove2) menuForRemove2.children = menuForRemove2.children.filter(function (item) { return item.id !== removeDepth2Card.dataset.depth2Id; });
        applyState(); pushHistory(); renderInspector();
      } else if (removeDepth3Button && selectedMenuId) {
        var removeDepth3Card = removeDepth3Button.closest("[data-depth2-id]");
        var removeDepth3Row = removeDepth3Button.closest("[data-depth3-id]");
        var menuForRemove3 = state.header.navigation.items.find(function (item) { return item.id === selectedMenuId; });
        var depth2ForRemove = menuForRemove3 && menuForRemove3.children.find(function (item) { return item.id === removeDepth3Card.dataset.depth2Id; });
        if (depth2ForRemove) depth2ForRemove.children = depth2ForRemove.children.filter(function (item) { return item.id !== removeDepth3Row.dataset.depth3Id; });
        applyState(); pushHistory(); renderInspector();
      } else if (addActionButton) {
        state.header.actions.items.push({ id: unique("action"), label: "새 버튼", href: "#", icon: "user", newWindow: false });
        applyState(); pushHistory(); renderInspector();
      } else if (moveActionButton) {
        var moveActionCard = moveActionButton.closest("[data-action-id]");
        var actionIndex = state.header.actions.items.findIndex(function (item) { return item.id === moveActionCard.dataset.actionId; });
        var nextActionIndex = actionIndex + (moveActionButton.dataset.moveAction === "up" ? -1 : 1);
        if (nextActionIndex >= 0 && nextActionIndex < state.header.actions.items.length) {
          var movedAction = state.header.actions.items.splice(actionIndex, 1)[0];
          state.header.actions.items.splice(nextActionIndex, 0, movedAction);
          applyState(); pushHistory(); renderInspector();
        }
      } else if (removeActionButton) {
        var actionCard = removeActionButton.closest("[data-action-id]");
        state.header.actions.items = state.header.actions.items.filter(function (item) { return item.id !== actionCard.dataset.actionId; });
        applyState(); pushHistory(); renderInspector();
      }
    });

    projectModal.addEventListener("click", function (event) {
      if (event.target === projectModal) closeProjectBuild();
    });

    existingProjectSelect.addEventListener("change", function () {
      if (!existingProjectSelect.value) projectForm.elements.projectName.value = "";
      updateProjectBuildMode();
    });
    projectForm.elements.projectName.addEventListener("input", updateProjectBuildMode);

    zipModal.addEventListener("click", function (event) {
      if (event.target === zipModal || event.target.closest("[data-builder-zip-cancel]")) closeProjectDownload();
    });

    zipForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var projectName = zipProjectSelect.value;
      closeProjectDownload();
      downloadProject(projectName);
    });

    projectForm.addEventListener("submit", async function (event) {
      event.preventDefault();
      var projectName = String(projectForm.elements.projectName.value || "").trim().toLowerCase();
      if (!/^[a-z0-9][a-z0-9_-]{1,48}$/.test(projectName)) {
        projectStatus.textContent = "프로젝트 폴더명 형식을 확인해 주세요.";
        return;
      }
      var submitButton = projectForm.querySelector('[type="submit"]');
      var overwrite = availableProjects.some(function (project) { return project.name === projectName; });
      submitButton.disabled = true;
      projectStatus.textContent = overwrite ? "기존 프로젝트를 안전하게 교체하고 있습니다..." : "실작업용 파일을 정리하고 있습니다...";
      try {
        var result = await buildProjectRequest(projectName, overwrite);
        setLastBuiltProject(result.projectName);
        projectStatus.textContent = result.fileCount + "개 파일로 빌드했습니다. " + result.previewUrl;
        showToast(result.message || "실작업 프로젝트를 빌드했습니다.");
        await projectListRequest().catch(function () {});
        existingProjectSelect.value = result.projectName;
        updateProjectBuildMode();
      } catch (error) {
        projectStatus.textContent = "빌드 실패: " + (error.message || "빌드 서버를 확인해 주세요.");
      } finally {
        submitButton.disabled = false;
      }
    });

    inspector.addEventListener("input", function (event) {
      if (!state) return;
      if (handleSubpageInput(event)) return;
      if (handleContentInput(event)) return;
      var bind = event.target.dataset.bind;
      var utilityRow = event.target.closest("[data-utility-id]");
      var depth2Row = event.target.closest("[data-depth2-id]");
      var depth3Row = event.target.closest("[data-depth3-id]");
      var actionRow = event.target.closest("[data-action-id]");
      var selectedOverride = getSelectedOverride();
      if (selectedOverride && event.target.dataset.elementContent) {
        selectedOverride.text = event.target.value;
        applyElementOverrides();
      } else if (selectedOverride && event.target.hasAttribute("data-element-apply-group")) {
        selectedOverride.applyToGroup = event.target.checked;
        applyElementOverrides();
      } else if (selectedOverride && event.target.dataset.elementAttribute) {
        selectedOverride.attributes[event.target.dataset.elementAttribute] = event.target.value;
        applyElementOverrides();
      } else if (selectedOverride && event.target.dataset.elementEffect) {
        var effectStyleData = selectedOverride.styles.base || (selectedOverride.styles.base = { values: {}, customCss: "", effects: {} });
        effectStyleData.effects = effectStyleData.effects || {};
        effectStyleData.effects[event.target.dataset.elementEffect] = event.target.checked;
        applyElementOverrides();
      } else if (selectedOverride && event.target.dataset.elementStyle) {
        var styleData = selectedOverride.styles.base || (selectedOverride.styles.base = { values: {}, customCss: "" });
        styleData.values[event.target.dataset.elementStyle] = event.target.value.trim();
        applyElementOverrides();
      } else if (selectedOverride && event.target.hasAttribute("data-element-custom-css")) {
        var customStyleData = selectedOverride.styles.base || (selectedOverride.styles.base = { values: {}, customCss: "" });
        customStyleData.customCss = sanitizeCustomDeclarations(event.target.value);
        applyElementOverrides();
      } else if (bind) {
        var value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        if (event.target.type === "range" || event.target.type === "number") {
          if (event.target.value === "") return;
          value = Number(value);
          if (!Number.isFinite(value)) return;
          var rangeMin = Number(event.target.min);
          var rangeMax = Number(event.target.max);
          if (Number.isFinite(rangeMin)) value = Math.max(rangeMin, value);
          if (Number.isFinite(rangeMax)) value = Math.min(rangeMax, value);
          event.target.value = value;
          event.target.closest("label").querySelectorAll('[data-bind="' + bind + '"]').forEach(function (control) {
            if (control !== event.target) control.value = value;
          });
        }
        if (/^header\.sitemap\.(?:background|depth1Color|depth23Color)$/.test(bind) && state.theme) state.theme.applyToSitemap = false;
        if (bind === "theme.designStyle") applyThemePreset(value);
        else {
          setByPath(bind, value);
          if (/^theme\.(?:color[123]|radiusStyle|buttonStyle|motionStyle)$/.test(bind)) state.theme.designStyle = "custom";
        }
        var output = event.target.closest("label") && event.target.closest("label").querySelector("output");
        if (output) output.textContent = value + (bind.indexOf("opacity") > -1 ? "%" : "px");
        if (bind.indexOf("subpage.") === 0) {
          applySubpageState();
          applyElementOverrides();
        } else {
          applyState();
        }
      } else if (event.target.dataset.menuField && selectedMenuId) {
        var selected = state.header.navigation.items.find(function (item) { return item.id === selectedMenuId; });
        var menuValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        if (selected) selected[event.target.dataset.menuField] = menuValue;
        applyState();
        var label = inspector.querySelector('[data-select-menu="' + selectedMenuId + '"] span');
        if (label) label.textContent = selected.label;
      } else if (utilityRow && event.target.dataset.utilityField) {
        var utilityItem = state.header.utility.items.find(function (item) { return item.id === utilityRow.dataset.utilityId; });
        if (utilityItem) utilityItem[event.target.dataset.utilityField] = event.target.value;
        applyState();
      } else if (depth2Row && event.target.dataset.depthField && selectedMenuId) {
        var selectedMenu = state.header.navigation.items.find(function (item) { return item.id === selectedMenuId; });
        var selectedDepth2 = selectedMenu && selectedMenu.children.find(function (item) { return item.id === depth2Row.dataset.depth2Id; });
        var depthTarget = selectedDepth2;
        if (depth3Row && selectedDepth2) depthTarget = selectedDepth2.children.find(function (item) { return item.id === depth3Row.dataset.depth3Id; });
        if (depthTarget) depthTarget[event.target.dataset.depthField] = event.target.value;
        applyState();
      } else if (actionRow && event.target.dataset.actionField) {
        var actionItem = state.header.actions.items.find(function (item) { return item.id === actionRow.dataset.actionId; });
        var actionValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        if (actionItem) actionItem[event.target.dataset.actionField] = actionValue;
        applyState();
      }
    });

    inspector.addEventListener("change", async function (event) {
      if (event.target.hasAttribute("data-sub-visual-upload")) {
        var visualUploadInput = event.target;
        var visualUploadFile = visualUploadInput.files && visualUploadInput.files[0];
        if (!visualUploadFile) return;
        visualUploadInput.disabled = true;
        showToast("서브페이지 제목 배경을 업로드하는 중입니다...");
        try {
          state.subpage.visualBackgroundImage = await uploadContentImage(visualUploadFile);
          window.sessionStorage.setItem(uploadRecoveryKey, JSON.stringify({
            expires: Date.now() + 12000,
            state: state,
            selectedLayer: "subpage-common",
            selectedContentSectionId: selectedContentSectionId,
            selectedSubContentId: selectedSubContentId,
            recoveryKind: "sub-visual-upload"
          }));
          window.setTimeout(function () { window.sessionStorage.removeItem(uploadRecoveryKey); }, 5000);
          applySubpageState();
          applyElementOverrides();
          pushHistory();
          renderInspector();
          showToast("서브페이지 제목 배경 이미지를 적용했습니다.");
        } catch (error) {
          visualUploadInput.disabled = false;
          visualUploadInput.value = "";
          showToast("배경 이미지 업로드 실패: " + (error.message || "업로드 서버를 확인해 주세요."));
        }
        return;
      }
      if (event.target.hasAttribute("data-logo-upload")) {
        var logoUploadInput = event.target;
        var logoUploadFile = logoUploadInput.files && logoUploadInput.files[0];
        var logoArea = logoUploadInput.dataset.logoUpload;
        if (!logoUploadFile || (logoArea !== "header" && logoArea !== "footer")) return;
        logoUploadInput.disabled = true;
        showToast((logoArea === "header" ? "헤더" : "푸터") + " 로고를 업로드하는 중입니다...");
        try {
          var logoUploadUrl = await uploadContentImage(logoUploadFile);
          var logoData = logoArea === "header" ? state.header.logo : state.footer.logo;
          logoData.imagePath = logoUploadUrl;
          logoData.useImage = true;
          window.sessionStorage.setItem(uploadRecoveryKey, JSON.stringify({
            expires: Date.now() + 12000,
            state: state,
            selectedLayer: selectedLayer,
            selectedContentSectionId: selectedContentSectionId,
            selectedSubContentId: selectedSubContentId,
            recoveryKind: "logo-upload"
          }));
          window.setTimeout(function () { window.sessionStorage.removeItem(uploadRecoveryKey); }, 5000);
          applyState();
          pushHistory();
          renderInspector();
          showToast((logoArea === "header" ? "헤더" : "푸터") + " 로고를 업로드하고 적용했습니다.");
        } catch (error) {
          logoUploadInput.disabled = false;
          logoUploadInput.value = "";
          showToast("로고 업로드 실패: " + (error.message || "업로드 서버를 확인해 주세요."));
        }
        return;
      }
      if (event.target.hasAttribute("data-sub-bullet-upload") || event.target.hasAttribute("data-sub-content-image-upload")) {
        var subUploadInput = event.target;
        var subUploadFile = subUploadInput.files && subUploadInput.files[0];
        if (!subUploadFile) return;
        subUploadInput.disabled = true;
        showToast("이미지를 업로드하는 중입니다...");
        try {
          var subUploadUrl = await uploadContentImage(subUploadFile);
          if (subUploadInput.hasAttribute("data-sub-bullet-upload")) {
            var uploadedBulletKey = subUploadInput.dataset.subBulletUpload;
            state.subpage[uploadedBulletKey + "Image"] = subUploadUrl;
            state.subpage[uploadedBulletKey + "Style"] = "image";
            applySubpageState();
          } else {
            var uploadBlock = state.subpage.blocks.find(function (block) { return block.id === selectedSubContentId; });
            if (uploadBlock) uploadBlock.assetImage = subUploadUrl;
            applySubpageState();
          }
          pushHistory();
          renderInspector();
          showToast("이미지를 업로드하고 주소를 생성했습니다.");
        } catch (error) {
          subUploadInput.disabled = false;
          subUploadInput.value = "";
          showToast("이미지 업로드 실패: " + (error.message || "업로드 서버를 확인해 주세요."));
        }
        return;
      }
      if (event.target.hasAttribute("data-content-item-upload")) {
        var uploadContext = contentContext(event.target);
        var uploadFile = event.target.files && event.target.files[0];
        if (!uploadContext.item || !uploadFile) return;
        var uploadInput = event.target;
        var uploadRow = uploadInput.closest("[data-content-item-index]");
        event.target.disabled = true;
        showToast("이미지를 업로드하는 중입니다...");
        try {
          uploadContext.item.image = await uploadContentImage(uploadFile);
          window.sessionStorage.setItem(uploadRecoveryKey, JSON.stringify({
            expires: Date.now() + 10000,
            state: state,
            selectedLayer: selectedLayer,
            selectedContentSectionId: selectedContentSectionId
          }));
          window.setTimeout(function () { window.sessionStorage.removeItem(uploadRecoveryKey); }, 4000);
          renderContentState();
          pushHistory();
          var imagePathInput = uploadRow && uploadRow.querySelector('[data-content-item-field="image"]');
          if (imagePathInput) imagePathInput.value = uploadContext.item.image;
          uploadInput.disabled = false;
          uploadInput.value = "";
          showToast("이미지를 업로드하고 경로를 자동 입력했습니다.");
        } catch (error) {
          uploadInput.disabled = false;
          uploadInput.value = "";
          showToast("이미지 업로드 실패: " + (error.message || "업로드 서버를 확인해 주세요."));
        }
        return;
      }
      pushHistory();
      if (event.target.dataset.subContentCheck === "saveAsFile" || event.target.dataset.subContentField === "title" || event.target.dataset.subContentField === "fileName") {
        renderInspector();
      } else if (event.target.dataset.contentSectionField === "name") {
        renderInspector();
      } else if (event.target.dataset.bind === "header.logo.useImage" || event.target.dataset.bind === "header.logo.imagePath") {
        renderInspector();
      } else if (event.target.dataset.bind === "footer.logo.useImage" || event.target.dataset.bind === "footer.logo.imagePath") {
        renderInspector();
      } else if (event.target.dataset.bind === "header.actions.searchMode") {
        renderInspector();
      } else if (event.target.dataset.bind === "header.navigation.indicatorUseTheme") {
        renderInspector();
      } else if ((event.target.dataset.bind || "").indexOf("theme.") === 0) {
        renderInspector();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !desktopNotice.hidden) {
        desktopNotice.hidden = true;
        launcher.focus();
        return;
      }
      if (event.key === "Escape" && !projectModal.hidden) {
        closeProjectBuild();
        return;
      }
      if (event.key === "Escape" && !zipModal.hidden) {
        closeProjectDownload();
        return;
      }
      if (event.key !== "Escape" || !builder.classList.contains("is-open")) return;
      if (editMode !== "idle") setBuilderMode("idle");
      else closeBuilder();
    });

    connectRealtimeSync();

    try {
      var syncReload = JSON.parse(window.sessionStorage.getItem(syncReloadKey) || "null");
      window.sessionStorage.removeItem(syncReloadKey);
      if (syncReload && syncReload.expires > Date.now()) {
        selectedLayer = syncReload.selectedLayer || "header-style";
        selectedElementKey = syncReload.selectedElementKey || null;
        window.setTimeout(function () {
          if (syncReload.reopen) openBuilder();
          showToast("다른 사용자가 저장한 최신 내용을 반영했습니다.");
        }, 0);
      }
    } catch (error) {
      window.sessionStorage.removeItem(syncReloadKey);
    }

    try {
      var uploadRecovery = JSON.parse(window.sessionStorage.getItem(uploadRecoveryKey) || "null");
      window.sessionStorage.removeItem(uploadRecoveryKey);
      if (uploadRecovery && uploadRecovery.expires > Date.now() && uploadRecovery.state) {
        pendingUploadRecovery = uploadRecovery;
        selectedLayer = uploadRecovery.selectedLayer || "content-section";
        selectedContentSectionId = uploadRecovery.selectedContentSectionId || null;
        selectedSubContentId = uploadRecovery.selectedSubContentId || null;
        window.setTimeout(function () {
          openBuilder();
          showToast(uploadRecovery.recoveryKind === "content-create" ? "새 콘텐츠 파일을 만들고 편집 화면을 복구했습니다." : uploadRecovery.recoveryKind === "logo-upload" ? "업로드한 로고를 적용하고 편집 화면을 복구했습니다." : uploadRecovery.recoveryKind === "sub-visual-upload" ? "서브페이지 제목 배경을 적용하고 편집 화면을 복구했습니다." : "업로드한 이미지를 적용하고 편집 화면을 복구했습니다.");
        }, 0);
      }
    } catch (error) {
      window.sessionStorage.removeItem(uploadRecoveryKey);
    }

    try {
      var reopenAfterSave = JSON.parse(window.sessionStorage.getItem(reopenAfterSaveKey) || "null");
      window.sessionStorage.removeItem(reopenAfterSaveKey);
      if (reopenAfterSave && reopenAfterSave.expires > Date.now()) {
        selectedLayer = reopenAfterSave.selectedLayer || "header-style";
        selectedElementKey = reopenAfterSave.selectedElementKey || null;
        window.setTimeout(function () {
          openBuilder();
          showToast("파일 저장을 완료하고 편집 화면을 다시 열었습니다.");
        }, 0);
      }
    } catch (error) {
      window.sessionStorage.removeItem(reopenAfterSaveKey);
    }
  });
}(window, document));
