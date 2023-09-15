function isTrue(val) {
    return val ? true : false;
}

function compact(obj) {
    if(obj === null) {
        return null;
    } else if(typeof(obj) !== "object") {
        if(obj) {
            return obj;
        }
    } else {
        if(Array.isArray(obj)) {
            return obj.filter(isTrue).map(compact);
        } else {
            let compactVersion = {};
            for(let key in obj) {
                if(compact(obj[key])) {
                    compactVersion[key] = compact(obj[key]);
                }
            }
            return compactVersion;
        }
    }
}

var compactObject = function(obj) {
    return compact(obj);
};