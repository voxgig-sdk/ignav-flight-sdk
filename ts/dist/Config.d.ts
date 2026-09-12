import { BaseFeature } from './feature/base/BaseFeature';
declare const FEATURE_PLUGINS: Record<string, any[]>;
declare class Config {
    makeFeature(this: any, fn: string): BaseFeature;
    hasFeature(this: any, fn: string): boolean;
    main: {
        name: string;
        slug: string;
        version: string;
        target: string;
    };
    feature: {
        test: {
            options: {
                active: boolean;
            };
            transport: string;
        };
    };
    options: {
        base: string;
        auth: {
            prefix: string;
        };
        headers: {
            "content-type": string;
        };
        entity: {
            airport: {};
            booking_link: {};
            fare_search_model: {};
            fare_search_response_model: {};
        };
    };
    entity: {
        airport: {
            fields: {
                name: string;
                req: boolean;
                type: string;
            }[];
            name: string;
            op: {
                list: {
                    input: string;
                    name: string;
                    points: {
                        args: {
                            query: ({
                                example: number;
                                kind: string;
                                name: string;
                                orig: string;
                                type: string;
                                reqd?: undefined;
                            } | {
                                kind: string;
                                name: string;
                                orig: string;
                                reqd: boolean;
                                type: string;
                                example?: undefined;
                            })[];
                        };
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {
                            exist: string[];
                        };
                        transform: {
                            req: string;
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        booking_link: {
            fields: {
                name: string;
                type: string;
            }[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: {
                                adults: string;
                                children: string;
                                departure_date: string;
                                destination: string;
                                ignav_id: string;
                                inbound_carrier_code: string;
                                inbound_flight_number: string;
                                infants_in_seat: string;
                                infants_on_lap: string;
                                market: string;
                                origin: string;
                                outbound_carrier_code: string;
                                outbound_flight_number: string;
                                return_date: string;
                            };
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        fare_search_model: {
            fields: ({
                name: string;
                type: string;
                req?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: {
                                adults: string;
                                airlines_exclude: string;
                                airlines_include: string;
                                allow_self_transfer: string;
                                cabin_class: string;
                                children: string;
                                infants_in_seat: string;
                                infants_on_lap: string;
                                legs: string;
                                market: string;
                                max_price: string;
                                min_carry_on_bags: string;
                                min_checked_bags: string;
                            };
                            res: string;
                        };
                        parts: string[];
                    }[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
        fare_search_response_model: {
            fields: ({
                name: string;
                type: string;
                format?: undefined;
                req?: undefined;
                op?: undefined;
            } | {
                format: string;
                name: string;
                req: boolean;
                type: string;
                op?: undefined;
            } | {
                name: string;
                req: boolean;
                type: string;
                format?: undefined;
                op?: undefined;
            } | {
                format: string;
                name: string;
                op: {
                    create: {
                        req: boolean;
                        type: string;
                    };
                };
                type: string;
                req?: undefined;
            })[];
            name: string;
            op: {
                create: {
                    input: string;
                    name: string;
                    points: ({
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: {
                                adults: string;
                                airlines_exclude: string;
                                airlines_include: string;
                                allow_self_transfer: string;
                                cabin_class: string;
                                children: string;
                                departure_date: string;
                                departure_time_range: string;
                                destination: string;
                                infants_in_seat: string;
                                infants_on_lap: string;
                                market: string;
                                max_price: string;
                                max_stops: string;
                                min_carry_on_bags: string;
                                min_checked_bags: string;
                                origin: string;
                                return_date?: undefined;
                                return_time_range?: undefined;
                            };
                            res: string;
                        };
                        parts: string[];
                    } | {
                        args: {};
                        kind: string;
                        method: string;
                        orig: string;
                        segments: {
                            lit: string;
                        }[];
                        select: {};
                        transform: {
                            req: {
                                adults: string;
                                airlines_exclude: string;
                                airlines_include: string;
                                allow_self_transfer: string;
                                cabin_class: string;
                                children: string;
                                departure_date: string;
                                departure_time_range: string;
                                destination: string;
                                infants_in_seat: string;
                                infants_on_lap: string;
                                market: string;
                                max_price: string;
                                max_stops: string;
                                min_carry_on_bags: string;
                                min_checked_bags: string;
                                origin: string;
                                return_date: string;
                                return_time_range: string;
                            };
                            res: string;
                        };
                        parts: string[];
                    })[];
                };
            };
            relations: {
                ancestors: never[];
            };
        };
    };
}
declare const config: Config;
export { config, FEATURE_PLUGINS, };
