// Typed models for the IgnavFlight SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Airport is the typed data model for the airport entity.
type Airport struct {
	City string `json:"city"`
	Code string `json:"code"`
	Country string `json:"country"`
	Name string `json:"name"`
}

// AirportListMatch is the typed request payload for Airport.ListTyped.
type AirportListMatch struct {
	City *string `json:"city,omitempty"`
	Code *string `json:"code,omitempty"`
	Country *string `json:"country,omitempty"`
	Name *string `json:"name,omitempty"`
}

// BookingLink is the typed data model for the booking_link entity.
type BookingLink struct {
	Adult *any `json:"adult,omitempty"`
	Child *any `json:"child,omitempty"`
	DepartureDate *any `json:"departure_date,omitempty"`
	Destination *any `json:"destination,omitempty"`
	IgnavId *string `json:"ignav_id,omitempty"`
	InboundCarrierCode *any `json:"inbound_carrier_code,omitempty"`
	InboundFlightNumber *int `json:"inbound_flight_number,omitempty"`
	InfantsInSeat *any `json:"infants_in_seat,omitempty"`
	InfantsOnLap *any `json:"infants_on_lap,omitempty"`
	Market *any `json:"market,omitempty"`
	Origin *any `json:"origin,omitempty"`
	OutboundCarrierCode *any `json:"outbound_carrier_code,omitempty"`
	OutboundFlightNumber *int `json:"outbound_flight_number,omitempty"`
	ReturnDate *any `json:"return_date,omitempty"`
}

// BookingLinkCreateData is the typed request payload for BookingLink.CreateTyped.
type BookingLinkCreateData struct {
	Adult *any `json:"adult,omitempty"`
	Child *any `json:"child,omitempty"`
	DepartureDate *any `json:"departure_date,omitempty"`
	Destination *any `json:"destination,omitempty"`
	IgnavId *string `json:"ignav_id,omitempty"`
	InboundCarrierCode *any `json:"inbound_carrier_code,omitempty"`
	InboundFlightNumber *int `json:"inbound_flight_number,omitempty"`
	InfantsInSeat *any `json:"infants_in_seat,omitempty"`
	InfantsOnLap *any `json:"infants_on_lap,omitempty"`
	Market *any `json:"market,omitempty"`
	Origin *any `json:"origin,omitempty"`
	OutboundCarrierCode *any `json:"outbound_carrier_code,omitempty"`
	OutboundFlightNumber *int `json:"outbound_flight_number,omitempty"`
	ReturnDate *any `json:"return_date,omitempty"`
}

// FareSearchModel is the typed data model for the fare_search_model entity.
type FareSearchModel struct {
	Adult *int `json:"adult,omitempty"`
	AirlinesExclude *any `json:"airlines_exclude,omitempty"`
	AirlinesInclude *any `json:"airlines_include,omitempty"`
	AllowSelfTransfer *bool `json:"allow_self_transfer,omitempty"`
	CabinClass *string `json:"cabin_class,omitempty"`
	Child *int `json:"child,omitempty"`
	InfantsInSeat *int `json:"infants_in_seat,omitempty"`
	InfantsOnLap *int `json:"infants_on_lap,omitempty"`
	Itinerary []any `json:"itinerary"`
	Leg []any `json:"leg"`
	Market *string `json:"market,omitempty"`
	MaxPrice *any `json:"max_price,omitempty"`
	MinCarryOnBag *any `json:"min_carry_on_bag,omitempty"`
	MinCheckedBag *any `json:"min_checked_bag,omitempty"`
}

// FareSearchModelCreateData is the typed request payload for FareSearchModel.CreateTyped.
type FareSearchModelCreateData struct {
	Adult *int `json:"adult,omitempty"`
	AirlinesExclude *any `json:"airlines_exclude,omitempty"`
	AirlinesInclude *any `json:"airlines_include,omitempty"`
	AllowSelfTransfer *bool `json:"allow_self_transfer,omitempty"`
	CabinClass *string `json:"cabin_class,omitempty"`
	Child *int `json:"child,omitempty"`
	InfantsInSeat *int `json:"infants_in_seat,omitempty"`
	InfantsOnLap *int `json:"infants_on_lap,omitempty"`
	Itinerary []any `json:"itinerary"`
	Leg []any `json:"leg"`
	Market *string `json:"market,omitempty"`
	MaxPrice *any `json:"max_price,omitempty"`
	MinCarryOnBag *any `json:"min_carry_on_bag,omitempty"`
	MinCheckedBag *any `json:"min_checked_bag,omitempty"`
}

// FareSearchResponseModel is the typed data model for the fare_search_response_model entity.
type FareSearchResponseModel struct {
	Adult *int `json:"adult,omitempty"`
	AirlinesExclude *any `json:"airlines_exclude,omitempty"`
	AirlinesInclude *any `json:"airlines_include,omitempty"`
	AllowSelfTransfer *bool `json:"allow_self_transfer,omitempty"`
	CabinClass *string `json:"cabin_class,omitempty"`
	Child *int `json:"child,omitempty"`
	DepartureDate string `json:"departure_date"`
	DepartureTimeRange *any `json:"departure_time_range,omitempty"`
	Destination string `json:"destination"`
	InfantsInSeat *int `json:"infants_in_seat,omitempty"`
	InfantsOnLap *int `json:"infants_on_lap,omitempty"`
	Itinerary []any `json:"itinerary"`
	Market *string `json:"market,omitempty"`
	MaxPrice *any `json:"max_price,omitempty"`
	MaxStop *any `json:"max_stop,omitempty"`
	MinCarryOnBag *any `json:"min_carry_on_bag,omitempty"`
	MinCheckedBag *any `json:"min_checked_bag,omitempty"`
	Origin string `json:"origin"`
	ReturnDate *any `json:"return_date,omitempty"`
	ReturnTimeRange *any `json:"return_time_range,omitempty"`
}

// FareSearchResponseModelCreateData is the typed request payload for FareSearchResponseModel.CreateTyped.
type FareSearchResponseModelCreateData struct {
	Adult *int `json:"adult,omitempty"`
	AirlinesExclude *any `json:"airlines_exclude,omitempty"`
	AirlinesInclude *any `json:"airlines_include,omitempty"`
	AllowSelfTransfer *bool `json:"allow_self_transfer,omitempty"`
	CabinClass *string `json:"cabin_class,omitempty"`
	Child *int `json:"child,omitempty"`
	DepartureDate string `json:"departure_date"`
	DepartureTimeRange *any `json:"departure_time_range,omitempty"`
	Destination string `json:"destination"`
	InfantsInSeat *int `json:"infants_in_seat,omitempty"`
	InfantsOnLap *int `json:"infants_on_lap,omitempty"`
	Itinerary []any `json:"itinerary"`
	Market *string `json:"market,omitempty"`
	MaxPrice *any `json:"max_price,omitempty"`
	MaxStop *any `json:"max_stop,omitempty"`
	MinCarryOnBag *any `json:"min_carry_on_bag,omitempty"`
	MinCheckedBag *any `json:"min_checked_bag,omitempty"`
	Origin string `json:"origin"`
	ReturnDate *any `json:"return_date,omitempty"`
	ReturnTimeRange *any `json:"return_time_range,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
