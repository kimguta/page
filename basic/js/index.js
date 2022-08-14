$(function() { 
    var VisualOption = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:true,
        prevArrow: $('.visual-slick .prev'),
        nextArrow: $('.visual-slick .next'),
        appendDots: $('.visual-slick .dots'),
        // customPaging: imgNumber,
        customPaging: imgPaging,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 1000,
        autoplaySpeed: 3000,
    };
    
    initSlick($('.visual-slick .slick'), VisualOption);      
    initSlick($('.visual-slick2 .slick'), VisualOption2);    
});


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





