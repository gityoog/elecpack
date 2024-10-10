import { Inject, Service } from "anydi"
import { Arch, Configuration, Platform } from 'electron-builder'
import OutputConfig from "../output"


type options = {
  name: string
  version: string
  configuration?: Configuration
  targets?: Map<Platform, Map<Arch, string[]>>
}

@Service()
class ElectronBuilderConfig {
  @Inject() private outputConfig!: OutputConfig

  private enabled = false
  private configuration: Configuration = {}
  private name: string = ''
  private version: string = ''
  private targets?: Map<Platform, Map<Arch, string[]>>
  setOptions(options: options) {
    this.enabled = true
    this.configuration = options.configuration || {}
    this.name = options.name
    this.version = options.version
    this.targets = options.targets
  }

  isEnabled() {
    return this.enabled
  }

  getProjectDir() {
    return this.outputConfig.resolve()
  }

  getTargets() {
    return this.targets || Platform.current().createTarget()
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