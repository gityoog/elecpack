import WorkerRpcProtocol from "../../../../rpc-protocol/worker";
declare const MainTypeCheckerRpc: WorkerRpcProtocol<{
    main: {
        start: (data: {
            context: string;
            output: string;
        }) => Promise<void>;
        stop: () => Promise<void>;
    };
    child: {
        run: [];
    };
}>;
export default MainTypeCheckerRpc;
