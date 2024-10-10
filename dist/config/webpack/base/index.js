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
Object.defineProperty(exports, "__esModule", { value: true });
const anydi_1 = require("anydi");
const output_1 = __importDefault(require("../../output"));
let WebpackBuilderBaseConfig = class WebpackBuilderBaseConfig {
    constructor(def) {
        this.def = def;
        this.configFile = [];
    }
    setBaseOptions(options) {
        this.context = options.context;
        this.assets = options.assets;
        this.define = options.define;
        this.output = this.outputConfig.resolve(this.def.output || this.def.name);
        this.bytecode = options.bytecode;
        this.configFile = [];
        if (!options.skipDefConfigFile && this.def.config) {
            this.configFile.push(this.def.config);
        }
        if (options.configFile) {
            this.configFile = this.configFile.concat(options.configFile);
        }
    }
    setFileOptions(options) {
        this.setBaseOptions(options);
        this.entry = options.entry;
    }
    setHtmlOptions(options) {
        this.setBaseOptions(options);
        this.entry = options.entry;
    }
    getBaseOptions() {
        const define = {};
        if (this.define) {
            for (const key in this.define) {
                define[key] = JSON.stringify(this.define[key]);
            }
        }
        return {
            context: this.context,
            output: this.output,
            assets: this.assets,
            define: this.define ? define : undefined,
            config: this.configFile,
            bytecode: this.bytecode
        };
    }
    getFileOptions() {
        return Object.assign(Object.assign({}, this.getBaseOptions()), { entry: this.entry });
    }
    getHtmlOptions() {
        return Object.assign(Object.assign({}, this.getBaseOptions()), { entry: this.entry });
    }
};
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", output_1.default)
], WebpackBuilderBaseConfig.prototype, "outputConfig", void 0);
WebpackBuilderBaseConfig = __decorate([
    (0, anydi_1.Service)(),
    __metadata("design:paramtypes", [Object])
], WebpackBuilderBaseConfig);
exports.default = WebpackBuilderBaseConfig;
