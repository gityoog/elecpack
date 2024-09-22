import { ForkRpcProtocol, WorkerRpcProtocol } from "../../../../common/rpc-protocol"

const MainTypeCheckerRpc = new WorkerRpcProtocol<{
  main: {
    start: (data: {
      context: string
      output: string
    }) => Promise<void>
    stop: () => Promise<void>
  }
  child: {
    run: []
  }
}>(require.resolve('../child'))

export default MainTypeCheckerRpc