export default class ElectronBuilderProcess {
    private config;
    private output;
    start(): Promise<string[] | undefined>;
    stop(): Promise<void>;
}
