(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 24,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            992:{
                items:2
            }
        }
    });
    
})(jQuery);

// impact section

 // Function to handle the count-up
 function countUp(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    let count = 0;
    const speed = 200; // Adjust this value for speed of count-up
    const increment = target / speed;

    const counter = setInterval(() => {
      count += increment;
      element.textContent = Math.floor(count);

      if (count >= target) {
        element.textContent = target; // Ensure it ends at the correct number
        clearInterval(counter);
      }
    }, 10); // Interval for updating the number
  }

  // Function to observe the impact section
  function observeImpactSection() {
    const impactSection = document.querySelector('.impact-section');
    const impactCounters = document.querySelectorAll('.count');
    let counted = false; // To ensure counting only happens once

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          impactCounters.forEach(counter => {
            countUp(counter);
          });
        }
      });
    }, {
      threshold: 0.5 // Adjust this value based on when you want to trigger the count-up (50% in view)
    });

    observer.observe(impactSection);
  }

  // Run the observe function once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', observeImpactSection);

  $(window).on('scroll', function(){
    function isScrollIntoView(elem, index) {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();
      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(window).height()*.5;
      if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
        $(elem).addClass('active');
      }
      if(!(elemBottom <= docViewBottom)) {
        $(elem).removeClass('active');
      }
      var MainTimelineContainer = $('#vertical-scrollable-timeline')[0];
      var MainTimelineContainerBottom = MainTimelineContainer.getBoundingClientRect().bottom - $(window).height()*.5;
      $(MainTimelineContainer).find('.inner').css('height',MainTimelineContainerBottom+'px');
    }
    var timeline = $('#vertical-scrollable-timeline li');
    Array.from(timeline).forEach(isScrollIntoView);
  });


jQuery(document).ready(function($) {

	'use strict';

    
      // smoothscroll on sidenav click

    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    })

    var owl = $("#owl-testimonials");

      owl.owlCarousel({
        
        pagination : true,
        paginationNumbers: false,
        autoPlay: 6000, //Set AutoPlay to 3 seconds
        items : 3, //10 items above 1000px browser width
        itemsDesktop : [1000,3], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        
    });


})