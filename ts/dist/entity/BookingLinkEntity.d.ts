import { IgnavFlightEntityBase } from '../IgnavFlightEntityBase';
import type { IgnavFlightSDK } from '../IgnavFlightSDK';
import type { Control } from '../types';
import type { BookingLink, BookingLinkCreateData } from '../IgnavFlightTypes';
declare class BookingLinkEntity extends IgnavFlightEntityBase<BookingLink> {
    constructor(client: IgnavFlightSDK, entopts: any);
    make(this: BookingLinkEntity): BookingLinkEntity;
    create(this: any, reqdata?: BookingLinkCreateData, ctrl?: Control): Promise<BookingLinkEntity>;
}
export { BookingLinkEntity };
