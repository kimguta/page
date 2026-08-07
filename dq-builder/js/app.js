/**
 * DQ 프로젝트 템플릿 코어
 * include가 끝난 뒤 등록된 UI 모듈을 순서대로 초기화합니다.
 */
(function (window, document) {
  "use strict";

  var modules = [];
  var idCount = 0;
  var root = document.documentElement.dataset.templateRoot || ".";
  var DQ = window.DQTemplate = window.DQTemplate || {};

  DQ.config = {
    templateRoot: root,
    mobileBreakpoint: 1024
  };

  DQ.use = function (name, initializer) {
    modules.push({ name: name, initializer: initializer });
  };

  DQ.uniqueId = function (prefix) {
    idCount += 1;
    return (prefix || "dq-ui") + "-" + idCount;
  };

  DQ.resolvePath = function (path) {
    if (/^(?:[a-z]+:)?\/\//i.test(path) || path.charAt(0) === "/") return path;

    var rootUrl = new URL(root.replace(/\/?$/, "/"), document.baseURI);
    return new URL(path, rootUrl).href;
  };

  /**
   * 협의된 콘텐츠 UI가 호출하므로 기존 전역 함수명을 유지합니다.
   */
  window.initSlick = function ($target, options) {
    if (!$target || !$target.length || typeof $target.slick !== "function") return;
    $target.not(".slick-initialized").slick(options);
  };

  async function includeHtml() {
    var targets = Array.from(document.querySelectorAll("[include-html]"));

    if (!targets.length) return;
    if (!window.jQuery) {
      console.error("include-html을 사용하려면 jQuery가 필요합니다.");
      return;
    }

    function sanitizeIncludeHtml(html) {
      return String(html).replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>/gi, "");
    }

    await Promise.all(targets.map(function (target) {
      var source = target.getAttribute("include-html");
      var url = DQ.resolvePath(source);

      return new Promise(function (resolve) {
        window.jQuery.ajax({
          url: url,
          dataType: "html",
          cache: true
        }).done(function (response) {
          target.innerHTML = sanitizeIncludeHtml(response);
          target.removeAttribute("include-html");
        }).fail(function (xhr) {
            target.innerHTML = '<p class="include-error">콘텐츠를 불러오지 못했습니다.</p>';
            console.error("include-html 오류:", source, xhr.status, xhr.statusText);
        }).always(function () {
          resolve();
        });
      });
    }));
  }

  function applyBuilderOverrides() {
    var source = document.querySelector("#dq-builder-overrides");
    if (!source) return;

    var overrides;
    try {
      overrides = JSON.parse(source.textContent.replace(/<!--\s*BUILDER:OVERRIDES:(?:START|END)\s*-->/g, "").trim() || "[]");
    } catch (error) {
      console.error("요소 편집 데이터 형식이 올바르지 않습니다.", error);
      return;
    }

    if (!Array.isArray(overrides)) return;
    var pageName = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

    overrides.forEach(function (override) {
      if (!override || typeof override.selector !== "string") return;
      if (override.scope !== "shared" && override.page !== pageName) return;

      var element;
      try {
        element = document.querySelector(override.selector);
      } catch (error) {
        return;
      }
      if (!element) return;

      if (typeof override.text === "string") element.textContent = override.text;
      if (override.attributes && typeof override.attributes === "object") {
        ["href", "src", "alt", "title"].forEach(function (name) {
          if (typeof override.attributes[name] === "string") element.setAttribute(name, override.attributes[name]);
        });
      }
    });
  }

  async function boot() {
    await includeHtml();
    applyBuilderOverrides();

    modules.forEach(function (module) {
      try {
        module.initializer(DQ);
      } catch (error) {
        console.error(module.name + " 초기화 오류:", error);
      }
    });

    applyBuilderOverrides();

    document.dispatchEvent(new CustomEvent("dq:ready"));
  }

  document.addEventListener("DOMContentLoaded", boot);
}(window, document));
