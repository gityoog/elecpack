import WebpackBuilderBaseConfig from "../base";
declare class WebpackBuilderFileConfig extends WebpackBuilderBaseConfig {
    setOptions(options: WebpackBuilderBaseConfig.FileOptions): void;
    getOptions(): {
        context: string;
        config: string | string[];
        output: string;
        bytecode?: boolean | "all" | "production" | "development";
        define?: Record<string, any>;
        assets?: {
            from: string;
            to: string;
        } | string;
    } & {
        entry: {
            [x: string]: string | string[];
        };
    };
}
declare namespace WebpackBuilderFileConfig {
    type Options = WebpackBuilderBaseConfig.FileOptions;
}
export default WebpackBuilderFileConfig;
