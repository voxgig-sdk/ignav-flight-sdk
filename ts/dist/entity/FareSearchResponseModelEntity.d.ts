import { IgnavFlightEntityBase } from '../IgnavFlightEntityBase';
import type { IgnavFlightSDK } from '../IgnavFlightSDK';
import type { Control } from '../types';
import type { FareSearchResponseModel, FareSearchResponseModelCreateData } from '../IgnavFlightTypes';
declare class FareSearchResponseModelEntity extends IgnavFlightEntityBase<FareSearchResponseModel> {
    constructor(client: IgnavFlightSDK, entopts: any);
    make(this: FareSearchResponseModelEntity): FareSearchResponseModelEntity;
    create(this: any, reqdata?: FareSearchResponseModelCreateData, ctrl?: Control): Promise<FareSearchResponseModelEntity>;
}
export { FareSearchResponseModelEntity };
