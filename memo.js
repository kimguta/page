
#sub{background:#f5f5f5;font-family:"Apple SD Gothic Neo","Noto Sans", "Noto Sans KR","Malgun Gothic","맑은 고딕",helvetica,sans-serif;letter-spacing: -1px;}
pub_navi({
		target: '.id-gnb',
		notItem: '.item-button'
	});
/* FN : pub_navi */
function pub_navi(opts){
	var T = opts.target;
	var $T = $(T);
	var List = '.cmpe-list';
	var S = '.cmpe-submenu';
	var clName = 'active';
	var NotItem = opts.notItem;
	var events = (opts.onlyClick)? 'click' : 'mouseover focusin';
	// execute
	$T.find(S).hide();
	//$('.cmly-section-header').css({z-index:40});
	$T.find(List).find('li').not(NotItem).on(events,function(e){
		if(e.type =='mouseover' || e.type =='focusin' || e.type =='click'){
			var $This = $(this); 
			$This.addClass(clName).siblings().removeClass(clName);
			$This.find(S).show();
			$This.siblings().find(S).hide();
			$('.cmly-section-header').css({'z-index':30});
		}
	});
	// mouseout event action
	$(T +',' + T +' '+ S).on('mouseout focusout', function(e) {
		var act = function(){ $T.find(S).hide(); }
		var chkClNm = T.replace('.','');
		pub_mouseRelative(e,chkClNm,act);
	});
	
	$('.item-button').on('mouseover focusin', function(e) {
		$('.cmpe-submenu').hide();
	});
}

var sfDateDiff = moment(moment().format("YYYY-MM-DD")).diff(moment("2022-10-07"), "days");
        if(sfDateDiff >= 0) {
            $(".inner .date").text("문화행사 시작");
        } else {
            sfDateDiff = Math.abs(parseInt(sfDateDiff));
            $(".inner .date").text(sfDateDiff < 10 ? "0" + sfDateDiff : sfDateDiff);
        }

height:100vh;height: calc(var(--vh, 1vh) * 100);

<script>

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
    console.log("resize");
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

</script>





	/*
	ObjGnb.on('mouseover focusin', '#header.pc-mode .depth_01 li', function () {
		$('#header').addClass('active');
		$('h2').removeClass('active');
		$(this).children('h2').addClass('active');
		$('.depth_02').stop().show();
		$('.bg_pc').stop().slideDown(300);
		$('#mask').show();
	});

	ObjGnb.on('focusout', '#header .depth_01 a:last', function () {
		$('#header').removeClass('active');
		$('h2').removeClass('active');
		$('.depth_02, .bg_pc, #mask').stop().hide();
	});

	ObjGnb.on('mouseleave', '#header.pc-mode', function () {
		$('#header').removeClass('active');
		$('h2').removeClass('active');
		$('.depth_02, .bg_pc, #mask').stop().hide();
	});	

	ObjGnb.on('mouseover focusin',  '#header.pc-mode h3 a', function () {
		$('#header h3').removeClass('active');
		$(this).parent('h3').addClass('active');
		$('.depth_03').stop().slideUp(300);
		$(this).parent('h3').next('.depth_03').stop().slideDown(300);
		
	});

	ObjGnb.on('click', '#header.mobile-mode h2.has_depth a',  function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h2').removeClass('active');
			$('.depth_02, .depth_03').stop().slideUp(300);
		} else{
			$('#header h2').removeClass('active');
			$(this).parent('h2').addClass('active');
			$('.depth_02').stop().slideUp(300);
			$(this).parent('h2').next('.depth_02').stop().slideDown(300);
			
		}
	});	

	ObjGnb.on('click', '#header.mobile-mode h3.has_depth a',  function (e) {
		e.preventDefault();
		if ($(this).parent().hasClass('active')) {
			$(this).parent('h3').removeClass('active');
		} else{
			$('#header h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('.depth_03').stop().slideUp(300);
			$(this).parent('h3').next('.depth_03').stop().slideDown(300);
			
		}
	});

	ObjGnb.on('click', '#header.mobile-mode .mobile-on', function (e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('#header nav').toggleClass('active');
		$('#header').toggleClass('active');
		$('#mask').toggle();
	});	

	*/


var Wwidth = $(window).outerWidth();
var Height = $(window).outerHeight();

$(window).on('resize', function() {
	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function(){
	var Wwidth2 = $(window).outerWidth();
	var Height2 = $(window).outerHeight();
	if ( (Wwidth > 1199 && Wwidth2 < 1200) || (Wwidth < 1200 && Wwidth2 > 1199) ){
		document.location.reload();	
	}
	}, 500);
});


var nType = $('#header').attr('data-mode');
	$(window).on('resize', function() {
		if($(window).width() > 1199){ 
			pcMode();
		}
		else{
			mobileMode();
		}
		clearTimeout(window.resizedFinished);
			window.resizedFinished = setTimeout(function(){
			var nType2 = $('#header').attr('data-mode');
			if (nType != nType2){
				document.location.reload();	
			}
		}, 500);
	});

	var pcMode = function(){
		$('#header').removeClass('mobile-mode');
		$('#header').addClass('pc-mode');
		$('#header h3 a').on('mouseover focusin', function () {
			$('#header h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('.depth_03').stop().slideUp(300);
			$(this).parent('h3').next('.depth_03').stop().slideDown(300);
			
		});
		$('#header .depth_01 li').on('mouseover focusin', function () {
			$('#header').addClass('active');
			$('h2').removeClass('active');
			$(this).children('h2').addClass('active');
			$('.depth_02').stop().show();
			$('.bg_pc').stop().slideDown(350);
			$('#mask').show();
		});

		$('#header').on('mouseleave', function () {
			$('#header').removeClass('active');
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
		});	

		$('#header a:last').on('focusout', function () {
			$('#header').removeClass('active');
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
		});
		
	};

	var mobileMode = function(){
		$('#header').removeClass('pc-mode');
		$('#header').addClass('mobile-mode');

		$('#header h2.has_depth a').on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent('h2').removeClass('active');
				$('.depth_02, .depth_03').stop().slideUp(300);
			} else{
				$('#header h2').removeClass('active');
				$(this).parent('h2').addClass('active');
				$('.depth_02').stop().slideUp(300);
				$(this).parent('h2').next('.depth_02').stop().slideDown(300);
				
			}
		});	

		$('#header h3.has_depth a').on('click', function (e) {
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent('h3').removeClass('active');
			} else{
				$('#header h3').removeClass('active');
				$(this).parent('h3').addClass('active');
				$('.depth_03').stop().slideUp(300);
				$(this).parent('h3').next('.depth_03').stop().slideDown(300);
				
			}
		});	

		$('#header .mobile-on').on('click', function (e) {
			e.preventDefault();
			$(this).toggleClass('active');
			$('#header nav').toggleClass('active');
			$('#header').toggleClass('active');
			$('#mask').toggle();
		});	

	};
	


	$(window).on('resize load', function() {
		if($(window).width() > 1199){ 
			pcMode();
			clearInterval(mobileMode);
		}
		else if($(window).width() < 1200){
			mobileMode();
			clearInterval(pcMode);
		}	
	});	

var Wwidth = $(window).outerWidth();
var Height = $(window).outerHeight();

$(window).on('resize orientationchange', function() {
	clearTimeout(window.resizedFinished);
	window.resizedFinished = setTimeout(function(){
	var Wwidth2 = $(window).outerWidth();
	var Height2 = $(window).outerHeight();
	if ( Wwidth != Wwidth2 && Height == Height2){
		document.location.reload();	
		responsive();
	}
	}, 500);
});

/*
	$(window).on('resize', function() {
		document.location.reload();
		responsive();
	});



	$(window).on('resize', function() {
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(function(){
			document.location.reload();
			responsive();
		
		}, 50);
	});

*/
	
	let timer = null;
	let sec = 100;

	$(window).on('resize', function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			document.location.reload();
			responsive();
		}, sec);		
	});




	function responsive() {
		var ww = $(window).width();
		if(ww > 1199){ 
			pcMode();
		}
		else{
			mobileMode();
		}	
		false;
	}


