

$(window).on('load', function() {
    var VisualOption = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:true,
        prevArrow: $('.visual-slick .prev'),
        nextArrow: $('.visual-slick .next'),
        appendDots: $('.visual-slick .dots'),
        // 번호 dots
        // customPaging: function(slick,index) {
        //     return '<a href="#" role="button" onclick="return false;">' + (index + 1) + '</a>';
        // },
        // 이미지 dots
        customPaging: function(slick,index) {
            var targetImage = slick.$slides.eq(index).find('img').attr('src');
            return '<a href="#" role="button" onclick="return false;"><img src=" ' + targetImage + ' "/></a>';
        },
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
        autoplaySpeed: 3000,
    };

    var VisualOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots: true,
        draggable: true,
        infinite: true,
        slidesToShow: 5,
        centerMode: true,
        swipeToSlide: true,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 500,
        autoplaySpeed: 1500,
    };


    initSlick($('.visual-slick .slick'), VisualOption);  
    initSlick($('.visual-slick2 .slick'), VisualOption2);  
});
