"use strict";
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
const rpc_1 = __importDefault(require("../rpc"));
const runner_1 = __importDefault(require("../runner"));
const runner = new runner_1.default();
const rpc = rpc_1.default.child();
rpc.handle('compile', options => runner.compile(options));
rpc.handle('watch', options => runner.watch(options));
rpc.handle('devServer', options => runner.devServer(options));
rpc.handle('compileHtml', options => runner.compileHtml(options));
rpc.handle('stop', () => __awaiter(void 0, void 0, void 0, function* () {
    yield runner.stop();
    rpc.destroy();
}));
runner.dispatch.onRun(() => {
    rpc.send('run');
});
runner.dispatch.onDone(stat => {
    rpc.send('done', stat === null || stat === void 0 ? void 0 : stat.toJson());
});
runner.dispatch.onError(err => {
    rpc.send('error', err);
});
runner.dispatch.onProcess((percent, msg) => {
    rpc.send('process', percent, msg);
});
