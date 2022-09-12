$(function() {
    var VisualOption = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:true,
        prevArrow: $('.visual-slick .prev'),
        nextArrow: $('.visual-slick .next'),
        appendDots: $('#visual-slick .dots'),
        customPaging: function(slick,index) {
            return '<a href="#" onclick="return false;" role="button" class="v' + (index + 1) + '"><em></em><span></span></a>';
        },
        // customPaging: imgPaging,
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
	' click': function(e) {
		e.preventDefault();
		$(this).parent().parent().find('.box_item').removeClass('active');
		$(this).addClass('active');
	}
}, '#visual .shortcuts_box .box_item')
.on('click', '.family .open', function(e){
	e.preventDefault();
	$(this).toggleClass('active');
})
.on({
	'mouseover focusin click': function(e) {
        e.preventDefault();
        $(this).parent().parent().find('li').removeClass('active');
		$(this).parent().addClass('active');
	}
}, '#incentive_wrap .incentive_list .list_item')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).parent().find('a').removeClass('active');
        $(this).addClass('active');
	}
}, '#target_area .map_point a')
.on({
	'click': function(e) {
		e.preventDefault();
		$(this).parent().parent().find('li a').removeClass('active');
        $(this).addClass('active');
	}
}, '#target_area .target_shortcuts .list_item')

