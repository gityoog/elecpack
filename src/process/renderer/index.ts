import { Inject, Service } from "anydi"
import WebpackBuilder from "../../common/webpack-builder"
import RendererConfig from "../../config/renderer"

@Service()
export default class RendererProcess {
  @Inject() private config!: RendererConfig

  @Inject() private builder = new WebpackBuilder("renderer")

  async start(devServer?: boolean) {
    if (devServer) {
      return await this.builder.devServer(this.config.getOptions())
    } else {
      return await this.builder.compileHtml(this.config.getOptions())
    }
  }

  async stop() {
    await this.builder.stop()
  }
}