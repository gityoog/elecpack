import WebpackBuilder from "../../../common/webpack-builder";
import HtmlWebpackPlugin from "html-webpack-plugin";
type options = {
    context: string;
    assets?: string | {
        from: string;
        to: string;
    };
    define?: Record<string, any>;
    configFile?: string | string[];
    bytecode?: WebpackBuilder.Bytecode;
    skipDefConfigFile?: boolean;
};
type fileOptions = options & {
    entry: Record<string, string>;
};
type htmlOptions = options & {
    entry: Record<string, {
        entry: string | string[];
        html: HtmlWebpackPlugin.Options;
    }>;
};
declare class WebpackBuilderBaseConfig {
    private def;
    private outputConfig;
    private context?;
    private entry?;
    private assets?;
    private define?;
    private output?;
    private configFile;
    private bytecode?;
    constructor(def: {
        name: string;
        config?: string;
        output?: string;
    });
    private setBaseOptions;
    protected setFileOptions(options: fileOptions): void;
    protected setHtmlOptions(options: htmlOptions): void;
    private getBaseOptions;
    protected getFileOptions(): WebpackBuilder.FileOptions;
    protected getHtmlOptions(): WebpackBuilder.HtmlOptions;
}
declare namespace WebpackBuilderBaseConfig {
    type FileOptions = fileOptions;
    type HtmlOptions = htmlOptions;
}
export default WebpackBuilderBaseConfig;
