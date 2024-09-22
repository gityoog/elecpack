declare const MainCommon: {
    ENV_KEY: string;
    DEFINE_KEY: string;
    getEnv(): string | undefined;
    getDefine(): ELECPACK_MAIN_DEFINE;
};
declare global {
    interface ELECPACK_MAIN_DEFINE {
    }
}
export default MainCommon;
