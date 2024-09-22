export default class FilesProcess {
    private config;
    private builders;
    start(watch?: boolean): Promise<Record<string, string>>;
    stop(): Promise<void>;
}
