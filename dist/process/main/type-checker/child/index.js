"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_checker_1 = __importDefault(require("../../../../common/type-checker"));
const rpc_1 = __importDefault(require("../rpc"));
const checker = new type_checker_1.default();
const rpc = rpc_1.default.child();
rpc.handle('start', (data) => checker.run(data));
rpc.handle('stop', () => checker.stop());
checker.dispatch.onRun(() => {
    rpc.send('run');
});
