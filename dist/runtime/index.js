"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("../common/main"));
const options = {
    mode: 'url',
    preload: {},
    renderer: {},
    files: {}
};
try {
    const text = main_1.default.getEnv();
    if (text) {
        const env = JSON.parse(text);
        options.mode = env.mode || 'url';
        options.preload = env.preload;
        options.renderer = env.renderer;
        options.files = env.files;
        options.assets = env.assets;
    }
}
catch (e) {
    console.error(e);
}
const ElecpackRuntime = {
    define: main_1.default.getDefine(),
    isDev() {
        return options.mode === 'url';
    },
    getRenderer(name) {
        return options.renderer[name];
    },
    getPreload(name) {
        return options.preload[name];
    },
    getFilePath(name) {
        return options.files[name];
    },
    resolveAssets(filename) {
        return options.assets ? path_1.default.resolve(options.assets, filename) : filename;
    },
    load({ name, hash }, bw) {
        const suffix = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
        const renderer = this.getRenderer(name) + suffix;
        if (options.mode === 'url') {
            return bw.loadURL(renderer);
        }
        else if (options.mode === 'file') {
            return bw.loadFile(renderer);
        }
    }
};
exports.default = ElecpackRuntime;
