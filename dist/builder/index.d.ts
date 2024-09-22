import Config from "../config";
declare class ElecpackBuilder {
    private options;
    private config;
    private dev;
    private build;
    constructor(options: Config.Options);
    private init;
    startDev(): Promise<void>;
    startBuild(): Promise<{
        result: string[] | undefined;
        output: string;
    }>;
}
export default ElecpackBuilder;
