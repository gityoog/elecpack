import WebpackBuilderFileConfig from "../webpack/file";
declare class FilesConfig {
    static main: string;
    private files;
    setOptions(options: FilesConfig.Options): void;
    getOptions(): {
        name: string;
        options: {
            context: string;
            config: string | string[];
            output: string;
            bytecode?: boolean | "all" | "production" | "development";
            define?: Record<string, any>;
            assets?: {
                from: string;
                to: string;
            } | string;
        } & {
            entry: {
                [x: string]: string | string[];
            };
        };
    }[];
}
declare namespace FilesConfig {
    type Options = Record<string, Omit<WebpackBuilderFileConfig.Options, 'entry'> & {
        entry: string;
    }>;
}
export default FilesConfig;
