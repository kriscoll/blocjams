        var animatePoints = function() {
         var revealPoint = function() {
          // #7
          $(this).css({
              opacity: 1,
              transform: 'scaleX(1) translateY(0)'
          });
      };



    $.each($('.point'), revealPoint);
                    
    //loop that will loop through each .point element and executes the call back function, revealPoine. 
    
        
             };
    // all items that require window to be completely loaded before executing are placed in this block of code
    $(window).load(function() {
    
    // animate items automatically on tall screens where scrolling does not initiate animation
    if ($(window).height() > 950) {
         animatePoints(); 
     }
    
    // pulls the items that will be animated; in this case, selling-points will be animated. Set up distance page scrolls before element is viewable in the browser window.  User must scroll at least 200 pixels in order for selling points to be seen in the browser. 
        
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    // when user scrolls something, an event, happens
     $(window).scroll(function(event) {
         
    if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();   
         }   
     });
        
 });
