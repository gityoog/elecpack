export default class RendererProcess {
    private config;
    private builder;
    start(devServer?: boolean): Promise<Record<string, string>>;
    stop(): Promise<void>;
}
