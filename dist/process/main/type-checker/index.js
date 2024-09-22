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
const rpc_1 = __importDefault(require("./rpc"));
const main_1 = __importDefault(require("../../../config/main"));
const terminal_1 = __importDefault(require("../../../common/terminal"));
const webpack_1 = __importDefault(require("../../../common/terminal/impl/webpack"));
let MainTypeChecker = class MainTypeChecker {
    constructor() {
        this.console = new webpack_1.default('main-checker');
        this.checker = rpc_1.default.Nullable;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this.checker = rpc_1.default.main({
                stdin: true,
                stdout: true,
            });
            this.checker.on('run', () => {
                this.console.clear();
            });
            (_a = this.checker.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
                this.console.stdout(data);
            });
            (_b = this.checker.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (data) => {
                this.console.stderr(data);
            });
            this.terminal.register(this.console);
            return yield this.checker.invoke('start', {
                context: this.config.getContext(),
                output: this.config.getCheckerOutput()
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this.terminal.unRegister(this.console);
            yield ((_a = this.checker) === null || _a === void 0 ? void 0 : _a.invoke('stop'));
            (_b = this.checker) === null || _b === void 0 ? void 0 : _b.destroy();
        });
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", main_1.default)
], MainTypeChecker.prototype, "config", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", terminal_1.default)
], MainTypeChecker.prototype, "terminal", void 0);
MainTypeChecker = __decorate([
    (0, ioc_di_1.Service)()
], MainTypeChecker);
exports.default = MainTypeChecker;
