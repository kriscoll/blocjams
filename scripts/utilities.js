//utilities.js store functions that are used in several pages of the project

//write a function named forEach.
function forEach(array,callback){
    
    //loop that will loop through each element in the array
    for(var i=0; i <array.length; i++){
        
    //executes callback function for each element in the array
        callback(array[i]);
    }
}

//function that keeps traversing the DOM upward until a parent with a specified class name is found.

var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};