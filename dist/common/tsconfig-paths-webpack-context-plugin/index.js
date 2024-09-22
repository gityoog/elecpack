"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsconfig_paths_webpack_plugin_1 = __importDefault(require("tsconfig-paths-webpack-plugin"));
const typescript_1 = __importDefault(require("typescript"));
class TsconfigPathsWebpackContextPlugin {
    constructor(rawOptions = {}) {
        this.options = rawOptions;
    }
    apply(compiler) {
        compiler.hooks.afterPlugins.tap('TsconfigPathsWebpackContextPlugin', (compiler) => {
            const context = this.options.context || compiler.options.context;
            const tsconfigPathsPlugin = new tsconfig_paths_webpack_plugin_1.default(Object.assign(Object.assign({}, this.options), { configFile: this.options.configFile || (context ? typescript_1.default.findConfigFile(context, typescript_1.default.sys.fileExists) : undefined) }));
            compiler.options.resolve = compiler.options.resolve || {};
            compiler.options.resolve.plugins = (compiler.options.resolve.plugins || []).concat(tsconfigPathsPlugin);
        });
    }
}
exports.default = TsconfigPathsWebpackContextPlugin;
