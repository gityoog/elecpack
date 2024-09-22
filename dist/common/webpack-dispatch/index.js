"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
class WebpackDispatch {
    constructor() {
        this._onRun = [];
        this._onDone = [];
        this._onError = [];
        this._onProcess = [];
    }
    run() {
        this._onRun.forEach(fn => fn());
    }
    done(stat) {
        this._onDone.forEach(fn => fn(stat));
    }
    error(err) {
        this._onError.forEach(fn => fn(err));
    }
    process(percent, msg) {
        this._onProcess.forEach(fn => fn(percent, msg));
    }
    apply(compiler) {
        new webpack_1.default.ProgressPlugin((percent, msg, module) => {
            this.process(percent, msg + ' ' + (module || ''));
        }).apply(compiler);
        compiler.hooks.compile.tap('WebpackDispatch', () => {
            this.run();
        });
        compiler.hooks.done.tap('WebpackDispatch', (stat) => {
            this.done(stat);
        });
        compiler.hooks.failed.tap('WebpackDispatch', (err) => {
            this.error(err);
        });
    }
    onRun(fn) {
        this._onRun.push(fn);
    }
    onDone(fn) {
        this._onDone.push(fn);
    }
    onError(fn) {
        this._onError.push(fn);
    }
    onProcess(fn) {
        this._onProcess.push(fn);
    }
    destroy() {
        this._onDone = [];
        this._onError = [];
        this._onProcess = [];
    }
}
exports.default = WebpackDispatch;
