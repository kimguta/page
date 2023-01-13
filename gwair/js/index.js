$(function() { 
    var mainSlickOption = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };

    initSlick($('#data-wrap .slick'), mainSlickOption);

    var mainSlickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };

    initSlick($('#noti-wrap .slick'), mainSlickOption2);
});

ObjDoc.on({
	'click': function(e) { 
        e.preventDefault();
		var idx = $(this).index();
        $('#data-wrap .tab a').removeClass('active');
        $(this).addClass('active');
        $('#data-wrap .nowair tbody tr').removeClass('active');
        $('#data-wrap .nowair tbody tr').eq(idx).addClass('active');
        $('#data-wrap .notes img').hide();
        $('#data-wrap .notes img').eq(idx).show();
        $('#data-wrap .tab').toggleClass('active');
	}
}, '#data-wrap .tab a')
.on({
	'click': function(e) { 
        e.preventDefault();
		var idx = $(this).index();
        $(this).toggleClass('active');
	}
}, '#data-wrap .select .open')
.on({
	'click': function(e) { 
        e.preventDefault();
		var Name = $(this).text();
        var idx = $(this).index();
        $('#data-wrap .select .open').text(Name).removeClass('active');
        $('#data-wrap .spot-bx a').removeClass('active');
        $('#data-wrap .spot-bx a').eq(idx).addClass('active');
	}
}, '#data-wrap .select .view a')
.on({
	'click': function(e) { 
        e.preventDefault();
		var Name = $(this).text();
        $('#data-wrap .select .open').text(Name).removeClass('active');
        $('#data-wrap .spot-bx a').removeClass('active');
        $(this).addClass('active');
	}
}, '#data-wrap .spot-bx a');
