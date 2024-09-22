import WebpackDispatch from "../../webpack-dispatch";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackDevServer from 'webpack-dev-server';
type htmlEntry = Record<string, {
    entry: string | string[];
    html: HtmlWebpackPlugin.Options;
}>;
type fileEntry = Record<string, string | string[]>;
type bytecode = boolean | 'all' | 'production' | 'development';
type options = {
    context: string;
    config: string | string[];
    output: string;
    bytecode?: bytecode;
    define?: Record<string, any>;
    assets?: {
        from: string;
        to: string;
    } | string;
};
type htmlOptions = options & {
    entry: htmlEntry;
};
type fileOptions = options & {
    entry: fileEntry;
};
type configFile = {
    base?(): Promise<Configuration> | Configuration;
    development?(): Promise<Configuration> | Configuration;
    production?(): Promise<Configuration> | Configuration;
    devServer?(): Promise<WebpackDevServer.Configuration> | WebpackDevServer.Configuration;
};
declare namespace WebpackBuilderRunner {
    type ConfigFile = configFile;
    type HtmlOptions = htmlOptions;
    type FileOptions = fileOptions;
    type Bytecode = bytecode;
}
declare class WebpackBuilderRunner {
    private compiler?;
    private watching?;
    private server?;
    dispatch: WebpackDispatch;
    watch(options: fileOptions): Promise<Record<string, string>>;
    compile(options: fileOptions): Promise<Record<string, string>>;
    devServer(options: htmlOptions): Promise<Record<string, string>>;
    compileHtml(options: htmlOptions): Promise<Record<string, string>>;
    private buildHtmlCompiler;
    private getDevSeverConfig;
    private buildCompiler;
    stop(): Promise<void>;
}
export default WebpackBuilderRunner;
