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
const child_process_1 = require("child_process");
const watchpack_1 = __importDefault(require("watchpack"));
const anydi_1 = require("anydi");
const logger_1 = __importDefault(require("../../../common/logger"));
const main_1 = __importDefault(require("../../../config/main"));
const terminal_1 = __importDefault(require("../../../common/terminal"));
const type_checker_1 = __importDefault(require("../../../process/main/type-checker"));
const process_1 = __importDefault(require("../../../common/terminal/impl/process"));
let MainDevProcess = class MainDevProcess {
    constructor() {
        this.console = new process_1.default("main");
        this.watcher = new watchpack_1.default({});
        this.env = {
            files: {},
            preload: {},
            renderer: {}
        };
        this.status = false;
        this.restart = false;
        this.child = null;
        this._onStop = [];
    }
    start(env) {
        if (this.config.hasChecker()) {
            this.checker.start();
        }
        this.env = env;
        this.watcher.watch({
            files: Object.keys(env.preload).map((key) => env.preload[key])
                .concat(Object.keys(env.files).map((key) => env.files[key])), //.concat(this.config.getFileDeps()),
            directories: [this.config.getContext()] //.concat(this.config.getMainFolderDeps())
        });
        this.watcher.on('aggregated', (changes, removals) => {
            this.logger.debug('main', 'file aggregated');
            this.reload();
        });
        this.console.setLogger(this.logger);
        this.terminal.register(this.console);
        this.onStop(() => {
            this.terminal.unRegister(this.console);
            this.checker.stop();
        });
        this.run();
    }
    reload() {
        var _a;
        if (this.status) {
            this.restart = true;
            if ((_a = this.child) === null || _a === void 0 ? void 0 : _a.pid) {
                this.logger.debug('main', 'kill', this.child.pid);
                this.child.kill();
            }
        }
        else {
            this.run();
        }
    }
    run() {
        const bootsharp = require.resolve('./bootsharp');
        const entry = this.config.getEntry();
        const electronPath = this.config.getElectron();
        this.logger.debug('main', 'start', electronPath, bootsharp, entry);
        this.child = (0, child_process_1.spawn)(electronPath, [bootsharp, entry], {
            stdio: 'pipe',
            env: {
                [main_1.default.DEFINE_KEY]: JSON.stringify(this.config.getDefine()),
                [main_1.default.ENV_KEY]: JSON.stringify({
                    assets: this.config.getAssets(),
                    preload: this.env.preload,
                    files: this.env.files,
                    renderer: this.env.renderer
                })
            }
        });
        this.console.apply(this.child);
        this.status = true;
        this.child.on('exit', (code) => {
            this.child = null;
            this.status = false;
            if (this.restart) {
                this.restart = false;
                this.run();
            }
            else {
                this.finish();
            }
        });
    }
    finish() {
        this.watcher.close();
        this._onStop.forEach((callback) => callback());
    }
    onStop(callback) {
        this._onStop.push(callback);
    }
    stop() {
        var _a;
        (_a = this.child) === null || _a === void 0 ? void 0 : _a.kill();
    }
};
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", logger_1.default)
], MainDevProcess.prototype, "logger", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", terminal_1.default)
], MainDevProcess.prototype, "terminal", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", main_1.default)
], MainDevProcess.prototype, "config", void 0);
__decorate([
    (0, anydi_1.Inject)(),
    __metadata("design:type", type_checker_1.default)
], MainDevProcess.prototype, "checker", void 0);
MainDevProcess = __decorate([
    (0, anydi_1.Service)()
], MainDevProcess);
exports.default = MainDevProcess;
