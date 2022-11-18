"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestQuickJSWASMModule = void 0;
const errors_1 = require("./errors");
const lifetime_1 = require("./lifetime");
/**
 * A test wrapper of [[QuickJSWASMModule]] that keeps a reference to each
 * context or runtime created.
 *
 * Call [[disposeAll]] to reset these sets and calls `dispose` on any left alive
 * (which may throw an error).
 *
 * Call [[assertNoMemoryAllocated]] at the end of a test, when you expect that you've
 * freed all the memory you've ever allocated.
 */
class TestQuickJSWASMModule {
    constructor(parent) {
        this.parent = parent;
        this.contexts = new Set();
        this.runtimes = new Set();
    }
    newRuntime(options) {
        var _a;
        const runtime = this.parent.newRuntime(Object.assign(Object.assign({}, options), { ownedLifetimes: [
                new lifetime_1.Lifetime(undefined, undefined, () => this.runtimes.delete(runtime)),
                ...((_a = options === null || options === void 0 ? void 0 : options.ownedLifetimes) !== null && _a !== void 0 ? _a : []),
            ] }));
        this.runtimes.add(runtime);
        return runtime;
    }
    newContext(options) {
        var _a;
        const context = this.parent.newContext(Object.assign(Object.assign({}, options), { ownedLifetimes: [
                new lifetime_1.Lifetime(undefined, undefined, () => this.contexts.delete(context)),
                ...((_a = options === null || options === void 0 ? void 0 : options.ownedLifetimes) !== null && _a !== void 0 ? _a : []),
            ] }));
        this.contexts.add(context);
        return context;
    }
    evalCode(code, options) {
        return this.parent.evalCode(code, options);
    }
    disposeAll() {
        const allDisposables = [...this.contexts, ...this.runtimes];
        this.runtimes.clear();
        this.contexts.clear();
        allDisposables.forEach((d) => {
            if (d.alive) {
                d.dispose();
            }
        });
    }
    assertNoMemoryAllocated() {
        const leaksDetected = this.getFFI().QTS_RecoverableLeakCheck();
        if (leaksDetected) {
            // Note: this is currently only available when building from source
            // with debug builds.
            throw new errors_1.QuickJSMemoryLeakDetected("Leak sanitizer detected un-freed memory");
        }
        if (this.contexts.size > 0) {
            throw new errors_1.QuickJSMemoryLeakDetected(`${this.contexts.size} contexts leaked`);
        }
        if (this.runtimes.size > 0) {
            throw new errors_1.QuickJSMemoryLeakDetected(`${this.runtimes.size} runtimes leaked`);
        }
    }
    /** @private */
    getFFI() {
        return this.parent.getFFI();
    }
}
exports.TestQuickJSWASMModule = TestQuickJSWASMModule;
//# sourceMappingURL=module-test.js.map