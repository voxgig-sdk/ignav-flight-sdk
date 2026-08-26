# IgnavFlight SDK configuration

module IgnavFlightConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "IgnavFlight",
        "slug" => "ignav-flight",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://ignav.com",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "airport" => {},
          "booking_link" => {},
          "fare_search_model" => {},
          "fare_search_response_model" => {},
        },
      },
      "entity" => {
        "airport" => {
          "fields" => [
            {
              "name" => "city",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "code",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "country",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "airport",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/airports",
                  "parts" => [
                    "api",
                    "airports",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "q",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "booking_link" => {
          "fields" => [
            {
              "name" => "adults",
              "type" => "`$ANY`",
            },
            {
              "name" => "children",
              "type" => "`$ANY`",
            },
            {
              "name" => "departure_date",
              "type" => "`$ANY`",
            },
            {
              "name" => "destination",
              "type" => "`$ANY`",
            },
            {
              "name" => "ignav_id",
              "type" => "`$STRING`",
            },
            {
              "name" => "inbound_carrier_code",
              "type" => "`$ANY`",
            },
            {
              "name" => "inbound_flight_number",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "infants_in_seat",
              "type" => "`$ANY`",
            },
            {
              "name" => "infants_on_lap",
              "type" => "`$ANY`",
            },
            {
              "name" => "market",
              "type" => "`$ANY`",
            },
            {
              "name" => "origin",
              "type" => "`$ANY`",
            },
            {
              "name" => "outbound_carrier_code",
              "type" => "`$ANY`",
            },
            {
              "name" => "outbound_flight_number",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "return_date",
              "type" => "`$ANY`",
            },
          ],
          "name" => "booking_link",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/fares/booking-links",
                  "parts" => [
                    "api",
                    "fares",
                    "booking-links",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "adults" => "`reqdata.adult`",
                      "children" => "`reqdata.child`",
                      "departure_date" => "`reqdata.departure_date`",
                      "destination" => "`reqdata.destination`",
                      "ignav_id" => "`reqdata.ignav_id`",
                      "inbound_carrier_code" => "`reqdata.inbound_carrier_code`",
                      "inbound_flight_number" => "`reqdata.inbound_flight_number`",
                      "infants_in_seat" => "`reqdata.infants_in_seat`",
                      "infants_on_lap" => "`reqdata.infants_on_lap`",
                      "market" => "`reqdata.market`",
                      "origin" => "`reqdata.origin`",
                      "outbound_carrier_code" => "`reqdata.outbound_carrier_code`",
                      "outbound_flight_number" => "`reqdata.outbound_flight_number`",
                      "return_date" => "`reqdata.return_date`",
                    },
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "fare_search_model" => {
          "fields" => [
            {
              "name" => "adults",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "airlines_exclude",
              "type" => "`$ANY`",
            },
            {
              "name" => "airlines_include",
              "type" => "`$ANY`",
            },
            {
              "name" => "allow_self_transfer",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "cabin_class",
              "type" => "`$STRING`",
            },
            {
              "name" => "children",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "infants_in_seat",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "infants_on_lap",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "itineraries",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "legs",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "market",
              "type" => "`$STRING`",
            },
            {
              "name" => "max_price",
              "type" => "`$ANY`",
            },
            {
              "name" => "min_carry_on_bags",
              "type" => "`$ANY`",
            },
            {
              "name" => "min_checked_bags",
              "type" => "`$ANY`",
            },
          ],
          "name" => "fare_search_model",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/fares/search",
                  "parts" => [
                    "api",
                    "fares",
                    "search",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "adults" => "`reqdata.adult`",
                      "airlines_exclude" => "`reqdata.airlines_exclude`",
                      "airlines_include" => "`reqdata.airlines_include`",
                      "allow_self_transfer" => "`reqdata.allow_self_transfer`",
                      "cabin_class" => "`reqdata.cabin_class`",
                      "children" => "`reqdata.child`",
                      "infants_in_seat" => "`reqdata.infants_in_seat`",
                      "infants_on_lap" => "`reqdata.infants_on_lap`",
                      "legs" => "`reqdata.leg`",
                      "market" => "`reqdata.market`",
                      "max_price" => "`reqdata.max_price`",
                      "min_carry_on_bags" => "`reqdata.min_carry_on_bag`",
                      "min_checked_bags" => "`reqdata.min_checked_bag`",
                    },
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "fare_search_response_model" => {
          "fields" => [
            {
              "name" => "adults",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "airlines_exclude",
              "type" => "`$ANY`",
            },
            {
              "name" => "airlines_include",
              "type" => "`$ANY`",
            },
            {
              "name" => "allow_self_transfer",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "cabin_class",
              "type" => "`$STRING`",
            },
            {
              "name" => "children",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "departure_date",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "departure_time_range",
              "type" => "`$ANY`",
            },
            {
              "name" => "destination",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "infants_in_seat",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "infants_on_lap",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "itineraries",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "market",
              "type" => "`$STRING`",
            },
            {
              "name" => "max_price",
              "type" => "`$ANY`",
            },
            {
              "name" => "max_stops",
              "type" => "`$ANY`",
            },
            {
              "name" => "min_carry_on_bags",
              "type" => "`$ANY`",
            },
            {
              "name" => "min_checked_bags",
              "type" => "`$ANY`",
            },
            {
              "name" => "origin",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "return_date",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$ANY`",
            },
            {
              "name" => "return_time_range",
              "type" => "`$ANY`",
            },
          ],
          "name" => "fare_search_response_model",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/fares/one-way",
                  "parts" => [
                    "api",
                    "fares",
                    "one-way",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "adults" => "`reqdata.adult`",
                      "airlines_exclude" => "`reqdata.airlines_exclude`",
                      "airlines_include" => "`reqdata.airlines_include`",
                      "allow_self_transfer" => "`reqdata.allow_self_transfer`",
                      "cabin_class" => "`reqdata.cabin_class`",
                      "children" => "`reqdata.child`",
                      "departure_date" => "`reqdata.departure_date`",
                      "departure_time_range" => "`reqdata.departure_time_range`",
                      "destination" => "`reqdata.destination`",
                      "infants_in_seat" => "`reqdata.infants_in_seat`",
                      "infants_on_lap" => "`reqdata.infants_on_lap`",
                      "market" => "`reqdata.market`",
                      "max_price" => "`reqdata.max_price`",
                      "max_stops" => "`reqdata.max_stop`",
                      "min_carry_on_bags" => "`reqdata.min_carry_on_bag`",
                      "min_checked_bags" => "`reqdata.min_checked_bag`",
                      "origin" => "`reqdata.origin`",
                    },
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/fares/round-trip",
                  "parts" => [
                    "api",
                    "fares",
                    "round-trip",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => {
                      "adults" => "`reqdata.adult`",
                      "airlines_exclude" => "`reqdata.airlines_exclude`",
                      "airlines_include" => "`reqdata.airlines_include`",
                      "allow_self_transfer" => "`reqdata.allow_self_transfer`",
                      "cabin_class" => "`reqdata.cabin_class`",
                      "children" => "`reqdata.child`",
                      "departure_date" => "`reqdata.departure_date`",
                      "departure_time_range" => "`reqdata.departure_time_range`",
                      "destination" => "`reqdata.destination`",
                      "infants_in_seat" => "`reqdata.infants_in_seat`",
                      "infants_on_lap" => "`reqdata.infants_on_lap`",
                      "market" => "`reqdata.market`",
                      "max_price" => "`reqdata.max_price`",
                      "max_stops" => "`reqdata.max_stop`",
                      "min_carry_on_bags" => "`reqdata.min_carry_on_bag`",
                      "min_checked_bags" => "`reqdata.min_checked_bag`",
                      "origin" => "`reqdata.origin`",
                      "return_date" => "`reqdata.return_date`",
                      "return_time_range" => "`reqdata.return_time_range`",
                    },
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    IgnavFlightFeatures.make_feature(name)
  end
end
