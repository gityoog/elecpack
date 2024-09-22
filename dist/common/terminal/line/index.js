"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
const log_symbols_1 = __importDefault(require("log-symbols"));
class LogLine {
    constructor({ timeout = 5 * 1000, limit = 6 } = {}) {
        this.data = [];
        this.next = (0, lodash_debounce_1.default)(() => this.filter(), 100);
        this._onUpdate = [];
        this.options = { timeout, limit };
    }
    add(content, { warning, timeout = this.options.timeout } = {}) {
        content = content.trim().replace(/(\n\r?)+$/g, '\n').replace(/\r*/g, "").trim();
        if (!content)
            return;
        if (warning) {
            content = log_symbols_1.default.warning + " " + content;
        }
        const data = content.split('\n');
        data.forEach((content) => {
            this.data.push({ content, time: timeout ? Date.now() + timeout : undefined });
            if (this.data.length > this.options.limit) {
                this.data.shift();
            }
        });
        this.update();
    }
    clear() {
        if (this.data.length > 0) {
            this.data = [];
            this.update();
        }
    }
    filter() {
        const time = Date.now();
        const state = {
            next: false,
            update: false
        };
        this.data = this.data.filter(item => {
            if (item.time) {
                if (time > item.time) {
                    state.update = true;
                    return false;
                }
                else {
                    state.next = true;
                    return true;
                }
            }
            return true;
        });
        if (state.next) {
            this.next();
        }
        if (state.update) {
            this.update();
        }
    }
    onUpdate(cb) {
        this._onUpdate.push(cb);
    }
    update() {
        this.next();
        this._onUpdate.forEach(cb => cb());
    }
    destroy() {
        this._onUpdate = [];
        this.next.cancel();
    }
}
exports.default = LogLine;
