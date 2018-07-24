// JavaScript Document
// Author Name: Saptarang
// Themeforest: http://themeforest.net/user/saptarang?ref=saptarang
// Creation Date: 14 Nov 2016
// Created for StartUp Me Landing Page

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// load DOM
( function ( $ ) {
    'use strict';

	// equal height
	var equalheight, topPostion, currentDiv, rowDivs;
	equalheight = function(container){
		var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
		$(container).each(function() {
		
			$el = $(this);
			$($el).height('auto')
			topPostion = $el.position().top;
			
			if (currentRowStart != topPostion) {
				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
				rowDivs.length = 0; // empty the array
				currentRowStart = topPostion;
				currentTallest = $el.height();
				rowDivs.push($el);
			} else {
				rowDivs.push($el);
				currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			}
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		});
	} // end equalheights
	
	// Owl carousel for gallery and testimonial
	$('#clientSlider.owl-carousel').owlCarousel({
		loop: false,
		rewind: false,
		margin: 25,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: false,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: false,
		nav: true,
		navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
		responsiveClass:true,
		responsive:{
			0:{
				items: 2,
				nav:true
			},
			600:{
				items: 3,
				nav:true
			},
			1000:{
				items: 3,
				nav:true
			},
			1000:{
				items: 5,
				nav:true
			}
		}
	});
	
	// Owl carousel for gallery and testimonial
	$('#teamSlider.owl-carousel').owlCarousel({
		loop: false,
		rewind: false,
		margin: 15,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: false,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: false,
		nav: true,
		navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:true
			},
			600:{
				items:2,
				nav:true
			},
			1000:{
				items:3,
				nav:true
			},
			1000:{
				items:4,
				nav:true
			}
		}
	});
		
	// index.html main slider
	var HomeSlid = $('#homeSlider');
	if( HomeSlid ) {
		$('#homeSlider').carousel({
		  interval: 5000 // set false if you dont want auto scroll
		});
	}
	
	// testimonial slider
	$('#testimonial').carousel({
		  interval: 5000 // set false if you dont want auto scroll
	});
	
	/* ==== Window Load ====== */
	$(window).load(function() {
		
		//Preloader
		var preLodr = $('#preloader');
		if( preLodr ) {
			$('#preloader').fadeOut();
			//$('.loading').delay(350).fadeOut('slow');  
			$('body').delay(350).css({'overflow':'visible'});
		}
	
		// YTPlayer for video index2.html
		$("#video").YTPlayer();
		
		// Slideshow
	  	var Page = (function() {
		  var $navArrows = $( '#nav-arrows' ),
			  $nav = $( '#nav-dots > span' ),
			  slitslider = $( '#slider' ).slitslider( {
				  
				  // transitions speed
					speed : 800,
					// if true the item's slices will also animate the opacity value
					optOpacity : false,
					// amount (%) to translate both slices - adjust as necessary
					translateFactor : 230,
					// maximum possible angle
					maxAngle : 25,
					// maximum possible scale
					maxScale : 2,
					// slideshow on / off
					autoplay : true,
					// keyboard navigation
					keyboard : true,
					// time between transitions
					interval : 5000,
						  
				  onBeforeChange : function( slide, pos ) {
					  $nav.removeClass( 'nav-dot-current' );
					  $nav.eq( pos ).addClass( 'nav-dot-current' );
				  }
			  } ),

			  init = function() {
				  initEvents();
			  },
			  initEvents = function() {

				  // add navigation events
				  $navArrows.children( ':last' ).on( 'click', function() {
					  slitslider.next();
					  return false;
				  } );

				  $navArrows.children( ':first' ).on( 'click', function() {
					  slitslider.previous();
					  return false;
				  } );

				  $nav.each( function( i ) {
					  $( this ).on( 'click', function( event ) {
						  var $dot = $( this );
						  if( !slitslider.isActive() ) {
							  $nav.removeClass( 'nav-dot-current' );
							  $dot.addClass( 'nav-dot-current' );
						  }
						  slitslider.jump( i + 1 );
						  return false;
					  } );
				  } );
			  };
			  return { init : init };
	  	})();
	  	Page.init();
			
		// Breadcrumbs margin top
		var Hom = $('#home');
		if( Hom ) {
			var hHeight = $('#home').outerHeight();
			//var headOpt5 = $('.header5').next();
			$('#slider, #image-slider').not('.header2 + #slider, #image-slider').css('margin-top', hHeight);	
		}
			
		// Animated Progress Bar
		$('.progress .progress-bar').css("width",
            function() {
                return $(this).attr("aria-valuenow") + "%";
            }
        )
		
		// Equal Heights
		if( equalheight ) {
			equalheight('.equal, #testimonial .owl-item .item, .serviceBox');
		}
		
		// full height for slider
		var winW = $('body').width();
		
		// Collapse menu for small devices
		if (winW <= 767) {
			// smooth page Scroll
			$("nav a[href^=\\#], a.top[href^=\\#], a.smooth[href^=\\#]").on("click", function(event) {
				event.preventDefault();
				$('html,body').animate({
					scrollTop: $(this.hash).offset().top - 470},
				1000);	
			});
		} else {
			// smooth page Scroll
			$("nav a[href^=\\#], a.top[href^=\\#], a.smooth[href^=\\#]").on("click", function(event) {
				event.preventDefault();
				$('html,body').animate({
					scrollTop: $(this.hash).offset().top - 0},
				1000);	
			});
		}
	});
	
	/* ==== Window Resize ====== */
	$(window).resize(function(){
		
		// Equal Heights
		if( equalheight ) {
			equalheight('.equal, #testimonial .owl-item .item');
		}
		
	});
	
	/* ==== Window Scroll ====== */
	$(window).on('scroll', function() {
		// Top Arrow
		if ($(window).scrollTop() > 1000) { 
			$('a.top').fadeIn('slow'); 
		} else { 
			$('a.top').fadeOut('slow');
		}
	});	
	
	// Scroll spy for active menu
	$('body').scrollspy({ target: '#menu' });
  
	// WOW - animated content
	var wow = new WOW(
	  	{
		  boxClass:     'wow',      // default
		  animateClass: 'animated', // default
		  offset:       150,          // default
		  mobile:       false,       // set false if you dont want animation on mobile phones
		  live:         true        // default
		}
	)
	wow.init();
	
	// Navigation Menu 
	$('#nav-expander').on('click',function(e){
		e.preventDefault();
		$('body').toggleClass('nav-expanded');
	});
	$('#nav-close, .main-menu > li > a').on('click',function(e){
		e.preventDefault();
		$('body').removeClass('nav-expanded');
	});
	
	// Animation for slider text and image
    function doAnimations( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';
        
        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }
    
    //Variables on page load 
    var $myCarousel = $('#homeSlider'),
    $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
        
    $myCarousel.carousel();
    
    doAnimations($firstAnimatingElems);
    
    $myCarousel.carousel('pause');
    
    //Other slides to be animated on carousel slide event 
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });  
	
	// Image Lightbox
	$("a[data-rel^='prettyPhoto']").prettyPhoto({overlay_gallery: true});

	// Input placeholder in IE
	$('input, textarea').placeholder();

	// stellar js for parallax
	if( !isMobile.any() ){
        $(window).stellar({
			horizontalScrolling: false,
			responsive: true
		});
    }
	
	// Accordion Symbols
	$('.panel-title a').on("click", (function() {
		var thisParent = $(this).parent().parent().next();
		if(thisParent.hasClass('in')) {
			$(this).parent().removeClass('active');
			$(this).parent().parent().parent().removeClass('active');
		} else {
			$('.panel-title').removeClass('active');
			$('.panel-default').removeClass('active');
			
			$(this).parent().addClass('active');
			$(this).parent().parent().parent().addClass('active');
		}
	}));
				
	/* SET SUBSCRIBE FORM SUCCESS MESSAGE */
	var sub_submitMessage = "You have subscribed successfully.";
	var sub_successBoxColor = "00c853"; // Background color for the success box
	var sub_successBoxBorderStyle = "solid"; // Border Style  -  Example: solid, dotted, dashed, double
	var sub_successBox_Border_Color = "00c853"; // Border color for success box
	var sub_textColor = "fff"; // text color for success box
	
	// Subscription Form Validation
	$("#subscribeForm input").on("focus", (function() {
		$(this).prev("label").hide();
		$(this).prev().prev("label").hide();	 		 	
	}));
	   
	$("#subscribeForm").on("submit", (function() {
		// validate and process form here
		var emailSubscribe = $("#emailSubscribe").val();
		if (emailSubscribe == "") {
			$('#emailSubscribe').addClass('reqfld');
			$('<span class="error" style="display:none; background-color: #F30; color: #fff">Error</span>').insertBefore('#emailSubscribe').fadeIn(400);
			$("#emailSubscribe").on("focus", (function() {  $('#emailSubscribe').removeClass('reqfld');  $(this).prev().fadeOut(400);}));
			return false;
		} else if(emailSubscribe.indexOf('@') == -1 || emailSubscribe.indexOf('.') == -1) {
			$('#emailSubscribe').addClass('reqfld');
			$('<span class="error" style="display:none;  color:#f30">Invalid!</span>').insertBefore('#emailSubscribe').fadeIn(400);
			$("#emailSubscribe").on("focus", (function() {  $('#emailSubscribe').removeClass('reqfld');  $(this).prev().fadeOut(400);}));
			return false;
		}
		
		var sub_security = $("#sub-security").val();
		var dataString = '&emailSubscribe=' + emailSubscribe + '&sub-security=' + sub_security;
		
		$.ajax({
		type: "POST",
		url: "form/subscribe.php",
		data: dataString,
		success: function() {
		  $("#subscribeForm .form-row").hide();
		  $('#subscribeForm').append("<div id='subscribesuccess' class='alert alert-success' style='border:#"+sub_successBox_Border_Color+" 1px "+sub_successBoxBorderStyle+"; background:#"+sub_successBoxColor+";' ></div>");
		  $('#subscribesuccess').html("<h5 class='text-center' style='color:#"+sub_textColor+"; margin: 0'><i class='fa fa-check-circle'></i> "+sub_submitMessage+"</h5>")
		  .hide().delay(300)
		  .fadeIn(1500);
		  
		  $('#subscribeForm .form-row').delay(6000).slideUp('fast');
		  
		}
		});
		return false;
	}));
	

	// Slider Validation
	$( "#cfSlide" ).slider({
		value:1,
		min: 1,
		max: 100,
		step: 1,
		slide: function( event, ui ) {
			$( "#cfsVal" ).val( ui.value );
			var sval = $( "#cfsVal" ).val();
			if( sval == 100 ) {
				$('#cfSubmit').removeAttr("disabled");
			} else {
				$('#cfSubmit').attr('disabled', 'disabled');
			}
		}
	});
	
	// Contact form
	$("#cfSubmit").on("click", function() { 
		var proceed = true;
		var output = '';
		$("#cForm input[required], #cForm textarea[required]").each(function(){
			$(this).css('border-color',''); 
			if( !$.trim( $(this).val() ) ){ 
				$(this).css('border-color','red');  
				proceed = false;
			}
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if( $(this).attr("type")=="email" && !email_reg.test( $.trim( $(this).val() ) ) ){
				$(this).css('border-color','red'); 
				proceed = false;              
			}   
		});
		if( proceed ){
			var post_data = {
			'name'     		: $('input[name=name]').val(), 
			'email'    		: $('input[name=email]').val(), 
			'phone'    		: $('input[name=phone]').val(),
			'message'       : $('textarea[name=message]').val(),
			'domain'		: $(location).attr('href')
		}
		
		//Ajax post data to server
		$.post('form/contact.php', post_data, function(response){  
			if(response.type == 'error'){ 
				//load json data from server and output message     
				output = '<div class="alert alert-warning alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
			}else{
				output = '<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+response.text+'</div>';
				//reset values in all input fields
				$("#cForm  input[required=true], #cForm textarea[required=true]").val(''); 
				$(".cfs_response").slideUp(); //hide form after success
			}
				$(".cfs_response").hide().html(output).slideDown();
			}, 'json');
		}
	});
	
	//reset previously set border colors and hide all message on .keyup()
	$("#cForm  input[required=true], #cForm textarea[required=true]").keyup(function() { 
		$(this).css('border-color',''); 
		$(".cfs_response").slideUp();
	});	
		
} ( jQuery ) ); // end of jQuery dom