$('.slider').slick({
  dots:true,
  prevArrow: '<a class="slick-prev" href="#"><i data-icon="ei-arrow-left" data-size="m"></i></a>',
  nextArrow: '<a class="slick-next" href="#"><i data-icon="ei-arrow-right" data-size="m"></i></a>',
  customPaging: function(slick,index) {
                    var targetImage = slick.$slides.eq(index).find('img').attr('src');
                    return '<img src=" ' + targetImage + ' "/>';
                }
});
/*
		var move = ['reverse', 'alternate', 'alternate-reverse', 'normal'];
		$(this).addClass(move[~~(Math.random()*move.length)]);
		
		var classes1 = ['f01', 'f06', 'f11'];
		var classes2 = ['f02', 'f07', 'f12'];
		var classes3 = ['f03', 'f08', 'f13'];
		var classes4 = ['f04', 'f09', 'f14'];
		var classes5 = ['f05', 'f10', 'f15'];

		if (position < -150) {
			$(this).addClass(classes2[~~(Math.random()*classes2.length)]);
			$(this).css('left','20%');
		}
		else if (position > -149 && position < 668) {
			$(this).addClass(classes1[~~(Math.random()*classes1.length)]);
		}
		else if (position > 667 && position < 1436) {
			$(this).addClass(classes2[~~(Math.random()*classes2.length)]);
		}
		else if (position > 1435 && position < 2204) {
			$(this).addClass(classes3[~~(Math.random()*classes3.length)]);
		}
		else if (position > 2203 && position < 2972) {
			$(this).addClass(classes4[~~(Math.random()*classes4.length)]);
		}
		else if (position > 2971 && position < 3590) {
			$(this).addClass(classes5[~~(Math.random()*classes5.length)]);
		}
		else if (position > 3589) {
			$(this).addClass(classes4[~~(Math.random()*classes4.length)]);
			$(this).css('left','70%');
		}

		*/


function addClass(obj) { 
    $(obj).addClass("selected"); 
} 
     


<a href="javascript:addClass(this);">TEST1</a>
 <a href="javascript:;" onclick="addClass(this);">TEST2</a>




function close(element){
    element.fadeOut(1000);
}

$('.pop-bx .close').on('click', function(e){
    e.preventDefault();
    close($(this));
});

$('.reset').on('click', function(e){
    e.preventDefault();
    $('.btn-bx a').removeAttr('style');
    $('.pop-bx .bx').removeAttr('style');
    $('.btn-bx a').removeClass('active f01 f02 f03 f04 f05 f06 f07 f08 f09 f10 f11 f12 f13 f14 f15');
    function RandomArr(d) {
        for(var c = d.length - 1; c > 0; c--)
        {
            var b = Math.floor(Math.random() * (c + 1));
            var a = d[c]; d[c] = d[b]; d[b] = a;
        }
        return d
    }
    var classes = ['f01', 'f02', 'f03' , 'f04', 'f05', 'f06', 'f07', 'f08', 'f09', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15'];
    var classes = RandomArr(classes);
    for (var i = 0; i< classes.length; i++) {
        $('.btn-bx a').eq(i).addClass(classes[i]);
    };
});

$('.btn-bx a').draggable({
    containment : 'parent',
    multiple: true,
    stop : function(){
        $(this).removeClass('active f01 f02 f03 f04 f05 f06 f07 f08 f09 f10 f11 f12 f13 f14 f15 reverse alternate alternate-reverse normal');
        /*
        var classes = ['f01', 'f02", "f03' , 'f04', 'f05', 'f06', 'f07', 'f08', 'f09', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15'];
        $(this).addClass(classes[~~(Math.random()*classes.length)]);
        */
        var position = $(this).position().left;
        var position2 = $(this).position().top;
        var move = ['reverse', 'alternate', 'alternate-reverse', 'normal'];
        var classes1 = ['f01', 'f06', 'f11'];
        var classes2 = ['f02', 'f07', 'f12'];
        var classes3 = ['f03', 'f08', 'f13'];
        var classes4 = ['f04', 'f09', 'f14'];
        var classes5 = ['f05', 'f10', 'f15'];
        $(this).addClass(move[~~(Math.random()*move.length)]);
        
        if (position < 668) {
            /*
            if (position2 < 700) {$(this).addClass('f01');}	
            else if (position2 > 699 && position2 < 1400) {$(this).addClass('f06');}	
            else if (position2 > 1399) {$(this).addClass('f11');}
            */
            $(this).addClass(classes1[~~(Math.random()*classes1.length)]);
        }
        else if (position > 667 && position < 1436) {
            $(this).addClass(classes2[~~(Math.random()*classes2.length)]);
        }
        else if (position > 1435 && position < 2204) {
            $(this).addClass(classes3[~~(Math.random()*classes3.length)]);
        }
        else if (position > 2203 && position < 2972) {
            $(this).addClass(classes4[~~(Math.random()*classes4.length)]);
        }
        else if (position > 2971 && position < 3840) {
            $(this).addClass(classes5[~~(Math.random()*classes5.length)]);
        }
    }
})

<script type="text/javascript">

var css_test_idx = 10;
	$('.btn-bx a').draggable({
		containment : 'parent',
		multiple: true,
		stop : function(){
            $(this).removeClass('active f01 f02 f03 f04 f05 f06 f07 f08 f09 f10 f11 f12 f13 f14 f15');
			/*
			var classes = ['f01', 'f02", "f03' , 'f04', 'f05', 'f06', 'f07', 'f08', 'f09', 'f10', 'f11', 'f12', 'f13', 'f14', 'f15'];
			$(this).addClass(classes[~~(Math.random()*classes.length)]);
			*/
			var position = $(this).position().left;
			var classes1 = ['f01', 'f06', 'f11'];
			var classes2 = ['f02', 'f07', 'f12'];
			var classes3 = ['f03', 'f08', 'f13'];
			var classes4 = ['f04', 'f09', 'f14'];
			var classes5 = ['f05', 'f10', 'f15'];
			if (position < 768) {
				$(this).addClass(classes1[~~(Math.random()*classes1.length)]);
			}
			else if (position > 767 && position < 1536) {
				$(this).addClass(classes2[~~(Math.random()*classes2.length)]);
			}
			else if (position > 1535 && position < 2304) {
				$(this).addClass(classes3[~~(Math.random()*classes3.length)]);
			}
			else if (position > 2303 && position < 3072) {
				$(this).addClass(classes4[~~(Math.random()*classes4.length)]);
			}
			else if (position > 3071 && position < 3840) {
				$(this).addClass(classes5[~~(Math.random()*classes5.length)]);
			}
        }
	})
	.css('cursor', 'move' )
    .on('mouseenter', function(){
        $(this).css('z-index', css_test_idx);
        css_test_idx++;
		$(this).addClass('active');
		var x = event.clientX - 200;
    	var y = event.clientY - 200;
		$(this).css('left',x).css('top',y);
    });
	
	
	var test_order = 1;

	$('.btn-bx a').on('click', function(e){
		e.preventDefault();
		var idx = $(this).index();
		var position = $(this).position().left;
		$('.pop-bx > div').eq(idx).fadeIn(300);
		$('.pop-bx > div').eq(idx).css('order', test_order);
		test_order++;
		if (position > 1920) {
			$('.pop-bx > div').eq(idx).addClass('right');
		}
    });

	$('.pop-bx .close').on('click', function(e){
		e.preventDefault();
		var idx2 = $(this).parent('.bx').index();
		$(this).parent('.bx').fadeOut(300, function(){
			$(this).removeClass('right');
		});
		$('.btn-bx a').eq(idx2).removeClass('active').removeAttr('style');
    });
	
	$('.pop-bx .flip').on('click', function(e){
		e.preventDefault();
		$(this).parent('.bx').find('.flip-card').addClass('active');
		$(this).hide();
		$(this).siblings('.flip2').show();
    });

	$('.pop-bx .flip2').on('click', function(e){
		e.preventDefault();
		$(this).parent('.bx').find('.flip-card').removeClass('active');
		$(this).hide();
		$(this).siblings('.flip').show();
    });

	$('.reset').on('click', function(e){
		e.preventDefault();
		$('.btn-bx a').removeAttr('style');
		$('.pop-bx .bx').removeAttr('style');
		$('.btn-bx a').removeClass('active f01 f02 f03 f04 f05 f06 f07 f08 f09 f10 f11 f12 f13 f14 f15');
		$('.btn-bx a:nth-child(1)').addClass('f01');
		$('.btn-bx a:nth-child(2)').addClass('f02');
		$('.btn-bx a:nth-child(3)').addClass('f03');
		$('.btn-bx a:nth-child(4)').addClass('f04');
		$('.btn-bx a:nth-child(5)').addClass('f05');
		$('.btn-bx a:nth-child(6)').addClass('f06');
		$('.btn-bx a:nth-child(7)').addClass('f07');
		$('.btn-bx a:nth-child(8)').addClass('f08');
		$('.btn-bx a:nth-child(9)').addClass('f09');
		$('.btn-bx a:nth-child(10)').addClass('f10');
		$('.btn-bx a:nth-child(11)').addClass('f11');
		$('.btn-bx a:nth-child(12)').addClass('f12');
		$('.btn-bx a:nth-child(13)').addClass('f13');
		$('.btn-bx a:nth-child(14)').addClass('f14');
		$('.btn-bx a:nth-child(15)').addClass('f15');
    });
	

</script>
                    
    fixed 스크롤 가능
    transform: translateX(0px) translateY(0px) translateZ(0px);

    $('.season > div a').on('click', function(e) {
        e.preventDefault();
        myPlayer.YTPPlay();
        $('.season > div a').removeClass('active');
        $(this).addClass('active');

        var a = [
            {class: "m01", seek: 0},
            {class: "m02", seek: 121},
            {class: "m03", seek: 308},
            {class: "m04", seek: 494},
            {class: "m05", seek: 790},
            {class: "m06", seek: 1062}
        ];

        for (var i = 0; i< a.length; i++) {
            if ($(this).hasClass(a[i].class)) {
                myPlayer.YTPSeekTo(a[i].seek);
            }
        }
    });


    $('#visual .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#visual .tcbx h2').addClass('active');
        var i = (currentSlide ? currentSlide : 0) + 1;
        var s = slick.slideCount;
        if( i < 10){
            var i = '0'+ i;
        }
        if(slick.slideCount < 10){
            var s = '0'+ s;
        }
        $('#visual .control .count').html('<em>' + i + '</em><span>/</span>' + s);
    });

    var $slick_carousel = $('.visual_slider');

    $slick_carousel.on('init', function(event, slick) {
		$slick_carousel.find('.slick-current').removeClass('slick-active').addClass('reset-animation');
		setTimeout( function() {
			$slick_carousel.find('.slick-current').removeClass('reset-animation').addClass('slick-active');
		}, 100);
	});

    $('.notify .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        $('.notify .slick a:not(.slick-active)').attr('tabindex','-1');
        $('.notify .slick a.slick-active').attr('tabindex','0');
     });


    $('#gnb_mobile').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {
			if( direction == "right"){	
				if(distance > 150){
					$('#header').removeClass('active2');
					$('.mask_mobile').hide();
					$('#gnb_mobile').removeClass('active');
					$('#gnb_mobile').removeAttr('style');
					$('body').removeClass('fixed');
					$('#header .mopen').removeClass('active');
				}else{
					if (phase=="move"){
						$('#gnb_mobile').css('right',-distance); 
					}
					if (phase=="end"){
						$('#gnb_mobile').removeAttr('style');
					}
				}
			}
        },
		allowPageScroll:"vertical",
        threshold:0,
		excludedElements: "label, button, input, select, textarea, .slick"
    });


    $('#gnb_mobile').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {

            if( direction == "right" &&  distance > 75){
				$('#header').removeClass('active2');
                $('.mask_mobile').hide();
				$('#gnb_mobile').removeClass('active'); 
				$('body').removeClass('fixed');
				$('#header .mopen').removeClass('active');
			}
        },
		allowPageScroll:"vertical",
        threshold:100,
		excludedElements: "label, button, input, select, textarea, .slick"
    });

    $('#gnb_mobile').swipe({
        swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData) {

            if( direction == "right" &&  distance > 75){
				$('#header').removeClass('active2');
                $('.mask_mobile').hide();
				$('#gnb_mobile').removeClass('active'); 
				$('body').removeClass('fixed');
				$('#header .mopen').removeClass('active');
			}
        },
		allowPageScroll:"vertical",
        threshold:100,
		excludedElements: "label, button, input, select, textarea, .slick"
    });


    <script id='code_1'>
				$(function() {
					$("#test3").swipe( { swipeStatus:swipe2, allowPageScroll:"horizontal"} );
					$("#test5").swipe( { swipeStatus:swipe2, allowPageScroll:"horizontal" } );

					//Swipe handlers.
					function swipe1(event,  phase, direction, distance, duration, fingerCount) {
						$(this).text( "You have swiped " + direction +' with ' + fingerCount +' fingers' );
					}

					function swipe2(event, phase, direction, distance) {
						$(this).text( phase +" you have swiped " + distance + "px in direction:" + direction );
					}
				});
			</script>

	$slick_carousel.slick({
		autoplay: true,
		autoplaySpeed: 6000,
		speed: 1000,
		fade:true,
	});


