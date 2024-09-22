import webpack, { Compiler, Stats, StatsError } from 'webpack'

export default class WebpackDispatch {
  private _onRun: (() => void)[] = []
  private _onDone: ((stat?: Stats) => void)[] = []
  private _onError: ((err: Error) => void)[] = []
  private _onProcess: ((percent: number, msg: string) => void)[] = []
  private run() {
    this._onRun.forEach(fn => fn())
  }
  private done(stat?: Stats) {
    this._onDone.forEach(fn => fn(stat))
  }
  private error(err: Error) {
    this._onError.forEach(fn => fn(err))
  }
  private process(percent: number, msg: string) {
    this._onProcess.forEach(fn => fn(percent, msg))
  }
  apply(compiler: Compiler) {
    new webpack.ProgressPlugin((percent, msg, module) => {
      this.process(percent, msg + ' ' + (module || ''))
    }).apply(compiler)
    compiler.hooks.compile.tap('WebpackDispatch', () => {
      this.run()
    })
    compiler.hooks.done.tap('WebpackDispatch', (stat) => {
      this.done(stat)
    })
    compiler.hooks.failed.tap('WebpackDispatch', (err) => {
      this.error(err)
    })
  }
  onRun(fn: () => void) {
    this._onRun.push(fn)
  }
  onDone(fn: (stat?: Stats) => void) {
    this._onDone.push(fn)
  }
  onError(fn: (err: Error) => void) {
    this._onError.push(fn)
  }
  onProcess(fn: (percent: number, msg: string) => void) {
    this._onProcess.push(fn)
  }
  destroy() {
    this._onDone = []
    this._onError = []
    this._onProcess = []
  }
}