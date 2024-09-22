import WebpackDispatch from '../webpack-dispatch';
export default class TypeChecker {
    private compiler?;
    dispatch: WebpackDispatch;
    run({ context, output }: {
        context: string;
        output: string;
    }): Promise<void>;
    stop(): Promise<void>;
}
