"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_protocol_1 = require("../../../../common/rpc-protocol");
const MainTypeCheckerRpc = new rpc_protocol_1.WorkerRpcProtocol(require.resolve('../child'));
exports.default = MainTypeCheckerRpc;
