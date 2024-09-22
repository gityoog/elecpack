import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import type { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options'
import { Compiler } from 'webpack'
import ts from 'typescript'

export default class ForkTsChecker {
  options: ForkTsCheckerWebpackPluginOptions
  constructor(rawOptions: ForkTsCheckerWebpackPluginOptions = {}) {
    this.options = rawOptions
  }
  apply(compiler: Compiler) {
    const context = compiler.options.context
    const plugin = new ForkTsCheckerWebpackPlugin({
      ...this.options,
      typescript: {
        ...this.options.typescript,
        configFile: this.options.typescript?.configFile || (context ? ts.findConfigFile(context, ts.sys.fileExists) : undefined)
      }
    })
    plugin.apply(compiler)
  }
}