function memoize(fn) {
    const cachedArgs = {};

    return function(...args) {
        if(!(args in cachedArgs)) {
            let cacheKey = args.toString();
            let fnResult = fn(...args);
            cachedArgs[cacheKey] = fnResult;
            return fnResult;
        } else {
            return cachedArgs[args.toString()];
        }
    }
}