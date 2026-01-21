
//서브공통 스크립트
var ObjDoc = $(document);


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


ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
		var fileUrl = $(this).find('img').attr('src');
		var fileName = $(this).find('img').attr('alt');
		$("body").append(`
		<div id="img-modal">
			<div class="title-bx">
				<h1>`+ fileName +`</h1>
				<div class="btn-bx">
					<a href="#" class="zoom-in" id="zoom-in"><i class="fa-solid fa-magnifying-glass-plus"></i> 확대</a>
					<a href="#" class="zoom-out" id="zoom-out"><i class="fa-solid fa-magnifying-glass-minus"></i> 축소</a>
				</div>
			</div>
			<div class=thumb>
				<img id="panzoom" src="`+fileUrl+`" alt="`+ fileName +`">
			</div>
			<a href="#" class="close"><i class="fa-solid fa-xmark"></i></a>
		</div>
		`);
		const element = document.getElementById('panzoom');
		const zoomInButton = document.getElementById('zoom-in');
		const zoomOutButton = document.getElementById('zoom-out');
		const panzoom = Panzoom(element, {
			maxScale: 3,
			minScale: 0.3,
		});
		const parent = element.parentElement
		parent.addEventListener('wheel', panzoom.zoomWithWheel);
		zoomInButton.addEventListener('click', panzoom.zoomIn);
		zoomOutButton.addEventListener('click', panzoom.zoomOut);
		$(this).addClass('active');
		$('#img-modal a:first').focus();
	}
}, '.img-zoom-modal')
.on({
	'keydown': function(e) { 
		if (e.keyCode == 9) {
			$('#img-modal a:first').focus();
			return false;
		}
	},
	'click': function(e) { 
		e.preventDefault();
		$('#img-modal').remove();
		$('.img-zoom-modal.active').focus().removeClass('active');
	}
}, '#img-modal .close')
.on({
	'click': function(e) { 
		e.preventDefault();
		$(this).toggleClass('active');
	}
}, '#sub-visual .sns-btn')
.on({
	'click': function(e) { 
		e.preventDefault();
		$('.toggle-class-btn').not(this).removeClass('is-on'); 
		$(this).toggleClass('is-on');
	}
}, '.toggle-class-btn')
.on({
	'click': function(e) { 
		e.preventDefault();
		var idx = $(this).index();
		$('.toggle-tab a').not(this).removeClass('is-on'); 
		$(this).toggleClass('is-on');
		$('.toggle-item').eq(idx).addClass('is-on').siblings().removeClass('is-on');
	}
}, '.toggle-tab a');

//콘텐츠 스크립트 (dom ready 후 동작)
function contentScript(){

	$('.skinTb-wrapper').on('scroll', function () {
		$(this).addClass('scroll');
	});
	$('.skinTb.width640').parent().addClass('width640');
	$('.skinTb.width768').parent().addClass('width768');
	$('.skinTb.width1000').parent().addClass('width1000');

	  var swiper1 = new Swiper(".subSwiper1", {
		slidesPerView: 2,
		spaceBetween: 40,
		loop: false,
		scrollbar: {
		el: ".swiper-scrollbar",
		hide: false,
		},
		freeMode: true,
		mousewheel: { forceToAxis: true },
		observer: true,
  		observeParents: true,
		breakpoints: {
		0: { slidesPerView: "auto", spaceBetween: 16,  freeMode: false,},      // 719 이하
		720: { slidesPerView: "auto", spaceBetween: 20 },    // 720 ~ 1500
		1501: { slidesPerView: 2,spaceBetween: 75 }    // 1501 이상 (기본)
		}
	}); 
	  
	(() => {
	const onReady = (fn) =>
		document.readyState === 'loading'
		? document.addEventListener('DOMContentLoaded', fn, { once: true })
		: fn();

	onReady(() => {
		const io = new IntersectionObserver((entries) => {
		entries.forEach(({ isIntersecting, target }) => {
			target.classList.toggle('active', isIntersecting);
		});
		}, {
		threshold: [0, 0.3],
		rootMargin: '0px'
		});

		document.querySelectorAll('.scroll-show').forEach(el => io.observe(el));
	});
	})();

const wrap = document.querySelector('.news-board-bx');
  const list = document.querySelector('.news-board-list');
  const item = document.querySelector('.news-board-bx .item:first-child');
  if (!wrap || !list || !item) return;

  // 720px 이상만
  const mq = window.matchMedia('(min-width: 720px)');

  function getTopOffset() {
    const header = document.querySelector('#header');
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const extra = 0;
    return headerH + extra;
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  let ticking = false;
  let enabled = false;

  function update() {
    ticking = false;

    const topOffset = getTopOffset();
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    const wrapTop = wrap.getBoundingClientRect().top + scrollY;

    const listTopInWrap = list.offsetTop;
    const listH = list.offsetHeight;
    const itemH = item.offsetHeight;

    const maxMove = Math.max(0, (listTopInWrap + listH) - itemH);
    const desired = (scrollY + topOffset) - wrapTop;
    const y = clamp(desired, 0, maxMove);

    item.style.transform = `translateY(${y}px)`;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function enable() {
    if (enabled) return;
    enabled = true;

    item.style.position = 'absolute';
    item.style.left = '0';
    item.style.top = '0';
    item.style.willChange = 'transform';
    item.style.zIndex = '2';

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);

    update();
  }

  function disable() {
    if (!enabled) return;
    enabled = false;

    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    window.removeEventListener('load', update);

    // 원복(모바일에서는 일반 흐름으로 보이게)
    item.style.transform = '';
    item.style.willChange = '';
    item.style.zIndex = '';

    // 원래 absolute 유지하고 싶으면 아래 3줄은 주석 처리
    item.style.position = '';
    item.style.left = '';
    item.style.top = '';
  }

  function apply() {
    if (mq.matches) enable();
    else disable();
  }

  // 초기 적용
  apply();

  // 해상도 변경 대응
  if (mq.addEventListener) mq.addEventListener('change', apply);
  else mq.addListener(apply); // 구형 브라우저 대응

  
};

$(function() {
	contentScript();

	

});

        