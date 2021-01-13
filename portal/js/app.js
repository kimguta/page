$('#intro .wrap li:first-child').on('click', function () {
    $(this).toggleClass('active');
});
$('#btn-gnb').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).children('span').text('전체 메뉴 열기');
        $('#header').removeClass('active');
    } else {
        $(this).addClass('active');
        $(this).children('span').text('전체 메뉴 닫기');
        $('#header').addClass('active');
    }
});
$('#header #gnb h2 a').on('mouseover  focusin', function () {
    if (device === 'pc') {
        $('#gnb h2').removeClass('active');
        $(this).parent().addClass('active');
    }
});

$('#header #gnb > div:last-child li:last-child a').on('focusout', function () {
    $('#gnb h2').removeClass('active');
});

$('.page-header, #contents').on('mouseover', function () {
    if (device === 'pc') {
        $('#gnb h2').removeClass('active');
    }
});
$('#header #gnb h2 a').on('click', function (e) {
    e.preventDefault();
    if (device === 'pc') {

    } else if (device === 'mobile') {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        } else {
            $(this).parent().parent().siblings('div').find('h2').removeClass('active');
            $(this).parent().addClass('active');
        }
    } else {

    }
});
$('#menus .lang li:first-child a ').bind('mouseover focus', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
});
$('#menus .lang').on('mouseleave', function () {
    $('#menus .lang li').removeClass('active');
});
$('#menus .lang li:last-child a').on('focusout', function () {
    $('#menus .lang li').removeClass('active');
});
$('#menus .btn-sns').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
});
$('.tab-nav li a').on('click', function (e) {
    e.preventDefault();
    var idx = $(this).parent().index();
    $('.tab-nav li').removeClass('active');
    $(this).parent().addClass('active');
    $('.tabs > div').hide();
    $('.tabs > div').eq(idx).show();
});
$('#btn-top').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, 300);
});
$('.slick1 .slick').slick({
    autoplay: false,
    arrows: false,
    accessibility: false,
    dots: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});
$('.slick2 .slick').slick({
    autoplay: false,
    arrows: false,
    prevArrow: ('.slick2 .prev'),
    nextArrow: ('.slick2 .next'),
    accessibility: false,
    dots: false,
    draggable: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
            breakpoint: 426,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
});
$('.slick-wrap button').on('click', function (e) {
    e.preventDefault();
    var slick = $(this).closest('.slick-wrap').find('.slick');
    if ($(this).hasClass('prev')) {
        slick.slick('slickPrev');
    } else if ($(this).hasClass('next')) {
        slick.slick('slickNext');
    }
});
$('.slick3 .slick').slick({
    autoplay: false,
    arrows: false,
    accessibility: false,
    dots: false,
    draggable: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});
$('.slick3 .control li a').on('click', function (e) {
    var idx = $(this).parent().index();
    e.preventDefault();
    $('.slick3 .slick').slick('slickGoTo', idx);
});
$('.slick3 .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('.slick3 .txt').fadeOut();
});
$('.slick3 .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    $('.slick3 .txt').fadeIn(2000);
    $('.slick3 .control li').removeClass('active');
    $('.slick3 .control li').eq(currentSlide).addClass('active');
});
$('.slick3 .slick').on('wheel', function (e) {
    e.preventDefault();
    $('.slick3 .slick-wrap > p').hide();
    if (e.originalEvent.deltaY < 0) {
        $(this).slick('slickPrev');
    } else {
        $(this).slick('slickNext');
    }
});
$('.lane button').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).children('span').text('노선 시간표 보기');
    } else {
        $(this).parent().siblings().find('button').removeClass('active');
        $(this).addClass('active');
        $(this).children('span').text('노선 시간표 닫기');
    }
});
$('.responsive').on('scroll', function (e) {
    $(this).addClass('moved');
});
$(window).on('scroll', function (e) {
    var posY = $(window).scrollTop();
    var gnbHeight = $('#header').outerHeight();
    if (device === 'pc') {
        if (posY > gnbHeight) {
            $('#header').addClass('fixed');
        } else if (posY < gnbHeight) {
            $('#header').removeClass('fixed');
        }
    }
});
$("input.date").datepicker({
    dateFormat: 'yy-mm-dd', //Input Display Format 변경
    showOtherMonths: true, //빈 공간에 현재월의 앞뒤월의 날짜를 표시
    showMonthAfterYear: true, //년도 먼저 나오고, 뒤에 월 표시
    showOn: "both", //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
    changeYear: true, //년도 변경
    // buttonImage: "./images/ico_calendar.png", //버튼 이미지 경로
    buttonImageOnly: true, //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
    buttonText: "선택", //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
    yearSuffix: "년", //달력의 년도 부분 뒤에 붙는 텍스트
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], //달력의 월 부분 텍스트
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], //달력의 월 부분 Tooltip 텍스트
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'], //달력의 요일 부분 텍스트
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
});



