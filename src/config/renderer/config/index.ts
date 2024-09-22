import WebpackBuilder from "../../../common/webpack-builder"

const RendererBuildConfig: WebpackBuilder.ConfigFile = {
  base() {
    return {
      resolve: {
        extensions: [".js"]
      }
    }
  }
}

export default RendererBuildConfig