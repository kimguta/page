$(function() {

    $('#visual .slick_wrap .slick').slick({
        autoplay: true,
        arrows: false,
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
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 4000,
        speed: 1500,
    });

    $('#visual .slick_wrap02 .control button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#visual .play').show();
            $('#visual .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#visual .pause').show();
            $('#visual .slick').slick('slickPlay');
        }
    });


    $('#creative .slick_wrap .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#creative .slick_wrap .prev'),
        nextArrow: $('#creative .slick_wrap .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        autoplaySpeed: 6000,
        speed: 1500,
    });

    $('#creative .slick_wrap .control button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#creative .play').show();
            $('#creative .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#creative .pause').show();
            $('#creative .slick').slick('slickPlay');
        }
    });

    $('#creative .slick_wrap .slick').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('#creative .text').fadeOut();
    });

    $('#creative .slick_wrap .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#creative .text').fadeIn();
    });

    $('#visual').append('<span class="year50">1970-2020 한국디자인진흥 50년</span>');


});

