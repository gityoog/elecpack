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
const webpack_builder_1 = __importDefault(require("../../../common/webpack-builder"));
const main_1 = __importDefault(require("../../../config/main"));
let MainProdProcess = class MainProdProcess {
    constructor() {
        this.builder = new webpack_builder_1.default("main");
    }
    build(_a) {
        return __awaiter(this, arguments, void 0, function* ({ preload, renderer, files }) {
            return this.builder.compile(this.config.getFileOptions({ preload, renderer, files }));
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.builder.stop();
        });
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", main_1.default)
], MainProdProcess.prototype, "config", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", Object)
], MainProdProcess.prototype, "builder", void 0);
MainProdProcess = __decorate([
    (0, ioc_di_1.Service)()
], MainProdProcess);
exports.default = MainProdProcess;
