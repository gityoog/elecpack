"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainCommon = {
    ENV_KEY: 'ELECPACK_MAIN_ENV',
    DEFINE_KEY: 'ELECPACK_MAIN_DEFINE',
    getEnv() {
        const env = {
            mode: 'url',
            preload: {},
            renderer: {},
            files: {}
        };
        try {
            const inject = process.env.ELECPACK_MAIN_ENV;
            if (inject) {
                const result = JSON.parse(inject);
                Object.assign(env, result);
            }
        }
        catch (e) {
            console.error(e);
        }
        return env;
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
