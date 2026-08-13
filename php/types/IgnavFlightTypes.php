<?php
declare(strict_types=1);

// Typed models for the IgnavFlight SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Airport entity data model. */
class Airport
{
    public string $city;
    public string $code;
    public string $country;
    public string $name;
}

/** Request payload for Airport#list. */
class AirportListMatch
{
    public ?string $city = null;
    public ?string $code = null;
    public ?string $country = null;
    public ?string $name = null;
}

/** BookingLink entity data model. */
class BookingLink
{
    public mixed $adults = null;
    public mixed $children = null;
    public mixed $departure_date = null;
    public mixed $destination = null;
    public ?string $ignav_id = null;
    public mixed $inbound_carrier_code = null;
    public ?int $inbound_flight_number = null;
    public mixed $infants_in_seat = null;
    public mixed $infants_on_lap = null;
    public mixed $market = null;
    public mixed $origin = null;
    public mixed $outbound_carrier_code = null;
    public ?int $outbound_flight_number = null;
    public mixed $return_date = null;
}

/** Request payload for BookingLink#create. */
class BookingLinkCreateData
{
    public mixed $adults = null;
    public mixed $children = null;
    public mixed $departure_date = null;
    public mixed $destination = null;
    public ?string $ignav_id = null;
    public mixed $inbound_carrier_code = null;
    public ?int $inbound_flight_number = null;
    public mixed $infants_in_seat = null;
    public mixed $infants_on_lap = null;
    public mixed $market = null;
    public mixed $origin = null;
    public mixed $outbound_carrier_code = null;
    public ?int $outbound_flight_number = null;
    public mixed $return_date = null;
}

/** FareSearchModel entity data model. */
class FareSearchModel
{
    public ?int $adults = null;
    public mixed $airlines_exclude = null;
    public mixed $airlines_include = null;
    public ?bool $allow_self_transfer = null;
    public ?string $cabin_class = null;
    public ?int $children = null;
    public ?int $infants_in_seat = null;
    public ?int $infants_on_lap = null;
    public array $itineraries;
    public array $legs;
    public ?string $market = null;
    public mixed $max_price = null;
    public mixed $min_carry_on_bags = null;
    public mixed $min_checked_bags = null;
}

/** Request payload for FareSearchModel#create. */
class FareSearchModelCreateData
{
    public ?int $adults = null;
    public mixed $airlines_exclude = null;
    public mixed $airlines_include = null;
    public ?bool $allow_self_transfer = null;
    public ?string $cabin_class = null;
    public ?int $children = null;
    public ?int $infants_in_seat = null;
    public ?int $infants_on_lap = null;
    public array $itineraries;
    public array $legs;
    public ?string $market = null;
    public mixed $max_price = null;
    public mixed $min_carry_on_bags = null;
    public mixed $min_checked_bags = null;
}

/** FareSearchResponseModel entity data model. */
class FareSearchResponseModel
{
    public ?int $adults = null;
    public mixed $airlines_exclude = null;
    public mixed $airlines_include = null;
    public ?bool $allow_self_transfer = null;
    public ?string $cabin_class = null;
    public ?int $children = null;
    public string $departure_date;
    public mixed $departure_time_range = null;
    public string $destination;
    public ?int $infants_in_seat = null;
    public ?int $infants_on_lap = null;
    public array $itineraries;
    public ?string $market = null;
    public mixed $max_price = null;
    public mixed $max_stops = null;
    public mixed $min_carry_on_bags = null;
    public mixed $min_checked_bags = null;
    public string $origin;
    public mixed $return_date = null;
    public mixed $return_time_range = null;
}

/** Request payload for FareSearchResponseModel#create. */
class FareSearchResponseModelCreateData
{
    public ?int $adults = null;
    public mixed $airlines_exclude = null;
    public mixed $airlines_include = null;
    public ?bool $allow_self_transfer = null;
    public ?string $cabin_class = null;
    public ?int $children = null;
    public string $departure_date;
    public mixed $departure_time_range = null;
    public string $destination;
    public ?int $infants_in_seat = null;
    public ?int $infants_on_lap = null;
    public array $itineraries;
    public ?string $market = null;
    public mixed $max_price = null;
    public mixed $max_stops = null;
    public mixed $min_carry_on_bags = null;
    public mixed $min_checked_bags = null;
    public string $origin;
    public mixed $return_date = null;
    public mixed $return_time_range = null;
}

