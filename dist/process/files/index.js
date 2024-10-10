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
const files_1 = __importDefault(require("../../config/files"));
let FilesProcess = class FilesProcess {
    constructor() {
        this.builders = [];
    }
    start(watch) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = this.config.getOptions();
            const result = yield Promise.all(options.map((item) => __awaiter(this, void 0, void 0, function* () {
                const builder = (0, anydi_1.DiFrom)(this).for(() => new webpack_builder_1.default(item.name));
                this.builders.push(builder);
                return {
                    name: item.name,
                    result: watch ? yield builder.watch(item.options) : yield builder.compile(item.options)
                };
            })));
            return result.reduce((acc, { name, result }) => {
                acc[name] = result[files_1.default.main];
                return acc;
            }, {});
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.builders.map(builder => builder.stop()));
        });
    }
};
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", files_1.default)
], FilesProcess.prototype, "config", void 0);
FilesProcess = __decorate([
    (0, anydi_1.Service)()
], FilesProcess);
exports.default = FilesProcess;
