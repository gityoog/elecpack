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
const electron_builder_1 = require("electron-builder");
const output_1 = __importDefault(require("../output"));
let ElectronBuilderConfig = class ElectronBuilderConfig {
    constructor() {
        this.enabled = false;
        this.configuration = {};
        this.name = '';
        this.version = '';
    }
    setOptions(options) {
        this.enabled = true;
        this.configuration = options.configuration || {};
        this.name = options.name;
        this.version = options.version;
        this.targets = options.targets;
    }
    isEnabled() {
        return this.enabled;
    }
    getProjectDir() {
        return this.outputConfig.resolve();
    }
    getTargets() {
        return this.targets || electron_builder_1.Platform.current().createTarget();
    }
    getConfiguration() {
        return this.configuration;
    }
    getName() {
        return this.name;
    }
    getVersion() {
        return this.version;
    }
};
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", output_1.default)
], ElectronBuilderConfig.prototype, "outputConfig", void 0);
ElectronBuilderConfig = __decorate([
    (0, anydi_1.Service)()
], ElectronBuilderConfig);
exports.default = ElectronBuilderConfig;
