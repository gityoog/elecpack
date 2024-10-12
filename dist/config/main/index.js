"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MainConfig_1;
Object.defineProperty(exports, "__esModule", { value: true });
const anydi_1 = require("anydi");
const path_1 = __importDefault(require("path"));
const main_1 = __importDefault(require("../../common/main"));
const electron_1 = __importDefault(require("electron"));
const output_1 = __importDefault(require("../output"));
let MainConfig = MainConfig_1 = class MainConfig {
    constructor() {
        this.checker = true;
        this.configFile = [];
        this.electron = electron_1.default;
    }
    setOptions(options) {
        this.context = options.context;
        this.entry = options.entry;
        this.assets = options.assets;
        this.define = options.define;
        this.checker = options.checker !== false;
        this.output = this.outputConfig.resolve(MainConfig_1.MAIN);
        this.bytecode = options.bytecode;
        this.configFile = (options.skipDefConfigFile ? [] : [require.resolve('./config')]).concat(options.configFile || []);
        if (options.electron) {
            this.electron = options.electron;
        }
    }
    getElectron() {
        return this.electron;
    }
    hasChecker() {
        return this.checker;
    }
    getContext() {
        return this.context;
    }
    getEntry() {
        return path_1.default.resolve(this.context, this.entry);
    }
    getAssets() {
        return this.assets;
    }
    getDefine() {
        return this.define || {};
    }
    getCheckerOutput() {
        return path_1.default.resolve(this.output, 'checker');
    }
    relative(files) {
        const result = {};
        for (const key in files) {
            result[key] = path_1.default.relative(this.output, files[key]);
        }
        return result;
    }
    getFileOptions({ preload, renderer, files }) {
        const define = {
            [`process.env.${MainConfig_1.DEFINE_KEY}`]: JSON.stringify(JSON.stringify(this.define || {})),
            [`process.env.${MainConfig_1.ENV_KEY}`]: `(() => {
          const path = require('path')
          const root = __dirname
          function prefix(obj) {
            for(const key in obj) {
              obj[key] = path.resolve(root, obj[key])
            }
            return obj
          }
          const preload = prefix(${JSON.stringify(this.relative(preload))})
          const renderer = prefix(${JSON.stringify(this.relative(renderer))})
          const files = prefix(${JSON.stringify(this.relative(files))})
          return JSON.stringify({
            mode: 'file',
            preload,
            renderer,
            files,
            assets: ${JSON.stringify(this.assets !== undefined)} ? 
              path.resolve(root, 'assets')
            : undefined
          })
        })()`
        };
        return {
            context: this.context,
            entry: { [MainConfig_1.MAIN]: this.getEntry() },
            output: this.output,
            assets: this.assets ? {
                from: this.assets,
                to: 'assets'
            } : undefined,
            define,
            bytecode: this.bytecode,
            config: this.configFile
        };
    }
};
MainConfig.ENV_KEY = main_1.default.ENV_KEY;
MainConfig.DEFINE_KEY = main_1.default.DEFINE_KEY;
MainConfig.MAIN = 'main';
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", output_1.default)
], MainConfig.prototype, "outputConfig", void 0);
MainConfig = MainConfig_1 = __decorate([
    (0, anydi_1.Service)(),
    __metadata("design:paramtypes", [])
], MainConfig);
exports.default = MainConfig;
