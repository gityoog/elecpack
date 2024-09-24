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
const electron_builder_1 = __importDefault(require("../../config/electron-builder"));
const electron_builder_2 = require("electron-builder");
const fs_1 = require("fs");
const output_1 = __importDefault(require("../../config/output"));
const electron_1 = __importDefault(require("electron"));
const path_1 = __importDefault(require("path"));
let ElectronBuilderProcess = class ElectronBuilderProcess {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.isEnabled()) {
                (0, fs_1.writeFileSync)(this.output.resolve('package.json'), JSON.stringify({
                    name: this.config.getName(),
                    version: this.config.getVersion(),
                    main: './main/main.js'
                }, null, 2));
                let electronVersion;
                try {
                    const electronPath = electron_1.default;
                    const packageJson = (0, fs_1.readFileSync)(path_1.default.resolve(electronPath, '../..', 'package.json'), 'utf8');
                    const { version } = JSON.parse(packageJson);
                    electronVersion = version;
                }
                catch (e) {
                    console.error(e);
                }
                return yield (0, electron_builder_2.build)({
                    targets: this.config.getTargets(),
                    projectDir: this.config.getProjectDir(),
                    config: Object.assign(Object.assign({ removePackageScripts: true, buildDependenciesFromSource: false, npmRebuild: false, compression: 'store', nodeGypRebuild: false, asar: false, win: {
                            target: 'portable'
                        }, electronVersion }, this.config.getConfiguration()), { directories: {
                            output: 'output',
                        }, files: [
                            '**/*',
                            '!output/**/*'
                        ] })
                });
            }
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", electron_builder_1.default)
], ElectronBuilderProcess.prototype, "config", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", output_1.default)
], ElectronBuilderProcess.prototype, "output", void 0);
ElectronBuilderProcess = __decorate([
    (0, ioc_di_1.Service)()
], ElectronBuilderProcess);
exports.default = ElectronBuilderProcess;
