import WebpackBuilderBaseConfig from "../base"

class WebpackBuilderFileConfig extends WebpackBuilderBaseConfig {

  setOptions(options: WebpackBuilderBaseConfig.FileOptions) {
    this.setFileOptions(options)
  }

  getOptions() {
    return this.getFileOptions()
  }
}
namespace WebpackBuilderFileConfig {
  export type Options = WebpackBuilderBaseConfig.FileOptions
}
export default WebpackBuilderFileConfig