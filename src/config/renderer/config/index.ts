import WebpackBuilder from "../../../common/webpack-builder"

const RendererBuildConfig: WebpackBuilder.ConfigFile = {
  base() {
    return {
      resolve: {
        extensions: [".js", ".ts", ".json"]
      },
      externals: ({ request }, callback) => {
        const commonjs2: Record<string, string> = {
          electron: 'window.electron',
          'worker_threads': 'commonjs2 worker_threads',
          'child_process': 'commonjs2 child_process',
        }
        if (request && commonjs2[request]) {
          return callback(undefined, commonjs2[request])
        }
        if (request && /^node\:/.test(request)) {
          return callback(undefined, 'commonjs2 ' + request.slice(5))
        }
        callback()
      },
    }
  }
}

export default RendererBuildConfig