import TypeChecker from "../../../../common/type-checker"
import MainTypeCheckerRpc from "../rpc"

const checker = new TypeChecker()
const rpc = MainTypeCheckerRpc.child()

rpc.handle('start', (data) => checker.run(data))
rpc.handle('stop', () => checker.stop())
checker.dispatch.onRun(() => {
  rpc.send('run')
})