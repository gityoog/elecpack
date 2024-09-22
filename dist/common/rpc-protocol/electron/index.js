"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const rpc_dispatch_1 = __importDefault(require("../../rpc-dispatch"));
class ElectronRpcProtocol {
    constructor(name) {
        this.name = '_ElectronRpcProtocol_' + name;
    }
    main(webContents) {
        return new Main(this.name, webContents);
    }
    preload() {
        return new Preload(this.name);
    }
    renderer() {
        return new Renderer(this.name);
    }
}
class Main extends rpc_dispatch_1.default {
    constructor(channel, webContents) {
        super();
        if (!webContents) {
            electron_1.ipcMain.on(channel, (event, message) => this.emit(message, event.sender));
            this.onMessage((message, sender) => {
                if (sender) {
                    sender.send(channel, message);
                }
            });
            this.beforeDestroy(() => {
                electron_1.ipcMain.removeAllListeners(channel);
            });
        }
        else {
            const listener = (_, channel_, message) => {
                if (channel === channel_) {
                    this.emit(message);
                }
            };
            webContents.on('ipc-message', listener);
            this.onMessage((message) => webContents.send(channel, message));
            this.beforeDestroy(() => {
                webContents.removeListener('ipc-message', listener);
            });
        }
    }
}
class Preload {
    constructor(channel) {
        this.channel = channel;
        const event = {};
        const api = {
            emit: (message) => {
                electron_1.ipcRenderer.send(channel, message);
            },
            on: (callback) => {
                const id = Math.random().toString(36).slice(2);
                event[id] = (event, message) => callback(message);
                electron_1.ipcRenderer.on(channel, event[id]);
                return id;
            },
            off: (id) => {
                if (event[id]) {
                    electron_1.ipcRenderer.off(channel, event[id]);
                    delete event[id];
                }
            }
        };
        if (process.contextIsolated) {
            electron_1.contextBridge.exposeInMainWorld(this.channel, api);
        }
        else {
            window[this.channel] = api;
        }
    }
}
class Renderer extends rpc_dispatch_1.default {
    constructor(channel) {
        super();
        this.channel = channel;
        if (typeof window === 'undefined') {
            throw new Error('must be called in renderer process');
        }
        if (!(this.channel in window)) {
            throw new Error('not expose api in preload script');
        }
        const api = window[this.channel];
        const callback = (message) => this.emit(message);
        const id = api.on(callback);
        this.onMessage((message) => api.emit(message));
        this.beforeDestroy(() => {
            api.off(id);
        });
    }
}
exports.default = ElectronRpcProtocol;
