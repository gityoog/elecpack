"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boxen_1 = __importDefault(require("boxen"));
const base_1 = __importDefault(require("./base"));
const line_1 = __importDefault(require("../line"));
class WebpackConsole extends base_1.default {
    constructor(name) {
        super();
        this.name = name;
        this.building = false;
        this.progress = {
            percent: 0,
            msg: ""
        };
        this.line = new line_1.default;
        this.line.onUpdate(() => {
            this.update();
        });
    }
    run() {
        this.line.clear();
        this.building = true;
        this.update();
    }
    done(stat) {
        var _a, _b;
        if (stat) {
            if ((_a = stat.warnings) === null || _a === void 0 ? void 0 : _a.length) {
                this.line.add(stat.warnings.map(item => item.message).join('\n'));
            }
            if ((_b = stat.errors) === null || _b === void 0 ? void 0 : _b.length) {
                this.line.add(stat.errors.map(item => item.message).join('\n'), { timeout: 0 });
            }
        }
        this.building = false;
        this.update();
    }
    process(percent, msg) {
        // this.log(percent + 'msg:' + msg)
        this.progress.percent = Math.round(percent * 100);
        this.progress.msg = msg;
        this.update();
    }
    error(err) {
        this.building = false;
        this.line.add(err.message, { timeout: 0 });
        this.update();
    }
    clear() {
        this.line.clear();
    }
    stdout(data) {
        this.line.add(data.toString());
    }
    stderr(data) {
        this.line.add(data.toString(), { timeout: 0 });
    }
    render() {
        if (this.line.data.length > 0 || this.building) {
            let result = '';
            const lineText = this.line.data.map(({ content }) => {
                return content;
            }).join('\n');
            if (this.building) {
                const bar = genBar(this.progress.percent, 50);
                if (this.progress.msg) {
                    result += bar + "\n" + this.progress.msg;
                }
                else {
                    result += bar;
                }
                if (lineText) {
                    result += "\n" + lineText;
                }
            }
            else {
                result += lineText;
            }
            return (0, boxen_1.default)(result, {
                padding: { left: 1, right: 1, top: 0, bottom: 0 },
                margin: { top: 1 },
                title: this.name,
            });
        }
        return "";
    }
    destroy() {
        this.line.destroy();
        super.destroy();
    }
}
exports.default = WebpackConsole;
function genBar(precent, width) {
    const bar = new Array(width).fill('\u2591');
    const fill = Math.min(width, Math.floor((precent / 100) * width));
    for (let i = 0; i < fill; i++) {
        bar[i] = '\u2588';
    }
    return `\u001b[90m${bar.join('')}\u001b[0m ${precent}%`;
}
