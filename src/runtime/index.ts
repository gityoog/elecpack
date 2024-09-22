import path from 'path'
import MainCommon from '../common/main'

const options: {
  mode: 'url' | 'file'
  preload: Record<string, string>
  renderer: Record<string, string>
  files: Record<string, string>
  assets?: string
} = {
  mode: 'url',
  preload: {},
  renderer: {},
  files: {}
}
try {
  const text = MainCommon.getEnv()
  if (text) {
    const env = JSON.parse(text) as typeof options
    options.mode = env.mode || 'url'
    options.preload = env.preload
    options.renderer = env.renderer
    options.files = env.files
    options.assets = env.assets
  }
} catch (e) {
  console.error(e)
}


const ElecpackRuntime = {
  define: MainCommon.getDefine(),
  isDev() {
    return options.mode === 'url'
  },
  getRenderer(name: string) {
    return options.renderer[name]
  },
  getPreload(name: string) {
    return options.preload[name]
  },
  getFilePath(name: string) {
    return options.files[name]
  },
  resolveAssets(filename: string) {
    return options.assets ? path.resolve(options.assets, filename) : filename
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
    if (options.mode === 'url') {
      return bw.loadURL(renderer)
    } else if (options.mode === 'file') {
      return bw.loadFile(renderer)
    }
  }
}

export default ElecpackRuntime