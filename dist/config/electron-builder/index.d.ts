import { Arch, Configuration, Platform } from 'electron-builder';
type options = {
    name: string;
    version: string;
    configuration?: Configuration;
    targets?: Map<Platform, Map<Arch, string[]>>;
};
declare class ElectronBuilderConfig {
    private outputConfig;
    private enabled;
    private configuration;
    private name;
    private version;
    private targets?;
    setOptions(options: options): void;
    isEnabled(): boolean;
    getProjectDir(): string;
    getTargets(): Map<Platform, Map<Arch, string[]>>;
    getConfiguration(): Configuration;
    getName(): string;
    getVersion(): string;
}
declare namespace ElectronBuilderConfig {
    type Options = options;
}
export default ElectronBuilderConfig;
