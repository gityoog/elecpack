"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const esbuild_loader_1 = require("esbuild-loader");
const tsconfig_paths_webpack_context_plugin_1 = __importDefault(require("../../common/tsconfig-paths-webpack-context-plugin"));
const fork_ts_checker_1 = __importDefault(require("../../common/fork-ts-checker"));
const MainWorkerConfig = {
    base() {
        return {
            target: 'node',
            resolve: {
                extensions: [".js", ".ts", ".json"]
            },
            externals: [{
                    worker_threads: 'commonjs worker_threads',
                    child_process: 'commonjs child_process',
                }, function ({ context, request }, callback) {
                    if (request) {
                        const result = /build[\\/]koffi[\\/](.*?)[\\/]/.exec(request);
                        if (result && result[1] !== 'win32_x64') {
                            return callback(null, 'window.Koffi');
                        }
                    }
                    callback();
                }],
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
                    },
                    {
                        test: /\.node$/,
                        use: {
                            loader: 'node-loader',
                            options: {
                                name: "[name].[contenthash:6].[ext]",
                            }
                        }
                    }
                ]
            },
            plugins: [
                new tsconfig_paths_webpack_context_plugin_1.default,
            ]
        };
    },
    development() {
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
    },
    production() {
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
    }
};
exports.default = MainWorkerConfig;
