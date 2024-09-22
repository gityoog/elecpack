import { StatsCompilation } from "webpack";
import WebpackBuilderRunner from "../runner";
import WorkerRpcProtocol from "../../../rpc-protocol/worker";
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
