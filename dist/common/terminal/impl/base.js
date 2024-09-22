"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseConsole {
    constructor() {
        this._onUpdate = [];
        this._log = [];
    }
    update() {
        this._onUpdate.forEach(callback => callback());
    }
    getLog() {
        return this._log.join('\n');
    }
    log(msg) {
        this._log.push(msg);
        this.update();
    }
    onUpdate(callback) {
        this._onUpdate.push(callback);
        return () => {
            const index = this._onUpdate.indexOf(callback);
            if (index > -1) {
                this._onUpdate.splice(index, 1);
            }
        };
    }
    destroy() {
        this._onUpdate = [];
    }
}
exports.default = BaseConsole;
