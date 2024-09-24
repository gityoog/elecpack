"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fork_ts_checker_1 = __importDefault(require("../../../common/fork-ts-checker"));
const tsconfig_paths_webpack_context_plugin_1 = __importDefault(require("../../../common/tsconfig-paths-webpack-context-plugin"));
const RendererBuildConfig = {
    base() {
        return {
            resolve: {
                extensions: [".js", ".ts", ".json"]
            },
            plugins: [
                new tsconfig_paths_webpack_context_plugin_1.default,
            ]
        };
    },
    development() {
        return {
            plugins: [
                new fork_ts_checker_1.default()
            ]
        };
    },
};
exports.default = RendererBuildConfig;