$('#notify .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    $('#notify .slick a:not(.slick-active)').attr('tabindex','-1');
    $('#notify .slick a.slick-active').attr('tabindex','0');
 });


 $('#visual .slick').slick({
    autoplay: true,
    arrows: true,
    dots: true,
    accessibility: true,
    prevArrow: $('#visual .control .prev'),
    nextArrow: $('#visual .control .next'),
    appendDots: $('#visual .control .dots'),
    draggable: true,
    customPaging: function(slick,index) {
        return '<a href="#" role="button">' + (index + 1) + '</a>';
    },
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    speed: 1000,
    autoplaySpeed: 5500
});


setInterval(function(){
    var now = new Date();
    var year= now.getFullYear();
    var mon = (now.getMonth()+1)>9 ? ''+(now.getMonth()+1) : '0'+(now.getMonth()+1);
    var day = now.getDate()>9 ? ''+now.getDate() : '0'+now.getDate();		
    var week = new Array('일', '월', '화', '수', '목', '금', '토');	
    var today = new Date().getDay();
    var todayLabel = week[today];
    var amPm = 'AM';
    var hour = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    function addZeros(num) {
        if(num < 10) { num = "0" + num; }
        return num;
    }
    if(hour >= 12){
        amPm = 'PM';
        hour = addZeros(hour - 12,2);
    }
    if(min < 10){
        min = addZeros(min,2);
    }
    var chan_val = year + '.' + mon + '.' + day + '. ' + '(' + todayLabel + ')';
    var Time = amPm + hour + min + sec;
    
    $('.date').text(chan_val);
    $('.time').text(Time);	
},1000);
    


    $('.outcenter .otab a').on('click', function (e) {
		e.preventDefault();
		var idx = $(this).index();
		var Position = $('.outbx > div').eq(idx).offset();

		var windowWidth = $(window).width();
		if (windowWidth < 481) {
			var Val = 80
		} else if (windowWidth > 480 && windowWidth < 1400) {
			var Val = 80
		} else {
			var Val = 110
		}
		$('html, body').animate({
			scrollTop : Position.top - Val
		}, 300);
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
        prevArrow: '<a role="button" class="slick-prev prev arrow" href="#">이전</a>',
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">다음</a>',
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: ,
        variableWidth: true,
        swipeToSlide: true,
        pauseOnHover: false,
        autoplaySpeed: 3800,
        speed: 1500,
    });


$(document).ready(function() {
  var slickOpts = {
    slidesToShow: 1,
    slidesToScroll: 1,
    //centerMode: true,
    easing: 'swing', // see http://api.jquery.com/animate/
    speed: 700,
    dots: true,
    customPaging: function(slick,index) {
        return '<a>' + (index + 1) + '</a>';
    }
  };
  // Init slick carousel
  $('#carousel').slick(slickOpts);
});


	$('#gnb_pc .depth_01 h2 a').on('mouseenter focusin', function () {
		var gheight = $(this).parent('h2').next('.depth_box').outerHeight();
	    $('#gnb_pc .depth_01 h2').removeClass('active');
		$('#gnb_pc .depth_box').hide();
	    $(this).parent('h2').addClass('active');
		$(this).parent('h2').next('.depth_box').fadeIn(200);
		$('.bg_pc').show().stop().animate({height:gheight});
		$('.bg_mask').fadeIn(300);
	});




@font-face { font-family: 'GmarketSansMedium'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff'); font-weight: normal; font-style: normal;}
@font-face { font-family: 'GmarketSansBold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff'); font-weight: normal; font-style: normal; }

@font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 400;
    src: local('Spoqa Han Sans Regular'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.ttf') format('truetype');
}


@font-face {
    font-family: 'Spoqa Han Sans';
    font-weight: 700;
    src: local('Spoqa Han Sans Bold'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansBold.woff2') format('woff2'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansBold.woff') format('woff'),
    url('https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansBold.ttf') format('truetype');
}

 $('.copy_box .copy').on('click', function (e){ 
        e.preventDefault();
        $('.url').select();
        document.execCommand('copy');   
        alert('주소가 복사 되었습니다.'); 
    });


	$('.side_panel').swipe({
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if( direction == "left" ){
					$('.side_panel').addClass('sideout');
					$('.btn_slide').addClass('active');
					$('.btn_slide span').text('열기');
				}
			},
			allowPageScroll:"vertical",
			excludedElements: "label, button, input, select, textarea, .slick",
			threshold:50
		});

$addUp = $('.pop_list_area .pop_list_wrap .count'),
	$addUpCnt = $('.pop_list_area .pop_list_wrap .count .cnt'),
	$addUpAll = $('.pop_list_area .pop_list_wrap .count .all');

	$popList.on('init.main reInit.main afterChange.main', function(event, slick, currentSlide, nextSlide) {a
		var i = (currentSlide ? currentSlide : 0) + 1;

		$addUpCnt.text(i);
		$addUpAll.text(slick.slideCount);
	});


var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
    if (scrollBottom >= $("#footer").height()) {
		$(".btn-page-top").css("bottom",0);
	} 
	else{
		$(".btn-page-top").css("bottom",$("#footer").height()-($("#footer .btn-page-top").height()/2));
	}


