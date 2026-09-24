<?php
declare(strict_types=1);

// IgnavFlight SDK configuration

class IgnavFlightConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IgnavFlight",
                "slug" => "ignav-flight",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://ignav.com",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-Api-Key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "airport" => [],
                    "booking_link" => [],
                    "fare_search_model" => [],
                    "fare_search_response_model" => [],
                ],
            ],
            "entity" => [
        'airport' => [
          'fields' => [
            [
              'name' => 'city',
              'title' => 'City',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'country',
              'title' => 'Country',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'req' => true,
            ],
          ],
          'name' => 'airport',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/airports',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'airports',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'airports',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 10,
                      ],
                      [
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'q',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'booking_link' => [
          'fields' => [
            [
              'name' => 'adults',
              'title' => 'Adults',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'children',
              'title' => 'Children',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'departure_date',
              'title' => 'Departure Date',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'destination',
              'title' => 'Destination',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'ignav_id',
              'title' => 'Ignav Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'inbound_carrier_code',
              'title' => 'Inbound Carrier Code',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'inbound_flight_number',
              'title' => 'Inbound Flight Number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'infants_in_seat',
              'title' => 'Infants In Seat',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'infants_on_lap',
              'title' => 'Infants On Lap',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'market',
              'title' => 'Market',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'origin',
              'title' => 'Origin',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'outbound_carrier_code',
              'title' => 'Outbound Carrier Code',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'outbound_flight_number',
              'title' => 'Outbound Flight Number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'return_date',
              'title' => 'Return Date',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'booking_link',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/fares/booking-links',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'fares',
                    ],
                    [
                      'lit' => 'booking-links',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'fares',
                    'booking-links',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => [
                      'adults' => '`reqdata.adult`',
                      'children' => '`reqdata.child`',
                      'departure_date' => '`reqdata.departure_date`',
                      'destination' => '`reqdata.destination`',
                      'ignav_id' => '`reqdata.ignav_id`',
                      'inbound_carrier_code' => '`reqdata.inbound_carrier_code`',
                      'inbound_flight_number' => '`reqdata.inbound_flight_number`',
                      'infants_in_seat' => '`reqdata.infants_in_seat`',
                      'infants_on_lap' => '`reqdata.infants_on_lap`',
                      'market' => '`reqdata.market`',
                      'origin' => '`reqdata.origin`',
                      'outbound_carrier_code' => '`reqdata.outbound_carrier_code`',
                      'outbound_flight_number' => '`reqdata.outbound_flight_number`',
                      'return_date' => '`reqdata.return_date`',
                    ],
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'fare_search_model' => [
          'fields' => [
            [
              'name' => 'adults',
              'title' => 'Adults',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'airlines_exclude',
              'title' => 'Airlines Exclude',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'airlines_include',
              'title' => 'Airlines Include',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'allow_self_transfer',
              'title' => 'Allow Self Transfer',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'cabin_class',
              'title' => 'Cabin Class',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'children',
              'title' => 'Children',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'infants_in_seat',
              'title' => 'Infants In Seat',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'infants_on_lap',
              'title' => 'Infants On Lap',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'itineraries',
              'title' => 'Itineraries',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'legs',
              'title' => 'Legs',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'market',
              'title' => 'Market',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'max_price',
              'title' => 'Max Price',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'min_carry_on_bags',
              'title' => 'Min Carry On Bags',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'min_checked_bags',
              'title' => 'Min Checked Bags',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'fare_search_model',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/fares/search',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'fares',
                    ],
                    [
                      'lit' => 'search',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'fares',
                    'search',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => [
                      'adults' => '`reqdata.adult`',
                      'airlines_exclude' => '`reqdata.airlines_exclude`',
                      'airlines_include' => '`reqdata.airlines_include`',
                      'allow_self_transfer' => '`reqdata.allow_self_transfer`',
                      'cabin_class' => '`reqdata.cabin_class`',
                      'children' => '`reqdata.child`',
                      'infants_in_seat' => '`reqdata.infants_in_seat`',
                      'infants_on_lap' => '`reqdata.infants_on_lap`',
                      'legs' => '`reqdata.leg`',
                      'market' => '`reqdata.market`',
                      'max_price' => '`reqdata.max_price`',
                      'min_carry_on_bags' => '`reqdata.min_carry_on_bag`',
                      'min_checked_bags' => '`reqdata.min_checked_bag`',
                    ],
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'fare_search_response_model' => [
          'fields' => [
            [
              'name' => 'adults',
              'title' => 'Adults',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'airlines_exclude',
              'title' => 'Airlines Exclude',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'airlines_include',
              'title' => 'Airlines Include',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'allow_self_transfer',
              'title' => 'Allow Self Transfer',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'cabin_class',
              'title' => 'Cabin Class',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'children',
              'title' => 'Children',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'departure_date',
              'title' => 'Departure Date',
              'type' => '`$STRING`',
              'req' => true,
              'format' => 'date',
            ],
            [
              'name' => 'departure_time_range',
              'title' => 'Departure Time Range',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'destination',
              'title' => 'Destination',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'infants_in_seat',
              'title' => 'Infants In Seat',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'infants_on_lap',
              'title' => 'Infants On Lap',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'itineraries',
              'title' => 'Itineraries',
              'type' => '`$ARRAY`',
              'req' => true,
            ],
            [
              'name' => 'market',
              'title' => 'Market',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'max_price',
              'title' => 'Max Price',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'max_stops',
              'title' => 'Max Stops',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'min_carry_on_bags',
              'title' => 'Min Carry On Bags',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'min_checked_bags',
              'title' => 'Min Checked Bags',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'origin',
              'title' => 'Origin',
              'type' => '`$STRING`',
              'req' => true,
            ],
            [
              'name' => 'return_date',
              'title' => 'Return Date',
              'type' => '`$ANY`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'format' => 'date',
            ],
            [
              'name' => 'return_time_range',
              'title' => 'Return Time Range',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'fare_search_response_model',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/fares/one-way',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'fares',
                    ],
                    [
                      'lit' => 'one-way',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'fares',
                    'one-way',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => [
                      'adults' => '`reqdata.adult`',
                      'airlines_exclude' => '`reqdata.airlines_exclude`',
                      'airlines_include' => '`reqdata.airlines_include`',
                      'allow_self_transfer' => '`reqdata.allow_self_transfer`',
                      'cabin_class' => '`reqdata.cabin_class`',
                      'children' => '`reqdata.child`',
                      'departure_date' => '`reqdata.departure_date`',
                      'departure_time_range' => '`reqdata.departure_time_range`',
                      'destination' => '`reqdata.destination`',
                      'infants_in_seat' => '`reqdata.infants_in_seat`',
                      'infants_on_lap' => '`reqdata.infants_on_lap`',
                      'market' => '`reqdata.market`',
                      'max_price' => '`reqdata.max_price`',
                      'max_stops' => '`reqdata.max_stop`',
                      'min_carry_on_bags' => '`reqdata.min_carry_on_bag`',
                      'min_checked_bags' => '`reqdata.min_checked_bag`',
                      'origin' => '`reqdata.origin`',
                    ],
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/fares/round-trip',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'fares',
                    ],
                    [
                      'lit' => 'round-trip',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'fares',
                    'round-trip',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => [
                      'adults' => '`reqdata.adult`',
                      'airlines_exclude' => '`reqdata.airlines_exclude`',
                      'airlines_include' => '`reqdata.airlines_include`',
                      'allow_self_transfer' => '`reqdata.allow_self_transfer`',
                      'cabin_class' => '`reqdata.cabin_class`',
                      'children' => '`reqdata.child`',
                      'departure_date' => '`reqdata.departure_date`',
                      'departure_time_range' => '`reqdata.departure_time_range`',
                      'destination' => '`reqdata.destination`',
                      'infants_in_seat' => '`reqdata.infants_in_seat`',
                      'infants_on_lap' => '`reqdata.infants_on_lap`',
                      'market' => '`reqdata.market`',
                      'max_price' => '`reqdata.max_price`',
                      'max_stops' => '`reqdata.max_stop`',
                      'min_carry_on_bags' => '`reqdata.min_carry_on_bag`',
                      'min_checked_bags' => '`reqdata.min_checked_bag`',
                      'origin' => '`reqdata.origin`',
                      'return_date' => '`reqdata.return_date`',
                      'return_time_range' => '`reqdata.return_time_range`',
                    ],
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IgnavFlightFeatures::make_feature($name);
    }
}
