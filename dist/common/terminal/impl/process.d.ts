import { ChildProcessWithoutNullStreams } from "child_process";
import BaseLog from "./base";
import Logger from "../../logger";
export default class ProcessConsole extends BaseLog {
    private name;
    private status;
    private line;
    private logger;
    constructor(name: string);
    setLogger(logger: Logger): void;
    run(): void;
    exit(code: number | null): void;
    stdout(data: Buffer): void;
    stderr(data: Buffer): void;
    apply(child: ChildProcessWithoutNullStreams): void;
    render(): string;
    destroy(): void;
}
