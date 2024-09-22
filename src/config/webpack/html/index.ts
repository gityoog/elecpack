import WebpackBuilderBaseConfig from "../base"

class WebpackBuilderHtmlConfig extends WebpackBuilderBaseConfig {

  setOptions(options: WebpackBuilderBaseConfig.HtmlOptions) {
    this.setHtmlOptions(options)
  }

  getOptions() {
    return this.getHtmlOptions()
  }
}
namespace WebpackBuilderHtmlConfig {
  export type Options = WebpackBuilderBaseConfig.HtmlOptions
}
export default WebpackBuilderHtmlConfig