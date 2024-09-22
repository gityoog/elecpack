import ElectronBuilderConfig from "./electron-builder";
import MainConfig from "./main";
import PreloadConfig from "./preload";
import RendererConfig from "./renderer";
import FilesConfig from "./files";
import OutputConfig from "./output";
import Logger from "../common/logger";
type options = {
    main: MainConfig.Options;
    preload: PreloadConfig.Options;
    renderer: RendererConfig.Options;
    files?: FilesConfig.Options;
    electronBuilder?: ElectronBuilderConfig.Options;
    output?: OutputConfig.Options;
    logger?: Logger.Options;
};
declare class Config {
    private main;
    private preload;
    private renderer;
    private files;
    private electronBuilder;
    private output;
    private logger;
    setOptions(options: options): void;
}
declare namespace Config {
    type Options = options;
}
export default Config;