$('#gnb > li').on('mouseover', function() {
    if ($('#modal-search').is(':hidden')) {
        $('#gnb > li').removeClass('active');
        $(this).addClass('active');
        $('.gnb-bg').outerHeight($('#gnb .active .gnb-sub').outerHeight()).show();
    }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

$(function() {

    $('.btn-list').attr('title', '목록보기선택됨');

    $('.btn-list').on('click', function () {
		$(this).attr('title', '목록보기선택됨');
        $('.btn-calendar').removeAttr('title');
	});

    $('.btn-calendar').on('click', function () {
		$(this).attr('title', '달력보기선택됨');
        $('.btn-list').removeAttr('title');
	});

});
    
	$('#lnb h3.active + .depth_02').show();



	$('#lnb h3 a').on('click', function () {
		if($(this).parent().parent().find('.depth_02').length){
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
				$(this).children('span').text('열기');
				$(this).parent().siblings('.depth_02').slideUp(400);
			} else{
				$('#lnb h3').removeClass('active');
				$('#lnb h3 a').children('span').text('열기');
				$('#lnb .depth_02').slideUp(400);
				$(this).parent().addClass('active');
				$(this).parent().siblings('.depth_02').slideDown(400);
				$(this).children('span').text('닫기');
			}
			return false;
		}
	});

       $('#calendar .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        appendDots: false,
        vertical: true,
        accessibility: false,
        infinite: true,
        verticalSwiping: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $('#calendar .prev'),
        nextArrow: $('#calendar .next'),
        pauseOnHover: false,
        speed: 1000
    });

$(document).ready(function(){
    //최상단 체크박스 클릭
    $("#checkall").click(function(){
        //클릭되었으면
        if($("#checkall").prop("checked")){
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 true로 정의
            $("input[name=chk]").prop("checked",true);
            //클릭이 안되있으면
        }else{
            //input태그의 name이 chk인 태그들을 찾아서 checked옵션을 false로 정의
            $("input[name=chk]").prop("checked",false);
        }
    })
})


출처: https://hellogk.tistory.com/5 [IT Code Storage]

$(window).on('load', function () {
    var bgHeight2 = $('#gnb h2.active').siblings('.gnb-wrap').outerHeight();
     $('#header .bg').css('height', bgHeight2).show();
    var idx2 = $('#gnb > h2.active').index('#gnb > h2');
    $('#header-view img').eq(idx2).show();
});  

 var gnbsubIdx = $('.active2').index('a');
    alert(gnbsubIdx - 1);

    $('#service .slick').on('afterChange', function(event, slick, currentSlide, nextSlide) {   
        if ($('#service .next').hasClass('slick-disabled')) {
            $('#service .prev').addClass('active'); 
        }
     });

     $('#service .prev').on('click', function (e) {
        e.preventDefault();
        $('#service .slick').slick('slickGoTo', 0);
        $(this).removeClass('active');
    });

    $('#service .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        nextArrow: '<a role="button" class="slick-next next arrow" href="#">→</a>',
        accessibility: false,
        draggable: true,
        infinite: false,
        variableWidth: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        pauseOnHover: false,
        speed: 1000,
		responsive: [{
            breakpoint: 761,
            settings: {
                speed: 700,
                slidesToShow: 1
            }
        },
        {  
            breakpoint: 992,
            settings: {
                speed: 800,
                slidesToShow: 2
            }
        },
         {  
            breakpoint: 1200,
            settings: {
                speed: 900,
                slidesToShow: 3
            }
        }]
    });

