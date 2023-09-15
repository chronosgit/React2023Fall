var sortBy = function(arr, fn) {
    arr.sort((firstElem, secondElem) => fn(firstElem) - fn(secondElem));
    return arr;
};