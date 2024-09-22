import debounce from "lodash.debounce"
import logSymbols from "log-symbols"

export default class LogLine {
  private options
  constructor({ timeout = 5 * 1000, limit = 6 }: {
    timeout?: number
    limit?: number
  } = {}) {
    this.options = { timeout, limit }
  }
  data: {
    content: string
    time?: number
  }[] = []
  add(content: string, { warning, timeout = this.options.timeout }: {
    warning?: boolean
    timeout?: number
  } = {}) {
    content = content.trim().replace(/(\n\r?)+$/g, '\n').replace(/\r*/g, "").trim()
    if (!content) return
    if (warning) {
      content = logSymbols.warning + " " + content
    }
    const data = content.split('\n')
    data.forEach((content) => {
      this.data.push({ content, time: timeout ? Date.now() + timeout : undefined })
      if (this.data.length > this.options.limit) {
        this.data.shift()
      }
    })
    this.update()
  }
  clear() {
    if (this.data.length > 0) {
      this.data = []
      this.update()
    }
  }
  private next = debounce(() => this.filter(), 100)
  private filter() {
    const time = Date.now()
    const state = {
      next: false,
      update: false
    }
    this.data = this.data.filter(item => {
      if (item.time) {
        if (time > item.time) {
          state.update = true
          return false
        } else {
          state.next = true
          return true
        }
      }
      return true
    })
    if (state.next) {
      this.next()
    }
    if (state.update) {
      this.update()
    }
  }
  private _onUpdate: Array<() => void> = []
  onUpdate(cb: () => void) {
    this._onUpdate.push(cb)
  }
  private update() {
    this.next()
    this._onUpdate.forEach(cb => cb())
  }
  destroy() {
    this._onUpdate = []
    this.next.cancel()
  }
}