$('#gnb h2').on('mouseover', function (e) {
    var bgHeight = $(this).next('.gnb-wrap').outerHeight();
    $('#header .bg').css('height', bgHeight).show();
    $('#gnb h2').removeClass('active');
    $(this).addClass('active');
});
$('#gnb h3').on('mouseover', function () {
    $('#gnb h3').removeClass('active');
    $(this).addClass('active');
});
$('#header > .wrap').on('mouseover', function () {
    $('#gnb h2, #gnb h3').removeClass('active');
    $('#header .bg').hide();
});
$('.page-header, main, #footer, .notify').on('mouseover', function () {
    $('#gnb h2, #gnb h3').removeClass('active');
    $('#header .bg').hide();
});


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
$('#header #gnb h2 a').on('mouseover', function () {
    if (device === 'pc') {
        $('#gnb h2').removeClass('active');
        $(this).parent().addClass('active');
    }
});
$('#header #gnb > div:last-child h2 a').on('focusout', function () {

});
$('.page-header, #content').on('mouseover', function () {
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
    e.preventDefault();.i
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
    slidesToScroll: 1,re
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

$('#exhibit .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('#exhibit .slide').removeClass('active');
    if ((currentSlide > nextSlide && (nextSlide !== 0 || currentSlide === 1)) || (currentSlide === 0 && nextSlide === slick.slideCount - 1)) {
        $('#exhibit .slick-current').prev('.slide').addClass('active');
    }
    else {
        $('#exhibit .slick-current').next('.slide').addClass('active');
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


$(window).scroll(function(){
		var top = $(window).scrollTop();
		if ( top > 100 ){
			$(".btn_all_top").fadeIn();
		} else if(top < 100) {
			$(".btn_all_top").fadeOut();
		};
	});


$( window ).on('scroll', function() {
    var navOffset = $( '.gnb_wrap' ).offset() - 50;
    if ( $( document ).scrollTop() > navOffset.top ) {
        $( '.gnb_wrap' ).addClass( 'active' );
    }
    else {
        $( '.gnb_wrap' ).removeClass( 'active' );
    }
});

$(window).on('scroll', function (e) {
    e.preventDefault();
    var position = $(window).scrollTop();
    $("#control .prev, #control .next").stop().animate({"top":position+currentPosition+"px"},1000);
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


$('.heal_slick').slick({
    autoplay: false,
    arrows: true,
    prevArrow: ('.control_box .prev'),
    nextArrow: ('.control_box .next'),
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






AOS.init({
    easing: 'ease-in-out',
    duration: 800,
    delay: 300
});


var options = {
    autoplay: false,
    arrows: false,
    dots: false,
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
        breakpoint: 321,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 426,
        settings: {
            slidesToShow: 1,
            centerMode: true,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 769,
        settings: {
            slidesToShow: 2,
            centerMode: true,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 1025,
        settings: {
            slidesToShow: 3,
            centerMode: true,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 9999,
        settings: 'unslick'
    }]
};
var options2 = {
    autoplay: false,
    arrows: false,
    dots: false,
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    customPaging: function(slick,index) {
        return '<a>' + (index + 1) + '</a>';
    },
    responsive: [{
        breakpoint: 321,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 426,
        settings: {
            slidesToShow: 1,
            centerMode: true,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 769,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 1025,
        settings: {
            slidesToShow: 3,
            centerMode: true,
            slidesToScroll: 1
        }
    }, {
        breakpoint: 9999,
        settings: 'unslick'
    }]
};
//사이트 맵
$('.sitemap_btn').on("click", function () {
    $('#shortcut').css('z-index', '999');
    $('.sitemap_wrap').show();
    $('body').css('position', 'fixed');
});

$('.sitemap_close').on("click", function () {
    $('#shortcut').css('z-index', '1001');
    $('.sitemap_wrap').hide();
    $('.sitemap_btn').focus();
    $('body').css('position', 'relative');
});
$('.search_close').on('click', function(){
    $('.total_search').hide();
});

/*

$('#tab-menu li a').on('click', function(e){
    e.preventDefault();
    var idx = $(this).parent().index();
    $('#tab-menu li').removeClass('active');
    $(this).parent().addClass('active');
    $('.slick').slick('unslick');
    if($('#tab-menu li').eq(0).hasClass('active') === true) {
        $('#notify, #webzine, #news, #pic-news, .links-wrap').hide();
        $('#shortcut').show();
    } else if($('#tab-menu li').eq(1).hasClass('active') === true) {
        $('#shortcut, #news, #pic-news, .links-wrap').hide();
        $('#notify, #webzine').show();
        var option = {
            autoplay: true,
            arrows: true,
            dots: true,
            prevArrow: $('#notify .prev'),
            nextArrow: $('#notify .next'),
            appendDots: $('#notify .dots'),
            accessibility: false,
            draggable: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            zIndex: 1000,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            speed: 1500,
            responsive: [{
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        var option2 = {
            autoplay: true,
            arrows: true,
            dots: false,
            prevArrow: $('.notify .prev'),
            nextArrow: $('.notify .next'),
            accessibility: false,
            draggable: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            zIndex: 1000,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            speed: 1500
        };
        initSlick($('#notify .slick'), option);
        initSlick($('.notify .slick'), option2);
    } else if($('#tab-menu li').eq(2).hasClass('active') === true) {
        $('#shortcut, #notify, #webzine, .links-wrap').hide();
        $('#news, #pic-news').show();
        $('#news .slick').slick(options);
        $('#pic-news .slick').slick(options2);
    } else if($('#tab-menu li').eq(3).hasClass('active') === true) {
        $('#shortcut, #notify, #webzine, #news, #pic-news').hide();
        $('.links-wrap').show();
    }
});
*/


$('#tab-menu li a').on('click', function(e){
    e.preventDefault();
    var idx = $(this).parent().index();
    $('#tab-menu li').removeClass('active');
    $(this).parent().addClass('active');
    $('.slick').slick('unslick');
    if(idx == '0') {
        $('#notify, #webzine, #news, #pic-news, .links-wrap').hide();
        $('#shortcut').show();
    } else if(idx == '1') {
        $('#shortcut, #news, #pic-news, .links-wrap').hide();
        $('#notify, #webzine').show();
        var option = {
            autoplay: true,
            arrows: true,
            dots: true,
            prevArrow: $('#notify .prev'),
            nextArrow: $('#notify .next'),
            appendDots: $('#notify .dots'),
            accessibility: false,
            draggable: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            zIndex: 1000,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            speed: 1500,
            responsive: [{
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };
        var option2 = {
            autoplay: true,
            arrows: true,
            dots: false,
            prevArrow: $('.notify .prev'),
            nextArrow: $('.notify .next'),
            accessibility: false,
            draggable: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            zIndex: 1000,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            speed: 1500
        };
        initSlick($('#notify .slick'), option);
        initSlick($('.notify .slick'), option2);
    } else if(idx == '2') {
        $('#shortcut, #notify, #webzine, .links-wrap').hide();
        $('#news, #pic-news').show();
        $('#news .slick').slick(options);
        $('#pic-news .slick').slick(options2);
    } else if(idx == '3') {
        $('#shortcut, #notify, #webzine, #news, #pic-news').hide();
        $('.links-wrap').show();
    }
});

$('#mobile_menus .gnb_open').on('click', function () {
		$('#mask_mobile').show();
		$('.mobile_inner').show(0.1, function(){
            $('.mobile_inner').animate({right:0},200);   
        });
		$('body').css('position', 'fixed');
	});


$('#webzine').on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function (e) {
    $('#webzine .tablet').addClass('animated slideInUp');
});
$('#shortcut h2 + button').on('click', function (e) {
    e.preventDefault();
    var target = $('#shortcut .wrap');
    if (target.hasClass('active')) {
        target.removeClass('active').addClass('deactive');
    } else {
        target.addClass('active');
    }
});
$('#shortcut h2 + button').hover(function () {
    if (!$(this).children('img').hasClass('flip-x')) {
        $('#shortcut .character img').addClass('wobble');
    }
}, function () {
    $('#shortcut .character img').removeClass('wobble');
});
$('#shortcut .wrap').on('animationend', function () {
    if ($(this).hasClass('active')) {
        $('#shortcut h2 + button').children('img').addClass('flip-x');
        $('#shortcut h2 + button').children('span').text('닫기');
    } else if ($(this).hasClass('deactive')) {
        $('#shortcut h2 + button').children('img').removeClass('flip-x');
        $('#shortcut h2 + button').children('span').text('열기');
    }
});
$('#shortcut input[type=search]').on('focusin', function () {
    $('#shortcut .character img').addClass('wobble');
});
$('#shortcut input[type=search]').on('focusout', function () {
    $('#shortcut .character img').removeClass('wobble');
});
$('#shortcut .links li a').on('mouseover', function () {
    $(this).parent().addClass('active');
});
$('#shortcut .links li a').on('mouseleave', function () {
    $(this).parent().removeClass('active');
});
$('#notify .slick').slick({
    autoplay: true,
    arrows: true,
    dots: true,
    prevArrow: $('#notify .prev'),
    nextArrow: $('#notify .next'),
    appendDots: $('#notify .dots'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500,
    responsive: [{
        breakpoint: 769,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
$('#notify .control button').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('pause')) {
        $(this).hide();
        $('#notify .play').show();
        $('#notify .slick').slick('slickPause');
    } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('#notify .pause').show();
        $('#notify .slick').slick('slickPlay');
    }
});
$('.notify .slick').slick({
    autoplay: true,
    arrows: true,
    dots: false,
    prevArrow: $('.notify .prev'),
    nextArrow: $('.notify .next'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});
$('.notify .control button').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('pause')) {
        $(this).hide();
        $('.notify .play').show();
        $('.notify .slick').slick('slickPause');
    } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('.notify .pause').show();
        $('.notify .slick').slick('slickPlay');
    }
});
$('.notify .control p').html('<em>1</em> / ' + parseInt($('.notify .slick a').size() / 2));
$('.notify .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.notify .control p').html('<em>' + i + '</em> / ' + slick.slideCount);
});


$('#news .slick').slick(options);
$('#news .tab h3 a').on('click', function (e) {
    e.preventDefault();
    $('#news .slick').slick('unslick');
    $('#news .tab h3').removeClass('active');
    $(this).parent().addClass('active');
    initSlick($(this).parent().next(), options);
});

$('#pic-news .slick').slick(options2);
$('#pic-news .tab h3 a').on('click', function (e) {
    e.preventDefault();
    $('#pic-news .slick').slick('unslick');
    $('#pic-news .tab h3').removeClass('active');
    $(this).parent().addClass('active');
    initSlick($(this).parent().next(), options2);
});
$('#links .tab h3 a').on('click', function (e) {
    e.preventDefault();
    $('#links .tab h3').removeClass('active');
    $(this).parent().addClass('active');
});
$('#links .links a').on('mouseover', function(){
    $(this).children('img').addClass('animated flipInY');
});
$('#links .links a').on('mouseleave', function(){
    $(this).children('img').removeClass('animated flipInY');
});
$('#links .links a').on('focusin', function(){
    $(this).mouseover();
});
$('#links .links a').on('focusout', function(){
    $(this).mouseleave();
});


var delta = 2000;
var timer = null;

$( window ).on( 'resize', function( ) {
    clearTimeout( timer );
    timer = setTimeout( resizeDone, delta );
});

function resizeDone( ) {
    if($(window).width() > 1199) { 
       $('#notify .slick').slick({
            autoplay: true,
            arrows: true,
            dots: true,
            prevArrow: $('#notify .prev'),
            nextArrow: $('#notify .next'),
            appendDots: $('#notify .dots'),
            accessibility: false,
            draggable: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            zIndex: 1000,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            speed: 1500,
            responsive: [{
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $('#notify .control button').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('pause')) {
                $(this).hide();
                $('#notify .play').show();
                $('#notify .slick').slick('slickPause');
            } else if ($(this).hasClass('play')) {
                $(this).hide();
                $('#notify .pause').show();
                $('#notify .slick').slick('slickPlay');
            }
        });
        $('.notify .slick').slick({
            autoplay: true,
            arrows: true,
            dots: false,
            prevArrow: $('.notify .prev'),
            nextArrow: $('.notify .next'),
            accessibility: false,
            draggable: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            zIndex: 1000,
            pauseOnHover: false,
            autoplaySpeed: 4000,
            speed: 1500
        });
        $('.notify .control button').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('pause')) {
                $(this).hide();
                $('.notify .play').show();
                $('.notify .slick').slick('slickPause');
            } else if ($(this).hasClass('play')) {
                $(this).hide();
                $('.notify .pause').show();
                $('.notify .slick').slick('slickPlay');
            }
        });  
    }
}


var device = 'pc';
var focusTarget = null;

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
    if (windowWidth < 480) {
        device = 'mobile';
    } else if (windowWidth > 480 && windowWidth < 1024) {
        device = 'tablet';
    } else {
        device = 'pc';
    }
    $('#news .slick').slick('resize');
    $('#pic-news .slick').slick('resize');
    $('.preload').removeClass('preload');
    $('.relation-wrap ul').css('top', -($('.relation-wrap ul').height()));
});

jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});

function onImg(imgtarget) {
    var imgsrc = imgtarget.children("img").attr("src");
    var onpattern = /(_on.gif|_on.jpg|_on.png)$/ig;
    var offpattern = /(.gif|.jpg|.png)$/ig;
    var onoffchk;
    var newsrc;

    if (offpattern.test(imgsrc) && imgsrc.indexOf("_on") == -1) {
        onoffchk = RegExp.$1;
        newsrc = imgsrc.replace(onoffchk, "_on" + onoffchk);
        imgtarget.children("img").attr("src", newsrc);
    }
}

function offImg(imgtarget) {
    var imgsrc = imgtarget.children("img").attr("src");
    var onpattern = /(_on.gif|_on.jpg|_on.png)$/ig;
    var offpattern = /(.gif|.jpg|.png)$/ig;
    var onoffchk;
    var newsrc;

    if (onpattern.test(imgsrc) && imgsrc.indexOf("_on") > 0) {
        onoffchk = RegExp.$1;
        newsrc = imgsrc.replace(onoffchk, onoffchk.slice(-4));
        imgtarget.children("img").attr("src", newsrc);
    }
}


$(document).on('click', '#board h3 a', function(e){
    e.preventDefault();
    $(this).parents('.box').find('h3').removeClass('active');
    $(this).parent().addClass('active');
});

function modal(trigger) {
    var modalTarget = trigger.attr('data-id');
    var btnClose = $(modalTarget).find('.btn-close');
    var btnCancle = $(modalTarget).find('.btn-cancel');
    $('body').append('<div class="modal-overlay"></div>');
    $(modalTarget).addClass('modal-show').attr('tabindex', '0');
    setTimeout(function () {
        $(modalTarget).focus();
    }, 100);
    btnClose.attr('tabindex', '0');
    btnClose.on('click', function (e) {
        e.preventDefault();
        $(modalTarget).removeClass('modal-show').removeAttr('tabindex');
        btnClose.attr('tabindex', '-1');
        $('.modal-overlay').remove();
        if (trigger) {
            trigger.focus();
        }
    });
    btnCancle.on('click', function (e) {
        e.preventDefault();
        btnClose.click();
    });
    btnClose.on('focusout', function (e) {
        $(modalTarget).focus();
    });

    $('.modal-overlay').on('click', function (e) {
        btnClose.click();
    });
}


function initSlick(target, options) {
    target.slick(options);
}


$('#gnb > h2').click(function(){
	 var idx = $('#gnb > h2').index($(this));
	 $('#slick').slick('slickGoTo', idx);
})

initSlick($('#gnb-mobile h2:first-child + .gnb-sub'));
$('#gnb-mobile h2').on('click', function (e) {
    var idx = $(this).index();
    e.preventDefault();
    $('#gnb-mobile h2').removeClass('on');
    $('#slick').slick('slickGoTo', idx);
});
$('#slick').on('afterChange', function (e, slick, currentSlide, nextSlide) {
    if (e.target.id === 'slick') {
        $('#gnb h2, #gnb-mobile h2').removeClass('on');
        $('#gnb h2, #gnb-mobile h2').eq(currentSlide).addClass('on');
    }
});


if (currentSlide == '1') {
    $('').eq(1).addClass('on');
}else if (currentSlide == '2') {
    $('').eq(1).addClass('on');   
}


$('#notify .slick').slick({
    autoplay: true,
    arrows: true,
    dots: false,
    prevArrow: ('#notify .prev'),
    nextArrow: ('#notify .next'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});

$('#notify .control p').html('<em>1</em> / ' + parseInt($('#notify .slick a').size() / 2));
$('#notify .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('#notify .control p').html('<em>' + i + '</em> / ' + slick.slideCount);
});

$('#notify .control button').not('.prev, .next').on('click', function (e) {
    e.preventDefault();
    var targetClass = $(this).attr('class');
    console.log(targetClass);
    if (targetClass === 'pause') {
        $(this).hide();
        $('#notify .play').show();
        $('#notify .slick').slick('pause');
    } else if (targetClass === 'play') {
        $(this).hide();
        $('#notify .pause').show();
        $('#notify .slick').slick('play');
    }
});


$('#visual .slick').slick({
    autoplay: true,
    arrows: true,
    dots: true,
    prevArrow: ('#visual .prev'),
    nextArrow: ('#visual .next'),
    appendDots: ('#visual .dots'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});
$('#visual .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $('#visual h2').fadeOut();
});
$('#visual .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
    $('#visual h2').fadeIn();
});
// $('#course .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
//     $('#course header').fadeOut();
// });
// $('#course .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
//     $('#course header').fadeIn();
// });



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



	//기간선택
	$('#all').bind('click', function() {
		$('#all').addClass("opt_period_on");
		$('#selDate').val('all');
		$("#start_day").val('');
		$("#end_day").val('');
		//doSearch(1);	
	});
	$('#week').bind('click', function() {
		$('#week').addClass("opt_period_on");
		$('#selDate').val('week');
		var today = Date.today();
		var beforeDays = Date.today().addDays(-7);
		$("#start_day").val(beforeDays.toString('yyyy.MM.dd'));
		$("#end_day").val(today.toString('yyyy.MM.dd'));
		//doSearch(1);	
	});
	$('#month').bind('click', function() {
		$('#month').addClass("opt_period_on");
		$('#selDate').val('month');
		var today = Date.today();
		var beforeMonth = Date.today().addMonths(-1).addDays(1);
		$("#start_day").val(beforeMonth.toString('yyyy.MM.dd'));
		$("#end_day").val(today.toString('yyyy.MM.dd'));
		//doSearch(1);	
	});
	$('#year').bind('click', function() {
		$('#year').addClass("opt_period_on");
		$('#selDate').val('year');
		var today = Date.today();
		var beforeYear = Date.today().addYears(-1).addDays(1);
		$("#start_day").val(beforeYear.toString('yyyy.MM.dd'));
		$("#end_day").val(today.toString('yyyy.MM.dd'));
		//doSearch(1);	
	});
	
	//달력 클릭시 기간선택 해제
	$('#start_day').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	$('#start_btn').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	$('#end_day').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	$('#end_btn').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	
	//날짜 달력
	$('#start_btn').bind('click', function() {
		$('#start_day').datepicker('show')
	});
	$('#end_btn').bind('click', function() {
		$('#end_day').datepicker('show')
	});
	
	$('#start_day').datepicker(
			{
			    showOn : "both",
			    //buttonImage : '/site/pub/images/board/btncalendar-icon.gif',
			    //buttonImageOnly : true,
			    option : $.datepicker.regional['ko'],
			    buttonText : '',
			    dateFormat : 'yy.mm.dd',
			    beforeShow :  function(){
			    	setTimeout(function(){
			    		$('.ui-datepicker').css('z-index', 99999999);
			    	}, 0);
			    },
			    showOtherMonths : true,
			    changeMonth : false,
			    changeYear : false,
			    maxDate : Date.today().toString('yyyy.MM.dd'),
			    onSelect : function(dateText, inst)
			    {
				    var start_day = $('#start_day').val();
				    var end_day = $('#end_day').val();

				    if (end_day != '' && start_day > end_day)
				    {
					    alert('시작일은 종료일보다 늦을 수 없습니다.');
					    $('#fromDate').val('');
						$('#start_day').val('');
				    } else {
				    	$('#fromDate').val(start_day);
				    }
			    }
			});
	$('#end_day').datepicker(
			{
			   showOn : "both",
			   //buttonImage : '/site/pub/images/board/btncalendar-icon.gif',
			   //buttonImageOnly : true,
			   option : $.datepicker.regional['ko'],
			   buttonText : '',
			   dateFormat : 'yy.mm.dd',
			   showOtherMonths : true,
			   beforeShow :  function(){
			    	setTimeout(function(){
			    		$('.ui-datepicker').css('z-index', 99999999);
			    	}, 0);
			    },
			    changeMonth : false,
			    changeYear : false,
			    gotoCurrent : true,
			    maxDate : Date.today().toString('yyyy.MM.dd'),
			    onSelect : function(dateText, inst)
			    {
				    var start_day = $('#start_day').val();
				    var end_day = $('#end_day').val();

				    if (start_day != '' && start_day > end_day)
				    {
					    alert('종료일은 시작일보다 빠를 수 없습니다.');
					    $('#toDate').val('');
						$('#end_day').val('');
				    } else {
				    	$('#toDate').val(end_day);
				    }
			    }
			});


