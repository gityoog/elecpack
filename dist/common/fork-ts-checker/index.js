"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const typescript_1 = __importDefault(require("typescript"));
class ForkTsChecker {
    constructor(rawOptions = {}) {
        this.options = rawOptions;
    }
    apply(compiler) {
        var _a;
        const context = compiler.options.context;
        const plugin = new fork_ts_checker_webpack_plugin_1.default(Object.assign(Object.assign({}, this.options), { typescript: Object.assign(Object.assign({}, this.options.typescript), { configFile: ((_a = this.options.typescript) === null || _a === void 0 ? void 0 : _a.configFile) || (context ? typescript_1.default.findConfigFile(context, typescript_1.default.sys.fileExists) : undefined) }) }));
        plugin.apply(compiler);
    }
}
exports.default = ForkTsChecker;
