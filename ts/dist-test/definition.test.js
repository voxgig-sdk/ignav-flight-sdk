"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "airport",
        "accessor": "Airport",
        "op": "list",
        "method": "GET",
        "path": "/api/airports",
        "args": [],
        "select": {
            "q": "v1",
            "limit": 10
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "q",
                "wire": "q"
            }
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "code": "x",
                "name": "x",
                "city": "x",
                "country": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "booking_link",
        "accessor": "BookingLink",
        "op": "create",
        "method": "POST",
        "path": "/api/fares/booking-links",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "itinerary": {
                "price": {
                    "amount": 1,
                    "currency": "x",
                    "status": "verified"
                },
                "outbound": {
                    "carrier": "x",
                    "duration_minutes": 1,
                    "segments": [
                        {
                            "departure_airport": "x",
                            "departure_time_local": "x",
                            "arrival_airport": "x",
                            "arrival_time_local": "x",
                            "duration_minutes": 1
                        }
                    ]
                },
                "inbound": {
                    "carrier": "x",
                    "duration_minutes": 1,
                    "segments": [
                        {}
                    ]
                },
                "cabin_class": "x",
                "bags": {
                    "carry_on": 1,
                    "checked": 1
                },
                "requires_self_transfer": true
            },
            "booking_options": [
                {
                    "legs": [
                        "outbound"
                    ],
                    "links": [
                        {
                            "provider_name": "x",
                            "provider_type": "airline",
                            "url": "x"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "fare_search_model",
        "accessor": "FareSearchModel",
        "op": "create",
        "method": "POST",
        "path": "/api/fares/search",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "legs": [
                {
                    "origin": "x",
                    "destination": "x",
                    "departure_date": "x"
                }
            ],
            "itineraries": [
                {
                    "price": {
                        "amount": 1,
                        "currency": "x",
                        "status": "verified"
                    },
                    "legs": [
                        {
                            "carrier": "x",
                            "duration_minutes": 1,
                            "segments": [
                                {}
                            ]
                        }
                    ],
                    "cabin_class": "x",
                    "bags": {
                        "carry_on": 1,
                        "checked": 1
                    },
                    "requires_self_transfer": true,
                    "ignav_id": "x"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map