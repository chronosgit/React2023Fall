function flatten(arr, level, maxLevel, flattenedArray) {
    if(level === maxLevel) {
        for(let i = 0; i < arr.length; i++) {
            flattenedArray.push(arr[i]);
        }
    } else if(level < maxLevel) {
        for(let i = 0; i < arr.length; i++) {
            if(typeof(arr[i]) !== "number") {
                flatten(arr[i], level + 1, maxLevel, flattenedArray);
            } else {
                flattenedArray.push(arr[i]);
            }
        }
    } else {
        return;
    }
}

var flat = function (arr, n) {
    const flattenedArray = [];

    if(!n) {
        return arr;
    }
    for(let i = 0; i < arr.length; i++) {
        if(typeof(arr[i]) !== "number") {
            flatten(arr[i], 1, n, flattenedArray);
        } else {
            flattenedArray.push(arr[i]);
        }
    }

    return flattenedArray;
};