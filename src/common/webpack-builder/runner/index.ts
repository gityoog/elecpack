import WebpackDispatch from "../../webpack-dispatch"
import webpack, { Compiler, Configuration, Watching, WebpackPluginInstance } from "webpack"
import merge from "webpack-merge"
import path from "path"
import { BytenodeWebpackPlugin } from '@herberttn/bytenode-webpack-plugin'
import CopyPlugin from "copy-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import WebpackDevServer from 'webpack-dev-server'

type htmlEntry = Record<string, {
  entry: string | string[]
  html: HtmlWebpackPlugin.Options
}>

type fileEntry = Record<string, string | string[]>
type bytecode = boolean | 'all' | 'production' | 'development'
type options = {
  context: string
  config: string | string[]
  output: string
  bytecode?: bytecode
  define?: Record<string, any>
  assets?: {
    from: string
    to: string
  } | string
}

type htmlOptions = options & {
  entry: htmlEntry
}

type fileOptions = options & {
  entry: fileEntry
}

type configFile = {
  base?(): Promise<Configuration> | Configuration
  development?(): Promise<Configuration> | Configuration
  production?(): Promise<Configuration> | Configuration
  devServer?(): Promise<WebpackDevServer.Configuration> | WebpackDevServer.Configuration
}
namespace WebpackBuilderRunner {
  export type ConfigFile = configFile
  export type HtmlOptions = htmlOptions
  export type FileOptions = fileOptions
  export type Bytecode = bytecode
}

class WebpackBuilderRunner {
  private compiler?: Compiler
  private watching?: Watching
  private server?: WebpackDevServer

  dispatch = new WebpackDispatch

  async watch(options: fileOptions) {
    process.env.test = JSON.stringify(options.config)
    this.compiler = await this.buildCompiler({ options, configuration: { entry: options.entry }, mode: 'development' })
    const result = {
      emit: false,
      data: Object.keys(options.entry).reduce((acc, key) => (acc[key] = path.resolve(options.output, key + '.js'), acc), {} as Record<string, string>),
      promise: new Promise<Record<string, string>>((resolve, reject) => {
        this.watching = this.compiler!.watch({}, (err, stats) => {
          if (!result.emit) {
            if (err) {
              reject(err)
            } else {
              resolve(result.data)
            }
          }
        })
      })
    }
    return result.promise
  }

  async compile(options: fileOptions) {
    process.env.test = JSON.stringify(options.config)
    this.compiler = await this.buildCompiler({ options, configuration: { entry: options.entry }, mode: 'production' })
    const files = Object.keys(options.entry).reduce((acc, key) => (acc[key] = path.resolve(options.output, key + '.js'), acc), {} as Record<string, string>)
    return this.handleCompile(files)
  }

  async devServer(options: htmlOptions) {
    process.env.test = JSON.stringify(options.config)
    const config = await this.getDevSeverConfig(options)
    const entries = await this.buildHtmlCompiler(options, 'development')
    const host = config.host || '127.0.0.1'
    const port = await WebpackDevServer.getFreePort(config.port || 30000, host)
    this.server = new WebpackDevServer({ ...config, host, port }, this.compiler!)
    await this.server.start()
    return entries.reduce((acc, item) => (acc[item.name] = `http://${host}:${port}/${item.url}`, acc), {} as Record<string, string>)
  }

  async compileHtml(options: htmlOptions) {
    const entries = await this.buildHtmlCompiler(options, 'production')
    const files = entries.reduce((acc, item) => (acc[item.name] = path.resolve(options.output, item.url), acc), {} as Record<string, string>)
    return this.handleCompile(files)
  }

  private async handleCompile(files: Record<string, string>) {
    return new Promise<Record<string, string>>((resolve, reject) => {
      this.compiler!.run((err, stats) => {
        if (err) {
          reject(err)
        } else {
          if (stats && stats.hasErrors()) {
            reject(new Error(
              stats.toString({
                colors: false,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
                entrypoints: false
              }
              )))
          } else {
            resolve(files)
          }
        }
      })
    })
  }

  private async buildHtmlCompiler(options: htmlOptions, mode: 'development' | 'production') {
    const entry = options.entry
    const entries = Object.keys(entry).map(key => {
      const filename = (entry[key].html.filename = entry[key].html.filename || key + '.html') as string
      entry[key].html.chunks = [key]
      return {
        name: key,
        entry: entry[key].entry,
        html: entry[key].html,
        url: filename
      }
    })
    this.compiler = await this.buildCompiler({
      options, configuration: {
        entry: entries.reduce((acc, item) => (acc[item.name] = item.entry, acc), {} as Record<string, string | string[]>),
        plugins: entries.map(({ html }) => new HtmlWebpackPlugin({
          inject: true,
          minify: {
            removeComments: true,
            collapseWhitespace: false,
            removeAttributeQuotes: false
          },
          scriptLoading: 'blocking',
          chunksSortMode: 'manual',
          ...html
        }))
      }, mode
    })
    return entries
  }


  private async getDevSeverConfig(options: htmlOptions) {
    const { config } = options
    const configFiles = Array.isArray(config) ? config : [config]
    let webpackDevServer: WebpackDevServer.Configuration = {}
    for (const file of configFiles) {
      const module = require(file).default as configFile
      webpackDevServer = merge(webpackDevServer,
        module.devServer ? await module.devServer() : {}
      )
    }
    return webpackDevServer
  }

  private async buildCompiler({ options: {
    config, bytecode, define, assets, context, output
  }, configuration, mode }: {
    options: options,
    configuration: Configuration
    mode: 'development' | 'production'
  }) {
    const configFiles = Array.isArray(config) ? config : [config]
    let webpackConfig: Configuration = {}
    for (const file of configFiles) {
      const module = require(file).default as configFile
      webpackConfig = merge(webpackConfig,
        module.base ? await module.base() : {},
        mode === 'development' && module.development ? await module.development() : {},
        mode === 'production' && module.production ? await module.production() : {}
      )
    }
    const plugins: WebpackPluginInstance[] = [this.dispatch]
    if (mode === 'production' && bytecode || bytecode === 'all' || bytecode === mode) {
      plugins.push(
        new BytenodeWebpackPlugin({
          compileForElectron: true,
        })
      )
    }
    if (define) {
      plugins.push(new webpack.DefinePlugin(define))
    }
    if (assets) {
      const pattern = typeof assets === 'string' ? { from: assets, to: assets } : assets
      plugins.push(new CopyPlugin({
        patterns: [pattern]
      }))
    }
    return webpack(merge(webpackConfig, {
      mode,
      plugins,
      context,
      output: {
        path: output,
        filename: '[name].js',
        clean: true
      }
    }, configuration))
  }

  async stop() {
    return new Promise<void>(async (resolve) => {
      if (this.server) {
        await this.server.stop()
      }
      if (this.watching) {
        await new Promise<void>((resolve, reject) => {
          this.watching!.close((err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        })
      }
      if (this.compiler) {
        await new Promise<void>((resolve, reject) => {
          this.compiler!.close((err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        })
      }
      resolve()
    })
  }
}

export default WebpackBuilderRunner