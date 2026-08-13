// Typed models for the IgnavFlight SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Airport {
  city: string
  code: string
  country: string
  name: string
}

export interface AirportListMatch {
  city?: string
  code?: string
  country?: string
  name?: string
}

export interface BookingLink {
  adults?: any
  children?: any
  departure_date?: any
  destination?: any
  ignav_id?: string
  inbound_carrier_code?: any
  inbound_flight_number?: number
  infants_in_seat?: any
  infants_on_lap?: any
  market?: any
  origin?: any
  outbound_carrier_code?: any
  outbound_flight_number?: number
  return_date?: any
}

export interface BookingLinkCreateData {
  adults?: any
  children?: any
  departure_date?: any
  destination?: any
  ignav_id?: string
  inbound_carrier_code?: any
  inbound_flight_number?: number
  infants_in_seat?: any
  infants_on_lap?: any
  market?: any
  origin?: any
  outbound_carrier_code?: any
  outbound_flight_number?: number
  return_date?: any
}

export interface FareSearchModel {
  adults?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  children?: number
  infants_in_seat?: number
  infants_on_lap?: number
  itineraries: any[]
  legs: any[]
  market?: string
  max_price?: any
  min_carry_on_bags?: any
  min_checked_bags?: any
}

export interface FareSearchModelCreateData {
  adults?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  children?: number
  infants_in_seat?: number
  infants_on_lap?: number
  itineraries: any[]
  legs: any[]
  market?: string
  max_price?: any
  min_carry_on_bags?: any
  min_checked_bags?: any
}

export interface FareSearchResponseModel {
  adults?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  children?: number
  departure_date: string
  departure_time_range?: any
  destination: string
  infants_in_seat?: number
  infants_on_lap?: number
  itineraries: any[]
  market?: string
  max_price?: any
  max_stops?: any
  min_carry_on_bags?: any
  min_checked_bags?: any
  origin: string
  return_date?: any
  return_time_range?: any
}

export interface FareSearchResponseModelCreateData {
  adults?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  children?: number
  departure_date: string
  departure_time_range?: any
  destination: string
  infants_in_seat?: number
  infants_on_lap?: number
  itineraries: any[]
  market?: string
  max_price?: any
  max_stops?: any
  min_carry_on_bags?: any
  min_checked_bags?: any
  origin: string
  return_date?: any
  return_time_range?: any
}

