export default class ElecpackBuild {
    private output;
    private main;
    private preload;
    private renderer;
    private files;
    private electronBuilder;
    start(): Promise<{
        result: string[] | undefined;
        output: string;
    }>;
    stop(): Promise<void>;
}
