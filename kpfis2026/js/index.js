

function FullPage(obj, nav, footerSel) {
  var $pages = $(obj);
  var $nav = $(nav);
  var $footer = $(footerSel);
  var pageCount = $pages.length;
  if (!pageCount || !$nav.length) return;

  // ===== 프리셋(네가 쓰던 값 유지) =====
  var duration = 700;      // 이동 시간
  var HOLD_MS = 30;        // 이동 후 홀드
  var WHEEL_END_MS = 0;    // 제스처 묶기(0이면 즉시)
  var THRESHOLD = 50;      // 휠 누적 임계값
  var MIN_DELTA = 6;       // 노이즈 컷

  // PC에서만 휠 스냅 ON
  var mq = window.matchMedia('(min-width: 1501px)');

  var isScrolling = false;
  var snapEnabled = true;

  // 휠 누적
  var wheelSum = 0;
  var wheelTimer = null;

  // ===== 추가: 휠 제스처 초기화 =====
  function resetWheelGesture(){
    wheelSum = 0;
    if (wheelTimer) {
      clearTimeout(wheelTimer);
      wheelTimer = null;
    }
  }

  // ===== 추가: 스크롤 가능한 컨테이너 우선 처리(모달/사이트맵 등) =====
  function getScrollableParent(el){
    while (el && el !== document.body) {
      if (el.nodeType !== 1) { el = el.parentNode; continue; }
      var cs = getComputedStyle(el);
      var oy = cs.overflowY;
      var canScroll = (oy === 'auto' || oy === 'scroll') && (el.scrollHeight > el.clientHeight + 1);
      if (canScroll) return el;
      el = el.parentElement;
    }
    return null;
  }
  function canScrollInDirection(scroller, dy){
    if (!scroller) return false;
    if (dy > 0) return scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1;
    return scroller.scrollTop > 0;
  }

  // nav 세팅
  $pages.each(function(index) {
    var navText = $(this).data('nav-text') || ('페이지 ' + (index + 1));
    var $btn = $nav.find('.page-btn').eq(index);

    $btn.data('index', index);

    var $txt = $btn.find('.nav-text');
    if ($txt.length) $txt.text(navText);
    else $btn.append('<span class="nav-text">' + navText + '</span>');
  });

  function setActive(i) {
    $nav.find('.page-btn').removeClass('active').removeAttr('aria-current')
      .eq(i).addClass('active').attr('aria-current', 'true');
  }

  function updateSnapState() {
    if (!$footer.length) { snapEnabled = true; return; }

    var y = window.scrollY || window.pageYOffset;
    var $last = $pages.last();
    var lastBottom = $last.offset().top + $last.outerHeight();

    // 마지막 섹션 바닥을 넘으면(푸터 영역) 스냅 OFF
    snapEnabled = (y < lastBottom - 1);

    // ★ 중요: 스냅 OFF 구간에서 남은 제스처 타이머/누적 제거(푸터에서 위로 튐 방지)
    if (!snapEnabled) resetWheelGesture();
  }

  function getCurrentIndexByCenter(){
    var center = (window.scrollY || window.pageYOffset) + window.innerHeight / 2;
    var idx = 0;

    $pages.each(function(i){
      var top = $(this).offset().top;
      var bottom = top + $(this).outerHeight();
      if (center >= top && center < bottom) idx = i;
    });

    return idx;
  }

  // ===== rAF + easeOutCubic(시작 반응 빠르고 끝이 고급스럽게 감속) =====
  function easeOutCubic(t){
    return 1 - Math.pow(1 - t, 3);
  }

  function smoothScrollTo(targetY, ms, done){
    var startY = window.scrollY || window.pageYOffset;
    var diff = targetY - startY;
    if (Math.abs(diff) < 1) { done && done(); return; }

    var startT = performance.now();

    function step(now){
      var p = Math.min(1, (now - startT) / ms);
      window.scrollTo(0, startY + diff * easeOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
      else done && done();
    }
    requestAnimationFrame(step);
  }

  function scrollToPage(index){
    if (isScrolling) return;
    if (index < 0 || index >= pageCount) return;

    isScrolling = true;
    var targetY = $pages.eq(index).offset().top;

    smoothScrollTo(targetY, duration, function(){
      setActive(index);
      setTimeout(function(){ isScrolling = false; }, HOLD_MS);
    });
  }

  // 스크롤로 active 동기화
  $(window).on('scroll', function(){
    updateSnapState();
    setActive(getCurrentIndexByCenter());
  });

  // ===== PC 휠 스냅: native + passive:false =====
  function onWheelNative(e){
    if (!mq.matches) return;

    // ✅ Ctrl/⌘ + 휠(브라우저 확대/축소)은 건드리지 않기
    if (e.ctrlKey || e.metaKey) {
      resetWheelGesture();
      return; // preventDefault 하지 않음
    }

    // ===== 헤더에 붙는 사이트맵 열림이면 풀페이지 비활성 =====
    var headerEl = document.getElementById('header');
    var isSitemapOpen = headerEl && headerEl.classList.contains('sitemap-on'); // ★ 너 토글 클래스명으로 맞추기

    if (isSitemapOpen) {
      resetWheelGesture();
      // 헤더(사이트맵) 내부 휠은 헤더 내부 스크롤 우선(막지 않음)
      if (headerEl.contains(e.target)) return;
      return;
    }

    updateSnapState();
    if (!snapEnabled) { resetWheelGesture(); return; }

    // ===== 어떤 레이어/컨테이너든 내부 스크롤 가능하면 그쪽 우선 =====
    var dy0 = e.deltaY;
    if (e.deltaMode === 1) dy0 *= 16;

    var scroller = getScrollableParent(e.target);
    if (scroller && canScrollInDirection(scroller, dy0)) {
      resetWheelGesture();
      return; // preventDefault 안 함
    }

    var cur = getCurrentIndexByCenter();

    // 마지막 섹션에서 아래로 휠: 푸터로 자연 진입 허용
    if (cur === pageCount - 1 && e.deltaY > 0){
      snapEnabled = false;
      resetWheelGesture();
      return; // preventDefault 안 함
    }

    // 애니메이션 중이면 기본 스크롤만 막고 무시
    if (isScrolling){
      e.preventDefault();
      resetWheelGesture();
      return;
    }

    // 여기부터는 스냅 제어
    e.preventDefault();

    var dy = e.deltaY;
    if (e.deltaMode === 1) dy *= 16;
    if (Math.abs(dy) < MIN_DELTA) return;

    wheelSum += dy;

    // WHEEL_END_MS=0이면 사실상 즉시 실행(그래도 setTimeout 0은 다음 tick)
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function(){
      if (Math.abs(wheelSum) < THRESHOLD){
        resetWheelGesture();
        return;
      }

      var dir = wheelSum > 0 ? 1 : -1;
      resetWheelGesture();
      scrollToPage(cur + dir);
    }, WHEEL_END_MS);
  }

  function bindWheel(){
    window.addEventListener('wheel', onWheelNative, { passive: false });

    // 푸터에서 위로 휠 → 마지막 섹션 복귀(선택)
    if ($footer.length){
      $footer.on('wheel.fullpage', function(e){
        if (!mq.matches) return;

        // 사이트맵 열림이면 푸터에서도 개입 안 함
        var headerEl = document.getElementById('header');
        if (headerEl && headerEl.classList.contains('sitemap-on')) return;

        var dy = e.originalEvent.deltaY;
        if (dy < 0){
          e.preventDefault();
          snapEnabled = true;
          resetWheelGesture();
          scrollToPage(pageCount - 1);
        }
      });
    }
  }

  function unbindWheel(){
    window.removeEventListener('wheel', onWheelNative);
    $footer.off('wheel.fullpage');
    resetWheelGesture();
  }

  if (mq.matches) bindWheel(); else unbindWheel();

  if (mq.addEventListener){
    mq.addEventListener('change', function(ev){
      ev.matches ? bindWheel() : unbindWheel();
    });
  } else {
    mq.addListener(function(ev){
      ev.matches ? bindWheel() : unbindWheel();
    });
  }

  // nav 클릭(모바일에서도 동작)
  $nav.on('click', '.page-btn', function(e){
    e.preventDefault();
    snapEnabled = true;
    resetWheelGesture();
    scrollToPage($(this).data('index'));
  });

  // 초기 상태
  setActive(0);
  updateSnapState();
}


document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".scroll-show");

    targets.forEach(target => {
        // 요소마다 threshold 설정
        let thresholdValue = parseFloat(target.dataset.threshold) || 0.2;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        }, { threshold: thresholdValue });

        observer.observe(target);
    });

    FullPage('.full-page', '.page-nav', '#footer');

    document.querySelectorAll('.wave-text').forEach(el => {
    let idx = 0;

    // wave-text 안의 텍스트 노드/요소를 전부 글자 단위 span으로 변환
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach(node => {
        const parent = node.parentNode;
        const frag = document.createDocumentFragment();
        [...node.nodeValue].forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch === ' ' ? '\u00A0' : ch;
        s.style.setProperty('--i', idx++);
        frag.appendChild(s);
        });
        parent.replaceChild(frag, node);
    });
    });



});

