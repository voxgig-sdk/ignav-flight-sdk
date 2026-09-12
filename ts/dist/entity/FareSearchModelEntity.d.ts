import { IgnavFlightEntityBase } from '../IgnavFlightEntityBase';
import type { IgnavFlightSDK } from '../IgnavFlightSDK';
import type { Control } from '../types';
import type { FareSearchModel, FareSearchModelCreateData } from '../IgnavFlightTypes';
declare class FareSearchModelEntity extends IgnavFlightEntityBase<FareSearchModel> {
    constructor(client: IgnavFlightSDK, entopts: any);
    make(this: FareSearchModelEntity): FareSearchModelEntity;
    create(this: any, reqdata?: FareSearchModelCreateData, ctrl?: Control): Promise<FareSearchModelEntity>;
}
export { FareSearchModelEntity };
