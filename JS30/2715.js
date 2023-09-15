var cancellable = function(fn, args, t) {
    const timedFunction = setTimeout(() => fn(...args), t);

    const cancelFn = () => clearTimeout(timedFunction);

    return cancelFn;
};