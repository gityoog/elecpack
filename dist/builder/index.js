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
const build_1 = __importDefault(require("./build"));
const config_1 = __importDefault(require("../config"));
const dev_1 = __importDefault(require("./dev"));
let ElecpackBuilder = class ElecpackBuilder {
    constructor(options) {
        this.options = options;
        this.init();
    }
    init() {
        this.config.setOptions(this.options);
    }
    startDev() {
        return this.dev.start();
    }
    startBuild() {
        return this.build.start();
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", config_1.default)
], ElecpackBuilder.prototype, "config", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", dev_1.default)
], ElecpackBuilder.prototype, "dev", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", build_1.default)
], ElecpackBuilder.prototype, "build", void 0);
__decorate([
    ioc_di_1.Already,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ElecpackBuilder.prototype, "init", null);
ElecpackBuilder = __decorate([
    (0, ioc_di_1.Root)(),
    (0, ioc_di_1.Service)(),
    __metadata("design:paramtypes", [Object])
], ElecpackBuilder);
exports.default = ElecpackBuilder;
