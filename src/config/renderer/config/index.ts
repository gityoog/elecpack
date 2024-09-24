import ForkTsChecker from "../../../common/fork-ts-checker"
import TsconfigPathsWebpackContextPlugin from "../../../common/tsconfig-paths-webpack-context-plugin"
import WebpackBuilder from "../../../common/webpack-builder"

const RendererBuildConfig: WebpackBuilder.ConfigFile = {
  base() {
    return {
      resolve: {
        extensions: [".js", ".ts", ".json"]
      },
      plugins: [
        new TsconfigPathsWebpackContextPlugin,
      ]
    }
  },
  development() {
    return {
      plugins: [
        new ForkTsChecker()
      ]
    }
  },
}

export default RendererBuildConfig