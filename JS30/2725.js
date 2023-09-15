var cancellable = function(fn, args, t) {
    fn(...args);

    const timedFn = setInterval(() => fn(...args), t);

    const cancelFn = () => clearInterval(timedFn);

    return cancelFn;
};