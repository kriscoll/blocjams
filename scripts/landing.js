    var pointsArray = document.getElementsByClassName('point');
 
    var revealPoint = function(pointsListed) {
        pointsListed.style.opacity = 1;
        pointsListed.style.transform = "scaleX(1) translateY(0)";
        pointsListed.style.msTransform = "scaleX(1) translateY(0)";
        pointsListed.style.WebkitTransform = "scaleX(1) translateY(0)";
            };





    var animatePoints = function(points) {
        forEach(points,revealPoint);
                    
    //loop that will loop through each element in the array
    //for(var i=0; i <array.length; i++){
    //executes callback function for each element in the array
    //callback(array[i]);
    
            
             };
    // all items that require window to be completely loaded before executing are placed in this block of code
    $(window).load(function() {
    
    // animate items automatically on tall screens where scrolling does not initiate animation
    if ($(window).height() > 950) {
         animatePoints(); 
     }
    
    // pulls the items that will be animated; in this case, selling-points will be animated. Set up distance page scrolls before element is viewable in the browser window.  User must scroll at least 200 //pixels in order for selling points to be seen in the browser. 
        
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    // when user scrolls something, an event, happens
     $(window).scroll(function(event) {
         
    if ($(window).scrollTop() >= scrollDistance) {
             animatePoints();   
         }   
     });
        
 });