function initSlick(target, options) {
    target.slick(options);
}

// gnb메뉴 클릭시 해당 슬라이드로 이동한다
$('#gnb > h2').click(function(){
	 var idx = $('#gnb > h2').index($(this));
	 $('#slick').slick('slickGoTo', idx);
})

initSlick($('#gnb-mobile h2:first-child + .gnb-sub'));
$('#gnb-mobile h2').on('click', function (e) {
    var idx = $(this).index();
    e.preventDefault();
    $('#gnb-mobile h2').removeClass('on');
    $('#slick').slick('slickGoTo', idx);
});
$('#slick').on('afterChange', function (e, slick, currentSlide, nextSlide) {
    if (e.target.id === 'slick') {
        $('#gnb h2, #gnb-mobile h2').removeClass('on');
        $('#gnb h2, #gnb-mobile h2').eq(currentSlide).addClass('on');
    }
});

$('#slick').on('afterChange', function (e, slick, currentSlide, nextSlide) {
    if (e.target.id === 'slick') {
        if (currentSlide == 0) {
            $('#control .prev').html('<img src="./images/ico_arrow5.png" alt="이전 페이지 보기"> <span>111111111</span>');
            $('#control .next').html('<img class="flip-x" src="./images/ico_arrow5.png" alt="다음 페이지 보기"> <span>111111111</span>');       
        }
        if (currentSlide == 1) {
            $('#control .prev').html('<img src="./images/ico_arrow5.png" alt="이전 페이지 보기"> <span>2222222</span>');
            $('#control .next').html('<img class="flip-x" src="./images/ico_arrow5.png" alt="다음 페이지 보기"> <span>222222222</span>');           
        }
        if (currentSlide == 2) {
            $('#control .prev').html('<img src="./images/ico_arrow5.png" alt="이전 페이지 보기"> <span>3333333</span>');
            $('#control .next').html('<img class="flip-x" src="./images/ico_arrow5.png" alt="다음 페이지 보기"> <span>3333333333</span>');           
        }
    }
});

