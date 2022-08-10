$(function() {
	var ObjWin = $(window);
	var ObjDoc = $(document);	
	var Wwidth = ObjWin.outerWidth();
	var currentPosition = parseInt($("#btn-side").css("top"));

	ObjWin.on({
		'scroll load': function() { 
			if (ObjDoc.scrollTop() > 80) {
				$('#header').addClass('fixed');
			} else {
				$('#header').removeClass('fixed');
			}
		}		
	})
	.on({
		'resize load': function() { 
			$('#header .depth-02').prev('h2').addClass('has-depth');
			if(ObjWin.width() > 1399){ 
				$('#header').removeClass('mobile-mode');
				$('#header').addClass('pc-mode');
			}
			else{
				$('#header').removeClass('pc-mode');
				$('#header').addClass('mobile-mode');
				$('.mobile-mode .active + .depth-02').show();
			}
		}
	})
	.on({
		'resize': function() { 
			var Wwidth2 = $(window).outerWidth();
			if (Wwidth2 > 1399){
				$('#header h2').removeClass('active');
				$('.depth-02, .bg_pc').stop().hide();
			}
		}
	})
	.on({
		'scroll': function() { 
			var posY = ObjWin.scrollTop();
			$("#btn-side").stop().animate({"top":posY+currentPosition+"px"},500);
			if ( posY > 100 ){
				$("#btn_top").css('opacity','.8');
			} else if(posY < 100) {
				$("#btn_top").css('opacity','0');
			};
		}	
	})
	.on({	
		'load': function() { 
			$('#header .depth-01').append('<span class="bg_pc"></span>');
			$('a[role="button"]').on('keypress', function (key) {
				if (key.keyCode == 32) {
					$(this).trigger('click');
					return false
				}
			});
			var highestBox = 0;
				$('#header .depth-02').each(function(){
					if($(this).height() > highestBox){
					highestBox = $(this).height() + 40;
				}
			});
			$('.bg_pc').css('height',highestBox);	
		}
	});

	ObjDoc.on({
		'mouseover focusin': function() { 
			$('#header').addClass('active');
			$('#header h2').removeClass('active');
			$(this).children('h2').addClass('active');
			$('.bg_pc, .depth-02').stop().slideDown(200);
		}
	}, '#header.pc-mode .depth-01 li')
	.on({
		'focusout': function() { 
			$('#header').removeClass('active');
			$('#header h2').removeClass('active');
			$('.depth-02, .bg_pc').stop().hide();
		}
	}, '#header .depth-01 a:last')
	.on({
		'mouseleave': function() { 
			$('#header').removeClass('active');
			$('#header h2').removeClass('active');
			$('.depth-02, .bg_pc').stop().hide();
		}
	}, '#header.pc-mode')
	.on({
		'click': function(e) { 
			e.preventDefault();
			if ($(this).parent().hasClass('active')) {
				$(this).parent('h2').removeClass('active');
				$('.depth-02').stop().slideUp(250);
			} else{
				$('#header h2').removeClass('active');
				$(this).parent('h2').addClass('active');
				$('.depth-02').stop().slideUp(250);
				$(this).parent('h2').next('.depth-02').stop().slideDown(300);
				
			}
		}
	}, '#header.mobile-mode h2.has-depth a')
	.on({
		'click': function(e) { 
			e.preventDefault();
			$('#header nav, #header, #header .sitemap').toggleClass('active');
		}
	}, '#header.mobile-mode .sitemap')
	.on({
		'click': function(e) { 
			e.preventDefault();
			$('html, body').animate({scrollTop: 0}, 400);
		}
	}, '#btn_top');
});