import { Inject, Service } from "@gityoog/ioc-di"
import Logger from "../logger"
import WebpackBuilderRunner from "./runner"
import WebpackBuilderRpc from "./rpc"
import WebpackConsole from "../terminal/impl/webpack"
import Terminal from "../terminal"

@Service()
class WebpackBuilder {
  @Inject() private terminal!: Terminal
  @Inject() private logger!: Logger
  private console: WebpackConsole
  private builder = WebpackBuilderRpc.Nullable
  private category
  constructor(name: string) {
    this.category = 'webpack.' + name
    this.console = new WebpackConsole(name)
  }

  private async init() {
    this.terminal.register(this.console)
    this.builder = WebpackBuilderRpc.main({
      stderr: true,
      stdout: true
    })
    this.builder.stdout.on('data', (data) => {
      this.logger.info(this.category, 'stdout', data.toString())
      this.console.stdout(data)
    })
    this.builder.stderr.on('data', (data) => {
      this.logger.warn(this.category, 'stderr', data.toString())
      this.console.stderr(data)
    })
    this.builder.on('process', (percent, msg) => {
      // this.logger.debug(this.category, 'dev preload process', percent, msg)
      this.console.process(percent, msg)
    })
    this.builder.on('error', (err) => {
      this.logger.debug(this.category, `error`, err)
      this.console.error(err)
    })
    this.builder.on('run', () => {
      this.logger.debug(this.category, 'run')
      this.console.run()
    })
    this.builder.on('done', stat => {
      this.logger.debug(this.category, 'done', stat?.warnings?.map(item => item.message), stat?.errors?.map(item => item.message))
      this.console.done(stat)
    })
  }

  async devServer(options: WebpackBuilder.HtmlOptions) {
    await this.init()
    return await this.builder!.invoke('devServer', options)
  }

  async compileHtml(options: WebpackBuilder.HtmlOptions) {
    await this.init()
    return await this.builder!.invoke('compileHtml', options)
  }

  async compile(options: WebpackBuilder.FileOptions) {
    await this.init()
    return await this.builder!.invoke('compile', options)
  }

  async watch(options: WebpackBuilder.FileOptions) {
    await this.init()
    return await this.builder!.invoke('watch', options)
  }

  async stop() {
    this.terminal.unRegister(this.console)
    await this.builder?.invoke('stop')
    this.builder?.destroy()
  }
}

namespace WebpackBuilder {
  export type ConfigFile = WebpackBuilderRunner.ConfigFile
  export type HtmlOptions = WebpackBuilderRunner.HtmlOptions
  export type FileOptions = WebpackBuilderRunner.FileOptions
  export type Bytecode = WebpackBuilderRunner.Bytecode
}

export default WebpackBuilder