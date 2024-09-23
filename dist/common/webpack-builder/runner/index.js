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
const webpack_dispatch_1 = __importDefault(require("../../webpack-dispatch"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_merge_1 = __importDefault(require("webpack-merge"));
const path_1 = __importDefault(require("path"));
const bytenode_webpack_plugin_1 = require("@herberttn/bytenode-webpack-plugin");
const copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
class WebpackBuilderRunner {
    constructor() {
        this.dispatch = new webpack_dispatch_1.default;
    }
    watch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            process.env.test = JSON.stringify(options.config);
            this.compiler = yield this.buildCompiler({ options, configuration: { entry: options.entry }, mode: 'development' });
            const result = {
                emit: false,
                data: Object.keys(options.entry).reduce((acc, key) => (acc[key] = path_1.default.resolve(options.output, key + '.js'), acc), {}),
                promise: new Promise((resolve, reject) => {
                    this.watching = this.compiler.watch({}, (err, stats) => {
                        if (!result.emit) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(result.data);
                            }
                        }
                    });
                })
            };
            return result.promise;
        });
    }
    compile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            process.env.test = JSON.stringify(options.config);
            this.compiler = yield this.buildCompiler({ options, configuration: { entry: options.entry }, mode: 'production' });
            const files = Object.keys(options.entry).reduce((acc, key) => (acc[key] = path_1.default.resolve(options.output, key + '.js'), acc), {});
            return this.handleCompile(files);
        });
    }
    devServer(options) {
        return __awaiter(this, void 0, void 0, function* () {
            process.env.test = JSON.stringify(options.config);
            const config = yield this.getDevSeverConfig(options);
            const entries = yield this.buildHtmlCompiler(options, 'development');
            const host = config.host || '127.0.0.1';
            const port = yield webpack_dev_server_1.default.getFreePort(config.port || 30000, host);
            this.server = new webpack_dev_server_1.default(Object.assign(Object.assign({}, config), { host, port }), this.compiler);
            yield this.server.start();
            return entries.reduce((acc, item) => (acc[item.name] = `http://${host}:${port}/${item.url}`, acc), {});
        });
    }
    compileHtml(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const entries = yield this.buildHtmlCompiler(options, 'production');
            const files = entries.reduce((acc, item) => (acc[item.name] = path_1.default.resolve(options.output, item.url), acc), {});
            return this.handleCompile(files);
        });
    }
    handleCompile(files) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.compiler.run((err, stats) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        if (stats && stats.hasErrors()) {
                            reject(new Error(stats.toString({
                                colors: false,
                                modules: false,
                                children: false,
                                chunks: false,
                                chunkModules: false,
                                entrypoints: false
                            })));
                        }
                        else {
                            resolve(files);
                        }
                    }
                });
            });
        });
    }
    buildHtmlCompiler(options, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            const entry = options.entry;
            const entries = Object.keys(entry).map(key => {
                const filename = (entry[key].html.filename = entry[key].html.filename || key + '.html');
                entry[key].html.chunks = [key];
                return {
                    name: key,
                    entry: entry[key].entry,
                    html: entry[key].html,
                    url: filename
                };
            });
            this.compiler = yield this.buildCompiler({
                options, configuration: {
                    entry: entries.reduce((acc, item) => (acc[item.name] = item.entry, acc), {}),
                    plugins: entries.map(({ html }) => new html_webpack_plugin_1.default(Object.assign({ inject: true, minify: {
                            removeComments: true,
                            collapseWhitespace: false,
                            removeAttributeQuotes: false
                        }, scriptLoading: 'blocking', chunksSortMode: 'manual' }, html)))
                }, mode
            });
            return entries;
        });
    }
    getDevSeverConfig(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const { config } = options;
            const configFiles = Array.isArray(config) ? config : [config];
            let webpackDevServer = {};
            for (const file of configFiles) {
                const module = require(file).default;
                webpackDevServer = (0, webpack_merge_1.default)(webpackDevServer, module.devServer ? yield module.devServer() : {});
            }
            return webpackDevServer;
        });
    }
    buildCompiler(_a) {
        return __awaiter(this, arguments, void 0, function* ({ options: { config, bytecode, define, assets, context, output }, configuration, mode }) {
            const configFiles = Array.isArray(config) ? config : [config];
            let webpackConfig = {};
            for (const file of configFiles) {
                const module = require(file).default;
                webpackConfig = (0, webpack_merge_1.default)(webpackConfig, module.base ? yield module.base() : {}, mode === 'development' && module.development ? yield module.development() : {}, mode === 'production' && module.production ? yield module.production() : {});
            }
            const plugins = [this.dispatch];
            if (mode === 'production' && bytecode || bytecode === 'all' || bytecode === mode) {
                plugins.push(new bytenode_webpack_plugin_1.BytenodeWebpackPlugin({
                    compileForElectron: true,
                }));
            }
            if (define) {
                plugins.push(new webpack_1.default.DefinePlugin(define));
            }
            if (assets) {
                const pattern = typeof assets === 'string' ? { from: assets, to: assets } : assets;
                plugins.push(new copy_webpack_plugin_1.default({
                    patterns: [pattern]
                }));
            }
            return (0, webpack_1.default)((0, webpack_merge_1.default)({
                ignoreWarnings: [
                    /Critical dependency: the request of a dependency is an expression/,
                ]
            }, webpackConfig, {
                mode,
                plugins,
                context,
                output: {
                    path: output,
                    filename: '[name].js',
                    clean: true
                }
            }, configuration));
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (this.server) {
                    yield this.server.stop();
                }
                if (this.watching) {
                    yield new Promise((resolve, reject) => {
                        this.watching.close((err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                }
                if (this.compiler) {
                    yield new Promise((resolve, reject) => {
                        this.compiler.close((err) => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                }
                resolve();
            }));
        });
    }
}
exports.default = WebpackBuilderRunner;
