import { DiFrom, Service } from "anydi"
import WebpackBuilderFileConfig from "../webpack/file"

@Service()
class FilesConfig {
  static main = 'main'
  private files: {
    name: string
    config: WebpackBuilderFileConfig
  }[] = []
  setOptions(options: FilesConfig.Options) {
    this.files = Object.entries(options).map(([name, options]) => {
      const fileOptions = {
        ...options,
        entry: { [FilesConfig.main]: options.entry },

      }
      const config = DiFrom(this).for(() => new WebpackBuilderFileConfig({ name, output: 'files/' + name }))
      config.setOptions(fileOptions)
      return {
        name,
        config
      }
    })
  }
  getOptions() {
    return this.files.map(({ name, config }) => ({ name, options: config.getOptions() }))
  }
}
namespace FilesConfig {
  export type Options = Record<string, Omit<WebpackBuilderFileConfig.Options, 'entry'> & { entry: string }>
}

export default FilesConfig