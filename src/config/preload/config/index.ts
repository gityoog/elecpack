import ForkTsChecker from "../../../common/fork-ts-checker"
import TsconfigPathsWebpackContextPlugin from "../../../common/tsconfig-paths-webpack-context-plugin"
import WebpackBuilder from "../../../common/webpack-builder"
import { EsbuildPlugin } from "esbuild-loader"

const PreloadBuildConfig: WebpackBuilder.ConfigFile = {
  async base() {
    return {
      target: 'electron-preload',
      resolve: {
        extensions: [".js", ".ts", ".json"]
      },
      externals: ({ request }, callback) => {
        const commonjs2: Record<string, string> = {
          electron: 'commonjs2 electron',
        }
        if (request && commonjs2[request]) {
          return callback(undefined, commonjs2[request])
        }
        if (request && /^node\:/.test(request)) {
          return callback(undefined, 'commonjs2 ' + request.slice(5))
        }
        callback()
      },
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
          }
        ]
      },
      plugins: [
        new TsconfigPathsWebpackContextPlugin,
      ]
    }
  },
  async development() {
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

export default PreloadBuildConfig