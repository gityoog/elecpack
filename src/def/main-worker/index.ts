import { ElecpackConfigFile } from "../.."
import { EsbuildPlugin } from "esbuild-loader"
import TsconfigPathsWebpackContextPlugin from "../../common/tsconfig-paths-webpack-context-plugin"
import ForkTsChecker from "../../common/fork-ts-checker"

const MainWorkerConfig: ElecpackConfigFile = {
  base() {
    return {
      target: 'node',
      resolve: {
        extensions: [".js", ".ts", ".json"]
      },
      externals: [function ({ context, request }, callback) {
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
          },
          {
            test: /\.node$/,
            use: {
              loader: 'node-loader',
              options: {
                name: "[name].[contenthash:6].[ext]",
              }
            }
          }
        ]
      },
      plugins: [
        new TsconfigPathsWebpackContextPlugin,
      ]
    }
  },
  development() {
    return {
      devtool: 'source-map',
      mode: 'development',
      optimization: {
        minimize: false
      },
      plugins: [
        new ForkTsChecker()
      ]
    }
  },
  production() {
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

export default MainWorkerConfig