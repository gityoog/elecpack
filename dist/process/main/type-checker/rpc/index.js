"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_1 = __importDefault(require("some-rpc/worker"));
const MainTypeCheckerRpc = new worker_1.default(require.resolve('../child'));
exports.default = MainTypeCheckerRpc;
