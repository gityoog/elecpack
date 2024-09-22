import WebpackBuilderHtmlConfig from "../webpack/html";
declare class RendererConfig extends WebpackBuilderHtmlConfig {
    constructor();
}
declare namespace RendererConfig {
    type Options = WebpackBuilderHtmlConfig.Options;
}
export default RendererConfig;
