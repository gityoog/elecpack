export default class PreloadProcess {
    private config;
    private builder;
    start(watch?: boolean): Promise<Record<string, string>>;
    stop(): Promise<void>;
}
