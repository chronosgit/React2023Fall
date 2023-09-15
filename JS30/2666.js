var once = function(fn) {
    let wasCalled = false;

    return function(...args){
        if(!wasCalled) {
            wasCalled = true;
            return fn(...args);
        }    
    }
};