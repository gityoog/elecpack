import { spawn, ChildProcessWithoutNullStreams } from 'child_process'
import Watchpack from 'watchpack'
import { Inject, Service } from 'anydi'
import Logger from '../../../common/logger'
import MainConfig from '../../../config/main'
import Terminal from '../../../common/terminal'
import MainTypeChecker from '../../../process/main/type-checker'
import ProcessConsole from '../../../common/terminal/impl/process'

@Service()
export default class MainDevProcess {
  @Inject() private logger!: Logger
  @Inject() private terminal!: Terminal
  @Inject() private config!: MainConfig
  @Inject() private checker!: MainTypeChecker

  private console = new ProcessConsole("main")
  private watcher = new Watchpack({})

  private env: {
    files: Record<string, string>
    preload: Record<string, string>
    renderer: Record<string, string>
  } = {
      files: {},
      preload: {},
      renderer: {}
    }
  start(env: {
    files: Record<string, string>
    preload: Record<string, string>
    renderer: Record<string, string>
  }) {
    if (this.config.hasChecker()) {
      this.checker.start()
    }
    this.env = env
    this.watcher.watch({
      files: Object.keys(env.preload).map((key) => env.preload[key])
        .concat(Object.keys(env.files).map((key) => env.files[key]))
      , //.concat(this.config.getFileDeps()),
      directories: [this.config.getContext()] //.concat(this.config.getMainFolderDeps())
    })
    this.watcher.on('aggregated', (changes, removals) => {
      this.logger.debug('main', 'file aggregated')
      this.reload()
    })
    this.console.setLogger(this.logger)
    this.terminal.register(this.console)
    this.onStop(() => {
      this.terminal.unRegister(this.console)
      this.checker.stop()
    })
    this.run()
  }
  private reload() {
    if (this.status) {
      this.restart = true
      if (this.child?.pid) {
        this.logger.debug('main', 'kill', this.child.pid)
        this.child.kill()
      }
    } else {
      this.run()
    }
  }
  private status = false
  private restart = false
  private child: ChildProcessWithoutNullStreams | null = null
  private run() {
    const bootsharp = require.resolve('./bootsharp')
    const entry = this.config.getEntry()
    const electronPath = this.config.getElectron()
    this.logger.debug('main', 'start', electronPath, bootsharp, entry)
    this.child = spawn(electronPath, [bootsharp, entry], {
      stdio: 'pipe',
      env: {
        [MainConfig.DEFINE_KEY]: JSON.stringify(this.config.getDefine()),
        [MainConfig.ENV_KEY]: JSON.stringify({
          assets: this.config.getAssets(),
          preload: this.env.preload,
          files: this.env.files,
          renderer: this.env.renderer
        })
      }
    })
    this.console.apply(this.child)
    this.status = true
    this.child.on('exit', (code) => {
      this.child = null
      this.status = false
      if (this.restart) {
        this.restart = false
        this.run()
      } else {
        this.finish()
      }
    })
  }
  private _onStop: Array<() => void> = []
  private finish() {
    this.watcher.close()
    this._onStop.forEach((callback) => callback())
  }
  onStop(callback: () => void) {
    this._onStop.push(callback)
  }
  stop() {
    this.child?.kill()
  }
}