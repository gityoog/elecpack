"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronRpcProtocol = exports.ForkRpcProtocol = exports.WorkerRpcProtocol = void 0;
const fork_1 = __importDefault(require("./fork"));
exports.ForkRpcProtocol = fork_1.default;
const worker_1 = __importDefault(require("./worker"));
exports.WorkerRpcProtocol = worker_1.default;
const electron_1 = __importDefault(require("./electron"));
exports.ElectronRpcProtocol = electron_1.default;
