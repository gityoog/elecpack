import { Inject, Service } from "@gityoog/ioc-di"
import ElectronBuilderConfig from "../../config/electron-builder"
import { build, Platform } from 'electron-builder'
import { readFileSync, writeFileSync } from "fs"
import OutputConfig from "../../config/output"
import electron from 'electron'
import path from "path"

@Service()
export default class ElectronBuilderProcess {
  @Inject() private config!: ElectronBuilderConfig
  @Inject() private output!: OutputConfig

  async start() {
    if (this.config.isEnabled()) {
      writeFileSync(this.output.resolve('package.json'), JSON.stringify({
        name: this.config.getName(),
        version: this.config.getVersion(),
        main: './main/main.js'
      }, null, 2))
      let electronVersion: string | undefined
      try {
        const electronPath = electron as unknown as string
        const packageJson = readFileSync(path.resolve(electronPath, '../..', 'package.json'), 'utf8')
        const { version } = JSON.parse(packageJson)
        electronVersion = version
      } catch (e) {
        console.error(e)
      }
      return await build({
        targets: Platform.current().createTarget(),
        projectDir: this.config.getProjectDir(),
        config: {
          removePackageScripts: true,
          buildDependenciesFromSource: false,
          npmRebuild: false,
          compression: 'store',
          nodeGypRebuild: false,
          asar: false,
          win: {
            target: 'portable'
          },
          electronVersion,
          ...this.config.getConfiguration(),
          directories: {
            output: 'output',
          },
          files: [
            '**/*',
            '!output/**/*'
          ]
        }
      })
    }
  }

  async stop() {

  }
}