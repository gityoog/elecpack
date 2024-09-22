import boxen from "boxen"
import { ChildProcess, ChildProcessWithoutNullStreams } from "child_process"
import cliTruncate from 'cli-truncate'
import BaseLog from "./base"
import LogLine from "../line"
import Logger from "../../logger"

export default class ProcessConsole extends BaseLog {
  private status = false
  private line = new LogLine({ limit: 20, timeout: 0 })
  private logger!: Logger

  constructor(private name: string) {
    super()
    this.line.onUpdate(() => {
      this.update()
    })
  }
  setLogger(logger: Logger) {
    this.logger = logger
  }
  run() {
    this.logger.debug(this.name, 'run')
    this.status = true
    this.update()
  }
  exit(code: number | null) {
    this.logger.debug(this.name, 'exit', code)
    this.status = false
    this.line.clear()
    this.update()
  }
  stdout(data: Buffer) {
    this.logger.debug(this.name, 'stdout', data.toString())
    this.line.add(data.toString())
  }
  stderr(data: Buffer) {
    this.logger.debug(this.name, 'stderr', data.toString())
    this.line.add(data.toString(), { warning: true, timeout: 0 })
  }
  apply(child: ChildProcessWithoutNullStreams) {
    this.run()
    child.stdout?.on('data', (data) => {
      this.stdout(data)
    })
    child.stderr.on('data', (data) => {
      this.stderr(data)
    })
    child.on('exit', (code) => {
      this.exit(code)
    })
  }
  render() {
    return this.status && this.line.data.length > 0 ? boxen(
      this.line.data.map(({ content }) => {
        return cliTruncate(content, process.stdout.columns ? process.stdout.columns - 10 : 80)
      }).join('\n')
      , {
        padding: { left: 1, right: 1, top: 0, bottom: 0 },
        margin: { top: 1 },
        title: this.name,
      }) : ''
  }
  destroy() {
    this.logger = null!
    this.line.destroy()
    super.destroy()
  }
}