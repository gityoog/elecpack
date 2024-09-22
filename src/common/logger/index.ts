import log4js from 'log4js'

class Logger {
  configure(config: log4js.Configuration) {
    log4js.configure(config)
  }
  getLogger(category?: string) {
    return log4js.getLogger(category)
  }
  private normalizeMessage(message: any, ...args: any[]) {
    const data = [message, ...args]
    const result: string[] = []
    while (data.length > 0) {
      const item = data.shift()
      if (typeof item === 'string') {
        result.push(item.replace(/\x1B\[\d+m/g, '').replace(/[\n\r]+/g, ' ').trim())
      } else if (Array.isArray(item)) {
        data.unshift(...item)
      } else {
        data.unshift(String(item))
      }
    }
    return result.join(' ')
  }
  debug(category: string, message: any, ...args: any[]) {
    this.getLogger(category).debug(this.normalizeMessage(message, ...args))
  }
  info(category: string, message: any, ...args: any[]) {
    this.getLogger(category).info(this.normalizeMessage(message, ...args))
  }
  warn(category: string, message: any, ...args: any[]) {
    this.getLogger(category).warn(this.normalizeMessage(message, ...args))
  }
  error(category: string, message: any, ...args: any[]) {
    this.getLogger(category).error(this.normalizeMessage(message, ...args))
  }
}

namespace Logger {
  export type Options = log4js.Configuration
}

export default Logger 