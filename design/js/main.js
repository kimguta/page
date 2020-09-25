$(function() {

    $('#visual .slick_wrap .slick').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        appendDots: $('#visual .slick_wrap .control .dots'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 6000,
        speed: 1200
    });

    $('#visual .slick_wrap .btn_box button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
        $(this).hide();
        $('#visual .slick_wrap .play').show();
        $('#visual .slick_wrap .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('#visual .slick_wrap .pause').show();
        $('#visual .slick_wrap .slick').slick('slickPlay');
        }
    });

    $('#visual .slick_wrap .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .text_box').fadeOut();
        $('#visual .typing li').text('');
        $('#visual .typing2').text('');
        $('#visual .pattern').removeClass('ani');
    });

    $('#visual .slick_wrap .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .text_box').fadeIn();
        $('#visual .text_box').toggleClass('two');
        $('#visual .pattern').addClass('ani');
        if ($('#visual .text_box').hasClass('two')) {
            var typingBool = false;
            var typingIdx=0;
            var liIndex = 0;
            var liLength = $(".typing-txt>ul>li").length;

            // 타이핑될 텍스트를 가져온다
            var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
            typingTxt=typingTxt.split(""); // 한글자씩 자른다.
            if(typingBool==false){ // 타이핑이 진행되지 않았다면
                typingBool=true;
                var tyInt = setInterval(typing2,80); // 반복동작
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

                //다음문장 타이핑전 1초 쉰다
                    clearInterval(tyInt);
                    //타이핑종료

                    setTimeout(function(){
                    //1초후에 다시 타이핑 반복 시작
                    tyInt = setInterval(typing2,100);
                    },1000);
                    } else if(liIndex==liLength-1){

                    //마지막 문장까지 써지면 반복종료
                    clearInterval(tyInt);
                    }
                }
            }
        } else {
            var typingBool2 = false;
            var typingIdx2=0;
            var typingTxt2 = $(".typing-txt2").text(); // 타이핑될 텍스트를 가져온다
                typingTxt2=typingTxt2.split(""); // 한글자씩 자른다.
                if(typingBool2==false){ // 타이핑이 진행되지 않았다면
                typingBool2=true;

                var tyInt2 = setInterval(typing,150); // 반복동작
                }

                function typing(){
                if(typingIdx2<typingTxt2.length){ // 타이핑될 텍스트 길이만큼 반복
                    $(".typing2").append(typingTxt2[typingIdx2]); // 한글자씩 이어준다.
                    typingIdx2++;
                } else{
                    clearInterval(tyInt2); //끝나면 반복종료
                }
            }
        }

    });

    var typingBool2 = false;
    var typingIdx2=0;
    var typingTxt2 = $(".typing-txt2").text(); // 타이핑될 텍스트를 가져온다
        typingTxt2=typingTxt2.split(""); // 한글자씩 자른다.
        if(typingBool2==false){ // 타이핑이 진행되지 않았다면
        typingBool2=true;

        var tyInt2 = setInterval(typing,150); // 반복동작
        }

        function typing(){
        if(typingIdx2<typingTxt2.length){ // 타이핑될 텍스트 길이만큼 반복
            $(".typing2").append(typingTxt2[typingIdx2]); // 한글자씩 이어준다.
            typingIdx2++;
        } else{
            clearInterval(tyInt2); //끝나면 반복종료
        }
    }


    $('#visual  .slick_wrap02 .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#visual .slick_wrap02 .count').html('<em>' + i + '</em> <span>/ </span> <em class="sum">' + slick.slideCount + '</em>');
        $('#visual .slick_wrap02 .timer').addClass('active');
    });

    $('#visual  .slick_wrap02 .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .slick_wrap02 .timer').removeClass('active');
    });

    $('#visual .slick_wrap02 .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#visual .slick_wrap02 .prev'),
        nextArrow: $('#visual .slick_wrap02 .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 4000,
        speed: 1500,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 1
            }
        }]
    });


    $('#visual .slick_wrap02 .control button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#visual .play').show();
            $('#visual .slick').slick('slickPause');
            $('#visual .slick_wrap02 .timer').removeClass('active');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#visual .pause').show();
            $('#visual .slick').slick('slickPlay');
            $('#visual .slick_wrap02 .timer').addClass('active');
        }
    });


    $('#notify .slick01').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#notify .control01 .prev'),
        nextArrow: $('#notify .control01 .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        swipeToSlide: true,
        pauseOnHover: false,
        autoplaySpeed: 3800,
        speed: 1500,
    });

    $('#notify .control01 .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#notify .control01 .play').show();
            $('#notify .slick01').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#notify .control01 .pause').show();
            $('#notify .slick01').slick('slickPlay');
        }
    });


    $('#notify .slick02').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#notify .control02 .prev'),
        nextArrow: $('#notify .control02 .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        autoplaySpeed: 3700,
        speed: 1200,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $('#notify .control02 .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#notify .control02 .play').show();
            $('#notify .slick02').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#notify .control02 .pause').show();
            $('#notify .slick02').slick('slickPlay');
        }
    });

    $('#notify .slick03').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#notify .slick03 .slide p').fadeIn(100);
    });

    $('#notify .slick03').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#notify .slick03 .slide p').fadeOut(100);
    });

    $('#notify .slick03').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#notify .control03 .prev'),
        nextArrow: $('#notify .control03 .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        autoplaySpeed: 3600,
        speed: 1200,
        responsive: [{
            breakpoint: 761,
            settings: {
                slidesToScroll: 1,
                variableWidth: true,
                swipeToSlide: true,
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    $('#notify .control03 .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#notify .control03 .play').show();
            $('#notify .slick03').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#notify .control03 .pause').show();
            $('#notify .slick03').slick('slickPlay');
        }
    });


    $('#notify .list_box h2.active').next('ul').show();
    $('#notify .list_box h2.active').nextAll('.more').show();

    $('#notify .list_box h2 a').on('click', function (e) {
        e.preventDefault();
		$('#notify .list_box ul').fadeOut(300);
        $('#notify .list_box .more').fadeOut(300);
        $('#notify .list_box h2').removeClass('active');
		$(this).parent().addClass('active');
        $(this).parent('h2').next('ul').fadeIn(300);
        $(this).parent('h2').nextAll('.more').fadeIn(300);
	});

    $('#data .rbox > div.active').children('.btn_box').show();

    $('#data .rbox h2 a').on('click', function (e) {
        e.preventDefault();
        $('#data .rbox .btn_box').slideUp(300);
        $('#data .rbox > div').removeClass('active');
		$(this).closest('div').addClass('active');
        $(this).parent('h2').next('.btn_box').slideDown(300);
	});

    $('#blog .slick').slick({
        autoplay: false,
        arrows: true,
        dots: true,
        appendDots:$('#blog .dots'),
        prevArrow: $('#blog .prev'),
        nextArrow: $('#blog .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        swipeToSlide: true,
        pauseOnHover: false,
        speed: 1500,
    });

    var currentPosition = parseInt($("#sns").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		$("#sns").stop().animate({"top":posY+currentPosition+"px"},570);
	});


    $('#notify .slick03').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#notify .slick03 .slide p').fadeIn(100);
    });

    $('#notify .slick03').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#notify .slick03 .slide p').fadeOut(100);
    });

    $('#activity .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#activity .prev'),
        nextArrow: $('#activity .next'),
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        autoplaySpeed: 3600,
        speed: 1200,
        responsive: [{
            breakpoint: 1021,
            settings: {
                variableWidth: true,
                swipeToSlide: true,
            }
        },
         {  
            breakpoint: 9999,
            settings: {
                slidesToShow: 2
            }
        }]
    });

    $('#activity .button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#activity .play').show();
            $('#activity .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#activity .pause').show();
            $('#activity .slick').slick('slickPlay');
        }
    });

    $(window).on('resize', function () {
        $('#activity .slick').slick('resize');
        $('#blog .slick').slick('resize');
        $('#notify .slick01').slick('resize');
        $('#notify .slick02').slick('resize');
        $('#notify .slick03').slick('resize');
        $('#visual .slick_wrap02 .slick').slick('resize');
        $('#visual .slick_wrap .slick').slick('resize');
    });
});
