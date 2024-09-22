import WebpackBuilderBaseConfig from "../base";
declare class WebpackBuilderHtmlConfig extends WebpackBuilderBaseConfig {
    setOptions(options: WebpackBuilderBaseConfig.HtmlOptions): void;
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
            [x: string]: {
                entry: string | string[];
                html: import("html-webpack-plugin").Options;
            };
        };
    };
}
declare namespace WebpackBuilderHtmlConfig {
    type Options = WebpackBuilderBaseConfig.HtmlOptions;
}
export default WebpackBuilderHtmlConfig;
