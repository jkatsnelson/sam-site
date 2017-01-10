// from https://github.com/bootstrapthemesco/bootstrap-carousel-touch-slider


$(document).ready(function() {
  // if there are carousels on the page, add animation and swipe
  if ($('.carousel').length) {
    fixAnimations();
    addSwipe();
  }
});

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