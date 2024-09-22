"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
class Logger {
    configure(config) {
        log4js_1.default.configure(config);
    }
    getLogger(category) {
        return log4js_1.default.getLogger(category);
    }
    normalizeMessage(message, ...args) {
        const data = [message, ...args];
        const result = [];
        while (data.length > 0) {
            const item = data.shift();
            if (typeof item === 'string') {
                result.push(item.replace(/\x1B\[\d+m/g, '').replace(/[\n\r]+/g, ' ').trim());
            }
            else if (Array.isArray(item)) {
                data.unshift(...item);
            }
            else {
                data.unshift(String(item));
            }
        }
        return result.join(' ');
    }
    debug(category, message, ...args) {
        this.getLogger(category).debug(this.normalizeMessage(message, ...args));
    }
    info(category, message, ...args) {
        this.getLogger(category).info(this.normalizeMessage(message, ...args));
    }
    warn(category, message, ...args) {
        this.getLogger(category).warn(this.normalizeMessage(message, ...args));
    }
    error(category, message, ...args) {
        this.getLogger(category).error(this.normalizeMessage(message, ...args));
    }
}
exports.default = Logger;
