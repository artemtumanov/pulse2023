$(document).ready(function(){

  // Slider

    $('.slider__wrapper').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slider/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slider/right.png"></button>'
    });

    // Tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__wrapper').removeClass('catalog__wrapper_active').eq($(this).index()).addClass('catalog__wrapper_active');
      });

      // Front and back side our cards

      function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active');
                $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
            })
        })
      }

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__return');

      //Modal

      $('[data-modal=consultation').on('click', function() {
        $('.overlay, #consultation').fadeIn()
      });

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut()
      });

      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__header').eq(i).text());
            $('.overlay, #order').fadeIn()
        })
      });

      //Validation our forms

      function valideForm (item) {
        $(item).validate({
          rules: {
            name: 'required',
            phone: 'required',
            email: {
              required: true,
              email:true
            }
          },
          messages: {
            name: "Пожалуйста, введите своё имя",
            phone: 'Пожалуйста, введите номер телефона',
            email: {
              required: "Пожалуйста, введите email",
              email: "Ваш email должен быть в формате name@domain.com"
            }
          }
        });
      };

      valideForm('#free-form');
      valideForm('#consultation form');
      valideForm('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      //After click submit

      $('form').submit(function(e) {
        e.preventDefault();
        if ($(this).find("input").val() != '') {
          $('#consultation, #order').fadeOut('fast');
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
        }
      });

      //Pageup and smooth scroll

      if (window.matchMedia('(min-width: 1200px)').matches) {
        $(window).scroll(function() {
          if ($(this).scrollTop() > 1500) {
            $('.pageup').fadeIn();
          } else {
            $('.pageup').fadeOut();
          }
        });
      } else {
        $('.pageup').fadeOut();
      }
      
      $("a").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();
    
          // Store hash
          const hash = this.hash;
    
          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 600, function(){
    
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });

      new WOW().init();
  });