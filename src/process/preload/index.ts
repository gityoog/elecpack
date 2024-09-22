import { Inject, Service } from "@gityoog/ioc-di"
import WebpackBuilder from "../../common/webpack-builder"
import PreloadConfig from "../../config/preload"

@Service()
export default class PreloadProcess {
  @Inject() private config!: PreloadConfig
  @Inject() private builder = new WebpackBuilder("preload")

  async start(watch?: boolean) {
    if (watch) {
      return await this.builder.watch(this.config.getOptions())
    } else {
      return await this.builder.compile(this.config.getOptions())
    }
  }

  async stop() {
    await this.builder.stop()
  }
}