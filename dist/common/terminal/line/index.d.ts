export default class LogLine {
    private options;
    constructor({ timeout, limit }?: {
        timeout?: number;
        limit?: number;
    });
    data: {
        content: string;
        time?: number;
    }[];
    add(content: string, { warning, timeout }?: {
        warning?: boolean;
        timeout?: number;
    }): void;
    clear(): void;
    private next;
    private filter;
    private _onUpdate;
    onUpdate(cb: () => void): void;
    private update;
    destroy(): void;
}
