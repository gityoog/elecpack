import { Inject, Service, ToType } from "@gityoog/ioc-di"
import WebpackBuilder from "../../../common/webpack-builder"
import HtmlWebpackPlugin from "html-webpack-plugin"
import OutputConfig from "../../output"

type options = {
  context: string
  assets?: string | { from: string, to: string }
  define?: Record<string, any>
  configFile?: string | string[]
  bytecode?: WebpackBuilder.Bytecode
  skipDefConfigFile?: boolean
}

type fileOptions = options & {
  entry: Record<string, string>
}

type htmlOptions = options & {
  entry: Record<string, {
    entry: string | string[]
    html: HtmlWebpackPlugin.Options
  }>
}

@Service()
class WebpackBuilderBaseConfig {
  @Inject() private outputConfig!: OutputConfig

  private context?: string
  private entry?: Record<string, string> | Record<string, {
    entry: string | string[]
    html: HtmlWebpackPlugin.Options
  }>
  private assets?: string | { from: string, to: string }
  private define?: Record<string, any>
  private output?: string
  private configFile: string[] = []
  private bytecode?: WebpackBuilder.Bytecode

  constructor(private def: {
    name: string
    config?: string
    output?: string
  }) {

  }

  private setBaseOptions(options: options) {
    this.context = options.context
    this.assets = options.assets
    this.define = options.define
    this.output = this.outputConfig.resolve(this.def.output || this.def.name)
    this.bytecode = options.bytecode

    this.configFile = []
    if (!options.skipDefConfigFile && this.def.config) {
      this.configFile.push(this.def.config)
    }
    if (options.configFile) {
      this.configFile = this.configFile.concat(options.configFile)
    }
  }
  protected setFileOptions(options: fileOptions) {
    this.setBaseOptions(options)
    this.entry = options.entry
  }

  protected setHtmlOptions(options: htmlOptions) {
    this.setBaseOptions(options)
    this.entry = options.entry
  }

  private getBaseOptions() {
    return {
      context: this.context!,
      output: this.output!,
      assets: this.assets,
      define: this.define,
      config: this.configFile,
      bytecode: this.bytecode
    }
  }

  protected getFileOptions(): WebpackBuilder.FileOptions {
    return {
      ...this.getBaseOptions(),
      entry: this.entry as Record<string, string>,
    }
  }

  protected getHtmlOptions(): WebpackBuilder.HtmlOptions {
    return {
      ...this.getBaseOptions(),
      entry: this.entry as Record<string, { entry: string | string[], html: HtmlWebpackPlugin.Options }>
    }
  }
}

namespace WebpackBuilderBaseConfig {
  export type FileOptions = fileOptions
  export type HtmlOptions = htmlOptions
}

export default WebpackBuilderBaseConfig