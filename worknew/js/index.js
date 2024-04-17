$(function() { 
    var slickOption1 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        prevArrow: $('#notice .prev'),
        nextArrow: $('#notice .next'),
        pauseOnHover: false,
        verticalSwiping: true,
        speed: 200,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                    // centerMode: true,
                }
            },
            {
                breakpoint: 717,
                settings: {
                    // speed: 250,
                }
            }
        ]
    }; 
    initSlick($('#notice .slick'), slickOption1);

    var slickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        infinite: true,
        draggable: false,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 800,
        autoplaySpeed: 9000,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                   
                }
            },
            {
                breakpoint: 717,
                settings: {
                    
                }
            }
        ]
    }; 
    initSlick($('#visual .slick'), slickOption2);

    var slickOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        infinite: true,
        draggable: true,
        centerMode: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 0,
        swipeToSlide: true,
        // variableWidth: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                   
                }
            },
            {
                breakpoint: 717,
                settings: {
                    
                }
            }
        ]
    }; 
    initSlick($('#numberone .slick'), slickOption3);

    var slickOption4 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        infinite: true,
        draggable: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 0,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1181,
                settings: {
                   
                }
            },
            {
                breakpoint: 717,
                settings: {
                    
                }
            }
        ]
    }; 
    initSlick($('#office .slick'), slickOption4);

    setTimeout(function() {
        AOS.init({
            easing: 'ease-out-back',
            duration: 900,
            delay: 400,
            // once: true,
            offset: 250
        });
     }, 100);

     setTimeout(function(){
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        const smoother = ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#main-wrap",
        smooth: .8,
        smoothTouch: 0,
        normalizeScroll: false,
        ignoreMobileResize: true, 
        effects: true,
        // preventDefault: true
        });
        
    },100);	
});

var ObjDoc = $(document);	
ObjDoc.on({
	'click': function(e) { 
        e.preventDefault();
        Idx = $(this).index();
        $('.map-bx .img-bx > div > button').removeClass('active');
        $(this).addClass('active');
        $('.map-bx .text-bx > div').hide();
        $('.map-bx .text-bx > div').eq(Idx).show();
	}
}, '.map-bx .img-bx > div > button')
.on({
	'click': function(e) { 
        e.preventDefault();
        Idx = $(this).index();
        $('.tab-bx > button').removeClass('active');
        $(this).addClass('active');
        $('.tab-view > div').hide();
        $('.tab-view > div').eq(Idx).show();
        $('#office .slick').slick('setPosition');
	}
}, '.tab-bx > button')
.on({
	'click': function(e) { 
        e.preventDefault();
        Idx = $(this).index();
        $('.board-tab > button').removeClass('active');
        $(this).addClass('active');
        $('.board-view > div').hide();
        $('.board-view > div').eq(Idx).show();
	}
}, '.board-tab > button');

$(window).on('load', function(){
    // if($(window).width() > 1439){ 
	// 	setTimeout(function(){
    //         gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    //         const smoother = ScrollSmoother.create({
    //         wrapper: "#wrapper",
    //         content: "#main-wrap",
    //         smooth: 1.5,
    //         smoothTouch: 0.1,
    //         normalizeScroll: true,
    //         ignoreMobileResize: true, 
    //         effects: true,
    //         // preventDefault: true
    //         });
            
    //     },50);	
    // }

   
});