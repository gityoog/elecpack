import { Inject, Service } from "anydi"
import FilesProcess from "../../process/files"
import MainProdProcess from "../../process/main/prod"
import PreloadProcess from "../../process/preload"
import RendererProcess from "../../process/renderer"
import ElectronBuilderProcess from "../../process/electron-builder"
import OutputConfig from "../../config/output"
import { rimraf } from "rimraf"

@Service()
export default class ElecpackBuild {
  @Inject() private output!: OutputConfig
  @Inject() private main!: MainProdProcess
  @Inject() private preload!: PreloadProcess
  @Inject() private renderer!: RendererProcess
  @Inject() private files!: FilesProcess
  @Inject() private electronBuilder!: ElectronBuilderProcess

  async start() {
    const time = Date.now()
    await rimraf(this.output.resolve())
    const [preload, renderer, files] = await Promise.all([
      this.preload.start(),
      this.renderer.start(),
      this.files.start()
    ])
    await this.main.build({
      preload,
      renderer,
      files
    })
    await this.preload.stop()
    await this.renderer.stop()
    await this.files.stop()
    await this.main.stop()
    const result = await this.electronBuilder.start()
    console.log('\nBuild success time:', Math.round((Date.now() - time) / 100) / 10 + 's')
    return {
      result,
      output: this.output.resolve()
    }
  }

  async stop() {
    await Promise.all([
      this.preload.stop(),
      this.renderer.stop(),
      this.files.stop(),
      this.main.stop(),
      this.electronBuilder.stop()
    ])
  }
}