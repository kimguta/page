


$(document).on('ready ajaxComplete', function(){
    
	$(window).on('scroll load', function () {
	    if ($(document).scrollTop() > 80) {
	        $('#header').addClass('fixed');
	    } else {
	        $('#header').removeClass('fixed');
	    }
	});
	
	responsive();

	$(window).on('resize', function() {
		clearTimeout(window.resizedFinished);
		window.resizedFinished = setTimeout(function(){
			document.location.reload();
			responsive();
		
		}, 100);
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

	$('#header .depth_03').prev('h3').addClass('has_depth');

	function pcMode(){
		$('#header').removeClass('mobile-mode');
		$('#header').addClass('pc-mode');
		$('#header h3 a').on('mouseover focusin', function () {
			$('#header h3').removeClass('active');
			$(this).parent('h3').addClass('active');
			$('.depth_03').stop().slideUp(300);
			$(this).parent('h3').next('.depth_03').stop().slideDown(300);
			
		});
		$('#header .depth_01 li').on('mouseover focusin', function () {
			$('h2').removeClass('active');
			$(this).children('h2').addClass('active');
			$('.depth_02').stop().show();
			$('.bg_pc').stop().slideDown(350);
			$('#mask').show();
		});

		$('#header').on('mouseleave', function () {
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
		});	

		$('#header a:last').on('focusout', function () {
			$('h2').removeClass('active');
			$('.depth_02, .bg_pc, #mask').stop().hide();
		});
		
	};

	function mobileMode(){
		$('#header').removeClass('pc-mode');
		$('#header').addClass('mobile-mode');

		$('#header h2 a').on('click', function () {
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

		$('#header h3 a').on('click', function () {
			if ($(this).parent().hasClass('active')) {
				$(this).parent('h3').removeClass('active');
			} else{
				$('#header h3').removeClass('active');
				$(this).parent('h3').addClass('active');
				$('.depth_03').stop().slideUp(300);
				$(this).parent('h3').next('.depth_03').stop().slideDown(300);
				
			}
		});	

		$('#header .mobile-on').on('click', function () {
			$(this).toggleClass('active');
			$('#header nav').toggleClass('active');
		});	

	};
	

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