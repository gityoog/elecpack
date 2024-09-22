import ForkTsChecker from '../fork-ts-checker'
import WebpackDispatch from '../webpack-dispatch'
import webpack from 'webpack'

export default class TypeChecker {
  private compiler?: webpack.Compiler
  dispatch = new WebpackDispatch
  async run({ context, output }: {
    context: string
    output: string
  }) {
    this.compiler = webpack({
      stats: 'errors-only',
      entry: ['test'],
      mode: 'development',
      output: {
        path: output
      },
      context,
      plugins: [
        new ForkTsChecker(),
        new webpack.IgnorePlugin({
          resourceRegExp: /test/
        })
      ]
    })
    this.dispatch.apply(this.compiler)
    return new Promise<void>((resolve, reject) => {
      this.compiler!.watch({}, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
  async stop() {
    return new Promise<void>((resolve) => {
      if (this.compiler) {
        this.compiler.close(() => {
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
}