"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __importDefault(require("../base"));
class WebpackBuilderFileConfig extends base_1.default {
    setOptions(options) {
        this.setFileOptions(options);
    }
    getOptions() {
        return this.getFileOptions();
    }
}
exports.default = WebpackBuilderFileConfig;
