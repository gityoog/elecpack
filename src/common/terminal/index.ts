import logUpdate from 'log-update'
import debounce from 'lodash.debounce'
import BaseConsole from './impl/base'

export default class Terminal {
  private data: {
    console: BaseConsole
    cancel: () => void
  }[] = []

  constructor() {
    process.on('SIGWINCH', () => {
      this.render()
    })

  }

  unRegister(console: BaseConsole) {
    const index = this.data.findIndex(item => item.console === console)
    if (index > -1) {
      this.data[index].cancel()
      this.data.splice(index, 1)
    }
  }

  register(console: BaseConsole) {
    this.data.push({
      console,
      cancel: console.onUpdate(() => {
        this.render()
      })
    })
  }

  private render = debounce(() => {
    logUpdate(
      this.data.map(item => item.console.render().trim()).filter(v => v).join('\n') +
      this.data.map(item => item.console.getLog().trim()).filter(v => v).join('\n')
    )
  })

  destroy() {
    this.render.cancel()
    this.data.forEach(item => {
      item.console.destroy()
    })
    // logUpdate.clear()
  }
}