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
const logger_1 = __importDefault(require("../logger"));
const rpc_1 = __importDefault(require("./rpc"));
const webpack_1 = __importDefault(require("../terminal/impl/webpack"));
const terminal_1 = __importDefault(require("../terminal"));
let WebpackBuilder = class WebpackBuilder {
    constructor(name) {
        this.builder = rpc_1.default.Nullable;
        this.category = 'webpack.' + name;
        this.console = new webpack_1.default(name);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.terminal.register(this.console);
            this.builder = rpc_1.default.main({
                stderr: true,
                stdout: true
            });
            this.builder.stdout.on('data', (data) => {
                this.logger.info(this.category, 'stdout', data.toString());
                this.console.stdout(data);
            });
            this.builder.stderr.on('data', (data) => {
                this.logger.warn(this.category, 'stderr', data.toString());
                this.console.stderr(data);
            });
            this.builder.on('process', (percent, msg) => {
                // this.logger.debug(this.category, 'dev preload process', percent, msg)
                this.console.process(percent, msg);
            });
            this.builder.on('error', (err) => {
                this.logger.debug(this.category, `error`, err);
                this.console.error(err);
            });
            this.builder.on('run', () => {
                this.logger.debug(this.category, 'run');
                this.console.run();
            });
            this.builder.on('done', stat => {
                var _a, _b;
                this.logger.debug(this.category, 'done', (_a = stat === null || stat === void 0 ? void 0 : stat.warnings) === null || _a === void 0 ? void 0 : _a.map(item => item.message), (_b = stat === null || stat === void 0 ? void 0 : stat.errors) === null || _b === void 0 ? void 0 : _b.map(item => item.message));
                this.console.done(stat);
            });
        });
    }
    devServer(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return yield this.builder.invoke('devServer', options);
        });
    }
    compileHtml(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return yield this.builder.invoke('compileHtml', options);
        });
    }
    compile(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return yield this.builder.invoke('compile', options);
        });
    }
    watch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return yield this.builder.invoke('watch', options);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this.terminal.unRegister(this.console);
            yield ((_a = this.builder) === null || _a === void 0 ? void 0 : _a.invoke('stop'));
            (_b = this.builder) === null || _b === void 0 ? void 0 : _b.destroy();
        });
    }
};
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", terminal_1.default)
], WebpackBuilder.prototype, "terminal", void 0);
__decorate([
    (0, ioc_di_1.Inject)(),
    __metadata("design:type", logger_1.default)
], WebpackBuilder.prototype, "logger", void 0);
WebpackBuilder = __decorate([
    (0, ioc_di_1.Service)(),
    __metadata("design:paramtypes", [String])
], WebpackBuilder);
exports.default = WebpackBuilder;
