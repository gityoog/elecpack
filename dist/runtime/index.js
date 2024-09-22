"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("../common/main"));
const Env = main_1.default.getEnv();
const ElecpackRuntime = {
    define: main_1.default.getDefine(),
    isDev() {
        return Env.mode === 'url';
    },
    getRenderer(name) {
        return Env.renderer[name];
    },
    getPreload(name) {
        return Env.preload[name];
    },
    getFiles(name) {
        return Env.files[name];
    },
    getAssets(filename) {
        return Env.assets ? path_1.default.resolve(Env.assets, filename) : filename;
    },
    load({ name, hash }, bw) {
        const suffix = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
        const renderer = this.getRenderer(name) + suffix;
        if (Env.mode === 'url') {
            return bw.loadURL(renderer);
        }
        else if (Env.mode === 'file') {
            return bw.loadFile(renderer);
        }
    }
};
exports.default = ElecpackRuntime;
