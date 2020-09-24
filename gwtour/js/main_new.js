$(function() {  


     $('#visual .slick_wrap .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#visual .page, #visual .weather').fadeOut();
        $('#visual .typing li').fadeOut();
    });

    $('#visual .slick_wrap .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .page, #visual .weather').fadeIn();

        tyInt = clearInterval(typing2,0);

        $('#visual .typing li').text('').fadeIn();
        var typingBool = false; 
        var typingIdx=0; 
        var liIndex = 0;
        var liLength = $(".typing-txt>ul>li").length;

        // 타이핑될 텍스트를 가져온다 
        var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
        typingTxt=typingTxt.split(""); // 한글자씩 자른다. 
        if(typingBool==false){ // 타이핑이 진행되지 않았다면
            typingBool=true;
            var tyInt = setInterval(typing2,60); // 반복동작 
        }         
        function typing2(){ 
        $(".typing ul li").removeClass("on");
        $(".typing ul li").eq(liIndex).addClass("on");
        if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복 
            $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
            typingIdx++; 
        } else{ if(liIndex<liLength-1){
            //다음문장으로  가기위해 인덱스를 1증가
            liIndex++; 
            //다음문장을 타이핑하기위한 셋팅
                typingIdx=0;
                typingBool = false; 
                typingTxt = $(".typing-txt>ul>li").eq(liIndex).text(); 
                clearInterval(tyInt); 
                setTimeout(function(){
                tyInt = setInterval(typing2,60);
                },500);
                } else if(liIndex==liLength-1){
                clearInterval(tyInt);
                }
            } 
        }
     });

    $('#visual .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        appendDots: false,
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#visual .prev'),
        nextArrow: $('#visual .next'),
        pauseOnHover: false,
        autoplaySpeed: 6000,
        speed: 1800,
    });

    $('#visual .btn_box a').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
        $(this).hide();
        $('#visual .play').css('display','inline-block');
        $('#visual .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('#visual .pause').css('display','inline-block');
        $('#visual .slick').slick('slickPlay');
        }
    });

   
     $('#notice .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        appendDots: false,
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#notice .slick_wrap .prev'),
        nextArrow: $('#notice .slick_wrap .next'),
        pauseOnHover: false,
        autoplaySpeed: 4000,
        speed: 1200
    });

    $('#notice .btn_box .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
        $(this).hide();
        $('#notice .play').css('display','inline-block');
        $('#notice .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('#notice .pause').css('display','inline-block');
        $('#notice .slick').slick('slickPlay');
        }
    });

     $('#notice .slick_wrap .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#notice .control').animate({opacity:'0'},400);
    });

    $('#notice .slick_wrap .slick').on('afterChange', function(slick, currentSlide, nextSlide) {
        $('#notice .control').animate({opacity:'1'},400);
    });

    $('#notice .slick02').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        appendDots: false,
        vertical: true,
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#notice .slick_wrap02 .prev'),
        nextArrow: $('#notice .slick_wrap02 .next'),
        pauseOnHover: false,
        autoplaySpeed: 4000,
        speed: 1200
    });


    $('#notice .row02 .list01').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        accessibility: false,
        draggable: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 7,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 6000,
        speed: 1200,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false
            }
        },
        {
        breakpoint: 1200,
            settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
                centerMode: false
            }
        },

         {
            breakpoint: 9999,
            settings: 'unslick'
        }]
    });

    $(window).on('load resize', function () {
        $('#notice .row02 .list01').slick('resize');
        $('#tour .slick').slick('resize');
        $('#festival .slick').slick('resize');
        $('#festival .slick02').slick('resize');
        $('#planner .list02').slick('resize');
    });


    $('#tour .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        prevArrow: $('#tour .prev'),
        nextArrow: $('#tour .next'),
        autoplaySpeed: 5000,
        speed: 1200,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                 variableWidth: true
            }
        },
        {
        breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true
            }
        }]
    });


     $('#tour .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#tour h2').addClass('active');
    });

    $('#tour .slick').on('afterChange', function(slick, currentSlide, nextSlide) {
        $('#tour h2').removeClass('active');
    });


    $('#festival .slick').slick({
        autoplay: true,
        arrows: false,
        dots: false,
        appendDots: false,
        accessibility: false,
        draggable: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 4000,
        asNavFor: '#festival .slick02',
        speed: 1200
    });

    $('#festival .slick02').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $('#festival .control .prev'),
        nextArrow: $('#festival .control .next'),
        pauseOnHover: false,
        asNavFor: '#festival .slick',
        autoplaySpeed: 4000,
        speed: 1200
    });

    $('#festival .btn_box .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
        $(this).hide();
        $('#festival .play').css('display','inline-block');
        $('#festival .slick').slick('slickPause');
        $('#festival .slick02').slick('slickPause');
        } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('#festival .pause').css('display','inline-block');
        $('#festival .slick').slick('slickPlay');
        $('#festival .slick02').slick('slickPlay');
        }
    });

    $('#festival .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#festival .fest_more, #festival .box').addClass('active');
    });

    $('#festival .slick').on('afterChange', function(slick, currentSlide, nextSlide) {
        $('#festival .fest_more, #festival .box').removeClass('active');
    });


    $('#planner .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        prevArrow: $('#planner .prev'),
        nextArrow: $('#planner .next'),
        autoplaySpeed: 5000,
        speed: 1200,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                 variableWidth: true
            }
        },
        {
        breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true
            }
        }]
    });


     $('#planner .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#planner .schdule_make, #planner h2').addClass('active');
    });

    $('#planner .slick').on('afterChange', function(slick, currentSlide, nextSlide) {
        $('#planner .schdule_make, #planner h2').removeClass('active');
    });


    $('#planner .list02').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        accessibility: true,
        draggable: true,
        infinite: true,
        centerMode: true,
        slidesToShow: 7,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 6000,
        speed: 1200,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false
            }
        },
         {
            breakpoint: 9999,
            settings: 'unslick'
        }]
    });

    $('#notice .video_box').on('mouseover', function (e) {
        $(this).addClass('active');
	});

    $('#notice .video_box').on('mouseout', function (e) {
        $(this).removeClass('active');
	});

     $('#notice .video_wrap .upsize').on('click', function (e) {
         e.preventDefault();
		$('#notice .video_wrap').addClass('active');
	});

    $('#notice .video_wrap .downsize').on('click', function (e) {
        e.preventDefault();
		$('#notice .video_wrap').removeClass('active');
	});


});

