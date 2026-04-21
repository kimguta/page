var $Win = $(window);
var $Doc = $(document);
var MOBILE_WIDTH = 1600;

function initLenis() {
    window.lenis = new Lenis({
        duration: 0.5,
        easing: function (t) {
            return 1 - Math.pow(1 - t, 2);
        },
    });

    function raf(time) {
        window.lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

function initSlick(target, options) {
    var $ControlBtn = target.parent().find('.control .ps-btn');
    var $PlayBtn = target.parent().find('.control .play');
    var $PauseBtn = target.parent().find('.control .pause');
    var $Count = target.parent().find('.count');

    target.on('beforeChange', function () {
        // Hook for future slide change logic.
    });

    target.on('init reInit afterChange', function (event, slick, currentSlide) {
        var nowSlide = (currentSlide ? currentSlide : 0) + 1;
        var allSlide = slick.slideCount;
        var formattedNowSlide = nowSlide < 10 ? '0' + nowSlide : nowSlide;
        var formattedAllSlide = allSlide < 10 ? '0' + allSlide : allSlide;

        $Count.html('<strong>' + formattedNowSlide + '</strong><span>/</span>' + formattedAllSlide);
        target.find('.slick-slide').attr('tabindex', '-1');
        target.find('.slick-active').attr('tabindex', '0');
    });

    target.slick(options);

    $ControlBtn.on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('pause')) {
            $(this).hide();
            $PlayBtn.show();
            target.slick('slickPause');
            return;
        }

        if ($(this).hasClass('play')) {
            $(this).hide();
            $PauseBtn.show();
            target.slick('slickPlay');
        }
    });
}

function imgPaging(slick, index) {
    var targetImage = slick.$slides.eq(index).find('img').attr('src');
    return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "></a>';
}

function imgNumber(slick, index) {
    return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
}

function getHeader() {
    return $('#header');
}

function getHeaderMenuType() {
    var $header = getHeader();
    return $header.data('menu-type') || ($header.hasClass('menu-type-all') ? 'all' : 'single');
}

function isSiteMapOpen() {
    return getHeader().find('.nav-bx').hasClass('site-map');
}

function closeHeaderMenu() {
    if (isSiteMapOpen()) {
        return;
    }

    getHeader().removeClass('active');
    $('.Htlv01').removeClass('active');
    $('#header .header-wrap .Hdepth02').removeClass('is-open');
}

function openHeaderMenu($item) {
    if (isSiteMapOpen()) {
        return;
    }

    var menuType = getHeaderMenuType();
    var $depth2 = $item.children('.Hdepth02');

    getHeader().addClass('active');
    $('.Htlv01').removeClass('active');
    $item.children('.Htlv01').addClass('active');

    if (menuType === 'all') {
        $('#header .header-wrap .Hdepth02').addClass('is-open');
        return;
    }

    $('.Hdepth02').not($depth2).removeClass('is-open');
    $depth2.addClass('is-open');
}

function setSiteMapState(isOpen) {
    var $navBx = getHeader().find('.nav-bx');
    var currentTimer = $navBx.data('siteMapTimer');

    if (currentTimer) {
        clearTimeout(currentTimer);
        $navBx.removeData('siteMapTimer');
    }

    if (isOpen) {
        $navBx.addClass('site-map');
        getHeader().addClass('active');

        window.requestAnimationFrame(function () {
            $navBx.addClass('is-open');
        });

        $('#header .header-wrap .Hdepth02').addClass('is-open');
        return;
    }

    $('#header .header-wrap .Hdepth02').removeClass('is-open');

    $navBx.removeClass('is-open');
    getHeader().removeClass('active');
    $('.Htlv01').removeClass('active');

    $navBx.data('siteMapTimer', setTimeout(function () {
        $navBx.removeClass('site-map');
        $navBx.removeData('siteMapTimer');
    }, 220));
}

function setViewportHeightVar() {
    document.documentElement.style.setProperty('--vh', window.innerHeight + 'px');
}

function bindSitemapTouch() {
    $('#sitemap').on('touchstart', function (e) {
        if (window.innerWidth > 1600) {
            return;
        }

        e.touches[0].clientX;
    });
}

