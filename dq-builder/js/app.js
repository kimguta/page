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

  function escapeContent(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function calendarMonthMarkup(year, month, items) {
    var icons = "/page/dq-builder/images/icons/site-icons.svg?v=2";
    var firstWeekday = new Date(year, month - 1, 1).getDay();
    var lastDate = new Date(year, month, 0).getDate();
    var eventsByDate = {};
    items.forEach(function (item) {
      var date = String(item.text || "").trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
      (eventsByDate[date] || (eventsByDate[date] = [])).push(item);
    });
    var today = new Date();
    var weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    var cells = [];
    var totalCells = Math.ceil((firstWeekday + lastDate) / 7) * 7;
    for (var index = 0; index < totalCells; index += 1) {
      var day = index - firstWeekday + 1;
      if (day < 1 || day > lastDate) { cells.push('<td class="is-empty" aria-hidden="true"></td>'); continue; }
      var key = year + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
      var dayEvents = eventsByDate[key] || [];
      var isToday = today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
      var firstLink = dayEvents.find(function (item) { return item.href && item.href !== "#"; });
      var dayNumber = firstLink
        ? '<a class="dq-calendar-day" href="' + escapeContent(firstLink.href) + '" aria-label="' + escapeContent(key + " " + firstLink.title) + '"' + (isToday ? ' aria-current="date"' : '') + '>' + day + '</a>'
        : '<span class="dq-calendar-day"' + (isToday ? ' aria-current="date"' : '') + '>' + day + '</span>';
      var cellClasses = (dayEvents.length ? "has-event " : "") + (isToday ? "is-today" : "");
      cells.push('<td' + (cellClasses ? ' class="' + cellClasses.trim() + '"' : '') + '><time datetime="' + key + '">' + dayNumber + '</time></td>');
    }
    var rows = [];
    for (var row = 0; row < cells.length; row += 7) rows.push('<tr>' + cells.slice(row, row + 7).join("") + '</tr>');
    var monthPrefix = year + "-" + String(month).padStart(2, "0") + "-";
    var monthEvents = items.filter(function (item) { return String(item.text || "").indexOf(monthPrefix) === 0; }).slice().sort(function (a, b) { return String(a.text).localeCompare(String(b.text)); });
    var eventList = monthEvents.length ? '<ol>' + monthEvents.map(function (item) {
      var dayLabel = Number(String(item.text).slice(-2)) + "일";
      var title = escapeContent(item.title || "일정");
      return '<li><time datetime="' + escapeContent(item.text) + '">' + dayLabel + '</time>' + (item.href && item.href !== "#" ? '<a href="' + escapeContent(item.href) + '">' + title + '</a>' : '<span>' + title + '</span>') + '</li>';
    }).join("") + '</ol>' : '<p class="dq-calendar__empty">등록된 일정이 없습니다.</p>';
    return '<div class="dq-calendar__header"><button type="button" data-calendar-shift="-1" aria-label="이전 달"><svg aria-hidden="true"><use href="' + icons + '#chevron-left"></use></svg></button><div class="dq-calendar__month" aria-live="polite"><strong>' + year + '</strong><span>' + month + '월</span></div><button type="button" data-calendar-shift="1" aria-label="다음 달"><svg aria-hidden="true"><use href="' + icons + '#chevron-right"></use></svg></button></div><div class="dq-calendar__scroll"><table><caption>' + year + '년 ' + month + '월 일정</caption><thead><tr>' + weekdays.map(function (day) { return '<th scope="col">' + day + '</th>'; }).join("") + '</tr></thead><tbody>' + rows.join("") + '</tbody></table></div><div class="dq-calendar__events"><strong>' + month + '월 일정</strong>' + eventList + '</div>';
  }

  function initContentCalendars() {
    Array.from(document.querySelectorAll('.dq-calendar')).forEach(function (calendar) {
      if (calendar.dataset.calendarReady === "true") return;
      calendar.dataset.calendarReady = "true";
      var items;
      try { items = JSON.parse(calendar.dataset.calendarEvents || "[]"); }
      catch (error) { items = []; }
      calendar.addEventListener("click", function (event) {
        var button = event.target.closest('[data-calendar-shift]');
        if (!button) return;
        var year = Number(calendar.dataset.calendarYear);
        var month = Number(calendar.dataset.calendarMonth) + Number(button.dataset.calendarShift || 0);
        if (month < 1) { year -= 1; month = 12; }
        if (month > 12) { year += 1; month = 1; }
        year = Math.max(1970, Math.min(2100, year));
        calendar.dataset.calendarYear = String(year);
        calendar.dataset.calendarMonth = String(month);
        calendar.innerHTML = calendarMonthMarkup(year, month, items);
      });
    });
  }

  function initContentYoutube() {
    Array.from(document.querySelectorAll('[data-youtube-autoplay="true"]')).forEach(function (youtube) {
      if (youtube.dataset.youtubeReady === "true") return;
      youtube.dataset.youtubeReady = "true";
      var frame = youtube.querySelector("iframe");
      if (!frame) return;
      function command(name) {
        if (frame.contentWindow) frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: name, args: [] }), "*");
      }
      function play() { command("mute"); command("playVideo"); }
      if (typeof window.IntersectionObserver !== "function") { frame.addEventListener("load", play, { once: true }); return; }
      var inView = false;
      frame.addEventListener("load", function () { if (inView) play(); });
      var observer = new window.IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inView = entry.isIntersecting && entry.intersectionRatio >= .55;
          if (inView) play();
          else command("pauseVideo");
        });
      }, { threshold: [0, .55] });
      youtube._dqYoutubeObserver = observer;
      observer.observe(youtube);
    });
  }

  async function boot() {
    await includeHtml();
    applyBuilderOverrides();
    initContentCalendars();
    initContentYoutube();

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
