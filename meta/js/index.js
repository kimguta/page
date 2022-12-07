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
var ObjWin = $(window);
var ObjDoc = $(document);
var Wwidth = ObjWin.outerWidth();

ObjDoc.on({
	'mouseover': function(e) {
		e.preventDefault();
		$('#visual .main_tab .depth-01 li').removeClass('active');
		$('#visual .main_tab .depth-01 li .depth-02').hide();
		$(this).addClass('active');
		$(this).find('.depth-02').show();
	}
}, '#visual .main_tab .depth-01 > li')
.on({
	'mouseleave': function(e) {
		e.preventDefault();
		$('#visual .main_tab .depth-01 li').removeClass('active');
		$('#visual .main_tab .depth-01 li .depth-02').hide();
	}
}, '#visual .main_tab .depth-01 > li')
.on({
	'click': function(e) {
		e.preventDefault();
        var idx = $('.round_tab li a').index(this);
		$('.round_tab li').removeClass('active');
		$(this).parent().addClass('active');
        $('.news_list_wrap .news_list').removeClass('active');
        $('.news_list_wrap .news_list').eq(idx).addClass('active');
	}
}, '.round_tab li a');


