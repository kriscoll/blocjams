//utilities.js store functions that are used in several pages of the project

//write a function named forEach.
function forEach(array,callback){
    //loop that will loop through each element in the array
    for(var i=0; i <array.length; i++){
    //executes callback function for each element in the array
        callback(array[i]);
    }
}