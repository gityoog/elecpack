import BaseConsole from './impl/base';
export default class Terminal {
    private data;
    constructor();
    unRegister(console: BaseConsole): void;
    register(console: BaseConsole): void;
    private render;
    destroy(): void;
}
