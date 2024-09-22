export default class MainDevProcess {
    private logger;
    private terminal;
    private config;
    private checker;
    private console;
    private watcher;
    private env;
    start(env: {
        files: Record<string, string>;
        preload: Record<string, string>;
        renderer: Record<string, string>;
    }): void;
    private reload;
    private status;
    private restart;
    private child;
    private run;
    private _onStop;
    private finish;
    onStop(callback: () => void): void;
    stop(): void;
}
