

document.addEventListener('DOMContentLoaded', function() {
	const lenis = new Lenis({
		duration: 0.5,
		easing: t => 1 - Math.pow(1 - t, 2),
	});
	function raf(time) {
		lenis.raf(time); // 전체 페이지 Lenis
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);
});


document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll(".scroll-show");

    targets.forEach(target => {
        // 요소마다 threshold 설정
        let thresholdValue = parseFloat(target.dataset.threshold) || 0.5;

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

  var pinSecs = [].slice.call(document.querySelectorAll('.phase-wrap[data-mode="pin"]'));
  if (!pinSecs.length) return;

  var STEP_COUNT = 10;         // step-0 ~ step-9
  var STEP_START_RATIO = 0.10; // 초반 여백(원하면 0)

  function clamp01(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }

  function setPinHeights(){
    var vh = window.innerHeight || document.documentElement.clientHeight;
    pinSecs.forEach(function(sec){
      var mul = parseFloat(sec.getAttribute('data-vh'));
      if (isNaN(mul)) mul = 2;
      if (mul < 1) mul = 1;
      if (mul > 6) mul = 6;
      sec.style.height = (vh * mul) + 'px';
    });
  }

  function clearSteps(fb){
    fb.removeAttribute('data-step');
    for (var s=0; s<STEP_COUNT; s++) fb.classList.remove('step-' + s);
  }

  function applyStep(fb, t01){
    clearSteps(fb);

    var stepIndex = -1;
    if (t01 > STEP_START_RATIO){
      var tt = clamp01((t01 - STEP_START_RATIO) / (1 - STEP_START_RATIO));
      stepIndex = Math.floor(tt * STEP_COUNT);
      if (stepIndex >= STEP_COUNT) stepIndex = STEP_COUNT - 1;
    }

    if (stepIndex >= 0){
      fb.classList.add('step-' + stepIndex);
      fb.setAttribute('data-step', stepIndex);
    }
    updateRotateByStep(fb, stepIndex, STEP_COUNT);
  }

  function updatePin(){
    var y  = window.scrollY || window.pageYOffset;
    var vh = window.innerHeight || document.documentElement.clientHeight;

    pinSecs.forEach(function(sec){
      var fb = sec.querySelector('.floating-bx');
      if (!fb) return;

      var top = sec.offsetTop;
      var h = sec.offsetHeight || 1;
      var bottom = top + h;

      // 0) 화면과 완전히 무관하면 제거(다른 섹션에서 미리 보이는 현상 방지)
      if (y + vh <= top || y >= bottom){
        fb.classList.remove('is-enter','is-fixed','is-bottom');
        clearSteps(fb);
        return;
      }

      // end: 화면 하단과 섹션 하단이 만나는 시점 (y + vh == bottom)
      var end = bottom - vh;
      if (end < top) end = top; // 안전장치

      // 1) ENTER: 화면에 걸리기 시작 ~ 섹션 top이 화면 top에 닿기 전
      if (y < top){
        fb.classList.add('is-enter');
        fb.classList.remove('is-fixed','is-bottom');
        applyStep(fb, 0);
        return;
      }

      // 3) BOTTOM: 섹션 bottom이 화면 bottom에 닿은 뒤
      if (y >= end){
        fb.classList.add('is-bottom');
        fb.classList.remove('is-enter','is-fixed');
        applyStep(fb, 1);
        return;
      }

      // 2) FIXED: top ~ end
      fb.classList.add('is-fixed');
      fb.classList.remove('is-enter','is-bottom');

      var pinLen = end - top;
      if (pinLen < 1) pinLen = 1;

      var t = clamp01((y - top) / pinLen); // 0~1
      applyStep(fb, t);
    });
  }

    function initFlowIO(){
    // 기본 move-item (img-bg 제외)
    var items = [].slice.call(document.querySelectorAll(
        '.phase-wrap[data-mode="flow"] .move-item:not(.io-early)'
    ));

    // img-bg(조기 노출)
    var early = [].slice.call(document.querySelectorAll(
        '.phase-wrap[data-mode="flow"] .move-item.io-early'
    ));

    // 기본
    if (items.length){
        var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            e.target.classList.toggle('is-on', e.isIntersecting);
        });
        }, {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px'
        });

        items.forEach(function(el){ io.observe(el); });
    }

    // ✅ img-bg는 더 일찍(아래쪽을 확장: 40%~80% 사이에서 취향 조절)
    if (early.length){
        var ioEarly = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
            e.target.classList.toggle('is-on', e.isIntersecting);
        });
        }, {
        threshold: 0.05,
        rootMargin: '0px 0px 20% 0px'   // ✅ 더 일찍 켜짐 (원하면 80%까지)
        });

        early.forEach(function(el){ ioEarly.observe(el); });
    }
    }

  function updateRotateByStep(fb, stepIndex, STEP_COUNT){
    var rotateItem = fb.querySelector('.rotate-item');
    if (!rotateItem) return;

    var blocks = [].slice.call(rotateItem.querySelectorAll('.rotate-block'));
    var n = blocks.length;
    if (!n) return;

    if (stepIndex == null || stepIndex < 0) stepIndex = 0;

    /* ✅ 여기! (idx 계산 교체) ===================== */
    var HOLD_STEPS = 3; // 0~5 사이로 조절 (2~3 추천)
    var maxStep = STEP_COUNT - 1;                 // 9
    var remain = Math.max(1, maxStep - HOLD_STEPS);

    var s = stepIndex - HOLD_STEPS;
    if (s < 0) s = 0;

    var idx = Math.round((s / remain) * (n - 1));
    /* ============================================ */

    // 끊김 줄이기: idx 바뀔 때만 갱신
    if (rotateItem.dataset.activeIdx === String(idx)) return;
    rotateItem.dataset.activeIdx = String(idx);

    var leftIdx  = idx - 1;
    var rightIdx = idx + 1;

    blocks.forEach(function(b, i){
      b.classList.remove('is-center','is-left','is-right','is-hidden-left','is-hidden-right');

      if (i === idx) b.classList.add('is-center');
      else if (i === leftIdx) b.classList.add('is-left');
      else if (i === rightIdx) b.classList.add('is-right');
      else if (i < idx) b.classList.add('is-hidden-left');
      else b.classList.add('is-hidden-right');
    });
  }


  var ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      updatePin();
    });
  }

  function onResize(){
    setPinHeights();
    updatePin();
  }

  addEventListener('scroll', onScroll, {passive:true});
  addEventListener('resize', onResize);

  setPinHeights();
  updatePin();
  initFlowIO();

  var swiper = new Swiper(".mySwiper1", {
    slidesPerView: 2,
    spaceBetween: 40,
    loop: false,
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
    },
    freeMode: true,
    mousewheel: { forceToAxis: true },

    breakpoints: {
      0: { slidesPerView: "auto", spaceBetween: 15,  freeMode: false,},      // 800 이하
      801: { spaceBetween: 20 },    // 801 ~ 1500
      1501: { spaceBetween: 40 }    // 1501 이상 (기본)
    }
  }); 
});


