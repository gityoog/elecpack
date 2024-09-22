import WebpackBuilderRunner from "./runner";
declare class WebpackBuilder {
    private terminal;
    private logger;
    private console;
    private builder;
    private category;
    constructor(name: string);
    private init;
    devServer(options: WebpackBuilder.HtmlOptions): Promise<any>;
    compileHtml(options: WebpackBuilder.HtmlOptions): Promise<any>;
    compile(options: WebpackBuilder.FileOptions): Promise<any>;
    watch(options: WebpackBuilder.FileOptions): Promise<any>;
    stop(): Promise<void>;
}
declare namespace WebpackBuilder {
    type ConfigFile = WebpackBuilderRunner.ConfigFile;
    type HtmlOptions = WebpackBuilderRunner.HtmlOptions;
    type FileOptions = WebpackBuilderRunner.FileOptions;
    type Bytecode = WebpackBuilderRunner.Bytecode;
}
export default WebpackBuilder;
