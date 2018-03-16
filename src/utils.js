export function pad(val, str, len) {
    val = String(val);
    str = str || '0';
    len = len || 2;
    while (val.length < len) val = str + val;
    return val;
}
