export default abstract class BaseConsole {
    abstract render(): string;
    private _onUpdate;
    protected update(): void;
    private _log;
    getLog(): string;
    log(msg: string): void;
    onUpdate(callback: () => void): () => void;
    destroy(): void;
}
