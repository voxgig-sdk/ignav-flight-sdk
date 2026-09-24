"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgnavFlightError = void 0;
class IgnavFlightError extends Error {
    isIgnavFlightError = true;
    sdk = 'IgnavFlight';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.IgnavFlightError = IgnavFlightError;
//# sourceMappingURL=IgnavFlightError.js.map