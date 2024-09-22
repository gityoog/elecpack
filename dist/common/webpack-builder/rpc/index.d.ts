import { WorkerRpcProtocol } from "../../rpc-protocol";
import { StatsCompilation } from "webpack";
import WebpackBuilderRunner from "../runner";
declare const WebpackBuilderRpc: WorkerRpcProtocol<{
    main: {
        watch: (data: WebpackBuilderRunner.FileOptions) => Promise<Record<string, string>>;
        compile: (data: WebpackBuilderRunner.FileOptions) => Promise<Record<string, string>>;
        devServer: (data: WebpackBuilderRunner.HtmlOptions) => Promise<Record<string, string>>;
        compileHtml: (data: WebpackBuilderRunner.HtmlOptions) => Promise<Record<string, string>>;
        stop: () => Promise<void>;
    };
    child: {
        run: [];
        done: [stat?: StatsCompilation];
        process: [process: number, msg: string];
        error: [err: Error];
    };
}>;
export default WebpackBuilderRpc;
