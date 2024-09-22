type Env = {
    mode: 'url' | 'file';
    preload: Record<string, string>;
    renderer: Record<string, string>;
    files: Record<string, string>;
    assets?: string;
};
declare const MainCommon: {
    ENV_KEY: string;
    DEFINE_KEY: string;
    getEnv(): Env;
    getDefine(): ELECPACK_MAIN_DEFINE;
};
declare global {
    interface ELECPACK_MAIN_DEFINE {
    }
}
export default MainCommon;
