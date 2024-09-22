import { Configuration } from 'electron-builder';
type options = {
    name: string;
    version: string;
    configuration?: Configuration;
};
declare class ElectronBuilderConfig {
    private outputConfig;
    private enabled;
    private configuration;
    private name;
    private version;
    setOptions(options: options): void;
    isEnabled(): boolean;
    getProjectDir(): string;
    getConfiguration(): Configuration;
    getName(): string;
    getVersion(): string;
}
declare namespace ElectronBuilderConfig {
    type Options = options;
}
export default ElectronBuilderConfig;
