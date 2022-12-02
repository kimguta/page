$(function() { 
    var sample = $('#Uplayer')[0];
    $('.control-bx .play, .text-img').on('click',function(){
        if ($('.control-bx .play').hasClass('active')) {
            sample.pause();
            $('.control-bx .play').removeClass('active');
        } else{
            sample.play();
            $('.control-bx .play').addClass('active');
            $('#visual .text-img').addClass('active');
        }
    });
    $('.control-bx .sound').on('click',function(){
        if ($(this).hasClass('active')) {
            $('#Uplayer').prop('muted', true);
            $(this).removeClass('active');
        } else{
            $('#Uplayer').prop('muted', false);
            $(this).addClass('active');
        }
    });

    $('#Uplayer').on("timeupdate", function() {
        var video = $(this)[0];
        var perc = 100 * video.currentTime / video.duration;
        $('.progress span').css("width", perc + "%");
        if (video.currentTime > 5) {
            $('#visual').addClass('v1')
        }
        $('.video-wrap .point').each(function(index, item){
            var sTime = $(this).data('start');
            var eTime = $(this).data('end');
            if (video.currentTime >= sTime && video.currentTime <= eTime) {
                $(this).addClass('active');
            }
            else{
                $(this).removeClass('active');
            }
        })
    });

    $('.video-wrap .point').on({
        'mouseover': function() { 
            sample.pause();
            $('.video-wrap').addClass('active');
        },
        'mouseout': function() { 
            sample.play();
            $('.video-wrap').removeClass('active');
        },
    });

    var windowWidth = $(window).width();
    $('.video-wrap').on('mousemove', function(e) {
        var moveX = (($(window).width() / 2) - e.pageX) * 0.4;
        var moveY = (($(window).height() / 2) - e.pageY) * 0.6;
        if (windowWidth > 1499) {
            $('.video-wrap').stop().css('margin-left', moveX + 'px').css('margin-top', moveY + 'px');
        }
    });

    var SlickOption1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:true,
        prevArrow: $('#only .prev'),
        nextArrow: $('#only .next'),
        appendDots: $('#only .dots'),
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        pauseOnHover: false,
        speed: 700,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 350,
                variableWidth: true,
                centerMode: true,
                slidesToScroll: 1,
                }
            }
        ]
    };

    var SlickOption2 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        swipeToSlide:true,
        draggable: true,
        variableWidth: true,
        infinite: true,
        slidesToShow: 3,
        pauseOnHover: false,
        speed: 900,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 500,
                centerMode: true,
                }
            }
        ]
    };

    var SlickOption3 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        dots:true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 600,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 500,
                }
            }
        ]
    };

    var SlickOption4 = {
        autoplay: false,
        arrows: false,
        accessibility: false,
        swipeToSlide:true,
        variableWidth: true,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        pauseOnHover: false,
        speed: 600,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                speed: 500,
                centerMode: true,
                }
            }
        ]
    };

    initSlick($('#only .slick'), SlickOption1);
    initSlick($('#festival .slick'), SlickOption2);
    initSlick($('#gift .slick'), SlickOption2);
    initSlick($('#notice .slick'), SlickOption3);
    initSlick($('#sns .slick'), SlickOption4);    
    sideBar($('#like .tab-bx'), $('#like .tab-bx > div'));
    $('#like .item-bx > div:first-child, #like .tab-bx a:first-of-type, #like .tab-bx p, #map .item-bx > div:first-child, #map .tab-bx a:first-child').addClass('active');


  

});


ObjDoc.on({
	'click': function(e) { 
		e.preventDefault();
		var idx = $(this).index() - 1;
        $('#like .item-bx > div, #like .tab-bx a').removeClass('active');
        $('#like .item-bx > div').eq(idx).addClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('tit2')) {
            $('#like .tab-bx p').addClass('active');
        } else{
            $('#like .tab-bx p').removeClass('active');
        }
	}
}, '#like .tab-bx a')
.on({
	'click': function(e) { 
		e.preventDefault();
		var idx = $(this).index();
        $('#map .item-bx > div, #map .tab-bx a').removeClass('active');
        $('#map .item-bx > div').eq(idx).addClass('active');
        $(this).addClass('active');
	}
}, '#map .tab-bx a');



ObjWin.on({
	'scroll load': function() { 
        if (Wwidth < 1500) {
            $('.control-bx .play, .text-img').on('click',function(){
                $('#visual').addClass('mobile');
                var Sposition =  ($('#Uplayer').width() - Wwidth) / 2;
                $('#visual .video-wrap').scrollLeft(Sposition);
            });
        }
	}		
});

function sideBar(wrapElem, elem){
    ObjWin.on('scroll', function(){
            var posY = ObjWin.scrollTop() + 100;
            var wOppset = wrapElem.offset();
            var wOppsetB = wOppset.top + wrapElem.height() - 270;
            if(wOppset.top < posY && wOppsetB > posY){
                elem.css("top",posY - wOppset.top+"px").addClass('active');
            }else if(wOppset.top > posY){
                elem.css("top","0px").removeClass('active'); 
            }
            else{
                elem.removeClass('active');    
            }       
	}); 
}

ObjWin.on('scroll load', function(){
    var posY = ObjWin.scrollTop() + 300;
    var welOppset = $('#welcome').prev().prev('section').offset().top;
    if(welOppset < posY){
        $('#welcome img').addClass('active');
    }  
});

