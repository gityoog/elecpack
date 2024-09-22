export default abstract class BaseConsole {
  abstract render(): string
  private _onUpdate: (() => void)[] = []
  protected update() {
    this._onUpdate.forEach(callback => callback())
  }
  private _log: string[] = []
  getLog() {
    return this._log.join('\n')
  }
  log(msg: string) {
    this._log.push(msg)
    this.update()
  }
  onUpdate(callback: () => void) {
    this._onUpdate.push(callback)
    return () => {
      const index = this._onUpdate.indexOf(callback)
      if (index > -1) {
        this._onUpdate.splice(index, 1)
      }
    }
  }
  destroy() {
    this._onUpdate = []
  }
}