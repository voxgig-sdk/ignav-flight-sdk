# IgnavFlight Ruby SDK Reference

Complete API reference for the IgnavFlight Ruby SDK.


## IgnavFlightSDK

### Constructor

```ruby
require_relative 'IgnavFlight_sdk'

client = IgnavFlightSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IgnavFlightSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = IgnavFlightSDK.test
```


### Instance Methods

#### `Airport(data = nil)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `BookingLink(data = nil)`

Create a new `BookingLink` entity instance. Pass `nil` for no initial data.

#### `FareSearchModel(data = nil)`

Create a new `FareSearchModel` entity instance. Pass `nil` for no initial data.

#### `FareSearchResponseModel(data = nil)`

Create a new `FareSearchResponseModel` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AirportEntity

```ruby
airport = client.Airport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `String` | Yes |  |
| `code` | `String` | Yes |  |
| `country` | `String` | Yes |  |
| `name` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Airport.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BookingLinkEntity

```ruby
booking_link = client.BookingLink
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `Object` | No |  |
| `child` | `Object` | No |  |
| `departure_date` | `Object` | No |  |
| `destination` | `Object` | No |  |
| `ignav_id` | `String` | No |  |
| `inbound_carrier_code` | `Object` | No |  |
| `inbound_flight_number` | `Integer` | No |  |
| `infants_in_seat` | `Object` | No |  |
| `infants_on_lap` | `Object` | No |  |
| `market` | `Object` | No |  |
| `origin` | `Object` | No |  |
| `outbound_carrier_code` | `Object` | No |  |
| `outbound_flight_number` | `Integer` | No |  |
| `return_date` | `Object` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.BookingLink.create({
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BookingLinkEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FareSearchModelEntity

```ruby
fare_search_model = client.FareSearchModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `Integer` | No |  |
| `airlines_exclude` | `Object` | No |  |
| `airlines_include` | `Object` | No |  |
| `allow_self_transfer` | `Boolean` | No |  |
| `cabin_class` | `String` | No |  |
| `child` | `Integer` | No |  |
| `infants_in_seat` | `Integer` | No |  |
| `infants_on_lap` | `Integer` | No |  |
| `itinerary` | `Array` | Yes |  |
| `leg` | `Array` | Yes |  |
| `market` | `String` | No |  |
| `max_price` | `Object` | No |  |
| `min_carry_on_bag` | `Object` | No |  |
| `min_checked_bag` | `Object` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.FareSearchModel.create({
  "itinerary" => [], # Array
  "leg" => [], # Array
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FareSearchModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FareSearchResponseModelEntity

```ruby
fare_search_response_model = client.FareSearchResponseModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `Integer` | No |  |
| `airlines_exclude` | `Object` | No |  |
| `airlines_include` | `Object` | No |  |
| `allow_self_transfer` | `Boolean` | No |  |
| `cabin_class` | `String` | No |  |
| `child` | `Integer` | No |  |
| `departure_date` | `String` | Yes |  |
| `departure_time_range` | `Object` | No |  |
| `destination` | `String` | Yes |  |
| `infants_in_seat` | `Integer` | No |  |
| `infants_on_lap` | `Integer` | No |  |
| `itinerary` | `Array` | Yes |  |
| `market` | `String` | No |  |
| `max_price` | `Object` | No |  |
| `max_stop` | `Object` | No |  |
| `min_carry_on_bag` | `Object` | No |  |
| `min_checked_bag` | `Object` | No |  |
| `origin` | `String` | Yes |  |
| `return_date` | `Object` | No |  |
| `return_time_range` | `Object` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `adult` | - |
| `airlines_exclude` | - |
| `airlines_include` | - |
| `allow_self_transfer` | - |
| `cabin_class` | - |
| `child` | - |
| `departure_date` | - |
| `departure_time_range` | - |
| `destination` | - |
| `infants_in_seat` | - |
| `infants_on_lap` | - |
| `itinerary` | - |
| `market` | - |
| `max_price` | - |
| `max_stop` | - |
| `min_carry_on_bag` | - |
| `min_checked_bag` | - |
| `origin` | - |
| `return_date` | Yes |
| `return_time_range` | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.FareSearchResponseModel.create({
  "departure_date" => "example_departure_date", # String
  "destination" => "example_destination", # String
  "itinerary" => [], # Array
  "origin" => "example_origin", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FareSearchResponseModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = IgnavFlightSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

