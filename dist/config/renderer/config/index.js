"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RendererBuildConfig = {
    base() {
        return {
            resolve: {
                extensions: [".js", ".ts", ".json"]
            },
            externals: ({ request }, callback) => {
                const commonjs2 = {
                    electron: 'window.electron',
                    'worker_threads': 'commonjs2 worker_threads',
                    'child_process': 'commonjs2 child_process',
                };
                if (request && commonjs2[request]) {
                    return callback(undefined, commonjs2[request]);
                }
                if (request && /^node\:/.test(request)) {
                    return callback(undefined, 'commonjs2 ' + request.slice(5));
                }
                callback();
            },
        };
    }
};
exports.default = RendererBuildConfig;
