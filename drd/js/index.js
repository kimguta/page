$(function() { 

    var sOption1 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipeToSlide: true,
        speed: 500,
        // responsive: [
        //     {
        //         breakpoint: 717,
        //         settings: {
        //         speed: 500,
        //         }
        //     }
        // ]
    };

    initSlick($('#sec02 .slick'), sOption1);

    var sOption2 = {
        autoplay: true,
        arrows: false,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipeToSlide: true,
        speed: 500,
        autoplaySpeed: 3000,
        // responsive: [
        //     {
        //         breakpoint: 717,
        //         settings: {
        //         speed: 500,
        //         }
        //     }
        // ]
    };

    initSlick($('.top-bx .slick'), sOption2);

    var sOption3 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipeToSlide: true,
        speed: 350,
        // responsive: [
        //     {
        //         breakpoint: 717,
        //         settings: {
        //         speed: 500,
        //         }
        //     }
        // ]
    };

    initSlick($('.bottom-bx .slick'), sOption3);

    var sOption4 = {
        autoplay: false,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
        swipeToSlide: true,
        speed: 350,
        // responsive: [
        //     {
        //         breakpoint: 717,
        //         settings: {
        //         speed: 500,
        //         }
        //     }
        // ]
    };

    initSlick($('#sec07 .slick'), sOption4);

    setTimeout(function() {
        AOS.init({
            easing: 'ease-out-back',
            duration: 1000,
            delay: 350,
            // once: true,
            offset: 350
        });
     }, 200);

     
});

// ObjDoc.on({
//     'click': function(e) { 
//         e.preventDefault();
//         var Idx = $(this).index();
//         $('#map .btn-bx a, #map .img-bx a').removeClass('active');
//         $('#map .img-bx a').eq(Idx).addClass('active');
//         $(this).addClass('active');
//     }
// }, '#map .btn-bx a');



