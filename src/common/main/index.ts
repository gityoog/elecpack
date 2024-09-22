type Env = {
  mode: 'url' | 'file'
  preload: Record<string, string>
  renderer: Record<string, string>
  files: Record<string, string>
  assets?: string
}

const MainCommon = {
  ENV_KEY: 'ELECPACK_MAIN_ENV',
  DEFINE_KEY: 'ELECPACK_MAIN_DEFINE',
  getEnv() {
    const env: Env = {
      mode: 'url',
      preload: {},
      renderer: {},
      files: {}
    }
    try {
      const inject = process.env.ELECPACK_MAIN_ENV
      if (inject) {
        const result = JSON.parse(inject) as Env
        Object.assign(env, result)
      }
    } catch (e) {
      console.error(e)
    }
    return env
  },
  getDefine() {
    try {
      const text = process.env.ELECPACK_MAIN_DEFINE
      if (text) {
        return JSON.parse(text) as ELECPACK_MAIN_DEFINE
      }
    } catch (e) {
      console.error(e)
    }
    return {} as unknown as ELECPACK_MAIN_DEFINE
  }
}

declare global {
  interface ELECPACK_MAIN_DEFINE {

  }
}

export default MainCommon