$(document).on({
    'click': function(e) {
        e.preventDefault();
        $('.popup-item').toggleClass('active');
    }
}, '.popup-item .open-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        $('.popup-item').removeClass('active');
    }
}, '.popup-item .close-btn')
.on({
    'click': function(e) {
        e.preventDefault();
        const idx = $(this).index();
        $('.board-tab a, .board-list > div').removeClass('active');
        $(this).addClass('active');
        $('.board-list > div').eq(idx).addClass('active');
    }
}, '.board-tab a');


(() => {
    const init = () => {
    const nav = document.getElementById('side-nav');
    if (!nav) return;

    const btns = Array.from(nav.querySelectorAll('button'));
    const secs = Array.from(document.querySelectorAll('main > section'));

    // 버튼 텍스트로 타깃 자동 매핑 (visual, notice, ... => #id)
    btns.forEach(b => b.dataset.target = b.dataset.target || b.textContent.trim().toLowerCase());

    const setActiveById = (id) => {
    btns.forEach(b => b.classList.toggle('active', b.dataset.target === id));
    };

    // 클릭 시 해당 섹션 최상단으로 스크롤
    nav.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;

    const offset = 0; // 고정 헤더가 있으면 그 높이로 조정
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

    if (window.lenis && typeof window.lenis.scrollTo === 'function') {
        window.lenis.scrollTo(top, { duration: 1 });
    } else {
        window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveById(target.id); // 즉시 active 반영
    });

    // 스크롤(휠) 시 현재 섹션 기준으로 active 동기화
    const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveById(entry.target.id);
    });
    }, {
    root: null,
    threshold: 0,
    rootMargin: '-50% 0px -50% 0px' // 뷰포트 중앙에 들어오면 해당 섹션으로 판단
    });

    secs.forEach(sec => io.observe(sec));
};

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init, { once: true })
    : init();
})();
