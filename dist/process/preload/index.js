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
const webpack_builder_1 = __importDefault(require("../../common/webpack-builder"));
const preload_1 = __importDefault(require("../../config/preload"));
let PreloadProcess = class PreloadProcess {
    constructor() {
        this.builder = new webpack_builder_1.default("preload");
    }
    start(watch) {
        return __awaiter(this, void 0, void 0, function* () {
            if (watch) {
                return yield this.builder.watch(this.config.getOptions());
            }
            else {
                return yield this.builder.compile(this.config.getOptions());
            }
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.builder.stop();
        });
    }
};
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", preload_1.default)
], PreloadProcess.prototype, "config", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", Object)
], PreloadProcess.prototype, "builder", void 0);
PreloadProcess = __decorate([
    (0, anydi_1.Service)()
], PreloadProcess);
exports.default = PreloadProcess;
