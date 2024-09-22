export default class PreloadProcess {
    private config;
    private builder;
    start(watch?: boolean): Promise<any>;
    stop(): Promise<void>;
}
