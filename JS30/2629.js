var compose = function(functions) {
	return function(x) {
        let returnedVal = x;

        for(let i = functions.length - 1; i >= 0; i--) {
            returnedVal = functions[i](returnedVal);
        }

        return returnedVal;
    }
};