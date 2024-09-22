"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainCommon = {
    ENV_KEY: 'ELECPACK_MAIN_ENV',
    DEFINE_KEY: 'ELECPACK_MAIN_DEFINE',
    getEnv() {
        return process.env.ELECPACK_MAIN_ENV;
    },
    getDefine() {
        try {
            const text = process.env.ELECPACK_MAIN_DEFINE;
            if (text) {
                return JSON.parse(text);
            }
        }
        catch (e) {
            console.error(e);
        }
        return {};
    }
};
exports.default = MainCommon;
