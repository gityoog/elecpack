import { StatsCompilation } from "webpack"
import boxen from "boxen"
import BaseLog from "./base"
import LogLine from "../line"

export default class WebpackConsole extends BaseLog {
  private building = false
  private progress = {
    percent: 0,
    msg: ""
  }
  private line = new LogLine
  constructor(private name: string) {
    super()
    this.line.onUpdate(() => {
      this.update()
    })
  }
  run() {
    this.line.clear()
    this.building = true
    this.update()
  }
  done(stat?: StatsCompilation) {
    if (stat) {
      if (stat.warnings?.length) {
        this.line.add(stat.warnings.map(item => item.message).join('\n'))
      }
      if (stat.errors?.length) {
        this.line.add(stat.errors.map(item => item.message).join('\n'), { timeout: 0 })
      }
    }
    this.building = false
    this.update()
  }
  process(percent: number, msg: string) {
    // this.log(percent + 'msg:' + msg)
    this.progress.percent = Math.round(percent * 100)
    this.progress.msg = msg
    this.update()
  }
  error(err: Error) {
    this.building = false
    this.line.add(err.message, { timeout: 0 })
    this.update()
  }
  clear() {
    this.line.clear()
  }
  stdout(data: Buffer | string) {
    this.line.add(data.toString())
  }
  stderr(data: Buffer) {
    this.line.add(data.toString(), { timeout: 0 })
  }
  render() {
    if (this.line.data.length > 0 || this.building) {
      let result = ''
      const lineText = this.line.data.map(({ content }) => {
        return content
      }).join('\n')
      if (this.building) {
        const bar = genBar(this.progress.percent, 50)
        if (this.progress.msg) {
          result += bar + "\n" + this.progress.msg
        } else {
          result += bar
        }
        if (lineText) {
          result += "\n" + lineText
        }
      } else {
        result += lineText
      }
      return boxen(result, {
        padding: { left: 1, right: 1, top: 0, bottom: 0 },
        margin: { top: 1 },
        title: this.name,
      })
    }
    return ""
  }
  override destroy() {
    this.line.destroy()
    super.destroy()
  }
}

function genBar(precent: number, width: number) {
  const bar = new Array(width).fill('\u2591')
  const fill = Math.min(width, Math.floor((precent / 100) * width))
  for (let i = 0; i < fill; i++) {
    bar[i] = '\u2588'
  }
  return `\u001b[90m${bar.join('')}\u001b[0m ${precent}%`
}