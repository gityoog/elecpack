import { Inject, Service } from "anydi"
import WebpackBuilder from "../../../common/webpack-builder"
import MainConfig from "../../../config/main"

@Service()
export default class MainProdProcess {
  @Inject() private config!: MainConfig
  @Inject() private builder = new WebpackBuilder("main")

  async build({ preload, renderer, files }: {
    preload: Record<string, string>,
    renderer: Record<string, string>,
    files: Record<string, string>,
  }) {
    return this.builder.compile(this.config.getFileOptions({ preload, renderer, files }))
  }

  async stop() {
    await this.builder.stop()
  }
}