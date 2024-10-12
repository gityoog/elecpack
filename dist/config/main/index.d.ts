import WebpackBuilder from "../../common/webpack-builder";
type options = {
    electron?: string;
    context: string;
    entry: string;
    checker?: boolean;
    assets?: string;
    define?: Record<string, any>;
    bytecode?: boolean | 'all' | 'production' | 'development';
    configFile?: string | string[];
    skipDefConfigFile?: boolean;
};
declare class MainConfig {
    static ENV_KEY: string;
    static DEFINE_KEY: string;
    static MAIN: string;
    private outputConfig;
    private context?;
    private entry?;
    private assets?;
    private define?;
    private checker;
    private bytecode?;
    private output;
    private configFile;
    private electron;
    constructor();
    setOptions(options: options): void;
    getElectron(): string;
    hasChecker(): boolean;
    getContext(): string;
    getEntry(): string;
    getAssets(): string | undefined;
    getDefine(): Record<string, any>;
    getCheckerOutput(): string;
    relative(files: Record<string, string>): Record<string, string>;
    getFileOptions({ preload, renderer, files }: {
        preload: Record<string, string>;
        renderer: Record<string, string>;
        files: Record<string, string>;
    }): WebpackBuilder.FileOptions;
}
declare namespace MainConfig {
    type Options = options;
}
export default MainConfig;
