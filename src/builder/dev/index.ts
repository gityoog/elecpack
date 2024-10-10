import { Inject, Service } from "anydi"
import FilesProcess from "../../process/files"
import MainDevProcess from "../../process/main/dev"
import PreloadProcess from "../../process/preload"
import RendererProcess from "../../process/renderer"
import OutputConfig from "../../config/output"
import { rimraf } from "rimraf"

@Service()
export default class ElecpackDev {
  @Inject() private output!: OutputConfig
  @Inject() private main!: MainDevProcess
  @Inject() private preload!: PreloadProcess
  @Inject() private renderer!: RendererProcess
  @Inject() private files!: FilesProcess

  constructor() {
    this.main.onStop(() => {
      this.preload.stop()
      this.renderer.stop()
      this.files.stop()
    })
  }

  async start() {
    await rimraf(this.output.resolve())
    const [preload, renderer, files] = await Promise.all([
      this.preload.start(true),
      this.renderer.start(true),
      this.files.start(true)
    ])
    this.main.start({
      preload,
      renderer,
      files
    })
  }

  async stop() {
    this.main.stop()
  }
}