import { Inject, Service } from "anydi"
import ElectronBuilderConfig from "../../config/electron-builder"
import { build, Platform } from 'electron-builder'
import { readFileSync, writeFileSync } from "fs"
import OutputConfig from "../../config/output"
import { getElectronVersion } from 'app-builder-lib/out/electron/electronVersion'

@Service()
export default class ElectronBuilderProcess {
  @Inject() private config!: ElectronBuilderConfig
  @Inject() private output!: OutputConfig

  async start() {
    if (this.config.isEnabled()) {
      let electronVersion: string | undefined = undefined
      try {
        electronVersion = await getElectronVersion(process.cwd())
      } catch (e) {
        console.warn('Failed to get electron version, using default version')
      }
      writeFileSync(this.output.resolve('package.json'), JSON.stringify({
        name: this.config.getName(),
        version: this.config.getVersion(),
        main: './main/main.js'
      }, null, 2))
      return await build({
        targets: this.config.getTargets(),
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
          electronVersion: electronVersion,
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