$('.heal_slick.v1').slick({
    autoplay: false,
    arrows: true,
    prevArrow: ('.control_box.v1 .prev'),
    nextArrow: ('.control_box.v1 .next'),
    accessibility: false,
    dots: false,
    draggable: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
            breakpoint: 426,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
});

$('.heal_slick.v2').slick({
    autoplay: false,
    arrows: true,
    prevArrow: ('.control_box.v2 .prev'),
    nextArrow: ('.control_box.v2 .next'),
    accessibility: false,
    dots: false,
    draggable: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
            breakpoint: 426,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
});

$('.heal_slick.v3').slick({
    autoplay: false,
    arrows: true,
    prevArrow: ('.control_box.v3 .prev'),
    nextArrow: ('.control_box.v3 .next'),
    accessibility: false,
    dots: false,
    draggable: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
            breakpoint: 426,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 769,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }
    ]
});

$("#1day").click(function() {
	$('.heal_slick.v1').slick('resize');
    $('.heal_slick.v1').slick('refresh');
});

$("#2day").click(function() {
	$('.heal_slick.v2').slick('resize');
    $('.heal_slick.v2').slick('refresh');
});

$("#3day").click(function() {
	$('.heal_slick.v3').slick('resize');
    $('.heal_slick.v3').slick('refresh');
});

$('#btn-gnb').on("click",function(){
    if($("#btn-gnb").hasClass("active") === true) {
        $('#gnb > div:first-child h2 a').focus();
    }else{
        $('.slick-dots li:first-child button').focus();
    }
});


$('.skip').on('click', function (e) {
    $('#contents').attr('tabindex', '0').focus();
});

$('#contents').on('focusout', function(){
    $(this).removeAttr('tabindex');
});


$('.pager-link.active').prop('title', '현재 페이지');


$('.sroad .smap .trigger').on('mouseenter click',function(e){
    e.preventDefault();
    e.stopPropagation();
    var idx = $(this).parent().index();
    $('.sroad .smap > div').removeClass('active');
    $(this).parent('div').addClass('active');
    $('.stab > a').removeClass('active');
    $('.stab > a').eq(idx).addClass('active');
    $('.sroad .smap').removeAttr('class').addClass('smap');
    $('.sroad .smap').addClass('ty' + idx);
  
});


$('.sroad .smap .spot').on('mouseenter click',function(e){
    e.stopPropagation();
});


$('.sroad .stab > a').on('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    var idx = $(this).index();
    var Offset = $('.sroad').offset();
    $('.sroad .smap > div').removeClass('active');
    $('.sroad .smap > div').eq(idx).addClass('active');
    $('.stab > a').removeClass('active');
    $(this).addClass('active');
    $('.sroad .smap').removeAttr('class').addClass('smap');
    $('.sroad .smap').addClass('ty' + idx);
    $('html, body').animate({
        scrollTop : Offset.top - 70
    }); 
});

$('.sroad').on('mouseleave click',function(e){
    e.preventDefault();
    $('.sroad .smap > div').removeClass('active');
    $('.sroad .stab > a').removeClass('active');
    $('.sroad .smap').removeAttr('class').addClass('smap');
});


$('.sroad_cont .titbx .btn').on('click',function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).next('.list01').slideToggle(200);
    if($(this).hasClass('active')) {
        $(this).children('span').text('닫기');
    }else{
        $(this).children('span').text('열기');
    }
});