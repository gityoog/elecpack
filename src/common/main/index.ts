const MainCommon = {
  ENV_KEY: 'ELECPACK_MAIN_ENV',
  DEFINE_KEY: 'ELECPACK_MAIN_DEFINE',
  getEnv() {
    return process.env.ELECPACK_MAIN_ENV
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