export default class MainProdProcess {
    private config;
    private builder;
    build({ preload, renderer, files }: {
        preload: Record<string, string>;
        renderer: Record<string, string>;
        files: Record<string, string>;
    }): Promise<Record<string, string>>;
    stop(): Promise<void>;
}
