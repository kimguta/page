
$(function() {
	
	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 80) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});

	var Wwidth = $(window).outerWidth();

	$(window).on('resize load', function () {
		if($(window).width() > 1399){ 
			$('#header').removeClass('mobile-mode');
			$('#header').addClass('pc-mode');
		}
		else{
			$('#header').removeClass('pc-mode');
			$('#header').addClass('mobile-mode');
			$('.mobile-mode .active + .depth_02').show();
		}

		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(function(){
			var Wwidth2 = $(window).outerWidth();
			if ( (Wwidth > 1399 && Wwidth2 < 1400) || (Wwidth < 1400 && Wwidth2 > 1399) ){
				$('.depth_02, .depth_03, #mask').stop().hide();
			}
		}, 300);

		var highestBox = 0;
			$('#header .depth_02').each(function(){
				if($(this).height() > highestBox){
				highestBox = $(this).height() + 15;
			}
		});
		$('.bg_pc').css('height',highestBox);
	});

	var ObjGnb = $(document);
		

	ObjGnb.init(function(){
		$('#header .depth_03').prev('h3').addClass('has_depth');
		$('#header .depth_02').prev('h2').addClass('has_depth');
		$('#header nav').append('<span class="bg_pc"></span>');
		$('#header').after('<span id="mask"></span>');
	})
	.on({
        'mouseover focusin': function() { 
            $('#header').addClass('active');
			$('#header h2').removeClass('active');
			$(this).children('h2').addClass('active');
			$('.depth_02').stop().show();
			$('.bg_pc').stop().slideDown(300);
			$('#mask').show();
			$('#header.pc-mode .sitemap').addClass('active');
        }
    }, '#header.pc-mode .depth_01 li')
	.on({
        'click': function(e) { 
			e.preventDefault();
			if ($(this).hasClass('active')) {
				$(this).removeClass('active');
				$('#header').removeClass('active');
				$('#header h2').removeClass('active');
				$('.depth_02, .bg_pc, #mask').stop().hide();
			} else{
				$(this).addClass('active');
				$('#header').addClass('active');
				$('.depth_02').stop().show();
				$('.bg_pc').stop().slideDown(300);
				$('#mask').show();	
			}
        }
    }, '#header.pc-mode .sitemap')
	.on({
		'focusout': function() { 
            $('#header').removeClass('active');
			$('#header h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
			$('#header.pc-mode .sitemap').removeClass('active');
        }
	}, '#header .depth_01 a:last')
	.on({
		'mouseleave': function() { 
            $('#header').removeClass('active');
			$('#header h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
			$('#header.pc-mode .sitemap').removeClass('active');
        }
	}, '#header.pc-mode')
	.on({
		'click': function(e) { 
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
        }
	}, '#header.mobile-mode h2.has_depth a')
	.on({
		'click': function(e) { 
			e.preventDefault();
			$('#mask').toggleClass('active');
			$('#header nav').toggleClass('active');
			$('#header').toggleClass('active');
		}
	}, '#header.mobile-mode .sitemap, #header.mobile-mode .mobile-close, #header.mobile-mode + #mask');
	

	$('a[role="button"]').on('keypress', function (key) {
		if (key.keyCode == 32) {
			$(this).trigger('click');
			return false
		}
	});	

	$('#btn_top').on('click', function (e) {
		e.preventDefault();
		$('html, body').animate({scrollTop: 0}, 400);
	}); 

	var currentPosition = parseInt($("#btn_top").css("top"));
	$(window).on('scroll', function () {
		var posY = $(window).scrollTop();
		$("#btn_top").stop().animate({"top":posY+currentPosition+"px"},500);
		if ( posY > 100 ){
			$("#btn_top").css('opacity','.8');
		} else if(posY < 100) {
			$("#btn_top").css('opacity','0');
		};
	});
	
});
