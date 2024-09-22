"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class OutputConfig {
    constructor() {
        this.path = path_1.default.resolve(process.cwd(), './dist');
    }
    setOptions(options) {
        if (options.path) {
            this.path = options.path;
        }
    }
    getPath() {
        return this.path;
    }
    resolve(...args) {
        return path_1.default.resolve(this.path, ...args);
    }
}
exports.default = OutputConfig;
