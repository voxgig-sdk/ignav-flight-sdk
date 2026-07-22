# Typed models for the IgnavFlight SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Airport(TypedDict):
    city: str
    code: str
    country: str
    name: str


class AirportListMatch(TypedDict, total=False):
    city: str
    code: str
    country: str
    name: str


class BookingLink(TypedDict, total=False):
    adult: Any
    child: Any
    departure_date: Any
    destination: Any
    ignav_id: str
    inbound_carrier_code: Any
    inbound_flight_number: int
    infants_in_seat: Any
    infants_on_lap: Any
    market: Any
    origin: Any
    outbound_carrier_code: Any
    outbound_flight_number: int
    return_date: Any


class BookingLinkCreateData(TypedDict, total=False):
    adult: Any
    child: Any
    departure_date: Any
    destination: Any
    ignav_id: str
    inbound_carrier_code: Any
    inbound_flight_number: int
    infants_in_seat: Any
    infants_on_lap: Any
    market: Any
    origin: Any
    outbound_carrier_code: Any
    outbound_flight_number: int
    return_date: Any


class FareSearchModelRequired(TypedDict):
    itinerary: list
    leg: list


class FareSearchModel(FareSearchModelRequired, total=False):
    adult: int
    airlines_exclude: Any
    airlines_include: Any
    allow_self_transfer: bool
    cabin_class: str
    child: int
    infants_in_seat: int
    infants_on_lap: int
    market: str
    max_price: Any
    min_carry_on_bag: Any
    min_checked_bag: Any


class FareSearchModelCreateDataRequired(TypedDict):
    itinerary: list
    leg: list


class FareSearchModelCreateData(FareSearchModelCreateDataRequired, total=False):
    adult: int
    airlines_exclude: Any
    airlines_include: Any
    allow_self_transfer: bool
    cabin_class: str
    child: int
    infants_in_seat: int
    infants_on_lap: int
    market: str
    max_price: Any
    min_carry_on_bag: Any
    min_checked_bag: Any


class FareSearchResponseModelRequired(TypedDict):
    departure_date: str
    destination: str
    itinerary: list
    origin: str


class FareSearchResponseModel(FareSearchResponseModelRequired, total=False):
    adult: int
    airlines_exclude: Any
    airlines_include: Any
    allow_self_transfer: bool
    cabin_class: str
    child: int
    departure_time_range: Any
    infants_in_seat: int
    infants_on_lap: int
    market: str
    max_price: Any
    max_stop: Any
    min_carry_on_bag: Any
    min_checked_bag: Any
    return_date: Any
    return_time_range: Any


class FareSearchResponseModelCreateDataRequired(TypedDict):
    departure_date: str
    destination: str
    itinerary: list
    origin: str


class FareSearchResponseModelCreateData(FareSearchResponseModelCreateDataRequired, total=False):
    adult: int
    airlines_exclude: Any
    airlines_include: Any
    allow_self_transfer: bool
    cabin_class: str
    child: int
    departure_time_range: Any
    infants_in_seat: int
    infants_on_lap: int
    market: str
    max_price: Any
    max_stop: Any
    min_carry_on_bag: Any
    min_checked_bag: Any
    return_date: Any
    return_time_range: Any
