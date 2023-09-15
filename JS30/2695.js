var ArrayWrapper = function(nums) {
    this.nums = nums;
};

ArrayWrapper.prototype.valueOf = function() {
    return this.nums.reduce(((prev, cur) => prev + cur), 0);
}

ArrayWrapper.prototype.toString = function() {
    return `[${this.nums}]`;
}