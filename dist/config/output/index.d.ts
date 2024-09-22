type options = {
    path?: string;
};
declare class OutputConfig {
    private path;
    setOptions(options: options): void;
    getPath(): string;
    resolve(...args: string[]): string;
}
declare namespace OutputConfig {
    type Options = options;
}
export default OutputConfig;
