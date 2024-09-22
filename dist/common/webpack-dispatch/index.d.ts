import { Compiler, Stats } from 'webpack';
export default class WebpackDispatch {
    private _onRun;
    private _onDone;
    private _onError;
    private _onProcess;
    private run;
    private done;
    private error;
    private process;
    apply(compiler: Compiler): void;
    onRun(fn: () => void): void;
    onDone(fn: (stat?: Stats) => void): void;
    onError(fn: (err: Error) => void): void;
    onProcess(fn: (percent: number, msg: string) => void): void;
    destroy(): void;
}
