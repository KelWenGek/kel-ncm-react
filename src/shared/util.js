export function pad(val, str, len) {
    val = String(val);
    str = str || '0';
    len = len || 2;
    while (val.length < len) val = str + val;
    return val;
}


export function getTransform() {
    return function (e) {
        var t = ["transform", "webkitTransform", "msTransform", "MozTransform"];
        for (var n in t)
            if (void 0 !== e.style[t[n]])
                return t[n];
        return t[1];
    }(document.createElement("div"))
}