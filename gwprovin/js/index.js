$(function() { 
    var slickOption = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1200,
        autoplaySpeed: 5000,
    };

    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        prevArrow: $('#notice .prev'),
        nextArrow: $('#notice .next'),
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 600,
        autoplaySpeed: 5000,
    };
    
    initSlick($('#visual .slick'), slickOption);
    initSlick($('#notice .slick'), slickOption2);
    

    $('#notice .item:first-child, #information .item:first-child').addClass('active');
});


ObjDoc.on({
    'keydown': function(e) { 
        if(e.keyCode==9){ 
            $('#video-wrap .video-bx').attr('tabindex', -1).focus();
        }
	},
	'click': function(e) { 
        e.preventDefault();
		$('#player1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
        $('#video-wrap').hide();
        $('#main .video-on').focus();
	}
}, '#video-wrap .close')
.on({
	'click': function(e) { 
        e.preventDefault();
        $('#video-wrap').css('display','flex');
        $('#player1')[0].contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
        $('#video-wrap .video-bx div').attr('tabindex', -1).focus();
	}
}, '#main .video-on')
.on({
	'click': function(e) { 
        e.preventDefault();
        $('#notice .item').removeClass('active');
        $(this).parents('.item').addClass('active');
	}
}, '#notice h2 a')
.on({
	'click': function(e) { 
        e.preventDefault();
        $('#information .item').removeClass('active');
        $(this).parents('.item').addClass('active');
	}
}, '#information h3 a');


