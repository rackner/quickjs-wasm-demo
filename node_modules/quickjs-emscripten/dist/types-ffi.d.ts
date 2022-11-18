/**
 * C pointer to type `CType`. Pointer types are used internally for FFI, but
 * are not intended for external use.
 *
 * @unstable This type is considered private and may change.
 */
declare type Pointer<CType extends string> = number & {
    ctype: CType;
};
declare type Brand<T, B> = T & {
    brand: B;
};
/**
 * `JSRuntime*`.
 */
export declare type JSRuntimePointer = Pointer<"JSRuntime">;
/**
 * `JSContext*`.
 */
export declare type JSContextPointer = Pointer<"JSContext">;
/**
 * `JSContext**`. Used internally for execute pending jobs.
 */
export declare type JSContextPointerPointer = Pointer<"JSContext">;
/**
 * `JSModuleDef*`.
 */
export declare type JSModuleDefPointer = Pointer<"JSModuleDef">;
/**
 * `JSValue*`.
 * See [[JSValue]].
 */
export declare type JSValuePointer = Pointer<"JSValue">;
/**
 * `JSValueConst*
 * See [[JSValueConst]] and [[StaticJSValue]].
 */
export declare type JSValueConstPointer = Pointer<"JSValueConst">;
/**
 * Used internally for Javascript-to-C function calls.
 */
export declare type JSValuePointerPointer = Pointer<"JSValue[]">;
/**
 * Used internally for Javascript-to-C function calls.
 */
export declare type JSValueConstPointerPointer = Pointer<"JSValueConst[]">;
/**
 * Used internally for C-to-Javascript function calls.
 */
/**
 * Used internally for C-to-Javascript function calls.
 */
export declare type QTS_C_To_HostCallbackFuncPointer = Pointer<"C_To_HostCallbackFunc">;
/**
 * Used internally for C-to-Javascript interrupt handlers.
 */
export declare type QTS_C_To_HostInterruptFuncPointer = Pointer<"C_To_HostInterruptFunc">;
/**
 * Used internally for C-to-Javascript module loading.
 */
export declare type QTS_C_To_HostLoadModuleFuncPointer = Pointer<"C_To_HostLoadModuleFunc">;
/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export declare type BorrowedHeapCharPointer = Pointer<"const char" | "char" | "js const char">;
/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export declare type OwnedHeapCharPointer = Pointer<"char">;
/**
 * Used internally for Javascript-to-C calls that may contain strings too large
 * for the Emscripten stack.
 */
export declare type JSBorrowedCharPointer = Pointer<"js const char">;
/**
 * Opaque pointer that was allocated by js_malloc.
 */
export declare type JSVoidPointer = Pointer<any>;
/**
 * @private
 */
export declare type EvalFlags = Brand<number, "EvalFlags">;
/**
 * @private
 */
export declare type EvalDetectModule = Brand<number, "EvalDetectModule">;
export declare function assertSync<Args extends any[], R>(fn: (...args: Args) => R): (...args: Args) => R;
/** Bitfield options for JS_Eval() C function. */
export declare const EvalFlags: {
    /** global code (default) */
    JS_EVAL_TYPE_GLOBAL: number;
    /** module code */
    JS_EVAL_TYPE_MODULE: number;
    /** direct call (internal use) */
    JS_EVAL_TYPE_DIRECT: number;
    /** indirect call (internal use) */
    JS_EVAL_TYPE_INDIRECT: number;
    JS_EVAL_TYPE_MASK: number;
    /** force 'strict' mode */
    JS_EVAL_FLAG_STRICT: number;
    /** force 'strip' mode */
    JS_EVAL_FLAG_STRIP: number;
    /**
     * compile but do not run. The result is an object with a
     * JS_TAG_FUNCTION_BYTECODE or JS_TAG_MODULE tag. It can be executed
     * with JS_EvalFunction().
     */
    JS_EVAL_FLAG_COMPILE_ONLY: number;
    /** don't include the stack frames before this eval in the Error() backtraces */
    JS_EVAL_FLAG_BACKTRACE_BARRIER: number;
};
export {};
