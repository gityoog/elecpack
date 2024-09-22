import WebpackBuilder from "../../../common/webpack-builder"

const RendererBuildConfig: WebpackBuilder.ConfigFile = {
  base() {
    return {
      resolve: {
        extensions: [".js", ".ts", ".json"]
      },
      externals: {
        electron: 'window.electron',
        'worker_threads': 'window.worker_threads',
        'child_process': 'window.child_process',
      }
    }
  }
}

export default RendererBuildConfig