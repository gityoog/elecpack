import path from 'path'
import MainCommon from '../common/main'

const Env = MainCommon.getEnv()

const ElecpackRuntime = {
  define: MainCommon.getDefine(),
  isDev() {
    return Env.mode === 'url'
  },
  getRenderer(name: string) {
    return Env.renderer[name]
  },
  getPreload(name: string) {
    return Env.preload[name]
  },
  getFiles(name: string) {
    return Env.files[name]
  },
  getAssets(filename: string) {
    return Env.assets ? path.resolve(Env.assets, filename) : filename
  },
  load({ name, hash }: {
    name: string
    hash?: string
  }, bw: {
    loadURL(url: string): Promise<void>
    loadFile(filePath: string): Promise<void>
  }) {
    const suffix = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : ''
    const renderer = this.getRenderer(name) + suffix
    if (Env.mode === 'url') {
      return bw.loadURL(renderer)
    } else if (Env.mode === 'file') {
      return bw.loadFile(renderer)
    }
  }
}

export default ElecpackRuntime