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
    
    initSlick($('#visual .slick'), slickOption);      
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
}, '#main .video-on');