<script>$('#slick').slick('slickGoTo', 0, true);</script>

$(function() {


});

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
    if (windowWidth > 1199) {
        $('.cities .list01').swipe({
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
                if( direction == "left" ){
                    $(this).scrollLeft(distance*8 + $(this).scrollLeft());
                }
                else if( direction == "right" ){
                    $(this).scrollLeft(-distance*8 + $(this).scrollLeft());
                }
            },
            triggerOnTouchEnd: false,
            allowPageScroll:"vertical",
            threshold: 50,
            excludedElements: "label, button, input, select, textarea, .slick, a",
        });
    }
});


$(window).on('load resize', function () {
    var windowWidth = $(this).width();
    if (windowWidth < 480) {
        device = 'mobile';
    } else if (windowWidth > 480 && windowWidth < 1024) {
        device = 'tablet';
    } else {
        device = 'pc';
    }
    $('.preload').removeClass('preload');
    $('.relation-wrap ul').css('top', -($('.relation-wrap ul').height()));
});


 if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        } else {
            $('.page-header h2').not($(this).parent()).removeClass('active');
            $(this).parent().addClass('active');
        }


$('.notify .slick').slick({
    autoplay: true,
    arrows: true,
    dots: true,
    appendDots: $('#notify .dots'),
    prevArrow: $('.notify .prev'),
    nextArrow: $('.notify .next'),
    accessibility: false,
    draggable: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    zIndex: 1000,
    pauseOnHover: false,
    autoplaySpeed: 4000,
    speed: 1500
});
$('.notify .control button').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('pause')) {
        $(this).hide();
        $('.notify .play').show();
        $('.notify .slick').slick('slickPause');
    } else if ($(this).hasClass('play')) {
        $(this).hide();
        $('.notify .pause').show();
        $('.notify .slick').slick('slickPlay');
    }
});
$('.notify .control p').html('<em>1</em> / ' + parseInt($('.notify .slick a').size()));
$('.notify .slick').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.notify .control p').html('<em>' + i + '</em> / ' + slick.slideCount);
});



$(window).on('load resize', function () {
	var navOffset = $('#header').offset();
	$(window).scroll(function () {
	    if ($(document).scrollTop() > navOffset.top) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});
});

$(window).on('load resize', function () {
    setTimeout(function() { 
        var navOffset = $('#header').offset();
        $(window).scroll(function () {
            if ($(document).scrollTop() > navOffset.top) {
                $('#header').addClass('fixed');
            } else {
                $('#header').removeClass('fixed');
            }
        });
    }, 1000);
});


    $('.menu').swipe( {
        swipeUp:function(event, direction, distance, duration, fingerCount, fingerData) {
            $(this).animate({left:-300},400);
            $('.open_close').removeClass('active');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:30      
    });





    $('.menu').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "left" ){
                $(this).animate({left:-300},400);
                $('.open_close').removeClass('active');
            }else if( direction == "right" ){
                $(this).fadeOut(1000);
            }
            else if( direction == "down" ){
                $(this).slideUp();
            }
        },
        threshold:30
    });



 <div class="slick-wrap">

    <div class="control clf">
        <button class="prev"><img src="./imgs/ico_arrow15.png" alt="이전보기"></button>
            <div class="center-box">
                <p></p>
                <button class="pause"><img src="./imgs/ico_pause2.png" alt="일시정지"></button>
                <button class="play"><img src="./imgs/ico_play.png" alt="자동 재생"></button>
            </div>	
        <button class="next"><img class="flip-x" src="./imgs/ico_arrow15.png" alt="다음 보기"></button>
        <div class="dots"></div>
    </div>


<div class="slick-box">
    <figure class="slick">
        <%-- 해상도별 이미지가 다릅니다. --%>
        <a href="#"><img ft-320-src="./imgs/img_notify4_m.jpg" ft-768-src="./imgs/img_notify4_t.jpg" ft-1290-src="./imgs/img_notify4.jpg" alt="2019 속초 빛축제 청초환희 빛의 놀이터"></a>
        <a href="#"><img ft-320-src="./imgs/img_notify4_m.jpg" ft-768-src="./imgs/img_notify4_t.jpg" ft-1290-src="./imgs/img_notify4.jpg" alt="2019 속초 빛축제 청초환희 빛의 놀이터"></a> 
    </figure>
</div>

</div>




$(window).on('load resize', function () {
	var navOffset = $('#header').offset();
	$(window).scroll(function () {
	    if ($(document).scrollTop() > navOffset.top) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});
});


var currentPosition = parseInt($("#control .prev").css("top"));
$(window).on('scroll', function (e) {
    var posY = $(window).scrollTop();
    var gnbHeight = $('#header').outerHeight();
    if (windowWidth > 768) {
        if (posY > gnbHeight) {
            $('#header').addClass('fixed z-depth-2');
        } else if (posY < gnbHeight) {
            $('#header').removeClass('fixed z-depth-2');
        }
    }
    $("#control .prev, #control .next").stop().animate({"top":posY+currentPosition+"px"},1000);
});

$(window).on('scroll', function() {
				var navOffset = $('.menu').offset();
				var headHeight = $('#header').height();
				if ( $(document).scrollTop() > navOffset.top) {
					$('.menu').addClass('fixed');
				}
				else {
					$('.menu').removeClass('fixed');
				}
			});	

				var lastScrollTop = 0,
					delta = 15;
			
				$(window).scroll(function (event) {
					
					var st = $(this).scrollTop();
					if (Math.abs(lastScrollTop - st) <= delta) return;
					if ((st > lastScrollTop) && (lastScrollTop > 0)) {
						$("#header").addClass('hidden');
					} else {
						$("#header").removeClass('hidden');
					}
					lastScrollTop = st;
				});




$('.toptotalsearch_off').click(function(){      
		$('.tour_gnb_btn_open').toggleClass('on');
		return false;
	});

	$(".text_toptotalsearch").bind("change paste keyup", function() {
		$('.toptotalsearch_off').fadeOut(0);
		return false;
	});
    

    $("#header .sitemap").on('keydown', function(key) {
		if ($('#header').hasClass('active') === false) {
			if (key.keyCode == 13) {
				$('.gnb_pc .depth_01 h2:first a').focus();
			}
		}	
	});


    /*
	$('.test button').on('click', function () {
		var select = $(this).attr('class');
		var no = select.replace(/[^0-9]/g,'');
		var showbox = ".number" + no
		$(this).parents('.box').fadeOut(300);
		$(showbox).fadeIn(300);
	});
	*/

	$('.test button').on('click', function () {
		var select = $(this).attr('data-move');
		var showbox = '.' + select
		$(this).parents('.question').fadeOut(300);
		$(showbox).fadeIn(300);
	});]



     $('#visual .slick_wrap .slick').on('beforeChange', function(slick, currentSlide, nextSlide) {
        $('#visual .page, #visual .weather').fadeOut();
        $('#visual .typing li').text('');
    });

     $('#visual .slick_wrap .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        $('#visual .page, #visual .weather').fadeIn();
        setTimeout(function(){
            tyInt = clearInterval(typing2);
        },0);
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
            
            //다음문장 타이핑전 1초 쉰다
                clearInterval(tyInt);
                //타이핑종료
            
                setTimeout(function(){
                //1초후에 다시 타이핑 반복 시작
                tyInt = setInterval(typing2,60);
                },1000);
                } else if(liIndex==liLength-1){
                
                //마지막 문장까지 써지면 반복종료
                clearInterval(tyInt);
                }
            } 
        }
     });


     $('.gallery_box .box01 .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.gallery_box .count').html('<em>' + i + '</em><span>/</span><em class="sum">' + slick.slideCount + '</em>');
    });

	$('.gallery_box .box01 .slick').slick({
        autoplay: false,
        arrows: true,
        dots: false,
        prevArrow: $('.gallery_box .prev'),
        nextArrow: $('.gallery_box .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
		asNavFor: '.gallery_box .box02 .slick',
        speed: 1500
    });


    $('#gnb_mobile .side').swipe({
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if( direction == "right" ){
                $('#mask_mobile').hide();
				$('#gnb_mobile .side').animate({right:-414},400, function(){
					$('#gnb_mobile .side').hide();
				});
				$('body').css('position', 'relative');
			}
        },
        threshold:100,
		allowPageScroll:"vertical"
    });



    $(document).bind('ajaxComplete', function(){
	$('.comz_list .thumb_box').parents('.box').addClass('size02');
	$('.comz_list').masonry('destroy');
	var windowWidth = $(this).width();
	if (windowWidth > 1240) {
		$('.comz_list').masonry({
			columnWidth: '.grid-sizer',
			itemSelector: '.comz_list .box',
			percentPosition: true,
			gutter: 80
		});
	} else if (windowWidth > 991 && windowWidth < 1241) {
		$('.comz_list').masonry({
			columnWidth: '.grid-sizer',
			itemSelector: '.comz_list .box',
			percentPosition: true,
			gutter: 60
		});
	} else if (windowWidth > 760 && windowWidth < 991) {
		$('.comz_list').masonry({
			columnWidth: '.grid-sizer',
			itemSelector: '.comz_list .box',
			percentPosition: true,
			gutter: 50
		});
	} 
	else {
	   $('.comz_list').masonry({
			columnWidth: '.grid-sizer',
			itemSelector: '.comz_list .box',
			percentPosition: true,
			gutter: 16
		}); 
	}  
});


