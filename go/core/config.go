package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "IgnavFlight",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://ignav.com",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"airport": map[string]any{},
				"booking_link": map[string]any{},
				"fare_search_model": map[string]any{},
				"fare_search_response_model": map[string]any{},
			},
		},
		"entity": map[string]any{
			"airport": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "city",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "airport",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/airports",
								"parts": []any{
									"api",
									"airports",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"booking_link": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "adults",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "children",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "departure_date",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "destination",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "ignav_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inbound_carrier_code",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "inbound_flight_number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "infants_in_seat",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "infants_on_lap",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "market",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "origin",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "outbound_carrier_code",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "outbound_flight_number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "return_date",
						"type": "`$ANY`",
					},
				},
				"name": "booking_link",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/fares/booking-links",
								"parts": []any{
									"api",
									"fares",
									"booking-links",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
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
										"return_date": "`reqdata.return_date`",
									},
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fare_search_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "adults",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "airlines_exclude",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "airlines_include",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "allow_self_transfer",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "cabin_class",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "children",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "infants_in_seat",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "infants_on_lap",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "itineraries",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "legs",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "market",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_price",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "min_carry_on_bags",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "min_checked_bags",
						"type": "`$ANY`",
					},
				},
				"name": "fare_search_model",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/fares/search",
								"parts": []any{
									"api",
									"fares",
									"search",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
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
										"min_checked_bags": "`reqdata.min_checked_bag`",
									},
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fare_search_response_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "adults",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "airlines_exclude",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "airlines_include",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "allow_self_transfer",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "cabin_class",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "children",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "departure_date",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departure_time_range",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "destination",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "infants_in_seat",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "infants_on_lap",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "itineraries",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "market",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "max_price",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "max_stops",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "min_carry_on_bags",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "min_checked_bags",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "origin",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "return_date",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "return_time_range",
						"type": "`$ANY`",
					},
				},
				"name": "fare_search_response_model",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/fares/one-way",
								"parts": []any{
									"api",
									"fares",
									"one-way",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
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
									},
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/fares/round-trip",
								"parts": []any{
									"api",
									"fares",
									"round-trip",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
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
										"return_time_range": "`reqdata.return_time_range`",
									},
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
