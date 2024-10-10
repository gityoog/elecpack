import { Inject, Service } from "anydi"
import MainTypeCheckerRpc from "./rpc"
import MainConfig from "../../../config/main"
import Terminal from "../../../common/terminal"
import WebpackConsole from "../../../common/terminal/impl/webpack"

@Service()
export default class MainTypeChecker {
  @Inject() private config!: MainConfig
  @Inject() private terminal!: Terminal
  private console = new WebpackConsole('main-checker')
  private checker = MainTypeCheckerRpc.Nullable

  async start() {
    this.checker = MainTypeCheckerRpc.main({
      stdin: true,
      stdout: true,
    })
    this.checker.on('run', () => {
      this.console.clear()
    })
    this.checker.stdout?.on('data', (data) => {
      this.console.stdout(data)
    })
    this.checker.stderr?.on('data', (data) => {
      this.console.stderr(data)
    })
    this.terminal.register(this.console)
    return await this.checker.invoke('start', {
      context: this.config.getContext(),
      output: this.config.getCheckerOutput()
    })
  }

  async stop() {
    this.terminal.unRegister(this.console)
    await this.checker?.invoke('stop')
    this.checker?.destroy()
  }
}