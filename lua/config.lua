-- IgnavFlight SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "IgnavFlight",
      slug = "ignav-flight",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://ignav.com",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["airport"] = {},
        ["booking_link"] = {},
        ["fare_search_model"] = {},
        ["fare_search_response_model"] = {},
      },
    },
    entity = {
      ["airport"] = {
        ["fields"] = {
          {
            ["name"] = "city",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "code",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "airport",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/airports",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "airports",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "q",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "airports",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["booking_link"] = {
        ["fields"] = {
          {
            ["name"] = "adults",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "children",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "departure_date",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "destination",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "ignav_id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "inbound_carrier_code",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "inbound_flight_number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "infants_in_seat",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "infants_on_lap",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "market",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "origin",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "outbound_carrier_code",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "outbound_flight_number",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "return_date",
            ["type"] = "`$ANY`",
          },
        },
        ["name"] = "booking_link",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/fares/booking-links",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "fares",
                  },
                  {
                    ["lit"] = "booking-links",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["adults"] = "`reqdata.adult`",
                    ["children"] = "`reqdata.child`",
                    ["departure_date"] = "`reqdata.departure_date`",
                    ["destination"] = "`reqdata.destination`",
                    ["ignav_id"] = "`reqdata.ignav_id`",
                    ["inbound_carrier_code"] = "`reqdata.inbound_carrier_code`",
                    ["inbound_flight_number"] = "`reqdata.inbound_flight_number`",
                    ["infants_in_seat"] = "`reqdata.infants_in_seat`",
                    ["infants_on_lap"] = "`reqdata.infants_on_lap`",
                    ["market"] = "`reqdata.market`",
                    ["origin"] = "`reqdata.origin`",
                    ["outbound_carrier_code"] = "`reqdata.outbound_carrier_code`",
                    ["outbound_flight_number"] = "`reqdata.outbound_flight_number`",
                    ["return_date"] = "`reqdata.return_date`",
                  },
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "fares",
                  "booking-links",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["fare_search_model"] = {
        ["fields"] = {
          {
            ["name"] = "adults",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "airlines_exclude",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "airlines_include",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "allow_self_transfer",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "cabin_class",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "children",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "infants_in_seat",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "infants_on_lap",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "itineraries",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "legs",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "market",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "max_price",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "min_carry_on_bags",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "min_checked_bags",
            ["type"] = "`$ANY`",
          },
        },
        ["name"] = "fare_search_model",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/fares/search",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "fares",
                  },
                  {
                    ["lit"] = "search",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["adults"] = "`reqdata.adult`",
                    ["airlines_exclude"] = "`reqdata.airlines_exclude`",
                    ["airlines_include"] = "`reqdata.airlines_include`",
                    ["allow_self_transfer"] = "`reqdata.allow_self_transfer`",
                    ["cabin_class"] = "`reqdata.cabin_class`",
                    ["children"] = "`reqdata.child`",
                    ["infants_in_seat"] = "`reqdata.infants_in_seat`",
                    ["infants_on_lap"] = "`reqdata.infants_on_lap`",
                    ["legs"] = "`reqdata.leg`",
                    ["market"] = "`reqdata.market`",
                    ["max_price"] = "`reqdata.max_price`",
                    ["min_carry_on_bags"] = "`reqdata.min_carry_on_bag`",
                    ["min_checked_bags"] = "`reqdata.min_checked_bag`",
                  },
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "fares",
                  "search",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["fare_search_response_model"] = {
        ["fields"] = {
          {
            ["name"] = "adults",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "airlines_exclude",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "airlines_include",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "allow_self_transfer",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "cabin_class",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "children",
            ["type"] = "`$INTEGER`",
          },
          {
            ["format"] = "date",
            ["name"] = "departure_date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "departure_time_range",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "destination",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "infants_in_seat",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "infants_on_lap",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "itineraries",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "market",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "max_price",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "max_stops",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "min_carry_on_bags",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "min_checked_bags",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "origin",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date",
            ["name"] = "return_date",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "return_time_range",
            ["type"] = "`$ANY`",
          },
        },
        ["name"] = "fare_search_response_model",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/fares/one-way",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "fares",
                  },
                  {
                    ["lit"] = "one-way",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["adults"] = "`reqdata.adult`",
                    ["airlines_exclude"] = "`reqdata.airlines_exclude`",
                    ["airlines_include"] = "`reqdata.airlines_include`",
                    ["allow_self_transfer"] = "`reqdata.allow_self_transfer`",
                    ["cabin_class"] = "`reqdata.cabin_class`",
                    ["children"] = "`reqdata.child`",
                    ["departure_date"] = "`reqdata.departure_date`",
                    ["departure_time_range"] = "`reqdata.departure_time_range`",
                    ["destination"] = "`reqdata.destination`",
                    ["infants_in_seat"] = "`reqdata.infants_in_seat`",
                    ["infants_on_lap"] = "`reqdata.infants_on_lap`",
                    ["market"] = "`reqdata.market`",
                    ["max_price"] = "`reqdata.max_price`",
                    ["max_stops"] = "`reqdata.max_stop`",
                    ["min_carry_on_bags"] = "`reqdata.min_carry_on_bag`",
                    ["min_checked_bags"] = "`reqdata.min_checked_bag`",
                    ["origin"] = "`reqdata.origin`",
                  },
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "fares",
                  "one-way",
                },
              },
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/fares/round-trip",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "fares",
                  },
                  {
                    ["lit"] = "round-trip",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = {
                    ["adults"] = "`reqdata.adult`",
                    ["airlines_exclude"] = "`reqdata.airlines_exclude`",
                    ["airlines_include"] = "`reqdata.airlines_include`",
                    ["allow_self_transfer"] = "`reqdata.allow_self_transfer`",
                    ["cabin_class"] = "`reqdata.cabin_class`",
                    ["children"] = "`reqdata.child`",
                    ["departure_date"] = "`reqdata.departure_date`",
                    ["departure_time_range"] = "`reqdata.departure_time_range`",
                    ["destination"] = "`reqdata.destination`",
                    ["infants_in_seat"] = "`reqdata.infants_in_seat`",
                    ["infants_on_lap"] = "`reqdata.infants_on_lap`",
                    ["market"] = "`reqdata.market`",
                    ["max_price"] = "`reqdata.max_price`",
                    ["max_stops"] = "`reqdata.max_stop`",
                    ["min_carry_on_bags"] = "`reqdata.min_carry_on_bag`",
                    ["min_checked_bags"] = "`reqdata.min_checked_bag`",
                    ["origin"] = "`reqdata.origin`",
                    ["return_date"] = "`reqdata.return_date`",
                    ["return_time_range"] = "`reqdata.return_time_range`",
                  },
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "api",
                  "fares",
                  "round-trip",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
