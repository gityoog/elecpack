import { Inject, Service } from "@gityoog/ioc-di"
import ElectronBuilderConfig from "./electron-builder"
import MainConfig from "./main"
import PreloadConfig from "./preload"
import RendererConfig from "./renderer"
import FilesConfig from "./files"
import OutputConfig from "./output"
import Logger from "../common/logger"

type options = {
  main: MainConfig.Options
  preload: PreloadConfig.Options
  renderer: RendererConfig.Options
  files?: FilesConfig.Options
  electronBuilder?: ElectronBuilderConfig.Options
  output?: OutputConfig.Options
  logger?: Logger.Options
}

@Service()
class Config {
  @Inject() private main!: MainConfig
  @Inject() private preload!: PreloadConfig
  @Inject() private renderer!: RendererConfig
  @Inject() private files!: FilesConfig
  @Inject() private electronBuilder!: ElectronBuilderConfig
  @Inject() private output!: OutputConfig
  @Inject() private logger!: Logger

  setOptions(options: options) {
    this.logger.configure({
      appenders: {
        console: { type: 'console' },
        file: { type: 'file', filename: 'logs/app.log' }
      },
      categories: {
        default: { appenders: ['file'], level: 'debug' }
      },
      ...options.logger
    })
    this.main.setOptions(options.main)
    this.preload.setOptions(options.preload)
    this.renderer.setOptions(options.renderer)
    this.files.setOptions(options.files || {})
    if (options.electronBuilder) {
      this.electronBuilder.setOptions(options.electronBuilder)
    }
    if (options.output) {
      this.output.setOptions(options.output)
    }

  }
}

namespace Config {
  export type Options = options
}

export default Config