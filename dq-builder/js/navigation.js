/**
 * 헤더, GNB, 모바일 메뉴, 전체 화면 사이트맵
 */
(function (window, document) {
  "use strict";

  window.DQTemplate.use("navigation", function (DQ) {
    initGnb(DQ);
    initHeaderSearch();
    initHeaderScroll();
    initUtilityTools();
  });

  function parseMotifImages(value) {
    try {
      var images = JSON.parse(value || "[]");
      return Array.isArray(images) ? images.filter(function (url) { return typeof url === "string" && url.trim(); }).slice(0, 12) : [];
    } catch (error) { return []; }
  }

  function renderBrandMotifs(config) {
    var motif = document.documentElement.dataset.brandMotif || "none";
    var motion = document.documentElement.dataset.motifMotion || "reveal";
    var ambientMode = document.documentElement.dataset.motifAmbient || "none";
    var images = parseMotifImages(config && config.dataset.themeMotifImages);
    var ambientImages = parseMotifImages(config && config.dataset.themeMotifAmbientImages).slice(0, 8);
    var ambientColor = config && /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(config.dataset.themeMotifAmbientColor || "") ? config.dataset.themeMotifAmbientColor : "#c68be5";
    var ambientLayer = config && /^(?:front|back)$/.test(config.dataset.themeMotifAmbientLayer) ? config.dataset.themeMotifAmbientLayer : "front";
    var sections = Array.from(document.querySelectorAll(".dq-content-section:not(.dq-content-section--legacy)"));
    document.querySelectorAll(".dq-brand-motif-assets, .dq-brand-ambient").forEach(function (node) { node.remove(); });
    sections.forEach(function (section) { section.classList.remove("dq-motif-visible"); });

    if (motif === "custom" && images.length) {
      sections.forEach(function (section, index) {
        var layer = document.createElement("div");
        var image = document.createElement("img");
        layer.className = "dq-brand-motif-assets";
        layer.setAttribute("aria-hidden", "true");
        image.src = images[index % images.length];
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        layer.appendChild(image);
        section.appendChild(layer);
      });
    }

    if (motif !== "none" && motion !== "none" && "IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            (function (target) {
              window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                  window.setTimeout(function () { target.classList.add("dq-motif-visible"); }, 700);
                });
              });
            }(entry.target));
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: .16, rootMargin: "0px 0px -8% 0px" });
      sections.forEach(function (section) { observer.observe(section); });
    } else {
      sections.forEach(function (section) { section.classList.add("dq-motif-visible"); });
    }

    if (ambientMode !== "none") {
      var ambient = document.createElement("div");
      ambient.className = "dq-brand-ambient dq-brand-ambient--" + ambientMode + " dq-brand-ambient--" + ambientLayer;
      ambient.style.setProperty("--dq-ambient-color", ambientColor);
      if (ambientImages.length) ambient.classList.add("has-custom-particles");
      ambient.setAttribute("aria-hidden", "true");
      for (var i = 0; i < 24; i += 1) {
        var particle = document.createElement("i");
        particle.style.setProperty("--particle-x", ((i * 37 + 7) % 101) + "vw");
        particle.style.setProperty("--particle-delay", (-((i * 1.73) % 24)) + "s");
        particle.style.setProperty("--particle-duration", (15 + (i * 7 % 13)) + "s");
        particle.style.setProperty("--particle-drift", ((i % 2 ? 1 : -1) * (24 + i * 3)) + "px");
        particle.style.setProperty("--particle-size", (6 + i % 7) + "px");
        if (ambientImages.length) {
          var particleImage = document.createElement("img");
          particleImage.src = ambientImages[i % ambientImages.length];
          particleImage.alt = "";
          particle.appendChild(particleImage);
        }
        ambient.appendChild(particle);
      }
      document.body.appendChild(ambient);
    }
  }

  function initUtilityTools() {
    var zoomKey = "dq-site-zoom";
    var darkKey = "dq-site-dark-mode";
    var zoomSteps = [90, 100, 110, 120, 130];

    function storedValue(key, fallback) {
      try { return window.localStorage.getItem(key) || fallback; } catch (error) { return fallback; }
    }

    function saveValue(key, value) {
      try { window.localStorage.setItem(key, String(value)); } catch (error) {}
    }

    function applyZoom(value) {
      var zoom = zoomSteps.indexOf(Number(value)) > -1 ? Number(value) : 100;
      var zoomRoot = document.querySelector("#wrapper") || document.body;
      zoomRoot.style.zoom = zoom === 100 ? "" : String(zoom / 100);
      document.querySelectorAll("[data-site-zoom-value]").forEach(function (output) { output.textContent = zoom + "%"; });
      document.querySelectorAll('[data-site-zoom="out"]').forEach(function (button) { button.disabled = zoom === zoomSteps[0]; });
      document.querySelectorAll('[data-site-zoom="in"]').forEach(function (button) { button.disabled = zoom === zoomSteps[zoomSteps.length - 1]; });
      return zoom;
    }

    function applyDarkMode(enabled) {
      document.documentElement.classList.toggle("is-dark-mode", enabled);
      document.querySelectorAll("[data-site-dark-mode]").forEach(function (button) {
        button.setAttribute("aria-pressed", String(enabled));
        button.setAttribute("aria-label", enabled ? "라이트모드로 전환" : "다크모드로 전환");
        var use = button.querySelector("use");
        if (use) {
          var href = use.getAttribute("href") || "";
          use.setAttribute("href", href.replace(/#[^#]+$/, enabled ? "#sun" : "#moon"));
        }
      });
    }

    var currentZoom = applyZoom(storedValue(zoomKey, "100"));
    applyDarkMode(storedValue(darkKey, "false") === "true");

    document.addEventListener("click", function (event) {
      var zoomButton = event.target.closest("[data-site-zoom]");
      var darkButton = event.target.closest("[data-site-dark-mode]");
      if (zoomButton) {
        var currentIndex = zoomSteps.indexOf(currentZoom);
        currentIndex += zoomButton.dataset.siteZoom === "in" ? 1 : -1;
        currentZoom = applyZoom(zoomSteps[Math.max(0, Math.min(zoomSteps.length - 1, currentIndex))]);
        saveValue(zoomKey, currentZoom);
      } else if (darkButton) {
        var enabled = !document.documentElement.classList.contains("is-dark-mode");
        applyDarkMode(enabled);
        saveValue(darkKey, enabled);
      }
    });

    window.addEventListener("storage", function (event) {
      if (event.key === zoomKey) currentZoom = applyZoom(event.newValue || 100);
      if (event.key === darkKey) applyDarkMode(event.newValue === "true");
    });
  }

  function initGnb(DQ) {
    var header = document.querySelector("#header");
    if (!header) return;

    var gnb = header.querySelector(".gnb");
    var items = Array.from(header.querySelectorAll(".gnb-item"));
    var menuButton = header.querySelector(".mobile-menu");
    var siteMapButton = header.querySelector(".site-map-toggle");
    var backdrop = header.querySelector(".gnb-backdrop");
    var wasMobile = isMobile();

    if (!gnb || !items.length || !menuButton || !siteMapButton) return;

    function applySavedHeaderConfig() {
      var config = header.querySelector(".site-header__config");
      if (config && config.dataset.gnbMode) header.dataset.gnbMode = config.dataset.gnbMode;
      if (config && /^(?:underline|overline|side|pill|dot)$/.test(config.dataset.gnbIndicator)) header.dataset.gnbIndicator = config.dataset.gnbIndicator;
      if (!/^(?:underline|overline|side|pill|dot)$/.test(header.dataset.gnbIndicator)) header.dataset.gnbIndicator = "underline";
      if (config) header.style.setProperty("--gnb-indicator-color", config.dataset.gnbIndicatorUseTheme === "false" && config.dataset.gnbIndicatorColor ? config.dataset.gnbIndicatorColor : "var(--theme-color-1)");
      if (config && config.dataset.sitemapLayout) header.dataset.sitemapLayout = config.dataset.sitemapLayout;
      header.dataset.sitemapFilter = config && /^(?:none|dark|blur|grayscale)$/.test(config.dataset.sitemapBackgroundFilter) ? config.dataset.sitemapBackgroundFilter : "none";
      if (config && config.dataset.themeDesign) document.documentElement.dataset.designTheme = config.dataset.themeDesign;
      document.documentElement.dataset.artDirection = config && /^(?:classic|editorial|premium|culture|impact)$/.test(config.dataset.themeArtDirection) ? config.dataset.themeArtDirection : "classic";
      document.documentElement.dataset.brandMotif = config && /^(?:none|circle|square|triangle|custom)$/.test(config.dataset.themeMotif) ? config.dataset.themeMotif : (config && config.dataset.themeMotif === "arch" ? "circle" : "none");
      document.documentElement.dataset.motifMotion = config && /^(?:none|reveal|grow|deepen)$/.test(config.dataset.themeMotifMotion) ? config.dataset.themeMotifMotion : "reveal";
      document.documentElement.dataset.motifAmbient = config && /^(?:none|snow|petal)$/.test(config.dataset.themeMotifAmbient) ? config.dataset.themeMotifAmbient : "none";
      document.documentElement.dataset.motifAmbientLayer = config && /^(?:front|back)$/.test(config.dataset.themeMotifAmbientLayer) ? config.dataset.themeMotifAmbientLayer : "front";
      var useSitemapTheme = !config || config.dataset.sitemapUseTheme !== "false";
      if (useSitemapTheme) {
        header.style.setProperty("--sitemap-background", "var(--theme-color-2)");
        header.style.setProperty("--sitemap-depth1-color", "var(--theme-color-3)");
      } else {
        if (config && config.dataset.sitemapBackground) header.style.setProperty("--sitemap-background", config.dataset.sitemapBackground);
        if (config && config.dataset.sitemapDepth1Color) header.style.setProperty("--sitemap-depth1-color", config.dataset.sitemapDepth1Color);
      }
      header.style.setProperty("--sitemap-background-image", config && config.dataset.sitemapBackgroundImage ? 'url("' + String(config.dataset.sitemapBackgroundImage).replace(/["\\]/g, "\\$&") + '")' : "none");
      if (config && config.dataset.sitemapDepth23Color) header.style.setProperty("--sitemap-depth23-color", config.dataset.sitemapDepth23Color);
      header.classList.toggle("is-utility-mobile-visible", !config || config.dataset.utilityMobileVisible !== "false");
      renderBrandMotifs(config);
    }

    applySavedHeaderConfig();

    function isMobile() {
      return window.innerWidth <= DQ.config.mobileBreakpoint;
    }

    function getMode() {
      var mode = header.dataset.gnbMode;
      return mode === "all" || mode === "single-full" ? mode : "single";
    }

    function syncHeaderMetrics() {
      var main = header.querySelector(".site-header__main");
      var utility = header.querySelector(".site-header__utility");
      var mainHeight = main ? main.getBoundingClientRect().height : 0;
      var utilityHeight = utility && !utility.hidden && window.getComputedStyle(utility).display !== "none" ? utility.getBoundingClientRect().height : 0;
      header.style.setProperty("--header-main-height", mainHeight + "px");
      header.style.setProperty("--header-utility-height", utilityHeight + "px");
      header.style.setProperty("--header-total-height", (mainHeight + utilityHeight) + "px");
      document.documentElement.style.setProperty("--header-main-height", mainHeight + "px");
      document.documentElement.style.setProperty("--header-utility-height", utilityHeight + "px");
      document.documentElement.style.setProperty("--header-total-height", (mainHeight + utilityHeight) + "px");
    }

    function setItemState(item, isOpen) {
      item.classList.toggle("is-open", isOpen);
    }

    function closeGnb() {
      header.classList.remove("is-gnb-open");
      items.forEach(function (item) {
        setItemState(item, false);
      });
    }

    function getPanelContentHeight(depth2, minHeight) {
      var children = Array.from(depth2.children);
      var panelRect = depth2.getBoundingClientRect();
      var styles = window.getComputedStyle(depth2);
      var paddingBottom = parseFloat(styles.paddingBottom) || 0;
      var borderBottom = parseFloat(styles.borderBottomWidth) || 0;
      var contentBottom = children.reduce(function (bottom, child) {
        return Math.max(bottom, child.getBoundingClientRect().bottom);
      }, panelRect.top);

      return Math.max(
        minHeight,
        Math.ceil(contentBottom - panelRect.top + paddingBottom + borderBottom)
      );
    }

    function syncPanelHeight(activeItem, beforeOpen) {
      var mode = getMode();

      if ((mode !== "all" && mode !== "single-full") ||
        isMobile() ||
        (!beforeOpen && !header.classList.contains("is-gnb-open")) ||
        header.classList.contains("is-sitemap-open")) {
        return;
      }

      var panelHeight;

      if (mode === "single-full") {
        panelHeight = items.reduce(function (height, item) {
          var depth2 = item.querySelector(".gnb-depth2");
          return depth2 ? Math.max(height, getPanelContentHeight(depth2, 220)) : height;
        }, 220);
      } else {
        panelHeight = items.reduce(function (height, item) {
          var depth2 = item.querySelector(".gnb-depth2");
          return depth2 ? Math.max(height, getPanelContentHeight(depth2, 350)) : height;
        }, 350);
      }

      header.style.setProperty("--gnb-panel-height", panelHeight + "px");
    }

    function openItem(activeItem) {
      if (isMobile() || header.classList.contains("is-sitemap-open")) return;

      syncHeaderMetrics();

      var wasOpen = header.classList.contains("is-gnb-open");
      var mode = getMode();
      var activePanel = activeItem && activeItem.querySelector(".gnb-depth2");

      if (mode !== "all" && !activePanel) {
        closeGnb();
        return;
      }

      items.forEach(function (item) {
        setItemState(item, mode === "all" || item === activeItem);
      });

      if (!wasOpen && (mode === "all" || mode === "single-full")) {
        syncPanelHeight(activeItem, true);
        void header.offsetHeight;
      }
      header.classList.add("is-gnb-open");

      if (wasOpen && mode === "single-full") {
        syncPanelHeight(activeItem);
      }
    }

    function closeSiteMap(restoreFocus) {
      var wasOpen = header.classList.contains("is-sitemap-open");

      header.classList.remove("is-sitemap-open");
      document.documentElement.classList.remove("is-sitemap-open");
      siteMapButton.setAttribute("aria-expanded", "false");
      siteMapButton.setAttribute("aria-label", "사이트맵 열기");
      if (DQ.smoothScroll) DQ.smoothScroll.start();
      closeGnb();

      if (wasOpen && restoreFocus) siteMapButton.focus();
    }

    function openSiteMap() {
      header.classList.remove("is-mobile-open");
      menuButton.setAttribute("aria-expanded", "false");
      closeGnb();

      header.classList.add("is-sitemap-open");
      document.documentElement.classList.add("is-sitemap-open");
      siteMapButton.setAttribute("aria-expanded", "true");
      siteMapButton.setAttribute("aria-label", "사이트맵 닫기");
      if (DQ.smoothScroll) DQ.smoothScroll.stop();

      items.forEach(function (item) {
        setItemState(item, true);
      });

      var firstLink = gnb.querySelector("a");
      if (firstLink) firstLink.focus();
    }

    function closeMobileMenu(restoreFocus) {
      var wasOpen = header.classList.contains("is-mobile-open");
      header.classList.remove("is-mobile-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "전체 메뉴 열기");
      if (wasOpen && restoreFocus) menuButton.focus();
    }

    function trapSiteMapFocus(event) {
      if (event.key !== "Tab" || !header.classList.contains("is-sitemap-open")) return;

      var focusable = Array.from(header.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(function (element) {
        return element.offsetParent !== null;
      });

      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function bindItem(item) {
      if (item.dataset.gnbBound === "true") return;
      item.dataset.gnbBound = "true";
      var link = item.querySelector(".gnb-link");

      item.addEventListener("mouseenter", function () {
        openItem(item);
      });
      if (link) {
        link.addEventListener("focus", function () {
          openItem(item);
        });
      }
    }

    items.forEach(bindItem);
    syncHeaderMetrics();

    document.addEventListener("dq:gnb-changed", function () {
      applySavedHeaderConfig();
      items = Array.from(header.querySelectorAll(".gnb-item"));
      items.forEach(bindItem);
      syncHeaderMetrics();
      closeGnb();
    });

    header.addEventListener("mouseleave", function () {
      if (!isMobile() && !header.classList.contains("is-sitemap-open")) closeGnb();
    });

    header.addEventListener("focusout", function (event) {
      if (!isMobile() &&
        !header.classList.contains("is-sitemap-open") &&
        !header.contains(event.relatedTarget)) {
        closeGnb();
      }
    });

    siteMapButton.addEventListener("click", function () {
      if (header.classList.contains("is-sitemap-open")) {
        closeSiteMap(true);
      } else {
        openSiteMap();
      }
    });

    menuButton.addEventListener("click", function () {
      var willOpen = !header.classList.contains("is-mobile-open");
      closeSiteMap(false);
      header.classList.toggle("is-mobile-open", willOpen);
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menuButton.setAttribute("aria-label", willOpen ? "전체 메뉴 닫기" : "전체 메뉴 열기");
    });

    if (backdrop) {
      backdrop.addEventListener("click", function () {
        if (isMobile() && header.classList.contains("is-mobile-open")) closeMobileMenu(false);
      });
    }

    window.addEventListener("resize", function () {
      syncHeaderMetrics();
      var nowMobile = isMobile();
      if (nowMobile === wasMobile) {
        syncPanelHeight(items.find(function (item) {
          return item.classList.contains("is-open");
        }));
        return;
      }

      wasMobile = nowMobile;
      closeMobileMenu(false);
      closeSiteMap(false);
      closeGnb();
    });

    document.addEventListener("click", function (event) {
      if (header.classList.contains("is-sitemap-open") && !header.contains(event.target)) {
        closeSiteMap(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      trapSiteMapFocus(event);

      if (event.key !== "Escape") return;
      if (header.classList.contains("is-sitemap-open")) closeSiteMap(true);
      if (header.classList.contains("is-mobile-open")) closeMobileMenu(true);
      closeGnb();
    });
  }

  function initHeaderSearch() {
    var header = document.querySelector("#header");
    if (!header) return;

    function searchConfig() {
      return header.querySelector(".site-header__config");
    }

    function searchToggle() {
      return header.querySelector(".header-search");
    }

    function searchMode() {
      var toggle = searchToggle();
      var config = searchConfig();
      if (toggle && toggle.dataset.searchMode === "link") return "link";
      return config && config.dataset.searchMode === "link" ? "link" : "panel";
    }

    function searchHref() {
      var config = searchConfig();
      return config && config.dataset.searchHref ? config.dataset.searchHref : "#";
    }

    function ensureSearchPanel() {
      var panel = header.querySelector(".header-search-panel");
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "header-search-panel";
        panel.id = "header-search-panel";
        panel.hidden = true;
        panel.innerHTML = '<form class="header-search-panel__form" method="get" role="search"><label class="blind" for="header-search-query">검색어</label><input id="header-search-query" name="q" type="search" placeholder="검색어를 입력하세요" autocomplete="off"><button type="submit" class="header-search-panel__submit" aria-label="검색"><svg aria-hidden="true"><use href="/page/dq-builder/images/icons/site-icons.svg#search"></use></svg><span>검색</span></button><button type="button" class="header-search-panel__close" data-search-close aria-label="검색창 닫기"><svg aria-hidden="true"><use href="/page/dq-builder/images/icons/site-icons.svg#close"></use></svg></button></form>';
        var main = header.querySelector(".site-header__main");
        if (main) main.insertAdjacentElement("afterend", panel);
      }
      var form = panel.querySelector("form");
      if (form) form.action = searchHref();
      return panel;
    }

    function closeSearch(restoreFocus) {
      var wasOpen = header.classList.contains("is-search-open");
      var toggle = searchToggle();
      var panel = header.querySelector(".header-search-panel");
      header.classList.remove("is-search-open");
      if (panel) panel.hidden = true;
      if (toggle && toggle.matches("button")) toggle.setAttribute("aria-expanded", "false");
      if (wasOpen && restoreFocus && toggle) toggle.focus();
    }

    function openSearch() {
      if (searchMode() !== "panel") return;
      var toggle = searchToggle();
      var panel = ensureSearchPanel();
      header.classList.remove("is-gnb-open", "is-mobile-open", "is-sitemap-open");
      document.documentElement.classList.remove("is-sitemap-open");
      var sitemapButton = header.querySelector(".site-map-toggle");
      var mobileButton = header.querySelector(".mobile-menu");
      if (sitemapButton) sitemapButton.setAttribute("aria-expanded", "false");
      if (mobileButton) mobileButton.setAttribute("aria-expanded", "false");
      header.classList.add("is-search-open");
      panel.hidden = false;
      if (toggle && toggle.matches("button")) toggle.setAttribute("aria-expanded", "true");
      var input = panel.querySelector('input[type="search"]');
      if (input) window.setTimeout(function () { input.focus(); }, 0);
    }

    document.addEventListener("click", function (event) {
      var toggle = event.target.closest(".header-search");
      if (toggle && header.contains(toggle) && searchMode() === "panel") {
        event.preventDefault();
        if (header.classList.contains("is-search-open")) closeSearch(true);
        else openSearch();
        return;
      }
      if (event.target.closest("[data-search-close]")) {
        closeSearch(true);
        return;
      }
      if (event.target.closest(".site-map-toggle, .mobile-menu, .gnb-link")) {
        closeSearch(false);
        return;
      }
      if (header.classList.contains("is-search-open") && !header.contains(event.target)) closeSearch(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-search-open")) closeSearch(true);
    });

    document.addEventListener("dq:gnb-changed", function () {
      closeSearch(false);
      if (searchMode() === "panel") ensureSearchPanel();
    });

    if (searchMode() === "panel") ensureSearchPanel();
  }

  function initHeaderScroll() {
    var header = document.querySelector("#header");
    if (!header) return;

    var lastScrollY = window.scrollY;
    var ticking = false;
    var resizeTimer = null;

    function shouldHideOnScroll() {
      var config = header.querySelector(".site-header__config");
      return !config || config.dataset.scrollHide !== "false";
    }

    function updateHeader() {
      var currentScrollY = Math.max(window.scrollY, 0);
      var scrollDelta = currentScrollY - lastScrollY;
      var menuIsOpen = header.classList.contains("is-gnb-open") ||
        header.classList.contains("is-mobile-open") ||
        header.classList.contains("is-sitemap-open") ||
        header.classList.contains("is-search-open");

      header.classList.toggle("is-scrolled", currentScrollY > 10);

      if (!shouldHideOnScroll() || currentScrollY <= 10 || menuIsOpen) {
        header.classList.remove("is-scroll-hidden");
      } else if (Math.abs(scrollDelta) >= 4) {
        header.classList.toggle("is-scroll-hidden", scrollDelta > 0);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    }, { passive: true });

    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      header.classList.remove("is-scroll-hidden");
      lastScrollY = Math.max(window.scrollY, 0);
      resizeTimer = window.setTimeout(function () {
        header.classList.remove("is-scroll-hidden");
        lastScrollY = Math.max(window.scrollY, 0);
      }, 180);
    });

    document.addEventListener("dq:gnb-changed", function () {
      lastScrollY = Math.max(window.scrollY, 0);
      updateHeader();
    });

    updateHeader();
  }
}(window, document));
