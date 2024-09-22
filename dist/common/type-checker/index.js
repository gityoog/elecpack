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
const fork_ts_checker_1 = __importDefault(require("../fork-ts-checker"));
const webpack_dispatch_1 = __importDefault(require("../webpack-dispatch"));
const webpack_1 = __importDefault(require("webpack"));
class TypeChecker {
    constructor() {
        this.dispatch = new webpack_dispatch_1.default;
    }
    run(_a) {
        return __awaiter(this, arguments, void 0, function* ({ context, output }) {
            this.compiler = (0, webpack_1.default)({
                stats: 'errors-only',
                entry: ['test'],
                mode: 'development',
                output: {
                    path: output
                },
                context,
                plugins: [
                    new fork_ts_checker_1.default(),
                    new webpack_1.default.IgnorePlugin({
                        resourceRegExp: /test/
                    })
                ]
            });
            this.dispatch.apply(this.compiler);
            return new Promise((resolve, reject) => {
                this.compiler.watch({}, (err, stats) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                if (this.compiler) {
                    this.compiler.close(() => {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = TypeChecker;
