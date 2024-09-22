"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RendererBuildConfig = {
    base() {
        return {
            resolve: {
                extensions: [".js", ".ts", ".json"]
            },
            externals: {
                electron: 'window.electron',
                'worker_threads': 'window.worker_threads',
                'child_process': 'window.child_process',
            }
        };
    }
};
exports.default = RendererBuildConfig;
