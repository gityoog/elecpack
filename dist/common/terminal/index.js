"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_update_1 = __importDefault(require("log-update"));
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
class Terminal {
    constructor() {
        this.data = [];
        this.render = (0, lodash_debounce_1.default)(() => {
            (0, log_update_1.default)(this.data.map(item => item.console.render().trim()).filter(v => v).join('\n') +
                this.data.map(item => item.console.getLog().trim()).filter(v => v).join('\n'));
        });
        process.on('SIGWINCH', () => {
            this.render();
        });
    }
    unRegister(console) {
        const index = this.data.findIndex(item => item.console === console);
        if (index > -1) {
            this.data[index].cancel();
            this.data.splice(index, 1);
        }
    }
    register(console) {
        this.data.push({
            console,
            cancel: console.onUpdate(() => {
                this.render();
            })
        });
    }
    destroy() {
        this.render.cancel();
        this.data.forEach(item => {
            item.console.destroy();
        });
        // logUpdate.clear()
    }
}
exports.default = Terminal;
