/**
 * 브레드크럼, 관련 사이트, 샘플 전용 보조 UI
 */
(function (window, document) {
  "use strict";

  window.DQTemplate.use("components", function (DQ) {
    var breadcrumbs = Array.from(document.querySelectorAll(".breadcrumb"));
    var familySites = Array.from(document.querySelectorAll(".family-site"));

    breadcrumbs.forEach(function (breadcrumb) {
      initBreadcrumb(breadcrumb, DQ);
    });
    familySites.forEach(function (familySite) {
      initFamilySite(familySite, DQ);
    });
    window.DQInitSubContentUi = initSubContentUi;
    initSubpageThemeAssets();
    initSubContentUi();
    initSampleSwitcher();

    document.addEventListener("pointerup", function (event) {
      var familyToggle = event.target.closest && event.target.closest(".family-site__toggle");
      if (!familyToggle) return;
      if (familyToggle.closest("details.family-site")) return;
      event.preventDefault();
      toggleFamilySite(familyToggle);
    });

    document.addEventListener("click", function (event) {
      var modalOpen = event.target.closest && event.target.closest("[data-ui-modal-open]");
      var modalClose = event.target.closest && event.target.closest("[data-ui-modal-close]");
      if (modalOpen) {
        event.preventDefault();
        openModal(document.getElementById(modalOpen.dataset.uiModalOpen), modalOpen);
      } else if (modalClose) {
        event.preventDefault();
        closeModal(modalClose.closest(".ui-modal"), true);
      } else if (event.target.classList && event.target.classList.contains("ui-modal")) {
        closeModal(event.target, true);
      }

      var familyToggle = event.target.closest && event.target.closest(".family-site__toggle");
      if (familyToggle && familyToggle.closest("details.family-site")) {
        event.preventDefault();
        toggleNativeFamilySite(familyToggle);
      }
      if (familyToggle && !familyToggle.closest("details.family-site") && event.detail === 0) toggleFamilySite(familyToggle);

      breadcrumbs.forEach(function (breadcrumb) {
        if (!breadcrumb.contains(event.target)) closeBreadcrumb(breadcrumb, false);
      });
      familySites.forEach(function (familySite) {
        if (!familySite.contains(event.target)) closeFamilySite(familySite, false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;

      breadcrumbs.forEach(function (breadcrumb) {
        closeBreadcrumb(breadcrumb, true);
      });
      familySites.forEach(function (familySite) {
        closeFamilySite(familySite, true);
      });
      document.querySelectorAll(".ui-modal:not([hidden])").forEach(function (modal) {
        closeModal(modal, true);
      });
    });
  });

  function openModal(modal, trigger) {
    if (!modal) return;
    modal._dqModalTrigger = trigger || null;
    modal.hidden = false;
    document.documentElement.classList.add("is-modal-open");
    var focusTarget = modal.querySelector("[data-ui-modal-close], button, a, input, select, textarea");
    if (focusTarget) window.requestAnimationFrame(function () { focusTarget.focus(); });
  }

  function initSubpageThemeAssets() {
    var root = document.querySelector("#sub");
    if (!root) return;
    var assets = [
      ["subVisualBackgroundImage", "--sub-visual-background-image"],
      ["subTitle2Image", "--sub-title2-image"],
      ["subTitle3Image", "--sub-title3-image"],
      ["subListImage", "--sub-list-image"]
    ];
    assets.forEach(function (asset) {
      var value = root.dataset[asset[0]] || "";
      root.style.setProperty(asset[1], value ? 'url("' + value.replace(/["\\]/g, "\\$&") + '")' : "none");
    });
    root.dataset.subVisualHasBackground = root.dataset.subVisualBackgroundImage ? "true" : "false";
    if (!root.dataset.subVisualFilterEnabled) root.dataset.subVisualFilterEnabled = "true";
    if (!root.dataset.subVisualFilterStyle) root.dataset.subVisualFilterStyle = "theme";
  }

  function closeModal(modal, restoreFocus) {
    if (!modal) return;
    modal.hidden = true;
    if (!document.querySelector(".ui-modal:not([hidden])")) document.documentElement.classList.remove("is-modal-open");
    if (restoreFocus && modal._dqModalTrigger) modal._dqModalTrigger.focus();
  }

  function connectToggle(toggle, menu, DQ, prefix) {
    if (!toggle || !menu) return;

    if (!menu.id) menu.id = DQ.uniqueId(prefix);
    toggle.setAttribute("aria-controls", menu.id);
    toggle.setAttribute("aria-haspopup", "true");
  }

  function initBreadcrumb(breadcrumb, DQ) {
    var toggles = Array.from(breadcrumb.querySelectorAll(".breadcrumb__toggle"));

    toggles.forEach(function (toggle) {
      var item = toggle.closest(".breadcrumb__item");
      var menu = item && item.querySelector(".breadcrumb__menu");
      connectToggle(toggle, menu, DQ, "breadcrumb-menu");

      toggle.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");

        closeBreadcrumb(breadcrumb, false, item);
        item.classList.toggle("is-open", willOpen);
        toggle.setAttribute("aria-expanded", String(willOpen));

        if (willOpen) breadcrumb._dqLastToggle = toggle;
      });
    });
  }

  function closeBreadcrumb(breadcrumb, restoreFocus, exceptItem) {
    var hadOpenItem = false;

    breadcrumb.querySelectorAll(".breadcrumb__item").forEach(function (item) {
      if (item === exceptItem) return;
      if (item.classList.contains("is-open")) hadOpenItem = true;

      item.classList.remove("is-open");
      var toggle = item.querySelector(".breadcrumb__toggle");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
    });

    if (hadOpenItem && restoreFocus && breadcrumb._dqLastToggle) {
      breadcrumb._dqLastToggle.focus();
    }
  }

  function initFamilySite(familySite, DQ) {
    var toggle = familySite.querySelector(".family-site__toggle");
    var menu = familySite.querySelector(".family-site__list");
    if (!toggle || !menu) return;
    if (familySite.matches("details")) return;
    if (familySite.dataset.dqFamilyBound === "true") return;
    familySite.dataset.dqFamilyBound = "true";

    connectToggle(toggle, menu, DQ, "family-site-list");
  }

  function closeFamilySite(familySite, restoreFocus) {
    var wasOpen = familySite.classList.contains("is-open");
    var toggle = familySite.querySelector(".family-site__toggle");

    familySite.classList.remove("is-open");
    familySite.removeAttribute("open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");

    if (wasOpen && restoreFocus && familySite._dqLastToggle) {
      familySite._dqLastToggle.focus();
    }
  }

  function toggleFamilySite(toggle) {
    var familySite = toggle.closest(".family-site");
    if (!familySite) return;
    var willOpen = !familySite.classList.contains("is-open");
    familySite.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    familySite._dqLastToggle = toggle;
  }

  function toggleNativeFamilySite(toggle) {
    var familySite = toggle.closest("details.family-site");
    if (!familySite) return;
    familySite.toggleAttribute("open", !familySite.hasAttribute("open"));
    familySite._dqLastToggle = toggle;
  }

  function initSampleSwitcher() {
    document.querySelectorAll(".sample-switcher__close").forEach(function (closeButton) {
      closeButton.addEventListener("click", function () {
        var switcher = closeButton.closest(".sample-switcher");
        if (switcher) switcher.remove();
      });
    });
  }

  function initSubContentUi() {
    if (window.jQuery && window.jQuery.fn && typeof window.jQuery.fn.slick === "function") {
      window.jQuery(".boGalleryView").each(function () {
        var $gallery = window.jQuery(this);
        var $view = $gallery.find(".boGalleryView-view");
        if (!$view.length || $view.hasClass("slick-initialized")) return;
        $view.slick({
          autoplay: false,
          arrows: true,
          accessibility: true,
          dots: true,
          prevArrow: $gallery.find(".boGalleryView-btnPrev"),
          nextArrow: $gallery.find(".boGalleryView-btnNext"),
          draggable: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnHover: false,
          speed: 600,
          adaptiveHeight: true
        });
        $view.find(".slick-dots [aria-controls]").each(function () {
          var targetId = this.getAttribute("aria-controls");
          if (targetId && !document.getElementById(targetId)) this.removeAttribute("aria-controls");
        });
      });
    }

    document.querySelectorAll("template[data-sub-content-js]").forEach(function (template) {
      var root = template.closest("[data-sub-content-block], .sub-content-block");
      if (!root || root.dataset.subContentJsReady === "true") return;
      root.dataset.subContentJsReady = "true";
      try {
        root._dqSubCleanup = Function("root", "host", template.textContent || "")(root, root) || null;
      } catch (error) {
        console.error("개별 콘텐츠 JS 실행 오류:", error);
      }
    });
  }
}(window, document));