function syncHeaderMode() {
    var winWidth = $Win.outerWidth();
    getHeader()
        .toggleClass('pc-mode', winWidth > MOBILE_WIDTH)
        .toggleClass('mobile-mode', winWidth <= MOBILE_WIDTH);
}

function resetHeaderResizeState() {
    var winWidth = $Win.outerWidth();

    if (winWidth > MOBILE_WIDTH) {
        $('.Htlv01, .Htlv02, .Htlv03').removeClass('active');
    }

    getHeader().removeClass('active');
    getHeader().find('.nav-bx').removeClass('site-map');
    $('#sitemap').hide();
}

function bindRoleButtonKeypress() {
    $('a[role="button"]').on('keypress', function (e) {
        if (e.keyCode === 32) {
            $(this).trigger('click');
            e.preventDefault();
        }
    });
}

function bindDocumentEvents() {
    $Doc.on({
        'mouseover focusin': function () {
            openHeaderMenu($(this));
        }
    }, '#header .header-wrap .Hdepth01 > li')
        .on({
            'focusout': function () {
                closeHeaderMenu();
            }
        }, '#header .header-wrap nav a:last')
        .on({
            'mouseleave': function () {
                if (isSiteMapOpen()) {
                    return;
                }

                if (getHeaderMenuType() !== 'all') {
                    return;
                }

                closeHeaderMenu();
            }
        }, '#header')
        .on({
            'mouseleave': function () {
                if (isSiteMapOpen()) {
                    return;
                }

                if (getHeaderMenuType() === 'all') {
                    return;
                }

                getHeader().add('.Htlv01').removeClass('active');
                $(this).children('.Hdepth02').removeClass('is-open');
            }
        }, '#header .header-wrap .Hdepth01 > li')
        .on({
            'click': function (e) {
                e.preventDefault();
                setSiteMapState(!isSiteMapOpen());
            }
        }, '#header .menu-btn')
        .on({
            'focusout': function (e) {
                e.preventDefault();
                $(this).parents().find('button').removeClass('active');
                $(this).parent('div').slideUp(200);
            }
        }, '#footer .family-bx div a:last-child')
        .on({
            'click': function (e) {
                e.preventDefault();
                $(this)
                    .closest('.item')
                    .siblings('.item')
                    .find('> div')
                    .stop()
                    .slideUp(300)
                    .end()
                    .find('> button')
                    .removeClass('active');

                $(this).toggleClass('active').next('div').stop().slideToggle(300);
            }
        }, '.family-bx button');
}

function bindHeaderScrollState() {
    var lastScrollTop = 0;

    $Win.on('scroll', function () {
        var currentScrollTop = $(this).scrollTop();

        getHeader().toggleClass('fixed', $(document).scrollTop() > 60);
        getHeader().toggleClass('down', currentScrollTop > lastScrollTop);

        lastScrollTop = currentScrollTop;
    });
}

function bindTopButton() {
    $Doc.on('click', '#btn-top', function (e) {
        e.preventDefault();

        if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(0);
            return;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function splitWaveText() {
    document.querySelectorAll('.wave-text').forEach(function (el) {
        var idx = 0;
        var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
        var textNodes = [];

        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }

        textNodes.forEach(function (node) {
            var parent = node.parentNode;
            var frag = document.createDocumentFragment();

            Array.from(node.nodeValue).forEach(function (ch) {
                var span = document.createElement('span');
                span.className = 'char';
                span.textContent = ch === ' ' ? '\u00A0' : ch;
                span.style.setProperty('--i', idx++);
                frag.appendChild(span);
            });

            parent.replaceChild(frag, node);
        });
    });
}

function initDomReadyFeatures() {
    initLenis();
    bindRoleButtonKeypress();
    bindDocumentEvents();
    bindTopButton();
    splitWaveText();
}

function initWindowLoadFeatures() {
    setViewportHeightVar();
    window.addEventListener('resize', setViewportHeightVar);
    bindSitemapTouch();
    bindHeaderScrollState();
}

document.addEventListener('DOMContentLoaded', initDomReadyFeatures);

$Win.on({
    'load': function () {
        syncHeaderMode();
        initWindowLoadFeatures();
    },
    'resize': function () {
        syncHeaderMode();
        resetHeaderResizeState();
    }
});
