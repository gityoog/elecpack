import WebpackBuilderRpc from "../rpc"
import WebpackBuilderRunner from "../runner"

const runner = new WebpackBuilderRunner()
const rpc = WebpackBuilderRpc.child()
rpc.handle('compile', options => runner.compile(options))
rpc.handle('watch', options => runner.watch(options))
rpc.handle('devServer', options => runner.devServer(options))
rpc.handle('compileHtml', options => runner.compileHtml(options))
rpc.handle('stop', async () => {
  await runner.stop()
  rpc.destroy()
})

runner.dispatch.onRun(() => {
  rpc.send('run')
})
runner.dispatch.onDone(stat => {
  rpc.send('done', stat?.toJson())
})
runner.dispatch.onError(err => {
  rpc.send('error', err)
})
runner.dispatch.onProcess((percent, msg) => {
  rpc.send('process', percent, msg)
})