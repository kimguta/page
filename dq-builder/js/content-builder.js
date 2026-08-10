/**
 * Lightweight section recipes used by the DQ site builder.
 * The reference archive is metadata only; rendered pages only contain selected sections.
 */
(function (window, document) {
  "use strict";

  var ICONS = "/page/dq-builder/images/icons/site-icons.svg?v=2";
  var moduleLabels = {
    empty: "콘텐츠 선택",
    visual: "큰 이미지와 소개",
    quick: "주요 서비스 바로가기",
    board: "공지사항 · 소식",
    cards: "이미지 카드",
    banner: "홍보 배너",
    text: "텍스트 · 버튼",
    imageText: "이미지 + 텍스트",
    stats: "숫자 · 성과",
    faq: "질문 · 답변",
    gallery: "이미지 갤러리",
    youtube: "유튜브",
    calendar: "캘린더",
    sns: "SNS 링크",
    code: "직접 작성 (HTML·CSS·JS)",
    custom: "기존 콘텐츠"
  };
  var moduleVariants = {
    visual: [["cover", "이미지 전체형"], ["center", "중앙 문구형"], ["split", "이미지 분할형"]],
    quick: [["icon", "아이콘 카드형"], ["compact", "간결한 메뉴형"], ["pill", "둥근 버튼형"]],
    board: [["list", "기본 목록형"], ["date", "날짜 강조형"], ["card", "게시판 카드형"]],
    cards: [["image", "이미지 상단형"], ["overlay", "이미지 겹침형"], ["horizontal", "가로 카드형"]],
    banner: [["color", "컬러 배너형"], ["image", "이미지 배너형"], ["compact", "작은 알림판형"]],
    text: [["basic", "기본 문단형"], ["center", "중앙 강조형"], ["cta", "버튼 강조형"]],
    imageText: [["image-left", "이미지 왼쪽"], ["image-right", "이미지 오른쪽"], ["stack", "이미지 위"]],
    stats: [["line", "가로 지표형"], ["card", "카드 지표형"], ["strong", "숫자 강조형"]],
    faq: [["line", "구분선형"], ["box", "박스형"]],
    gallery: [["grid", "기본 그리드"], ["masonry", "크기 강조형"], ["rounded", "둥근 이미지형"]],
    youtube: [["embed", "기본 영상형"]],
    calendar: [["month", "월간 달력형"]],
    sns: [["icon", "아이콘형"], ["label", "아이콘 + 이름"]],
    code: [["code", "직접 작성"]]
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function uid(prefix) {
    return (prefix || "content") + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function defaultSlider(enabled) {
    return { enabled: !!enabled, perView: 1, transition: "fade", controllerStyle: "", duration: 650, delay: 4500, arrows: true, dots: false, counter: false, play: false, autoplay: false, loop: true };
  }

  function createModule(type) {
    var firstVariant = moduleVariants[type] && moduleVariants[type][0] ? moduleVariants[type][0][0] : "default";
    var base = { id: uid("module"), type: type || "empty", variant: firstVariant, showTitle: true, titleInitialized: true, title: moduleLabels[type] || "열 제목", description: "", imageFit: "cover", useMediaHeight: false, mediaHeight: 360, hoverEffect: type === "board" ? "underline" : (type === "quick" ? "icon-scale" : "none"), gap: 24, fullBleed: false, animation: "fade-up", items: [], slider: defaultSlider(false) };
    if (type === "visual") {
      base.title = "새로운 이야기를 시작합니다";
      base.description = "핵심 메시지와 대표 이미지를 보여주는 영역입니다.";
      base.slider = defaultSlider(true);
      base.slider.controllerStyle = "image-capsule";
      base.slider.dots = true;
      base.items = [
        { title: "첫 번째 이야기", text: "방문자에게 가장 중요한 내용을 소개합니다.", href: "#", image: "", icon: "" },
        { title: "두 번째 이야기", text: "이미지와 문구를 자유롭게 바꿀 수 있습니다.", href: "#", image: "", icon: "" }
      ];
    } else if (type === "quick") {
      base.animation = "stagger";
      base.title = "자주 찾는 서비스";
      base.description = "필요한 정보를 빠르게 찾아보세요.";
      base.items = ["home", "search", "user", "download"].map(function (icon, index) {
        return { title: ["서비스 안내", "통합 검색", "사용자 메뉴", "자료 내려받기"][index], text: "", href: "#", image: "", icon: icon };
      });
      base.slider.perView = 4;
    } else if (type === "board") {
      base.title = "공지사항";
      base.description = "새로운 소식을 알려드립니다.";
      base.items = [1, 2, 3, 4].map(function (number) {
        return { title: "공지사항 제목이 들어갑니다 " + number, text: "2026.08.05", href: "#", image: "", icon: "" };
      });
    } else if (type === "cards") {
      base.animation = "stagger";
      base.fullBleed = true;
      base.slider = defaultSlider(true);
      base.slider.transition = "slide";
      base.title = "추천 콘텐츠";
      base.description = "주요 콘텐츠를 카드로 소개합니다.";
      base.items = [1, 2, 3, 4, 5, 6].map(function (number) {
        return { title: "추천 콘텐츠 " + number, text: "콘텐츠를 간단하게 설명하는 문구입니다.", href: "#", image: "", icon: "" };
      });
      base.slider.perView = 3;
      base.slider.controllerStyle = "bottom-capsule";
    } else if (type === "banner") {
      base.title = "알림판";
      base.slider = defaultSlider(true);
      base.slider.controllerStyle = "image-capsule";
      base.slider.dots = true;
      base.items = [1, 2, 3].map(function (number) {
        return { title: "홍보 배너 " + number, text: "주요 행사와 알림을 소개합니다.", href: "#", image: "", icon: "" };
      });
    } else if (type === "text") {
      base.title = "전하고 싶은 이야기를 입력하세요";
      base.description = "짧은 소개 문장과 이동 버튼을 함께 배치하는 기본 콘텐츠입니다.";
      base.items = [{ title: "자세히 보기", text: "", href: "#", image: "", icon: "" }];
    } else if (type === "imageText") {
      base.title = "이미지와 설명";
      base.description = "사진과 핵심 내용을 나란히 소개합니다.";
      base.items = [{ title: "콘텐츠 제목", text: "이미지와 함께 보여줄 상세 설명을 입력하세요.", href: "#", image: "", icon: "" }];
    } else if (type === "stats") {
      base.animation = "stagger";
      base.title = "한눈에 보는 주요 성과";
      base.items = [["25년", "운영 경험"], ["120+", "진행 프로젝트"], ["98%", "고객 만족도"]].map(function (item) {
        return { title: item[0], text: item[1], href: "#", image: "", icon: "" };
      });
    } else if (type === "faq") {
      base.title = "자주 묻는 질문";
      base.items = [1, 2, 3].map(function (number) {
        return { title: "질문 제목 " + number, text: "질문에 대한 답변을 입력하세요.", href: "#", image: "", icon: "" };
      });
    } else if (type === "gallery") {
      base.animation = "stagger";
      base.title = "이미지 갤러리";
      base.items = [1, 2, 3, 4].map(function (number) {
        return { title: "갤러리 이미지 " + number, text: "", href: "#", image: "", icon: "" };
      });
      base.slider.perView = 3;
    } else if (type === "youtube") {
      base.title = "추천 영상";
      base.description = "유튜브 영상을 확인해 보세요.";
      base.videoId = "ZvenigmbShw";
      base.autoplayOnView = false;
    } else if (type === "calendar") {
      var today = new Date();
      var todayText = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
      base.title = "행사 일정";
      base.description = "날짜를 선택해 주요 일정을 확인하세요.";
      base.calendarYear = today.getFullYear();
      base.calendarMonth = today.getMonth() + 1;
      base.items = [{ title: "일정 정보를 입력하세요", text: todayText, href: "#", image: "", icon: "" }];
    } else if (type === "sns") {
      base.title = "SNS";
      base.description = "공식 SNS 채널의 새로운 소식을 만나보세요.";
      base.animation = "stagger";
      base.items = [
        { title: "인스타그램", text: "", href: "#", image: "", icon: "instagram", platform: "instagram" },
        { title: "유튜브", text: "", href: "#", image: "", icon: "youtube", platform: "youtube" }
      ];
    } else if (type === "code") {
      base.title = "직접 작성 요소";
      base.html = '<div class="custom-box"><strong>직접 작성 요소</strong><p>HTML을 입력해 주세요.</p></div>';
      base.css = '.custom-box { padding: 32px; border: 1px solid #ddd; background: #fff; }';
      base.js = '';
    }
    return base;
  }

  function legacyName(element, index) {
    var heading = element.querySelector && element.querySelector("h1,h2,h3,strong");
    var text = heading ? heading.textContent.replace(/\s+/g, " ").trim() : "";
    if (text) return text.slice(0, 28);
    if (element.getAttribute && element.getAttribute("aria-label")) return element.getAttribute("aria-label").slice(0, 28);
    return "기본 섹션 " + (index + 1);
  }

  function createLegacySection(element, index) {
    var sectionId = uid("section");
    element.classList.add("dq-content-section", "dq-content-section--legacy");
    element.dataset.sectionId = sectionId;
    element.dataset.builderLegacy = "true";
    return {
      id: sectionId, name: legacyName(element, index), width: "full", layout: "1", legacy: true,
      maxWidth: 1200, background: "#ffffff", backgroundImage: "",
      cells: [{ id: uid("cell"), module: { id: uid("module"), type: "custom", variant: "default", title: legacyName(element, index), description: "", html: element.outerHTML, items: [], slider: defaultSlider(false) } }]
    };
  }

  function columnCount(layout) {
    return layout === "2" || layout === "1-2" || layout === "2-1" ? 2 : layout === "3" ? 3 : 1;
  }

  function createSection(preset) {
    var type = preset || "empty";
    var section = {
      id: uid("section"), name: moduleLabels[type] || "새 섹션", width: "wide", layout: "1",
      maxWidth: 1200, columnGap: 40, paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0, useHeight: false, heightValue: 100, heightUnit: "vh", background: "#ffffff", backgroundImage: "",
      showTitle: true, titleVisibilityConfigured: true, sectionTitle: moduleLabels[type] || "섹션 제목", titleSize: 42, titleColor: "#1d2530",
      showSubtitle: false, sectionSubtitle: "섹션을 설명하는 문장을 입력하세요.", subtitleSize: 18, subtitleColor: "#667080", headingAlign: "left",
      cells: [{ id: uid("cell"), module: createModule(type) }]
    };
    if (type === "empty") section.name = "새 레이아웃";
    if (type === "quick") section.name = "주요 서비스";
    if (type === "board") section.name = "공지사항";
    if (type === "cards") section.name = "추천 콘텐츠";
    if (type === "banner") section.name = "홍보 · 알림";
    if (type === "visual") { section.name = "메인 비주얼"; section.width = "full"; }
    return section;
  }

  function normalize(state) {
    var data = state && Array.isArray(state.sections) ? clone(state) : { sections: [] };
    data.headingStructureVersion = 2;
    data.contentImageVersion = 2;
    data.contentModuleVersion = 2;
    data.background = data.background || "#ffffff";
    data.sectionGap = Math.max(0, Math.min(200, Number(data.sectionGap) || 0));
    data.sections.forEach(function (section) {
      section.id = section.id || uid("section");
      section.name = section.name || "콘텐츠 섹션";
      section.width = /^(?:full|wide|contained)$/.test(section.width) ? section.width : "wide";
      section.layout = /^(?:1|2|1-2|2-1|3)$/.test(section.layout) ? section.layout : "1";
      section.background = section.background || "#ffffff";
      section.backgroundImage = section.backgroundImage || "";
      section.maxWidth = Math.max(760, Math.min(1800, Number(section.maxWidth) || 1200));
      section.columnGap = Math.max(0, Math.min(120, section.columnGap == null ? 40 : Number(section.columnGap) || 0));
      var legacyPaddingY = Math.max(0, Math.min(200, Number(section.paddingY) || 0));
      section.paddingTop = Math.max(0, Math.min(200, section.paddingTop == null ? legacyPaddingY : Number(section.paddingTop) || 0));
      section.paddingBottom = Math.max(0, Math.min(200, section.paddingBottom == null ? legacyPaddingY : Number(section.paddingBottom) || 0));
      section.paddingLeft = Math.max(0, Math.min(200, section.paddingLeft == null ? (section.width === "contained" ? 40 : 0) : Number(section.paddingLeft) || 0));
      section.paddingRight = Math.max(0, Math.min(200, section.paddingRight == null ? (section.width === "contained" ? 40 : 0) : Number(section.paddingRight) || 0));
      delete section.paddingY;
      if (section.titleVisibilityConfigured !== true) {
        if (/^(?:새 레이아웃|콘텐츠 선택|섹션 제목)$/.test(String(section.sectionTitle || ""))) {
          var primaryModule = section.cells && section.cells.length === 1 && section.cells[0] && section.cells[0].module;
          section.sectionTitle = primaryModule && primaryModule.title ? primaryModule.title : section.name;
        }
        section.showTitle = true;
        section.titleVisibilityConfigured = true;
      } else {
        section.showTitle = section.showTitle !== false;
      }
      section.sectionTitle = section.sectionTitle == null ? section.name : String(section.sectionTitle);
      section.titleSize = Math.max(12, Math.min(120, Number(section.titleSize) || 42));
      section.titleColor = section.titleColor || "#1d2530";
      section.showSubtitle = !!section.showSubtitle;
      section.sectionSubtitle = section.sectionSubtitle == null ? "" : String(section.sectionSubtitle);
      section.subtitleSize = Math.max(10, Math.min(72, Number(section.subtitleSize) || 18));
      section.subtitleColor = section.subtitleColor || "#667080";
      section.headingAlign = /^(?:left|center|right)$/.test(section.headingAlign) ? section.headingAlign : "left";
      section.useHeight = !!section.useHeight;
      section.heightUnit = section.heightUnit === "px" ? "px" : "vh";
      section.heightValue = Math.max(1, Math.min(section.heightUnit === "vh" ? 200 : 2000, Number(section.heightValue) || (section.heightUnit === "vh" ? 100 : 600)));
      section.cells = Array.isArray(section.cells) ? section.cells : [];
      setLayout(section, section.layout);
    });
    return data;
  }

  function setLayout(section, layout) {
    section.layout = layout;
    var count = columnCount(layout);
    section.cells = Array.isArray(section.cells) ? section.cells : [];
    while (section.cells.length < count) section.cells.push({ id: uid("cell"), module: createModule("empty") });
    if (section.cells.length > count) section.cells = section.cells.slice(0, count);
    section.cells.forEach(function (cell) {
      cell.id = cell.id || uid("cell");
      cell.module = cell.module || createModule("empty");
      cell.module.showTitle = cell.module.showTitle !== false;
      if (cell.module.titleInitialized !== true) {
        cell.module.title = cell.module.title == null || cell.module.title === "" ? (moduleLabels[cell.module.type] || "열 제목") : String(cell.module.title);
        cell.module.titleInitialized = true;
      } else {
        cell.module.title = cell.module.title == null ? "" : String(cell.module.title);
      }
      cell.module.description = cell.module.description == null ? "" : String(cell.module.description);
      cell.module.imageFit = /^(?:cover|contain)$/.test(cell.module.imageFit) ? cell.module.imageFit : "cover";
      cell.module.useMediaHeight = !!cell.module.useMediaHeight;
      cell.module.mediaHeight = Math.max(120, Math.min(1000, Number(cell.module.mediaHeight) || (cell.module.type === "banner" ? 360 : 320)));
      if (cell.module.type === "board") cell.module.hoverEffect = /^(?:underline|lift|background)$/.test(cell.module.hoverEffect) ? cell.module.hoverEffect : "underline";
      else if (cell.module.type === "quick") cell.module.hoverEffect = /^(?:icon-scale|lift|background)$/.test(cell.module.hoverEffect) ? cell.module.hoverEffect : "icon-scale";
      else cell.module.hoverEffect = "none";
      cell.module.slider = Object.assign(defaultSlider(false), cell.module.slider || {});
      cell.module.gap = Math.max(0, Math.min(100, Number(cell.module.gap) || 24));
      cell.module.fullBleed = cell.module.type === "cards" && section.layout === "1" ? cell.module.fullBleed !== false : false;
      cell.module.animation = /^(?:none|fade-up|fade|slide-left|slide-right|zoom|stagger)$/.test(cell.module.animation) ? cell.module.animation : (/^(?:quick|cards|stats|gallery)$/.test(cell.module.type) ? "stagger" : "fade-up");
      cell.module.slider.duration = Math.max(100, Math.min(3000, Number(cell.module.slider.duration) || 650));
      cell.module.slider.delay = Math.max(1000, Math.min(15000, Number(cell.module.slider.delay) || 4500));
      var allowedVariants = moduleVariants[cell.module.type] || [];
      if (!allowedVariants.some(function (variant) { return variant[0] === cell.module.variant; })) cell.module.variant = allowedVariants[0] ? allowedVariants[0][0] : "default";
      if (cell.module.slider.transition === "zoom") cell.module.slider.transition = "cinematic";
      if (cell.module.type === "visual" && cell.module.slider.transition === "vertical") cell.module.slider.transition = "page";
      if (!/^(?:fade|slide|vertical|page|cinematic)$/.test(cell.module.slider.transition)) cell.module.slider.transition = "fade";
      var legacyControllerStyles = { overlay: "image-capsule", side: "image-split", bottom: "bottom-capsule", minimal: "bottom-minimal" };
      cell.module.slider.controllerStyle = legacyControllerStyles[cell.module.slider.controllerStyle] || cell.module.slider.controllerStyle;
      if (!/^(?:image|bottom)-(?:capsule|split|minimal)$/.test(cell.module.slider.controllerStyle)) {
        cell.module.slider.controllerStyle = /^(?:visual|banner)$/.test(cell.module.type) ? "image-capsule" : "bottom-capsule";
      }
      cell.module.items = Array.isArray(cell.module.items) ? cell.module.items : [];
      cell.module.videoId = cell.module.videoId == null ? "" : String(cell.module.videoId);
      cell.module.autoplayOnView = !!cell.module.autoplayOnView;
      cell.module.calendarYear = Math.max(1970, Math.min(2100, Number(cell.module.calendarYear) || new Date().getFullYear()));
      cell.module.calendarMonth = Math.max(1, Math.min(12, Number(cell.module.calendarMonth) || (new Date().getMonth() + 1)));
      cell.module.items.forEach(function (item) {
        item.alt = item.alt == null ? "" : String(item.alt);
        item.platform = /^(?:instagram|youtube|facebook|blog|x)$/.test(item.platform) ? item.platform : (/^(?:instagram|youtube|facebook|blog|x)$/.test(item.icon) ? item.icon : "instagram");
      });
    });
  }

  function contentImage(item, className, eager) {
    if (!item || !item.image) return "";
    return '<img class="' + escapeHtml(className) + '" src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.alt || item.title || "") + '" loading="' + (eager ? 'eager' : 'lazy') + '" decoding="async">';
  }

  function itemMedia(item, index, className) {
    if (item.image) return contentImage(item, className, false);
    if (item.icon) return '<span class="' + className + ' dq-content-icon"><svg aria-hidden="true"><use href="' + ICONS + '#' + escapeHtml(item.icon) + '"></use></svg></span>';
    return '<span class="' + className + ' dq-content-placeholder" aria-hidden="true">' + String(index + 1).padStart(2, "0") + '</span>';
  }

  function youtubeVideoId(value) {
    var text = String(value || "").trim();
    var match = text.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/i);
    if (match) return match[1];
    return /^[A-Za-z0-9_-]{11}$/.test(text) ? text : "";
  }

  function calendarDateKey(year, month, day) {
    return year + "-" + String(month).padStart(2, "0") + "-" + String(day).padStart(2, "0");
  }

  function renderCalendarMonth(year, month, items) {
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
      if (day < 1 || day > lastDate) {
        cells.push('<td class="is-empty" aria-hidden="true"></td>');
        continue;
      }
      var key = calendarDateKey(year, month, day);
      var dayEvents = eventsByDate[key] || [];
      var isToday = today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
      var firstLink = dayEvents.find(function (item) { return item.href && item.href !== "#"; });
      var dayNumber = firstLink
        ? '<a class="dq-calendar-day" href="' + escapeHtml(firstLink.href) + '" aria-label="' + escapeHtml(key + " " + firstLink.title) + '"' + (isToday ? ' aria-current="date"' : '') + '>' + day + '</a>'
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
      var title = escapeHtml(item.title || "일정");
      return '<li><time datetime="' + escapeHtml(item.text) + '">' + dayLabel + '</time>' + (item.href && item.href !== "#" ? '<a href="' + escapeHtml(item.href) + '">' + title + '</a>' : '<span>' + title + '</span>') + '</li>';
    }).join("") + '</ol>' : '<p class="dq-calendar__empty">등록된 일정이 없습니다.</p>';
    return '<div class="dq-calendar__header"><button type="button" data-calendar-shift="-1" aria-label="이전 달"><svg aria-hidden="true"><use href="' + ICONS + '#chevron-left"></use></svg></button><div class="dq-calendar__month" aria-live="polite"><strong>' + year + '</strong><span>' + month + '월</span></div><button type="button" data-calendar-shift="1" aria-label="다음 달"><svg aria-hidden="true"><use href="' + ICONS + '#chevron-right"></use></svg></button></div><div class="dq-calendar__scroll"><table><caption>' + year + '년 ' + month + '월 일정</caption><thead><tr>' + weekdays.map(function (day) { return '<th scope="col">' + day + '</th>'; }).join("") + '</tr></thead><tbody>' + rows.join("") + '</tbody></table></div><div class="dq-calendar__events"><strong>' + month + '월 일정</strong>' + eventList + '</div>';
  }

  function renderCalendar(module) {
    var year = Math.max(1970, Math.min(2100, Number(module.calendarYear) || new Date().getFullYear()));
    var month = Math.max(1, Math.min(12, Number(module.calendarMonth) || (new Date().getMonth() + 1)));
    var eventData = JSON.stringify(module.items.map(function (item) { return { title: item.title || "", text: item.text || "", href: item.href || "" }; }));
    return '<div class="dq-calendar" data-calendar-year="' + year + '" data-calendar-month="' + month + '" data-calendar-events="' + escapeHtml(eventData) + '">' + renderCalendarMonth(year, month, module.items) + '</div>';
  }

  function controls(module) {
    if (!module.slider || !module.slider.enabled || module.items.length < 2) return "";
    var controllerStyle = /^(?:image|bottom)-(?:capsule|split|minimal)$/.test(module.slider.controllerStyle) ? module.slider.controllerStyle : (/^(?:visual|banner)$/.test(module.type) ? "image-capsule" : "bottom-capsule");
    var html = '<div class="dq-content-controls dq-content-controls--' + controllerStyle + '" data-slider-controls>';
    if (module.slider.arrows) html += '<button type="button" data-slide-prev aria-label="이전 항목"><svg aria-hidden="true"><use href="' + ICONS + '#chevron-left"></use></svg></button>';
    if (module.slider.counter) html += '<span class="dq-content-counter"><b data-slide-current>1</b> / <span data-slide-total>' + module.items.length + '</span></span>';
    if (module.slider.dots) html += '<span class="dq-content-dots" data-slide-pagination></span>';
    if (module.slider.play) html += '<button type="button" data-slide-play aria-pressed="' + String(!!module.slider.autoplay) + '" aria-label="자동 재생 전환"><svg aria-hidden="true"><use href="' + ICONS + '#' + (module.slider.autoplay ? "pause" : "play") + '"></use></svg></button>';
    if (module.slider.arrows) html += '<button type="button" data-slide-next aria-label="다음 항목"><svg aria-hidden="true"><use href="' + ICONS + '#chevron-right"></use></svg></button>';
    return html + '</div>';
  }

  function renderItems(module, className, itemRenderer) {
    var slider = module.slider && module.slider.enabled && module.items.length > 1;
    var perView = Math.max(1, Math.min(4, Number(module.slider && module.slider.perView) || 1));
    var transition = /^(?:fade|slide|vertical|page|cinematic)$/.test(module.slider && module.slider.transition) ? module.slider.transition : (module.slider && module.slider.transition === "zoom" ? "cinematic" : "fade");
    var duration = Math.max(100, Math.min(3000, Number(module.slider && module.slider.duration) || 650));
    var delay = Math.max(1000, Math.min(15000, Number(module.slider && module.slider.delay) || 4500));
    var sliderType = perView === 1 ? ' is-slider--single' : ' is-slider--multiple';
    // A visual is one continuous hero canvas. Module item gaps belong to
    // cards/lists and must never reveal a seam between visual slides.
    var gap = module.type === "visual" ? 0 : Math.max(0, Math.min(100, Number(module.gap) || 24));
    var controllerStyle = /^(?:image|bottom)-(?:capsule|split|minimal)$/.test(module.slider && module.slider.controllerStyle) ? module.slider.controllerStyle : (/^(?:visual|banner)$/.test(module.type) ? "image-capsule" : "bottom-capsule");
    var controlHtml = controls(module);
    var imageControl = slider && controllerStyle.indexOf("image-") === 0;
    var html = '<div class="' + className + (slider ? ' swiper is-slider' + sliderType + ' is-transition-' + transition : '') + '" style="--module-gap-max:' + gap + 'px;--slider-duration:' + duration + 'ms"' + (slider ? ' data-content-slider data-transition="' + transition + '" data-duration="' + duration + '" data-delay="' + delay + '" data-loop="' + String(module.slider.loop !== false) + '" data-autoplay="' + String(!!module.slider.autoplay) + '" data-per-view="' + perView + '" data-gap="' + gap + '"' : '') + '>';
    if (slider) html += '<div class="swiper-wrapper">';
    module.items.forEach(function (item, index) {
      html += '<div class="dq-content-slide' + (slider ? ' swiper-slide' : '') + '" data-slide-index="' + index + '">' + itemRenderer(item, index) + '</div>';
    });
    if (slider) html += '</div>';
    if (imageControl) html += controlHtml;
    return html + '</div>' + (imageControl ? "" : controlHtml);
  }

  function renderModule(module) {
    if (!module) return '';
    var headingContent = module.showTitle !== false && module.title ? '<h3>' + escapeHtml(module.title) + '</h3>' + (module.description ? '<p>' + escapeHtml(module.description) + '</p>' : '') : '';
    var heading = headingContent ? '<div class="dq-content-heading"><div>' + headingContent + '</div></div>' : '';
    var supportsManualHeight = /^(?:cards|banner)$/.test(module.type);
    var supportsHoverEffect = /^(?:board|quick)$/.test(module.type);
    var moduleClass = 'dq-module dq-module--' + escapeHtml(module.type) + ' dq-module--variant-' + escapeHtml(module.variant || "default") + ' is-image-fit-' + escapeHtml(module.imageFit || "cover") + (supportsHoverEffect ? ' is-hover-' + escapeHtml(module.hoverEffect || (module.type === "board" ? "underline" : "icon-scale")) : '') + (supportsManualHeight && module.useMediaHeight ? ' has-custom-media-height' : '') + (module.type === "cards" && module.fullBleed ? ' is-track-full' : '') + (module.animation && module.animation !== "none" ? ' dq-motion dq-motion--' + escapeHtml(module.animation) : '');
    var moduleStyle = supportsManualHeight && module.useMediaHeight ? ' style="--module-media-height:' + module.mediaHeight + 'px"' : '';
    var moduleOpen = '<div class="' + moduleClass + '"' + moduleStyle + '>';
    if (module.type === "empty") return moduleOpen + heading + '<div class="dq-content-empty"><strong>콘텐츠를 선택해 주세요.</strong><span>편집기에서 이 칸에 들어갈 내용을 고를 수 있습니다.</span></div></div>';
    if (module.type === "visual") {
      return moduleOpen + heading + renderItems(module, "dq-visual-list", function (item, index) {
        return '<article class="dq-visual-item">' + contentImage(item, "dq-visual-item__image", index === 0) + '<div><span>VISUAL ' + String(index + 1).padStart(2, "0") + '</span><strong>' + escapeHtml(item.title) + '</strong><p>' + escapeHtml(item.text) + '</p><a href="' + escapeHtml(item.href || "#") + '">자세히 보기</a></div></article>';
      }) + '</div>';
    }
    if (module.type === "quick") {
      return moduleOpen + heading + renderItems(module, "dq-quick-list", function (item, index) {
        return '<a class="dq-quick-item" href="' + escapeHtml(item.href || "#") + '">' + itemMedia(item, index, "dq-quick-item__icon") + '<strong>' + escapeHtml(item.title) + '</strong></a>';
      }) + '</div>';
    }
    if (module.type === "board") {
      return moduleOpen + heading + renderItems(module, "dq-board-list", function (item) {
        return '<a class="dq-board-item" href="' + escapeHtml(item.href || "#") + '"><strong>' + escapeHtml(item.title) + '</strong><time>' + escapeHtml(item.text) + '</time></a>';
      }) + '</div>';
    }
    if (module.type === "cards") {
      return moduleOpen + heading + renderItems(module, "dq-card-list", function (item, index) {
        return '<a class="dq-card-item" href="' + escapeHtml(item.href || "#") + '">' + itemMedia(item, index, "dq-card-item__media") + '<span><strong>' + escapeHtml(item.title) + '</strong><p>' + escapeHtml(item.text) + '</p></span></a>';
      }) + '</div>';
    }
    if (module.type === "banner") {
      return moduleOpen + heading + renderItems(module, "dq-banner-list", function (item, index) {
        return '<a class="dq-banner-item" href="' + escapeHtml(item.href || "#") + '">' + contentImage(item, "dq-banner-item__image", index === 0) + '<span>NOTICE ' + String(index + 1).padStart(2, "0") + '</span><strong>' + escapeHtml(item.title) + '</strong><p>' + escapeHtml(item.text) + '</p></a>';
      }) + '</div>';
    }
    if (module.type === "text") {
      var textAction = module.items[0] || {};
      return moduleOpen + heading + (textAction.title ? '<a class="dq-text-action" href="' + escapeHtml(textAction.href || "#") + '">' + escapeHtml(textAction.title) + '</a>' : '') + '</div>';
    }
    if (module.type === "imageText") {
      var feature = module.items[0] || {};
      return moduleOpen + '<div class="dq-image-text__media">' + contentImage(feature, "dq-image-text__image", false) + '</div><div class="dq-image-text__body">' + heading + '<strong>' + escapeHtml(feature.title) + '</strong><p>' + escapeHtml(feature.text) + '</p>' + (feature.href ? '<a href="' + escapeHtml(feature.href) + '">자세히 보기</a>' : '') + '</div></div>';
    }
    if (module.type === "stats") {
      return moduleOpen + heading + '<div class="dq-stats-list">' + module.items.map(function (item) {
        return '<div class="dq-stat-item"><strong data-count-up>' + escapeHtml(item.title) + '</strong><span>' + escapeHtml(item.text) + '</span></div>';
      }).join("") + '</div></div>';
    }
    if (module.type === "faq") {
      return moduleOpen + heading + '<div class="dq-faq-list">' + module.items.map(function (item, index) {
        return '<details class="dq-faq-item"' + (index === 0 ? ' open' : '') + '><summary>' + escapeHtml(item.title) + '</summary><div>' + escapeHtml(item.text) + '</div></details>';
      }).join("") + '</div></div>';
    }
    if (module.type === "gallery") {
      return moduleOpen + heading + renderItems(module, "dq-gallery-list", function (item, index) {
        return '<a class="dq-gallery-item" href="' + escapeHtml(item.href || "#") + '">' + contentImage(item, "dq-gallery-item__image", false) + '<span>' + escapeHtml(item.title || ("이미지 " + (index + 1))) + '</span></a>';
      }) + '</div>';
    }
    if (module.type === "youtube") {
      var videoId = youtubeVideoId(module.videoId);
      var videoTitle = module.title || "유튜브 영상";
      return moduleOpen + heading + (videoId
        ? '<div class="dq-youtube" data-youtube-autoplay="' + String(!!module.autoplayOnView) + '"><iframe src="https://www.youtube-nocookie.com/embed/' + escapeHtml(videoId) + '?enablejsapi=1&playsinline=1" title="' + escapeHtml(videoTitle) + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>'
        : '<div class="dq-content-empty"><strong>영상 ID를 입력해 주세요.</strong><span>예: ZvenigmbShw</span></div>') + '</div>';
    }
    if (module.type === "calendar") {
      return moduleOpen + heading + renderCalendar(module) + '</div>';
    }
    if (module.type === "sns") {
      return moduleOpen + heading + '<div class="dq-sns-list">' + module.items.map(function (item) {
        var platform = /^(?:instagram|youtube|facebook|blog|x)$/.test(item.platform) ? item.platform : "instagram";
        var label = item.title || ({ instagram: "인스타그램", youtube: "유튜브", facebook: "페이스북", blog: "블로그", x: "X" }[platform]);
        return '<a class="dq-sns-item dq-sns-item--' + platform + '" href="' + escapeHtml(item.href || "#") + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(label + " 새 창") + '"><span class="dq-sns-item__icon"><svg aria-hidden="true"><use href="' + ICONS + '#' + platform + '"></use></svg></span><strong>' + escapeHtml(label) + '</strong></a>';
      }).join("") + '</div></div>';
    }
    if (module.type === "code") {
      return moduleOpen + heading + '<div class="dq-code-host" data-code-module-id="' + escapeHtml(module.id) + '"><div class="dq-code-loading">직접 작성 요소를 불러오는 중입니다.</div></div></div>';
    }
    return '<div class="dq-content-empty"><strong>지원하지 않는 요소입니다.</strong></div>';
  }

  function buildInner(state) {
    var html = '';
    state.sections.forEach(function (section) {
      if (section.legacy && section.cells[0] && section.cells[0].module.type === "custom") {
        var template = document.createElement("template");
        template.innerHTML = String(section.cells[0].module.html || "").trim();
        var legacyElement = template.content.firstElementChild;
        if (legacyElement) {
          legacyElement.classList.add("dq-content-section", "dq-content-section--legacy");
          legacyElement.dataset.sectionId = section.id;
          legacyElement.dataset.builderLegacy = "true";
          html += legacyElement.outerHTML;
        }
        return;
      }
      var sectionImage = section.backgroundImage ? ';background-image:url(\'' + escapeHtml(section.backgroundImage).replace(/'/g, "%27") + '\')' : '';
      var sectionHeight = section.useHeight ? ';--section-min-height:' + section.heightValue + section.heightUnit : ';--section-min-height:auto';
      var viewportHeight = section.useHeight && section.heightUnit === "vh" && Number(section.heightValue) === 100;
      var fullBleed = section.cells.some(function (cell) { return cell.module && cell.module.type === "cards" && cell.module.fullBleed; });
      html += '<section class="dq-content-section dq-content-section--' + escapeHtml(section.width) + (section.useHeight ? ' has-custom-height' : '') + (viewportHeight ? ' is-viewport-height' : '') + (fullBleed ? ' has-full-bleed' : '') + '" data-section-id="' + escapeHtml(section.id) + '" style="--section-background:' + escapeHtml(section.background) + ';--section-max-width:' + section.maxWidth + 'px;--section-column-gap:' + section.columnGap + 'px;--section-padding-top:' + section.paddingTop + 'px;--section-padding-right:' + section.paddingRight + 'px;--section-padding-bottom:' + section.paddingBottom + 'px;--section-padding-left:' + section.paddingLeft + 'px' + sectionHeight + sectionImage + '">';
      html += '<div class="dq-content-section__inner">';
      if (section.showTitle || section.showSubtitle) {
        html += '<header class="dq-section-heading is-' + escapeHtml(section.headingAlign) + '" style="--section-title-size:' + section.titleSize + 'px;--section-title-color:' + escapeHtml(section.titleColor) + ';--section-subtitle-size:' + section.subtitleSize + 'px;--section-subtitle-color:' + escapeHtml(section.subtitleColor) + '">';
        if (section.showTitle) html += '<h2>' + escapeHtml(section.sectionTitle) + '</h2>';
        if (section.showSubtitle) html += '<p>' + escapeHtml(section.sectionSubtitle) + '</p>';
        html += '</header>';
      }
      html += '<div class="dq-content-grid dq-content-grid--' + escapeHtml(section.layout) + '">';
      section.cells.forEach(function (cell) {
        html += '<div class="dq-content-cell" data-cell-id="' + escapeHtml(cell.id) + '" data-module-type="' + escapeHtml(cell.module.type) + '">' + renderModule(cell.module) + '</div>';
      });
      html += '</div></div></section>';
    });
    html += '<script type="application/json" data-builder-content-state>' + JSON.stringify(state).replace(/<\/script/gi, '<\\/script') + '<\/script>';
    return html;
  }

  function capture(doc) {
    var root = doc.querySelector('[data-builder-content-root]');
    if (!root) return { sections: [] };
    var source = root.querySelector('[data-builder-content-state]');
    try {
      var data = normalize(source ? JSON.parse(source.textContent || "{}") : { sections: [] });
      if (!data.sections.length) {
        data.sections = Array.from(root.children).filter(function (element) {
          return !element.matches('[data-builder-content-state]');
        }).map(createLegacySection);
      }
      return normalize(data);
    }
    catch (error) { return { sections: [] }; }
  }

  function render(doc, state) {
    var root = doc.querySelector('[data-builder-content-root]');
    if (!root) return;
    var data = normalize(state);
    root.querySelectorAll('[data-content-slider]').forEach(function (slider) {
      if (slider.swiper && typeof slider.swiper.destroy === "function") slider.swiper.destroy(true, true);
    });
    root.querySelectorAll('[data-code-module-id]').forEach(function (host) {
      if (typeof host._dqCodeCleanup === "function") {
        try { host._dqCodeCleanup(); } catch (error) {}
      }
    });
    root.querySelectorAll('[data-youtube-autoplay="true"]').forEach(function (youtube) {
      if (youtube._dqYoutubeObserver) youtube._dqYoutubeObserver.disconnect();
    });
    var preservedLegacy = {};
    root.querySelectorAll('[data-builder-legacy="true"][data-section-id]').forEach(function (element) {
      preservedLegacy[element.dataset.sectionId] = element;
    });
    root.style.setProperty('--content-section-gap', data.sectionGap + 'px');
    root.style.setProperty('--content-background', data.background);
    root.innerHTML = buildInner(data);
    Object.keys(preservedLegacy).forEach(function (sectionId) {
      var placeholder = root.querySelector('[data-builder-legacy="true"][data-section-id="' + sectionId + '"]');
      if (placeholder) placeholder.replaceWith(preservedLegacy[sectionId]);
    });
    init(root);
  }

  function buildHtml(state) {
    var data = normalize(state);
    return buildInner(data);
  }

  function initCodeModules(managedRoot, state) {
    var view = managedRoot.ownerDocument.defaultView || window;
    state.sections.forEach(function (section) {
      section.cells.forEach(function (cell) {
        var module = cell.module;
        if (!module || module.type !== "code") return;
        var host = managedRoot.querySelector('[data-code-module-id="' + module.id + '"]');
        if (!host || host.dataset.codeReady === "true") return;
        host.dataset.codeReady = "true";
        var shadow = host.shadowRoot || host.attachShadow({ mode: "open" });
        shadow.innerHTML = String(module.html || "");
        var style = managedRoot.ownerDocument.createElement("style");
        style.textContent = ':host{display:block;min-width:0}.dq-code-error{margin:12px 0;padding:12px;white-space:pre-wrap;background:#fff0f0;color:#b42318;font:12px/1.5 monospace}' + String(module.css || "");
        shadow.prepend(style);
        if (module.js) {
          try {
            var cleanup = new view.Function("root", "host", '"use strict";\n' + String(module.js))(shadow, host);
            if (typeof cleanup === "function") host._dqCodeCleanup = cleanup;
          } catch (error) {
            var message = managedRoot.ownerDocument.createElement("pre");
            message.className = "dq-code-error";
            message.textContent = "JS 오류: " + error.message;
            shadow.append(message);
          }
        }
      });
    });
  }

  function runCountUp(element, view, reducedMotion) {
    if (element.dataset.countReady === "true") return;
    element.dataset.countReady = "true";
    var original = element.textContent.trim();
    var match = original.match(/[-+]?\d[\d,]*(?:\.\d+)?/);
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
      if (progress < 1) view.requestAnimationFrame(frame);
      else element.textContent = original;
    }
    view.requestAnimationFrame(frame);
  }

  function initContentMotion(root) {
    var scope = root || document;
    var view = (scope.ownerDocument && scope.ownerDocument.defaultView) || window;
    var reducedMotion = !!(view.matchMedia && view.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var modules = Array.from(scope.querySelectorAll('.dq-motion, .dq-module--stats')).filter(function (module) {
      return module.dataset.motionReady !== "true";
    });
    if (!modules.length) return;
    function reveal(module) {
      module.classList.add('is-in-view');
      module.querySelectorAll('[data-count-up]').forEach(function (element) { runCountUp(element, view, reducedMotion); });
    }
    if (reducedMotion || typeof view.IntersectionObserver !== "function") {
      modules.forEach(function (module) { module.dataset.motionReady = "true"; reveal(module); });
      return;
    }
    var observer = new view.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: "0px 0px -5%" });
    modules.forEach(function (module) {
      module.dataset.motionReady = "true";
      if (module.classList.contains('dq-motion')) module.classList.add('is-motion-ready');
      observer.observe(module);
    });
  }

  function initCalendars(scope) {
    Array.from((scope || document).querySelectorAll('.dq-calendar')).forEach(function (calendar) {
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
        calendar.innerHTML = renderCalendarMonth(year, month, items);
      });
    });
  }

  function initYouTubeAutoplay(scope) {
    var view = (scope && scope.ownerDocument && scope.ownerDocument.defaultView) || window;
    Array.from((scope || document).querySelectorAll('[data-youtube-autoplay="true"]')).forEach(function (youtube) {
      if (youtube.dataset.youtubeReady === "true") return;
      youtube.dataset.youtubeReady = "true";
      var frame = youtube.querySelector("iframe");
      if (!frame) return;
      function command(name) {
        if (!frame.contentWindow) return;
        frame.contentWindow.postMessage(JSON.stringify({ event: "command", func: name, args: [] }), "*");
      }
      function play() { command("mute"); command("playVideo"); }
      if (typeof view.IntersectionObserver !== "function") { frame.addEventListener("load", play, { once: true }); return; }
      var inView = false;
      frame.addEventListener("load", function () { if (inView) play(); });
      var observer = new view.IntersectionObserver(function (entries) {
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

  function init(root) {
    var view = (root && root.ownerDocument && root.ownerDocument.defaultView) || window;
    var managedRoots = root && root.matches && root.matches('[data-builder-content-root]') ? [root] : Array.from((root || document).querySelectorAll('[data-builder-content-root]'));
    managedRoots.forEach(function (managedRoot) {
      var savedState = managedRoot.querySelector('[data-builder-content-state]');
      if (!savedState) return;
      try {
        var parsedData = JSON.parse(savedState.textContent || "{}");
        var needsHeadingStructure = Number(parsedData.headingStructureVersion) !== 2;
        var needsContentImageMarkup = Number(parsedData.contentImageVersion) !== 2;
        var needsContentModuleMarkup = Number(parsedData.contentModuleVersion) !== 2;
        var savedData = normalize(parsedData);
        managedRoot.style.setProperty('--content-section-gap', Math.max(0, Math.min(200, Number(savedData.sectionGap) || 0)) + 'px');
        managedRoot.style.setProperty('--content-background', savedData.background);
        var hasLegacyContent = !savedData.sections.length && Array.from(managedRoot.children).some(function (element) {
          return !element.matches('[data-builder-content-state]');
        });
        // A sub page can still use its original static markup while carrying an
        // empty builder state. Do not let builder migrations erase that markup.
        if (hasLegacyContent) {
          initContentMotion(managedRoot);
          return;
        }
        var oldController = managedRoot.querySelector('[data-content-slider]') && !managedRoot.querySelector('[class*="dq-content-controls--image-"], [class*="dq-content-controls--bottom-"]');
        var misplacedImageController = Array.from(managedRoot.querySelectorAll('[class*="dq-content-controls--image-"]')).some(function (control) {
          return !control.closest('[data-content-slider]');
        });
        var needsViewportHeight = Array.isArray(savedData.sections) && savedData.sections.some(function (section) {
          return section.useHeight && section.heightUnit === "vh" && Number(section.heightValue) === 100;
        }) && !managedRoot.querySelector('.is-viewport-height');
        var needsMotionMarkup = savedData.sections.some(function (section) {
          return !section.legacy && section.cells.some(function (cell) { return cell.module && !/^(?:empty|custom)$/.test(cell.module.type) && cell.module.animation !== "none"; });
        }) && !managedRoot.querySelector('.dq-motion');
        var needsDirectionalPadding = !!managedRoot.querySelector('[data-section-id][style*="--section-padding-y:"]');
        var needsSectionTitleDedup = savedData.sections.some(function (section) { return !section.legacy && section.showTitle; }) && !!managedRoot.querySelector('.dq-section-heading + .dq-content-grid .dq-content-heading h2');
        if (managedRoot.querySelector('[data-content-slider]:not(.swiper)') || oldController || misplacedImageController || needsViewportHeight || needsMotionMarkup || needsDirectionalPadding || needsSectionTitleDedup || needsHeadingStructure || needsContentImageMarkup || needsContentModuleMarkup) {
          render(managedRoot.ownerDocument, savedData);
          return;
        }
        initCodeModules(managedRoot, savedData);
        initContentMotion(managedRoot);
      } catch (error) {}
    });
    initCalendars(root || document);
    initYouTubeAutoplay(root || document);
    (root || document).querySelectorAll('[data-content-slider]').forEach(function (slider) {
      if (slider.swiper || typeof view.Swiper !== "function") return;
      var module = slider.closest('.dq-module');
      var controlRoot = module && module.querySelector('[data-slider-controls]');
      var requested = Math.max(1, Math.min(4, Number(slider.dataset.perView) || 1));
      // Also override data already saved with an old non-zero visual gap so
      // existing pages are fixed immediately without being saved again.
      var isVisual = !!(module && module.classList.contains('dq-module--visual'));
      var gap = isVisual ? 0 : Math.max(0, Math.min(100, Number(slider.dataset.gap) || 0));
      if (isVisual) {
        slider.dataset.gap = "0";
        slider.style.setProperty('--module-gap-max', '0px');
      }
      var transition = slider.dataset.transition || "slide";
      var total = slider.querySelectorAll('.swiper-slide').length;
      var isCardSlider = slider.classList.contains('dq-card-list') && total > 1;
      var mobilePerView = isCardSlider ? Math.min(1.5, total) : 1;
      var compactPerView = isCardSlider ? Math.min(2, total) : 1;
      var tabletPerView = isCardSlider ? Math.min(2.7, total) : Math.min(2, requested);
      var currentText = controlRoot && controlRoot.querySelector('[data-slide-current]');
      var totalText = controlRoot && controlRoot.querySelector('[data-slide-total]');
      var playButton = controlRoot && controlRoot.querySelector('[data-slide-play]');
      var shouldAutoplay = slider.dataset.autoplay === "true";
      var options = {
        slidesPerView: requested,
        spaceBetween: gap,
        speed: Math.max(100, Math.min(3000, Number(slider.dataset.duration) || 650)),
        loop: slider.dataset.loop !== "false" && total > requested,
        watchOverflow: true,
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        keyboard: { enabled: true },
        a11y: { enabled: true },
        autoplay: shouldAutoplay || playButton ? { delay: Math.max(1000, Number(slider.dataset.delay) || 4500), disableOnInteraction: false } : false,
        breakpoints: {
          0: { slidesPerView: mobilePerView, spaceBetween: Math.min(gap, 16), centeredSlides: isCardSlider },
          481: { slidesPerView: compactPerView, spaceBetween: Math.min(gap, 20), centeredSlides: isCardSlider },
          641: { slidesPerView: tabletPerView, spaceBetween: Math.min(gap, 24), centeredSlides: isCardSlider },
          901: { slidesPerView: requested, spaceBetween: gap, centeredSlides: false }
        }
      };
      if (isVisual && transition === "zoom") transition = "cinematic";
      if (isVisual && transition === "vertical") transition = "page";
      if ((transition === "fade" || transition === "cinematic") && requested === 1) {
        options.effect = "fade";
        options.fadeEffect = { crossFade: true };
      } else if (transition === "page" && requested === 1) {
        options.effect = "creative";
        options.creativeEffect = {
          limitProgress: 2,
          prev: { translate: ["-18%", 0, -1], scale: .94, opacity: .28 },
          next: { translate: ["100%", 0, 0], scale: 1, opacity: 1 }
        };
      } else if (transition === "vertical" && requested === 1) {
        options.direction = "vertical";
        options.autoHeight = true;
      }
      if (controlRoot) {
        var previous = controlRoot.querySelector('[data-slide-prev]');
        var next = controlRoot.querySelector('[data-slide-next]');
        var pagination = controlRoot.querySelector('[data-slide-pagination]');
        if (previous && next) options.navigation = { prevEl: previous, nextEl: next };
        if (pagination) options.pagination = { el: pagination, clickable: true, bulletClass: "dq-content-dot", bulletActiveClass: "is-active" };
      }
      var instance = new view.Swiper(slider, options);
      if (!shouldAutoplay && instance.autoplay) instance.autoplay.stop();
      function updateCounter() {
        if (currentText) currentText.textContent = String(instance.realIndex + 1);
        if (totalText) totalText.textContent = String(total);
      }
      instance.on('slideChange', updateCounter);
      updateCounter();
      if (playButton) {
        playButton.addEventListener('click', function () {
          if (!instance.autoplay) return;
          var playIcon = playButton.querySelector('use');
          if (instance.autoplay.running) {
            instance.autoplay.stop();
            if (playIcon) playIcon.setAttribute('href', ICONS + '#play');
            playButton.setAttribute('aria-pressed', 'false');
          } else {
            instance.autoplay.start();
            if (playIcon) playIcon.setAttribute('href', ICONS + '#pause');
            playButton.setAttribute('aria-pressed', 'true');
          }
        });
      }
    });
  }

  window.DQContentBuilder = {
    labels: moduleLabels,
    variants: moduleVariants,
    presets: ["visual", "quick", "board", "cards", "banner", "text", "imageText", "stats", "faq", "gallery", "youtube", "calendar", "sns", "code"],
    createModule: createModule,
    createSection: createSection,
    setLayout: setLayout,
    normalize: normalize,
    capture: capture,
    render: render,
    buildHtml: buildHtml,
    init: init,
    uid: uid
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(document); });
  else init(document);
}(window, document));
