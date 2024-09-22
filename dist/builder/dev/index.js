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
const ioc_di_1 = require("@gityoog/ioc-di");
const files_1 = __importDefault(require("../../process/files"));
const dev_1 = __importDefault(require("../../process/main/dev"));
const preload_1 = __importDefault(require("../../process/preload"));
const renderer_1 = __importDefault(require("../../process/renderer"));
const output_1 = __importDefault(require("../../config/output"));
const rimraf_1 = require("rimraf");
let ElecpackDev = class ElecpackDev {
    constructor() {
        this.init();
    }
    init() {
        this.main.onStop(() => {
            this.preload.stop();
            this.renderer.stop();
            this.files.stop();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, rimraf_1.rimraf)(this.output.resolve());
            const [preload, renderer, files] = yield Promise.all([
                this.preload.start(true),
                this.renderer.start(true),
                this.files.start(true)
            ]);
            this.main.start({
                preload,
                renderer,
                files
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            this.main.stop();
        });
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", output_1.default)
], ElecpackDev.prototype, "output", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", dev_1.default)
], ElecpackDev.prototype, "main", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", preload_1.default)
], ElecpackDev.prototype, "preload", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", renderer_1.default)
], ElecpackDev.prototype, "renderer", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", files_1.default)
], ElecpackDev.prototype, "files", void 0);
__decorate([
    ioc_di_1.Already,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ElecpackDev.prototype, "init", null);
ElecpackDev = __decorate([
    (0, ioc_di_1.Service)(),
    __metadata("design:paramtypes", [])
], ElecpackDev);
exports.default = ElecpackDev;
