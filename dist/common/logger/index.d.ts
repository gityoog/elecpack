import log4js from 'log4js';
declare class Logger {
    configure(config: log4js.Configuration): void;
    getLogger(category?: string): log4js.Logger;
    private normalizeMessage;
    debug(category: string, message: any, ...args: any[]): void;
    info(category: string, message: any, ...args: any[]): void;
    warn(category: string, message: any, ...args: any[]): void;
    error(category: string, message: any, ...args: any[]): void;
}
declare namespace Logger {
    type Options = log4js.Configuration;
}
export default Logger;
