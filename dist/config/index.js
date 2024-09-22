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
const ioc_di_1 = require("@gityoog/ioc-di");
const electron_builder_1 = __importDefault(require("./electron-builder"));
const main_1 = __importDefault(require("./main"));
const preload_1 = __importDefault(require("./preload"));
const renderer_1 = __importDefault(require("./renderer"));
const files_1 = __importDefault(require("./files"));
const output_1 = __importDefault(require("./output"));
const logger_1 = __importDefault(require("../common/logger"));
let Config = class Config {
    setOptions(options) {
        this.logger.configure(Object.assign({ appenders: {
                console: { type: 'console' },
                file: { type: 'file', filename: 'logs/app.log' }
            }, categories: {
                default: { appenders: ['file'], level: 'debug' }
            } }, options.logger));
        this.main.setOptions(options.main);
        this.preload.setOptions(options.preload);
        this.renderer.setOptions(options.renderer);
        this.files.setOptions(options.files || {});
        if (options.electronBuilder) {
            this.electronBuilder.setOptions(options.electronBuilder);
        }
        if (options.output) {
            this.output.setOptions(options.output);
        }
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", main_1.default)
], Config.prototype, "main", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", preload_1.default)
], Config.prototype, "preload", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", renderer_1.default)
], Config.prototype, "renderer", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", files_1.default)
], Config.prototype, "files", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", electron_builder_1.default)
], Config.prototype, "electronBuilder", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", output_1.default)
], Config.prototype, "output", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", logger_1.default)
], Config.prototype, "logger", void 0);
Config = __decorate([
    (0, ioc_di_1.Service)()
], Config);
exports.default = Config;
