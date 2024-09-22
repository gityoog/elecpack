"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = delay;
exports.createUUID = createUUID;
exports.formatDate = formatDate;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function createUUID(e = 32) {
    e = e || 32;
    for (var t = "4a5122a4vUpy33j924bb2e5d", n = t.length, o = "", a = 0; a < e; a++)
        o += t.charAt(Math.floor(Math.random() * n));
    return o;
}
function formatDate(date = new Date(), fmt = 'yyyy-MM-dd') {
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? String(o[k]) : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
}
