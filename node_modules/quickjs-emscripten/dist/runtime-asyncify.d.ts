import { Lifetime } from ".";
import { QuickJSAsyncContext } from "./context-asyncify";
import { QuickJSAsyncEmscriptenModule } from "./emscripten-types";
import { QuickJSAsyncFFI } from "./variants";
import { JSContextPointer, JSRuntimePointer } from "./types-ffi";
import { QuickJSModuleCallbacks } from "./module";
import { QuickJSRuntime } from "./runtime";
import { ContextOptions, JSModuleLoaderAsync, JSModuleNormalizerAsync } from "./types";
export declare class QuickJSAsyncRuntime extends QuickJSRuntime {
    context: QuickJSAsyncContext | undefined;
    /** @private */
    protected module: QuickJSAsyncEmscriptenModule;
    /** @private */
    protected ffi: QuickJSAsyncFFI;
    /** @private */
    protected rt: Lifetime<JSRuntimePointer>;
    /** @private */
    protected callbacks: QuickJSModuleCallbacks;
    /** @private */
    protected contextMap: Map<JSContextPointer, QuickJSAsyncContext>;
    /** @private */
    constructor(args: {
        module: QuickJSAsyncEmscriptenModule;
        ffi: QuickJSAsyncFFI;
        rt: Lifetime<JSRuntimePointer>;
        callbacks: QuickJSModuleCallbacks;
    });
    newContext(options?: ContextOptions): QuickJSAsyncContext;
    setModuleLoader(moduleLoader: JSModuleLoaderAsync, moduleNormalizer?: JSModuleNormalizerAsync): void;
}
