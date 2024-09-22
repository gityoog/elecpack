import { Inject, Service } from "@gityoog/ioc-di"
import { Configuration } from 'electron-builder'
import OutputConfig from "../output"


type options = {
  name: string
  version: string
  configuration?: Configuration
}

@Service()
class ElectronBuilderConfig {
  @Inject() private outputConfig!: OutputConfig

  private enabled = false
  private configuration: Configuration = {}
  private name: string = ''
  private version: string = ''
  setOptions(options: options) {
    this.enabled = true
    this.configuration = options.configuration || {}
    this.name = options.name
    this.version = options.version
  }

  isEnabled() {
    return this.enabled
  }

  getProjectDir() {
    return this.outputConfig.resolve()
  }

  getConfiguration() {
    return this.configuration
  }

  getName() {
    return this.name
  }

  getVersion() {
    return this.version
  }
}

namespace ElectronBuilderConfig {
  export type Options = options
}

export default ElectronBuilderConfig