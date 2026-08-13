# frozen_string_literal: true

# Typed models for the IgnavFlight SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Airport entity data model.
#
# @!attribute [rw] city
#   @return [String]
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
Airport = Struct.new(
  :city,
  :code,
  :country,
  :name,
  keyword_init: true
)

# Request payload for Airport#list.
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
AirportListMatch = Struct.new(
  :city,
  :code,
  :country,
  :name,
  keyword_init: true
)

# BookingLink entity data model.
#
# @!attribute [rw] adults
#   @return [Object, nil]
#
# @!attribute [rw] children
#   @return [Object, nil]
#
# @!attribute [rw] departure_date
#   @return [Object, nil]
#
# @!attribute [rw] destination
#   @return [Object, nil]
#
# @!attribute [rw] ignav_id
#   @return [String, nil]
#
# @!attribute [rw] inbound_carrier_code
#   @return [Object, nil]
#
# @!attribute [rw] inbound_flight_number
#   @return [Integer, nil]
#
# @!attribute [rw] infants_in_seat
#   @return [Object, nil]
#
# @!attribute [rw] infants_on_lap
#   @return [Object, nil]
#
# @!attribute [rw] market
#   @return [Object, nil]
#
# @!attribute [rw] origin
#   @return [Object, nil]
#
# @!attribute [rw] outbound_carrier_code
#   @return [Object, nil]
#
# @!attribute [rw] outbound_flight_number
#   @return [Integer, nil]
#
# @!attribute [rw] return_date
#   @return [Object, nil]
BookingLink = Struct.new(
  :adults,
  :children,
  :departure_date,
  :destination,
  :ignav_id,
  :inbound_carrier_code,
  :inbound_flight_number,
  :infants_in_seat,
  :infants_on_lap,
  :market,
  :origin,
  :outbound_carrier_code,
  :outbound_flight_number,
  :return_date,
  keyword_init: true
)

# Request payload for BookingLink#create.
#
# @!attribute [rw] adults
#   @return [Object, nil]
#
# @!attribute [rw] children
#   @return [Object, nil]
#
# @!attribute [rw] departure_date
#   @return [Object, nil]
#
# @!attribute [rw] destination
#   @return [Object, nil]
#
# @!attribute [rw] ignav_id
#   @return [String, nil]
#
# @!attribute [rw] inbound_carrier_code
#   @return [Object, nil]
#
# @!attribute [rw] inbound_flight_number
#   @return [Integer, nil]
#
# @!attribute [rw] infants_in_seat
#   @return [Object, nil]
#
# @!attribute [rw] infants_on_lap
#   @return [Object, nil]
#
# @!attribute [rw] market
#   @return [Object, nil]
#
# @!attribute [rw] origin
#   @return [Object, nil]
#
# @!attribute [rw] outbound_carrier_code
#   @return [Object, nil]
#
# @!attribute [rw] outbound_flight_number
#   @return [Integer, nil]
#
# @!attribute [rw] return_date
#   @return [Object, nil]
BookingLinkCreateData = Struct.new(
  :adults,
  :children,
  :departure_date,
  :destination,
  :ignav_id,
  :inbound_carrier_code,
  :inbound_flight_number,
  :infants_in_seat,
  :infants_on_lap,
  :market,
  :origin,
  :outbound_carrier_code,
  :outbound_flight_number,
  :return_date,
  keyword_init: true
)

# FareSearchModel entity data model.
#
# @!attribute [rw] adults
#   @return [Integer, nil]
#
# @!attribute [rw] airlines_exclude
#   @return [Object, nil]
#
# @!attribute [rw] airlines_include
#   @return [Object, nil]
#
# @!attribute [rw] allow_self_transfer
#   @return [Boolean, nil]
#
# @!attribute [rw] cabin_class
#   @return [String, nil]
#
# @!attribute [rw] children
#   @return [Integer, nil]
#
# @!attribute [rw] infants_in_seat
#   @return [Integer, nil]
#
# @!attribute [rw] infants_on_lap
#   @return [Integer, nil]
#
# @!attribute [rw] itineraries
#   @return [Array]
#
# @!attribute [rw] legs
#   @return [Array]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] max_price
#   @return [Object, nil]
#
# @!attribute [rw] min_carry_on_bags
#   @return [Object, nil]
#
# @!attribute [rw] min_checked_bags
#   @return [Object, nil]
FareSearchModel = Struct.new(
  :adults,
  :airlines_exclude,
  :airlines_include,
  :allow_self_transfer,
  :cabin_class,
  :children,
  :infants_in_seat,
  :infants_on_lap,
  :itineraries,
  :legs,
  :market,
  :max_price,
  :min_carry_on_bags,
  :min_checked_bags,
  keyword_init: true
)