AOS.init({

  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

AOS.init({
   easing: 'ease-out-back',
   duration: 800,
   delay: 300,
   once: true,
   disable: 'mobile'
});

<iframe width="100%" id="if02" height="100%" src="https://www.youtube.com/embed/d8UjSCYX4dY?enablejsapi=1" frameborder="0" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture;" style="position: absolute; width:100%; height:100%;"></iframe>

$('iframe').each( function() {
    $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
});  



$(function() {
    var windowWidth = $(window).width();
    $('.page-container').on('mousemove', function(e) {
        var moveX = (($(window).width() / 2) - e.pageX) * 0.18;
        var moveY = (($(window).height() / 2) - e.pageY) * 0.28;
        if (windowWidth > 1199) {
            $('#page-back').css('margin-left', moveX + 'px');
            $('#page-back').css('margin-top', moveY + 'px');
        }
    });

    myPlayer = $("#playerVideo1").YTPlayer();

    $(window).on('focusout', function() {
        myPlayer.YTPPause();
    });

    $('.sound').on('click', function(e) {
        e.preventDefault();
        myPlayer.YTPToggleVolume();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).text('음원재생');
        }
        else {
            $(this).addClass('active');
            $(this).text('음원중지');
        }
    });

    $('.poiner').on('mouseenter', function(e) {
        myPlayer.YTPPause();
    });

    $('.poiner').on('mouseleave', function(e) {
        myPlayer.YTPPlay();
    });

    $('.psbtn').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            myPlayer.YTPPlay();
        }
        else {
            $(this).addClass('active');
            myPlayer.YTPPause();
        }
    });

    myPlayer.on("YTPPlay", function(){
        $('.poiner').removeClass('stop');
        $('.dim').fadeOut(200);
        $('.psbtn').removeClass('active').text('영상정지');
    });

    myPlayer.on("YTPPause", function(){
        $('.poiner').addClass('stop');
        $('.dim').fadeIn(200);
        $('.psbtn').addClass('active').text('영상재생');
    });

    
    myPlayer.on("YTPTime", function (e) {
        var currentTime = e.time;

        $('#page-back, #page-wp').removeAttr('class');

        if (currentTime < 26) {
            $('#page-back, #page-wp').addClass('ps01');
        }
        else if (currentTime > 26 && currentTime < 59) {
            $('#page-back, #page-wp').addClass('ps02');
        }
        else if (currentTime > 59 && currentTime < 84) {
            $('#page-back, #page-wp').addClass('ps03');
        }
        else if (currentTime > 84 && currentTime < 111) {
            $('#page-back, #page-wp').addClass('ps04');
        }
        else if (currentTime > 111 && currentTime < 120) {
            $('#page-back, #page-wp').addClass('ps05');
        }
        else if (currentTime > 120 && currentTime < 127) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        else if (currentTime > 127 && currentTime < 133) {
            $('#page-back, #page-wp').addClass('ps06');
        }
        else if (currentTime > 133 && currentTime < 136) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        else if (currentTime > 136 && currentTime < 152) {
            $('#page-back, #page-wp').addClass('ps07');
        }
        /*
        else if (currentTime > 152 && currentTime < 179) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        */
        else if (currentTime > 179 && currentTime < 198) {
            $('#page-back, #page-wp').addClass('ps08');
        }
        /*
        else if (currentTime > 198 && currentTime < 203) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        */
        else if (currentTime > 203 && currentTime < 307) {
            $('#page-back, #page-wp').addClass('ps09');
        }
        /*
        else if (currentTime > 307 && currentTime < 351) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        */

        else if (currentTime > 351 && currentTime < 367) {
            $('#page-back, #page-wp').addClass('ps10');
        }
        /*
        else if (currentTime > 367 && currentTime < 392) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        */
        else if (currentTime > 392 && currentTime < 401) {
            $('#page-back, #page-wp').addClass('ps11');
        }
        /*
        else if (currentTime > 401 && currentTime < 493) {
            $('#page-back, #page-wp').addClass('ps00');
        }
        */


        var bTime = currentTime / 120 * 100
        $('.control .m01 em').css('width',bTime + "%");

        if (currentTime > 120) {
            var bTime2 = (currentTime - 120) / 187 * 100
            $('.control .m02 em').css('width',bTime2 + "%");
        }
        else if (currentTime < 120) {
            $('.control .m02 em').css('width','0%');
        }

        if (currentTime > 307) {
            var bTime3 = (currentTime - 307) / 186 * 100
            $('.control .m03 em').css('width',bTime3 + "%");
        } 
        else if (currentTime < 307) {
            $('.control .m03 em').css('width','0%');
        }    
    });

    $('.control .next').on('click', function(e) {
        e.preventDefault();
        myPlayer.YTPPlay();

        if ($('#page-back').hasClass('ps01')) {
            myPlayer.YTPSeekTo(26);
        }
        else if ($('#page-back').hasClass('ps02')) {
            myPlayer.YTPSeekTo(59);
        }
        else if ($('#page-back').hasClass('ps03')) {
            myPlayer.YTPSeekTo(84);
        }
        else if ($('#page-back').hasClass('ps04')) {
            myPlayer.YTPSeekTo(111);
        }
        else if ($('#page-back').hasClass('ps05')) {
            myPlayer.YTPSeekTo(127);  
        }
        else if ($('#page-back').hasClass('ps06')) {
            myPlayer.YTPSeekTo(136);  
        }
        else if ($('#page-back').hasClass('ps07')) {
            myPlayer.YTPSeekTo(179);  
        }
        else if ($('#page-back').hasClass('ps08')) {
            myPlayer.YTPSeekTo(203);  
        }
        else if ($('#page-back').hasClass('ps09')) {
            myPlayer.YTPSeekTo(351);  
        }
        else if ($('#page-back').hasClass('ps10')) {
            myPlayer.YTPSeekTo(392);  
        }
        else if ($('#page-back').hasClass('ps11')) {
            myPlayer.YTPSeekTo(0);  
        }
    });

    $('.control .prev').on('click', function(e) {
        e.preventDefault();
        myPlayer.YTPPlay();

        if ($('#page-back').hasClass('ps11')) {
            myPlayer.YTPSeekTo(351);
        }
        else if ($('#page-back').hasClass('ps10')) {
            myPlayer.YTPSeekTo(203);
        }
        else if ($('#page-back').hasClass('ps09')) {
            myPlayer.YTPSeekTo(179);
        }
        else if ($('#page-back').hasClass('ps08')) {
            myPlayer.YTPSeekTo(136);
        }
        else if ($('#page-back').hasClass('ps07')) {
            myPlayer.YTPSeekTo(127);
        }
        else if ($('#page-back').hasClass('ps06')) {
            myPlayer.YTPSeekTo(111);
        }
        else if ($('#page-back').hasClass('ps05')) {
            myPlayer.YTPSeekTo(84);
        }
        else if ($('#page-back').hasClass('ps04')) {
            myPlayer.YTPSeekTo(59);
        }
        else if ($('#page-back').hasClass('ps03')) {
            myPlayer.YTPSeekTo(26);
        }
        else if ($('#page-back').hasClass('ps02')) {
            myPlayer.YTPSeekTo(0);
        }
        else if ($('#page-back').hasClass('ps01')) {
            myPlayer.YTPSeekTo(0);
        }
    });

    $('.season > div a').on('click', function(e) {
        e.preventDefault();
        myPlayer.YTPPlay();
        $('.season > div a').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('m01')) {
            myPlayer.YTPSeekTo(0);
        }
        else if ($(this).hasClass('m02')) {
            myPlayer.YTPSeekTo(121);
        }
        else if ($(this).hasClass('m03')) {
            myPlayer.YTPSeekTo(308);
        }
    });

});

$(window).on('load resize', function () {
    var windowWidth = $(this).width();
    var Sposition =  ($('#page-back').width() - windowWidth) / 2;
    if (windowWidth < 1200) {
        $('#page-wp').scrollLeft(Sposition);
    }
});
