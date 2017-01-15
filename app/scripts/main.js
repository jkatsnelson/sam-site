// from https://github.com/bootstrapthemesco/bootstrap-carousel-touch-slider


$(document).ready(function() {
  navSlideout();
  fixAnimations();
  addSwipe();
});

function navSlideout() {
  var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu')
  });

  $('#menu a').click(function () {
    slideout.toggle();
  })
  // when the page loads, disable touch because it conflicts with carousels
  // when the menu is open, enable touch so its easy to get out
  // when the menu closes again, re-disable touch
  slideout.disableTouch();
  slideout.on('open', function() {
    slideout.enableTouch();
  });
  slideout.on('close', function() {
    slideout.disableTouch();
  });

  document.querySelector('.burger').addEventListener('click', function() {
    slideout.toggle();
  });

  // document.querySelector('.menu').addEventListener('click', function(eve) {
  //   if (eve.target.nodeName === 'A') { slideout.close(); }
  // });

  slideout.on('beforeopen', function() {
    document.querySelector('.nav-bar').className += ' open';
    document.querySelector('#panel .overlay').className += ' active';
  });


  slideout.on('beforeclose', function() {
    document.querySelector('.nav-bar').className = 'nav-bar';
    document.querySelector('#panel .overlay').className = 'overlay';
  });
}

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