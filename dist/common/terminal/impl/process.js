"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boxen_1 = __importDefault(require("boxen"));
const cli_truncate_1 = __importDefault(require("cli-truncate"));
const base_1 = __importDefault(require("./base"));
const line_1 = __importDefault(require("../line"));
class ProcessConsole extends base_1.default {
    constructor(name) {
        super();
        this.name = name;
        this.status = false;
        this.line = new line_1.default({ limit: 20, timeout: 0 });
        this.line.onUpdate(() => {
            this.update();
        });
    }
    setLogger(logger) {
        this.logger = logger;
    }
    run() {
        this.logger.debug(this.name, 'run');
        this.status = true;
        this.update();
    }
    exit(code) {
        this.logger.debug(this.name, 'exit', code);
        this.status = false;
        this.line.clear();
        this.update();
    }
    stdout(data) {
        this.logger.debug(this.name, 'stdout', data.toString());
        this.line.add(data.toString());
    }
    stderr(data) {
        this.logger.debug(this.name, 'stderr', data.toString());
        this.line.add(data.toString(), { warning: true, timeout: 0 });
    }
    apply(child) {
        var _a;
        this.run();
        (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
            this.stdout(data);
        });
        child.stderr.on('data', (data) => {
            this.stderr(data);
        });
        child.on('exit', (code) => {
            this.exit(code);
        });
    }
    render() {
        return this.status && this.line.data.length > 0 ? (0, boxen_1.default)(this.line.data.map(({ content }) => {
            return (0, cli_truncate_1.default)(content, process.stdout.columns ? process.stdout.columns - 10 : 80);
        }).join('\n'), {
            padding: { left: 1, right: 1, top: 0, bottom: 0 },
            margin: { top: 1 },
            title: this.name,
        }) : '';
    }
    destroy() {
        this.logger = null;
        this.line.destroy();
        super.destroy();
    }
}
exports.default = ProcessConsole;
