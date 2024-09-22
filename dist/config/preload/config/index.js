"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fork_ts_checker_1 = __importDefault(require("../../../common/fork-ts-checker"));
const tsconfig_paths_webpack_context_plugin_1 = __importDefault(require("../../../common/tsconfig-paths-webpack-context-plugin"));
const esbuild_loader_1 = require("esbuild-loader");
const PreloadBuildConfig = {
    base() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                target: 'electron-preload',
                resolve: {
                    extensions: [".js", ".ts", ".json"]
                },
                externals: ({ request }, callback) => {
                    const commonjs2 = {
                        electron: 'commonjs2 electron',
                    };
                    if (request && commonjs2[request]) {
                        return callback(undefined, commonjs2[request]);
                    }
                    if (request && /^node\:/.test(request)) {
                        return callback(undefined, 'commonjs2 ' + request.slice(5));
                    }
                    callback();
                },
                module: {
                    rules: [
                        {
                            test: /\.ts$/,
                            exclude: /node_modules/,
                            use: [
                                {
                                    loader: 'ts-loader',
                                    options: {
                                        transpileOnly: true
                                    }
                                }
                            ]
                        }
                    ]
                },
                plugins: [
                    new tsconfig_paths_webpack_context_plugin_1.default,
                ]
            };
        });
    },
    development() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                devtool: 'source-map',
                mode: 'development',
                optimization: {
                    minimize: false
                },
                plugins: [
                    new fork_ts_checker_1.default()
                ]
            };
        });
    },
    production() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                mode: 'production',
                optimization: {
                    minimize: true,
                    minimizer: [
                        new esbuild_loader_1.EsbuildPlugin({
                            target: 'es2021',
                            minifyWhitespace: true,
                            minifyIdentifiers: true,
                            minifySyntax: true,
                            legalComments: 'none'
                        })
                    ]
                }
            };
        });
    }
};
exports.default = PreloadBuildConfig;
