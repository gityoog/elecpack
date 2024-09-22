import { StatsCompilation } from "webpack";
import BaseLog from "./base";
export default class WebpackConsole extends BaseLog {
    private name;
    private building;
    private progress;
    private line;
    constructor(name: string);
    run(): void;
    done(stat?: StatsCompilation): void;
    process(percent: number, msg: string): void;
    error(err: Error): void;
    clear(): void;
    stdout(data: Buffer | string): void;
    stderr(data: Buffer): void;
    render(): string;
    destroy(): void;
}
