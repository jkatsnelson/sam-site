// from https://github.com/bootstrapthemesco/bootstrap-carousel-touch-slider


$(document).ready(function() {
  $('.carousel').carousel('pause');
  passwordProtect();
  navIconActive();
  $('[data-toggle="popover"]').popover({
    trigger: 'hover'
  });
  fixAnimations();
  addSwipe();
  if (window.matchMedia('(min-width: 992px)').matches) {
    fixCarouselArrows();
  }
  unhideItems();
  designImageOverlayHovers();
  openNav();
  linkHovers();
});

function passwordProtect() {
  if ($('.capitalone').length) {
    $('#password-protect-form').submit(function(e) {
      e.preventDefault();
      if ($('#c1password').val() === 'waffles') {
        $('.capitalone .password-protect').addClass('hide');
      } else {
        $('#c1password').val('')
        $('.help-block').removeClass('hide');
      }
    })
  }
}

function navIconActive() {
  $('.js-icon-color-change').hover(function() {
    $(this).find('img').toggleClass('hide');
  });
}

function designImageOverlayHovers() {
  $('.final-designs .hoverable').hover(function() {
    $(this).find('.overlay-container').removeClass('hide');
  }, function() {
    $(this).find('.overlay-container').addClass('hide');
  })
}

function unhideItems() {
  $('.hide-until-load').css('display', 'initial');
}

function fixCarouselArrows() {
  $('.carousel').each(changeArrowPlacement);
  $('.carousel').on('slid.bs.carousel', changeArrowPlacement)

  function changeArrowPlacement(){
    var height = $(this).find('.item.active img').outerHeight();
    if (height) {
      var arrowAdjustment = height / 2;

      var title = $(this).find('.item.active .slide-title');

      if (title.length) {
        var titleHeight = $(this).find('.item.active img').offset().top - $(this).find('.item.active .slide-title').offset().top;
        arrowAdjustment += titleHeight;
      }

      $(this).find('.carousel-control img').css('top', arrowAdjustment);
    }
  }
};

function fixAnimations() {
  var carousel = $('.carousel');
  carousel.each(function() {

      function doAnimations( elems ) {
          //Cache the animationend event in a variable
          var animEndEv = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
          elems.each( function ( ) {
              var $this = $( this ),
                  $animationType = $this.data( 'animation' );
              $this.addClass( $animationType ).one( animEndEv, function ( ) {
                  $this.removeClass( $animationType );
              } );
          } );
      }

      //Variables on page load
      var $firstAnimatingElems = carousel.find( '.item:first' ).find( '[data-animation ^= \'animated\']' );
      //Animate captions in first slide on page load
      doAnimations( $firstAnimatingElems );
      //Other slides to be animated on carousel slide event
      carousel.on( 'slide.bs.carousel', function ( e ) {
          var $animatingElems = $( e.relatedTarget ).find( '[data-animation ^= \'animated\']' );
          doAnimations( $animatingElems );
      } );

  });
};

// this isn't being used, but im leaving it for later

function addSwipe() {
  $( '.carousel .carousel-inner' ).swipe( {
      swipeLeft: function () {
          this.parent( ).carousel( 'next' );
      },
      swipeRight: function ( ) {
          this.parent( ).carousel( 'prev' );
      },
      threshold: 0
  } );
};

function openNav() {
  $('.js-open-nav').click(function() {
    $('.js-hideaway-nav').toggleClass('hide')
    $('.js-open-nav').toggleClass('hide');
  })
}

function linkHovers() {
  if (!Modernizr.touch) {
    $('.portfolio-link-grid .js-hoverable').hover(function() {
      $(this).find('.portfolio-link-text').addClass('hide');
      $(this).find('.portfolio-link-img').removeClass('hide');
    }, function() {
      $(this).find('.portfolio-link-text').removeClass('hide');
      $(this).find('.portfolio-link-img').addClass('hide');
    })
  }
}
