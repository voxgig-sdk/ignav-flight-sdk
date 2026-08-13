
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'IgnavFlight',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: 'https://ignav.com',

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      airport: {
      },

      booking_link: {
      },

      fare_search_model: {
      },

      fare_search_response_model: {
      },

    }
  }


  entity = {
    "airport": {
      "fields": [
        {
          "active": true,
          "name": "city",
          "req": true,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "code",
          "req": true,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "country",
          "req": true,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "airport",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {
                "query": [
                  {
                    "active": true,
                    "example": 10,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/airports",
              "parts": [
                "api",
                "airports"
              ],
              "select": {
                "exist": [
                  "limit",
                  "q"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "booking_link": {
      "fields": [
        {
          "active": true,
          "name": "adults",
          "req": false,
          "type": "`$ANY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "children",
          "req": false,
          "type": "`$ANY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "departure_date",
          "req": false,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "destination",
          "req": false,
          "type": "`$ANY`",
          "index$": 3
        },
        {
          "active": true,
          "name": "ignav_id",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "inbound_carrier_code",
          "req": false,
          "type": "`$ANY`",
          "index$": 5
        },
        {
          "active": true,
          "name": "inbound_flight_number",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "infants_in_seat",
          "req": false,
          "type": "`$ANY`",
          "index$": 7
        },
        {
          "active": true,
          "name": "infants_on_lap",
          "req": false,
          "type": "`$ANY`",
          "index$": 8
        },
        {
          "active": true,
          "name": "market",
          "req": false,
          "type": "`$ANY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "origin",
          "req": false,
          "type": "`$ANY`",
          "index$": 10
        },
        {
          "active": true,
          "name": "outbound_carrier_code",
          "req": false,
          "type": "`$ANY`",
          "index$": 11
        },
        {
          "active": true,
          "name": "outbound_flight_number",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 12
        },
        {
          "active": true,
          "name": "return_date",
          "req": false,
          "type": "`$ANY`",
          "index$": 13
        }
      ],
      "name": "booking_link",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/fares/booking-links",
              "parts": [
                "api",
                "fares",
                "booking-links"
              ],
              "select": {},
              "transform": {
                "req": {
                  "adults": "`reqdata.adult`",
                  "children": "`reqdata.child`",
                  "departure_date": "`reqdata.departure_date`",
                  "destination": "`reqdata.destination`",
                  "ignav_id": "`reqdata.ignav_id`",
                  "inbound_carrier_code": "`reqdata.inbound_carrier_code`",
                  "inbound_flight_number": "`reqdata.inbound_flight_number`",
                  "infants_in_seat": "`reqdata.infants_in_seat`",
                  "infants_on_lap": "`reqdata.infants_on_lap`",
                  "market": "`reqdata.market`",
                  "origin": "`reqdata.origin`",
                  "outbound_carrier_code": "`reqdata.outbound_carrier_code`",
                  "outbound_flight_number": "`reqdata.outbound_flight_number`",
                  "return_date": "`reqdata.return_date`"
                },
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "fare_search_model": {
      "fields": [
        {
          "active": true,
          "name": "adults",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "airlines_exclude",
          "req": false,
          "type": "`$ANY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "airlines_include",
          "req": false,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "allow_self_transfer",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 3
        },
        {
          "active": true,
          "name": "cabin_class",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "children",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "infants_in_seat",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 6
        },
        {
          "active": true,
          "name": "infants_on_lap",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 7
        },
        {
          "active": true,
          "name": "itineraries",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 8
        },
        {
          "active": true,
          "name": "legs",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 9
        },
        {
          "active": true,
          "name": "market",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "max_price",
          "req": false,
          "type": "`$ANY`",
          "index$": 11
        },
        {
          "active": true,
          "name": "min_carry_on_bags",
          "req": false,
          "type": "`$ANY`",
          "index$": 12
        },
        {
          "active": true,
          "name": "min_checked_bags",
          "req": false,
          "type": "`$ANY`",
          "index$": 13
        }
      ],
      "name": "fare_search_model",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/fares/search",
              "parts": [
                "api",
                "fares",
                "search"
              ],
              "select": {},
              "transform": {
                "req": {
                  "adults": "`reqdata.adult`",
                  "airlines_exclude": "`reqdata.airlines_exclude`",
                  "airlines_include": "`reqdata.airlines_include`",
                  "allow_self_transfer": "`reqdata.allow_self_transfer`",
                  "cabin_class": "`reqdata.cabin_class`",
                  "children": "`reqdata.child`",
                  "infants_in_seat": "`reqdata.infants_in_seat`",
                  "infants_on_lap": "`reqdata.infants_on_lap`",
                  "legs": "`reqdata.leg`",
                  "market": "`reqdata.market`",
                  "max_price": "`reqdata.max_price`",
                  "min_carry_on_bags": "`reqdata.min_carry_on_bag`",
                  "min_checked_bags": "`reqdata.min_checked_bag`"
                },
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "fare_search_response_model": {
      "fields": [
        {
          "active": true,
          "name": "adults",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "airlines_exclude",
          "req": false,
          "type": "`$ANY`",
          "index$": 1
        },
        {
          "active": true,
          "name": "airlines_include",
          "req": false,
          "type": "`$ANY`",
          "index$": 2
        },
        {
          "active": true,
          "name": "allow_self_transfer",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 3
        },
        {
          "active": true,
          "name": "cabin_class",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "children",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 5
        },
        {
          "active": true,
          "name": "departure_date",
          "req": true,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "departure_time_range",
          "req": false,
          "type": "`$ANY`",
          "index$": 7
        },
        {
          "active": true,
          "name": "destination",
          "req": true,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "infants_in_seat",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 9
        },
        {
          "active": true,
          "name": "infants_on_lap",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 10
        },
        {
          "active": true,
          "name": "itineraries",
          "req": true,
          "type": "`$ARRAY`",
          "index$": 11
        },
        {
          "active": true,
          "name": "market",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "max_price",
          "req": false,
          "type": "`$ANY`",
          "index$": 13
        },
        {
          "active": true,
          "name": "max_stops",
          "req": false,
          "type": "`$ANY`",
          "index$": 14
        },
        {
          "active": true,
          "name": "min_carry_on_bags",
          "req": false,
          "type": "`$ANY`",
          "index$": 15
        },
        {
          "active": true,
          "name": "min_checked_bags",
          "req": false,
          "type": "`$ANY`",
          "index$": 16
        },
        {
          "active": true,
          "name": "origin",
          "req": true,
          "type": "`$STRING`",
          "index$": 17
        },
        {
          "active": true,
          "name": "return_date",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$ANY`",
          "index$": 18
        },
        {
          "active": true,
          "name": "return_time_range",
          "req": false,
          "type": "`$ANY`",
          "index$": 19
        }
      ],
      "name": "fare_search_response_model",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/fares/one-way",
              "parts": [
                "api",
                "fares",
                "one-way"
              ],
              "select": {},
              "transform": {
                "req": {
                  "adults": "`reqdata.adult`",
                  "airlines_exclude": "`reqdata.airlines_exclude`",
                  "airlines_include": "`reqdata.airlines_include`",
                  "allow_self_transfer": "`reqdata.allow_self_transfer`",
                  "cabin_class": "`reqdata.cabin_class`",
                  "children": "`reqdata.child`",
                  "departure_date": "`reqdata.departure_date`",
                  "departure_time_range": "`reqdata.departure_time_range`",
                  "destination": "`reqdata.destination`",
                  "infants_in_seat": "`reqdata.infants_in_seat`",
                  "infants_on_lap": "`reqdata.infants_on_lap`",
                  "market": "`reqdata.market`",
                  "max_price": "`reqdata.max_price`",
                  "max_stops": "`reqdata.max_stop`",
                  "min_carry_on_bags": "`reqdata.min_carry_on_bag`",
                  "min_checked_bags": "`reqdata.min_checked_bag`",
                  "origin": "`reqdata.origin`"
                },
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/api/fares/round-trip",
              "parts": [
                "api",
                "fares",
                "round-trip"
              ],
              "select": {},
              "transform": {
                "req": {
                  "adults": "`reqdata.adult`",
                  "airlines_exclude": "`reqdata.airlines_exclude`",
                  "airlines_include": "`reqdata.airlines_include`",
                  "allow_self_transfer": "`reqdata.allow_self_transfer`",
                  "cabin_class": "`reqdata.cabin_class`",
                  "children": "`reqdata.child`",
                  "departure_date": "`reqdata.departure_date`",
                  "departure_time_range": "`reqdata.departure_time_range`",
                  "destination": "`reqdata.destination`",
                  "infants_in_seat": "`reqdata.infants_in_seat`",
                  "infants_on_lap": "`reqdata.infants_on_lap`",
                  "market": "`reqdata.market`",
                  "max_price": "`reqdata.max_price`",
                  "max_stops": "`reqdata.max_stop`",
                  "min_carry_on_bags": "`reqdata.min_carry_on_bag`",
                  "min_checked_bags": "`reqdata.min_checked_bag`",
                  "origin": "`reqdata.origin`",
                  "return_date": "`reqdata.return_date`",
                  "return_time_range": "`reqdata.return_time_range`"
                },
                "res": "`body`"
              },
              "index$": 1
            }
          ],
          "key$": "create"
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

