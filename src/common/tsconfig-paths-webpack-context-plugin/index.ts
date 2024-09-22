import Webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import ts from 'typescript'

type options = NonNullable<ConstructorParameters<typeof TsconfigPathsPlugin>[0]>

export default class TsconfigPathsWebpackContextPlugin {
  options: options
  constructor(rawOptions: options = {}) {
    this.options = rawOptions
  }
  apply(compiler: Webpack.Compiler) {
    compiler.hooks.afterPlugins.tap('TsconfigPathsWebpackContextPlugin', (compiler) => {
      const context = this.options.context || compiler.options.context
      const tsconfigPathsPlugin = new TsconfigPathsPlugin({
        ...this.options,
        configFile: this.options.configFile || (context ? ts.findConfigFile(context, ts.sys.fileExists) : undefined)
      })
      compiler.options.resolve = compiler.options.resolve || {}
      compiler.options.resolve.plugins = (compiler.options.resolve.plugins || []).concat(tsconfigPathsPlugin)
    })
  }
}