# Request payload for FareSearchModel#create.
#
# @!attribute [rw] adults
#   @return [Integer, nil]
#
# @!attribute [rw] airlines_exclude
#   @return [Object, nil]
#
# @!attribute [rw] airlines_include
#   @return [Object, nil]
#
# @!attribute [rw] allow_self_transfer
#   @return [Boolean, nil]
#
# @!attribute [rw] cabin_class
#   @return [String, nil]
#
# @!attribute [rw] children
#   @return [Integer, nil]
#
# @!attribute [rw] infants_in_seat
#   @return [Integer, nil]
#
# @!attribute [rw] infants_on_lap
#   @return [Integer, nil]
#
# @!attribute [rw] itineraries
#   @return [Array]
#
# @!attribute [rw] legs
#   @return [Array]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] max_price
#   @return [Object, nil]
#
# @!attribute [rw] min_carry_on_bags
#   @return [Object, nil]
#
# @!attribute [rw] min_checked_bags
#   @return [Object, nil]
FareSearchModelCreateData = Struct.new(
  :adults,
  :airlines_exclude,
  :airlines_include,
  :allow_self_transfer,
  :cabin_class,
  :children,
  :infants_in_seat,
  :infants_on_lap,
  :itineraries,
  :legs,
  :market,
  :max_price,
  :min_carry_on_bags,
  :min_checked_bags,
  keyword_init: true
)

# FareSearchResponseModel entity data model.
#
# @!attribute [rw] adults
#   @return [Integer, nil]
#
# @!attribute [rw] airlines_exclude
#   @return [Object, nil]
#
# @!attribute [rw] airlines_include
#   @return [Object, nil]
#
# @!attribute [rw] allow_self_transfer
#   @return [Boolean, nil]
#
# @!attribute [rw] cabin_class
#   @return [String, nil]
#
# @!attribute [rw] children
#   @return [Integer, nil]
#
# @!attribute [rw] departure_date
#   @return [String]
#
# @!attribute [rw] departure_time_range
#   @return [Object, nil]
#
# @!attribute [rw] destination
#   @return [String]
#
# @!attribute [rw] infants_in_seat
#   @return [Integer, nil]
#
# @!attribute [rw] infants_on_lap
#   @return [Integer, nil]
#
# @!attribute [rw] itineraries
#   @return [Array]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] max_price
#   @return [Object, nil]
#
# @!attribute [rw] max_stops
#   @return [Object, nil]
#
# @!attribute [rw] min_carry_on_bags
#   @return [Object, nil]
#
# @!attribute [rw] min_checked_bags
#   @return [Object, nil]
#
# @!attribute [rw] origin
#   @return [String]
#
# @!attribute [rw] return_date
#   @return [Object, nil]
#
# @!attribute [rw] return_time_range
#   @return [Object, nil]
FareSearchResponseModel = Struct.new(
  :adults,
  :airlines_exclude,
  :airlines_include,
  :allow_self_transfer,
  :cabin_class,
  :children,
  :departure_date,
  :departure_time_range,
  :destination,
  :infants_in_seat,
  :infants_on_lap,
  :itineraries,
  :market,
  :max_price,
  :max_stops,
  :min_carry_on_bags,
  :min_checked_bags,
  :origin,
  :return_date,
  :return_time_range,
  keyword_init: true
)

# Request payload for FareSearchResponseModel#create.
#
# @!attribute [rw] adults
#   @return [Integer, nil]
#
# @!attribute [rw] airlines_exclude
#   @return [Object, nil]
#
# @!attribute [rw] airlines_include
#   @return [Object, nil]
#
# @!attribute [rw] allow_self_transfer
#   @return [Boolean, nil]
#
# @!attribute [rw] cabin_class
#   @return [String, nil]
#
# @!attribute [rw] children
#   @return [Integer, nil]
#
# @!attribute [rw] departure_date
#   @return [String]
#
# @!attribute [rw] departure_time_range
#   @return [Object, nil]
#
# @!attribute [rw] destination
#   @return [String]
#
# @!attribute [rw] infants_in_seat
#   @return [Integer, nil]
#
# @!attribute [rw] infants_on_lap
#   @return [Integer, nil]
#
# @!attribute [rw] itineraries
#   @return [Array]
#
# @!attribute [rw] market
#   @return [String, nil]
#
# @!attribute [rw] max_price
#   @return [Object, nil]
#
# @!attribute [rw] max_stops
#   @return [Object, nil]
#
# @!attribute [rw] min_carry_on_bags
#   @return [Object, nil]
#
# @!attribute [rw] min_checked_bags
#   @return [Object, nil]
#
# @!attribute [rw] origin
#   @return [String]
#
# @!attribute [rw] return_date
#   @return [Object, nil]
#
# @!attribute [rw] return_time_range
#   @return [Object, nil]
FareSearchResponseModelCreateData = Struct.new(
  :adults,
  :airlines_exclude,
  :airlines_include,
  :allow_self_transfer,
  :cabin_class,
  :children,
  :departure_date,
  :departure_time_range,
  :destination,
  :infants_in_seat,
  :infants_on_lap,
  :itineraries,
  :market,
  :max_price,
  :max_stops,
  :min_carry_on_bags,
  :min_checked_bags,
  :origin,
  :return_date,
  :return_time_range,
  keyword_init: true
)

