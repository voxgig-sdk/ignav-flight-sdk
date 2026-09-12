import { AirportEntity } from './entity/AirportEntity';
import { BookingLinkEntity } from './entity/BookingLinkEntity';
import { FareSearchModelEntity } from './entity/FareSearchModelEntity';
import { FareSearchResponseModelEntity } from './entity/FareSearchResponseModelEntity';
export type * from './IgnavFlightTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { IgnavFlightEntityBase } from './IgnavFlightEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class IgnavFlightSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Airport(entopts?: Record<string, any>): AirportEntity;
    BookingLink(entopts?: Record<string, any>): BookingLinkEntity;
    FareSearchModel(entopts?: Record<string, any>): FareSearchModelEntity;
    FareSearchResponseModel(entopts?: Record<string, any>): FareSearchResponseModelEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): IgnavFlightSDK;
    tester(testopts?: any, sdkopts?: any): IgnavFlightSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof IgnavFlightSDK;
export { stdutil, config, BaseFeature, IgnavFlightEntityBase, IgnavFlightSDK, SDK, };
