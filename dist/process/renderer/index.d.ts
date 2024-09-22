export default class RendererProcess {
    private config;
    private builder;
    start(devServer?: boolean): Promise<any>;
    stop(): Promise<void>;
}
