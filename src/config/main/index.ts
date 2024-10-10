import { Inject, Service } from "anydi"
import WebpackBuilder from "../../common/webpack-builder"
import path from "path"
import MainCommon from "../../common/main"
import electron from "electron"
import OutputConfig from "../output"

type options = {
  electron?: string
  context: string
  entry: string
  checker?: boolean
  assets?: string
  define?: Record<string, any>
  bytecode?: boolean | 'all' | 'production' | 'development'
  configFile?: string | string[]
}

@Service()
class MainConfig {
  static ENV_KEY = MainCommon.ENV_KEY
  static DEFINE_KEY = MainCommon.DEFINE_KEY
  static MAIN = 'main'

  @Inject() private outputConfig!: OutputConfig

  private context?: string
  private entry?: string
  private assets?: string
  private define?: Record<string, any>
  private checker = true
  private bytecode?: WebpackBuilder.Bytecode
  private output!: string
  private configFile: string[] = []
  private electron: string
  constructor() {
    this.electron = electron as unknown as string
  }
  setOptions(options: options) {
    this.context = options.context
    this.entry = options.entry
    this.assets = options.assets
    this.define = options.define
    this.checker = options.checker !== false
    this.output = this.outputConfig.resolve(MainConfig.MAIN)
    this.bytecode = options.bytecode
    this.configFile = [require.resolve('./config')].concat(options.configFile || [])
    if (options.electron) {
      this.electron = options.electron
    }
  }

  getElectron() {
    return this.electron
  }

  hasChecker() {
    return this.checker
  }

  getContext() {
    return this.context!
  }

  getEntry() {
    return path.resolve(this.context!, this.entry!)
  }

  getAssets() {
    return this.assets
  }

  getDefine() {
    return this.define || {}
  }

  getCheckerOutput() {
    return path.resolve(this.output, 'checker')
  }
  relative(files: Record<string, string>) {
    const result: Record<string, string> = {}
    for (const key in files) {
      result[key] = path.relative(this.output, files[key])
    }
    return result
  }
  getFileOptions({ preload, renderer, files }: {
    preload: Record<string, string>,
    renderer: Record<string, string>,
    files: Record<string, string>
  }): WebpackBuilder.FileOptions {
    const define = {
      [`process.env.${MainConfig.DEFINE_KEY}`]: JSON.stringify(JSON.stringify(this.define || {})),
      [`process.env.${MainConfig.ENV_KEY}`]: `(() => {
          const path = require('path')
          const root = __dirname
          function prefix(obj) {
            for(const key in obj) {
              obj[key] = path.resolve(root, obj[key])
            }
            return obj
          }
          const preload = prefix(${JSON.stringify(this.relative(preload))})
          const renderer = prefix(${JSON.stringify(this.relative(renderer))})
          const files = prefix(${JSON.stringify(this.relative(files))})
          return JSON.stringify({
            mode: 'file',
            preload,
            renderer,
            files,
            assets: ${JSON.stringify(this.assets !== undefined)} ? 
              path.resolve(root, 'assets')
            : undefined
          })
        })()`
    }
    return {
      context: this.context!,
      entry: { [MainConfig.MAIN]: this.getEntry() },
      output: this.output,
      assets: this.assets ? {
        from: this.assets,
        to: 'assets'
      } : undefined,
      define,
      bytecode: this.bytecode,
      config: this.configFile
    }
  }
}

namespace MainConfig {
  export type Options = options
}

export default MainConfig