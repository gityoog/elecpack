import { Service } from "@gityoog/ioc-di"
import WebpackBuilderFileConfig from "../webpack/file"

@Service()
class PreloadConfig extends WebpackBuilderFileConfig {
  constructor() {
    super({ name: 'preload', config: require.resolve('./config') })
  }
}
namespace PreloadConfig {
  export type Options = WebpackBuilderFileConfig.Options
}
export default PreloadConfig