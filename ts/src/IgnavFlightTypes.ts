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
  adult?: any
  child?: any
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
  adult?: any
  child?: any
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
  adult?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  child?: number
  infants_in_seat?: number
  infants_on_lap?: number
  itinerary: any[]
  leg: any[]
  market?: string
  max_price?: any
  min_carry_on_bag?: any
  min_checked_bag?: any
}

export interface FareSearchModelCreateData {
  adult?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  child?: number
  infants_in_seat?: number
  infants_on_lap?: number
  itinerary: any[]
  leg: any[]
  market?: string
  max_price?: any
  min_carry_on_bag?: any
  min_checked_bag?: any
}

export interface FareSearchResponseModel {
  adult?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  child?: number
  departure_date: string
  departure_time_range?: any
  destination: string
  infants_in_seat?: number
  infants_on_lap?: number
  itinerary: any[]
  market?: string
  max_price?: any
  max_stop?: any
  min_carry_on_bag?: any
  min_checked_bag?: any
  origin: string
  return_date?: any
  return_time_range?: any
}

export interface FareSearchResponseModelCreateData {
  adult?: number
  airlines_exclude?: any
  airlines_include?: any
  allow_self_transfer?: boolean
  cabin_class?: string
  child?: number
  departure_date: string
  departure_time_range?: any
  destination: string
  infants_in_seat?: number
  infants_on_lap?: number
  itinerary: any[]
  market?: string
  max_price?: any
  max_stop?: any
  min_carry_on_bag?: any
  min_checked_bag?: any
  origin: string
  return_date?: any
  return_time_range?: any
}

