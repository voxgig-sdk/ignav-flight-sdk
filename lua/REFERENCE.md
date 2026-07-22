# IgnavFlight Lua SDK Reference

Complete API reference for the IgnavFlight Lua SDK.


## IgnavFlightSDK

### Constructor

```lua
local sdk = require("ignav-flight_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Airport(data)`

Create a new `Airport` entity instance. Pass `nil` for no initial data.

#### `BookingLink(data)`

Create a new `BookingLink` entity instance. Pass `nil` for no initial data.

#### `FareSearchModel(data)`

Create a new `FareSearchModel` entity instance. Pass `nil` for no initial data.

#### `FareSearchResponseModel(data)`

Create a new `FareSearchResponseModel` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AirportEntity

```lua
local airport = client:Airport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Airport():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BookingLinkEntity

```lua
local booking_link = client:BookingLink(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `any` | No |  |
| `child` | `any` | No |  |
| `departure_date` | `any` | No |  |
| `destination` | `any` | No |  |
| `ignav_id` | `string` | No |  |
| `inbound_carrier_code` | `any` | No |  |
| `inbound_flight_number` | `number` | No |  |
| `infants_in_seat` | `any` | No |  |
| `infants_on_lap` | `any` | No |  |
| `market` | `any` | No |  |
| `origin` | `any` | No |  |
| `outbound_carrier_code` | `any` | No |  |
| `outbound_flight_number` | `number` | No |  |
| `return_date` | `any` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:BookingLink():create({
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BookingLinkEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FareSearchModelEntity

```lua
local fare_search_model = client:FareSearchModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `number` | No |  |
| `airlines_exclude` | `any` | No |  |
| `airlines_include` | `any` | No |  |
| `allow_self_transfer` | `boolean` | No |  |
| `cabin_class` | `string` | No |  |
| `child` | `number` | No |  |
| `infants_in_seat` | `number` | No |  |
| `infants_on_lap` | `number` | No |  |
| `itinerary` | `table` | Yes |  |
| `leg` | `table` | Yes |  |
| `market` | `string` | No |  |
| `max_price` | `any` | No |  |
| `min_carry_on_bag` | `any` | No |  |
| `min_checked_bag` | `any` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:FareSearchModel():create({
  itinerary = --[[ table ]],
  leg = --[[ table ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FareSearchModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FareSearchResponseModelEntity

```lua
local fare_search_response_model = client:FareSearchResponseModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `number` | No |  |
| `airlines_exclude` | `any` | No |  |
| `airlines_include` | `any` | No |  |
| `allow_self_transfer` | `boolean` | No |  |
| `cabin_class` | `string` | No |  |
| `child` | `number` | No |  |
| `departure_date` | `string` | Yes |  |
| `departure_time_range` | `any` | No |  |
| `destination` | `string` | Yes |  |
| `infants_in_seat` | `number` | No |  |
| `infants_on_lap` | `number` | No |  |
| `itinerary` | `table` | Yes |  |
| `market` | `string` | No |  |
| `max_price` | `any` | No |  |
| `max_stop` | `any` | No |  |
| `min_carry_on_bag` | `any` | No |  |
| `min_checked_bag` | `any` | No |  |
| `origin` | `string` | Yes |  |
| `return_date` | `any` | No |  |
| `return_time_range` | `any` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:FareSearchResponseModel():create({
  departure_date = --[[ string ]],
  destination = --[[ string ]],
  itinerary = --[[ table ]],
  origin = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FareSearchResponseModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

