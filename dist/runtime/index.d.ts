declare const ElecpackRuntime: {
    define: ELECPACK_MAIN_DEFINE;
    isDev(): boolean;
    getRenderer(name: string): string;
    getPreload(name: string): string;
    getFiles(name: string): string;
    getAssets(filename: string): string;
    load({ name, hash }: {
        name: string;
        hash?: string;
    }, bw: {
        loadURL(url: string): Promise<void>;
        loadFile(filePath: string): Promise<void>;
    }): Promise<void> | undefined;
};
export default ElecpackRuntime;
