var expect = function(val) {
    return {
        toBe: function(innerVal) {
            if(innerVal === val) {
                return true;
            } else {
                throw new Error("Not Equal");
            }
        },
        notToBe: function(innerVal) {
            if(innerVal !== val) {
                return true;
            } else {
                throw new Error("Equal");
            }
        }
    }
};