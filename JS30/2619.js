Array.prototype.last = function() {
    if(this.length) {
        return this[this.length - 1];
    } else {
        return -1;
    }
};