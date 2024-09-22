import { Service } from "@gityoog/ioc-di"
import WebpackBuilderHtmlConfig from "../webpack/html"

@Service()
class RendererConfig extends WebpackBuilderHtmlConfig {
  constructor() {
    super({ name: 'renderer', config: require.resolve('./config') })
  }
}
namespace RendererConfig {
  export type Options = WebpackBuilderHtmlConfig.Options
}
export default RendererConfig