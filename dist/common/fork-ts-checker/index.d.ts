import type { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options';
import { Compiler } from 'webpack';
export default class ForkTsChecker {
    options: ForkTsCheckerWebpackPluginOptions;
    constructor(rawOptions?: ForkTsCheckerWebpackPluginOptions);
    apply(compiler: Compiler): void;
}
