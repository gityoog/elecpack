import { Already, Concat, Inject, Root, Service } from "@gityoog/ioc-di"
import ElecpackBuild from "./build"
import Config from "../config"
import ElecpackDev from "./dev"

@Root()
@Service()
class ElecpackBuilder {
  @Inject() private config!: Config
  @Inject() private dev!: ElecpackDev
  @Inject() private build!: ElecpackBuild
  constructor(private options: Config.Options) {
    this.init()
  }

  @Already
  private init() {
    this.config.setOptions(this.options)
  }

  startDev() {
    return this.dev.start()
  }

  startBuild() {
    return this.build.start()
  }
}

export default ElecpackBuilder