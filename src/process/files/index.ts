import { DiFrom, Inject, Service } from "anydi"
import WebpackBuilder from "../../common/webpack-builder"
import FilesConfig from "../../config/files"

@Service()
export default class FilesProcess {
  @Inject() private config!: FilesConfig
  private builders: WebpackBuilder[] = []

  async start(watch?: boolean) {
    const options = this.config.getOptions()
    const result = await Promise.all(options.map(async item => {
      const builder = DiFrom(this).for(() => new WebpackBuilder(item.name))
      this.builders.push(builder)
      return {
        name: item.name,
        result: watch ? await builder.watch(item.options) : await builder.compile(item.options)
      }
    }))
    return result.reduce((acc, { name, result }) => {
      acc[name] = result[FilesConfig.main]
      return acc
    }, {} as Record<string, string>)
  }

  async stop() {
    await Promise.all(this.builders.map(builder => builder.stop()))
  }
}