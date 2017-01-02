                var pointsArray = document.getElementsByClassName('point');
 
                var animatePoints = function(points) {
                 
                var revealPoint = function(index) {
                     points[index].style.opacity = 1;
                     points[index].style.transform = "scaleX(1) translateY(0)";
                     points[index].style.msTransform = "scaleX(1) translateY(0)";
                     points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
                 };
 
                
    
                for (i = 0; i < points.length; i++) {
                revealPoint(i);
                }
    
             };
    //All items that require window to be completely loaded before executing are placed in this block of code
window.onload = function() {
    
    // animate items automatically on tall screens where scrolling does not initiate animation
    if (window.innerHeight > 950) {
         animatePoints(pointsArray); 
     }
    
    // pulls the items that will be animated; in this case, selling-points will be animated.
    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    
    // set up distance page scrolls before element is viewable in the browser window.  User must scroll at least 200 //pixels in order for selling points to be seen in the browser. 
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
    
    // when user scrolls something, an event, happens
     window.addEventListener('scroll', function(event) {
         
      if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
         }   
     });
 }