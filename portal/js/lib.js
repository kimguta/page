var device = 'pc';
var focusTarget = null;
svg4everybody();

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
    if (windowWidth < 480) {
        device = 'mobile';
    } else if (windowWidth > 480 && windowWidth < 1024) {
        device = 'tablet';
    } else {
        device = 'pc';
    }
    $('.preload').removeClass('preload');
    $('.relation-wrap ul').css('top', -($('.relation-wrap ul').height()));
});

jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});

function onImg(imgtarget) {
    var imgsrc = imgtarget.children("img").attr("src");
    var onpattern = /(_on.gif|_on.jpg|_on.png)$/ig;
    var offpattern = /(.gif|.jpg|.png)$/ig;
    var onoffchk;
    var newsrc;

    if (offpattern.test(imgsrc) && imgsrc.indexOf("_on") == -1) {
        onoffchk = RegExp.$1;
        newsrc = imgsrc.replace(onoffchk, "_on" + onoffchk);
        imgtarget.children("img").attr("src", newsrc);
    }
}

function offImg(imgtarget) {
    var imgsrc = imgtarget.children("img").attr("src");
    var onpattern = /(_on.gif|_on.jpg|_on.png)$/ig;
    var offpattern = /(.gif|.jpg|.png)$/ig;
    var onoffchk;
    var newsrc;

    if (onpattern.test(imgsrc) && imgsrc.indexOf("_on") > 0) {
        onoffchk = RegExp.$1;
        newsrc = imgsrc.replace(onoffchk, onoffchk.slice(-4));
        imgtarget.children("img").attr("src", newsrc);
    }
}

function modal(trigger) {
    var modalTarget = trigger.attr('data-id');
    var btnClose = $(modalTarget).find('.btn-close');
    var btnCancle = $(modalTarget).find('.btn-cancel');
    $('body').append('<div class="modal-overlay"></div>');
    $(modalTarget).addClass('modal-show').attr('tabindex', '0');
    setTimeout(function () {
        $(modalTarget).focus();
    }, 100);
    btnClose.attr('tabindex', '0');
    btnClose.on('click', function (e) {
        e.preventDefault();
        $(modalTarget).removeClass('modal-show').removeAttr('tabindex');
        btnClose.attr('tabindex', '-1');
        $('.modal-overlay').remove();
        if (trigger) {
            trigger.focus();
        }
    });
    btnCancle.on('click', function (e) {
        e.preventDefault();
        btnClose.click();
    });
    btnClose.on('focusout', function (e) {
        $(modalTarget).focus();
    });

    $('.modal-overlay').on('click', function (e) {
        btnClose.click();
    });
}

function initSlick(target) {
    target.slick({
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots: false,
        draggable: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        zIndex: 1000,
        pauseOnHover: false,
        autoplaySpeed: 4000,
        speed: 1500,
        responsive: [{
                breakpoint: 426,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            }
        ]
    });
}