var createCounter = function(init) {
    const originalInit = init;
    return {
        increment: function() {
            return ++init;
        },
        decrement: function() {
            return --init;
        },
        reset() {
            init = originalInit;
            return init;
        }
    }
};