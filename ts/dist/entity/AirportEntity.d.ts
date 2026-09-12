import { IgnavFlightEntityBase } from '../IgnavFlightEntityBase';
import type { IgnavFlightSDK } from '../IgnavFlightSDK';
import type { Control } from '../types';
import type { Airport, AirportListMatch } from '../IgnavFlightTypes';
declare class AirportEntity extends IgnavFlightEntityBase<Airport> {
    constructor(client: IgnavFlightSDK, entopts: any);
    make(this: AirportEntity): AirportEntity;
    list(this: any, reqmatch?: AirportListMatch, ctrl?: Control): Promise<AirportEntity[]>;
}
export { AirportEntity };
