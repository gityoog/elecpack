import WebpackBuilder from "../../../common/webpack-builder"
import TsconfigPathsWebpackContextPlugin from "../../../common/tsconfig-paths-webpack-context-plugin"
import { EsbuildPlugin } from "esbuild-loader"

const ProdMainBuildConfig: WebpackBuilder.ConfigFile = {
  async base() {
    return {
      target: 'electron-main',
      resolve: {
        extensions: [".js", ".ts", ".json"]
      },
      externals: [{
        worker_threads: 'commonjs worker_threads',
        child_process: 'commonjs child_process',
      }, function ({ context, request }, callback) {
        if (request) {
          const result = /build[\\/]koffi[\\/](.*?)[\\/]/.exec(request)
          if (result && result[1] !== 'win32_x64') {
            return callback(null, 'window.Koffi')
          }
        }
        callback()
      }],
      module: {
        rules: [
          {
            test: /\.node$/,
            use: {
              loader: 'node-loader',
              options: {
                name: "[name].[contenthash:6].[ext]",
              }
            }
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new TsconfigPathsWebpackContextPlugin,
      ]
    }
  },
  async production() {
    return {
      mode: 'production',
      optimization: {
        minimize: true,
        minimizer: [
          new EsbuildPlugin({
            target: 'es2021',
            minifyWhitespace: true,
            minifyIdentifiers: true,
            minifySyntax: true,
            legalComments: 'none'
          })
        ]
      }
    }
  }
}

export default ProdMainBuildConfig