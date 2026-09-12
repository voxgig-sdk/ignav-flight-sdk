import { Context } from './Context';
declare class IgnavFlightError extends Error {
    isIgnavFlightError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { IgnavFlightError };
