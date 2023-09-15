Array.prototype.groupBy = function(fn) {
    const groupedArray = {};
    
    for(let i = 0; i < this.length; i++) {
        if(groupedArray[fn(this[i])]) {
            groupedArray[fn(this[i])].push(this[i]);
            console.log("exists")
        } else {
            groupedArray[fn(this[i])] = [this[i]];
        }
    }

    return groupedArray;
};