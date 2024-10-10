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
const anydi_1 = require("anydi");
const files_1 = __importDefault(require("../../process/files"));
const prod_1 = __importDefault(require("../../process/main/prod"));
const preload_1 = __importDefault(require("../../process/preload"));
const renderer_1 = __importDefault(require("../../process/renderer"));
const electron_builder_1 = __importDefault(require("../../process/electron-builder"));
const output_1 = __importDefault(require("../../config/output"));
const rimraf_1 = require("rimraf");
let ElecpackBuild = class ElecpackBuild {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const time = Date.now();
            yield (0, rimraf_1.rimraf)(this.output.resolve());
            const [preload, renderer, files] = yield Promise.all([
                this.preload.start(),
                this.renderer.start(),
                this.files.start()
            ]);
            yield this.main.build({
                preload,
                renderer,
                files
            });
            yield this.preload.stop();
            yield this.renderer.stop();
            yield this.files.stop();
            yield this.main.stop();
            const result = yield this.electronBuilder.start();
            console.log('\nBuild success time:', Math.round((Date.now() - time) / 100) / 10 + 's');
            return {
                result,
                output: this.output.resolve()
            };
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.preload.stop(),
                this.renderer.stop(),
                this.files.stop(),
                this.main.stop(),
                this.electronBuilder.stop()
            ]);
        });
    }
};
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", output_1.default)
], ElecpackBuild.prototype, "output", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", prod_1.default)
], ElecpackBuild.prototype, "main", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", preload_1.default)
], ElecpackBuild.prototype, "preload", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", renderer_1.default)
], ElecpackBuild.prototype, "renderer", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", files_1.default)
], ElecpackBuild.prototype, "files", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", electron_builder_1.default)
], ElecpackBuild.prototype, "electronBuilder", void 0);
ElecpackBuild = __decorate([
    (0, anydi_1.Service)()
], ElecpackBuild);
exports.default = ElecpackBuild;
