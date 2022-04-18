$(function() {

    setTimeout(function() {
        AOS.init({
            easing: 'ease',
            duration: 1200,
            delay: 200,
            once: true,
            offset: 150
        });
     }, 200);

     $('#notice .notice_info .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('#main-visual-bx .serach_link .link_item').on('mouseover', function (e){
        e.preventDefault();
        $(this).parents('.serach_link').find('.link_item').removeClass('active');
        $(this).addClass('active');
    });
    $('#main-visual-bx .serach_link').on('mouseleave', function (e){
        e.preventDefault();
        $(this).find('.link_item').removeClass('active');
    });
    $('.notice_area .slick').slick({
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical:true,
        verticalSwiping:true,

    });

    $('.archive_tab_wrap .archive_tab li:first-child a').addClass('active');

    $('.archive_tab_wrap .tab_item a').on('mouseover', function (e){
        e.preventDefault();
        $('.archive_tab_wrap .tab_item a').removeClass('active');
        $(this).addClass('active');
    });

    $('.archive_tab_wrap .tab_item a').on('mouseout', function (e){
        e.preventDefault();
        $(this).removeClass('active');
    });

});

