import path from "path"

type options = {
  path?: string
}
class OutputConfig {
  private path: string = path.resolve(process.cwd(), './dist')
  setOptions(options: options) {
    if (options.path) {
      this.path = options.path
    }
  }

  getPath() {
    return this.path
  }

  resolve(...args: string[]) {
    return path.resolve(this.path, ...args)
  }
}

namespace OutputConfig {
  export type Options = options
}

export default OutputConfig