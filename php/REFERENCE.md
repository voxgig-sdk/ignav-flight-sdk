# IgnavFlight PHP SDK Reference

Complete API reference for the IgnavFlight PHP SDK.


## IgnavFlightSDK

### Constructor

```php
require_once __DIR__ . '/ignavflight_sdk.php';

$client = new IgnavFlightSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IgnavFlightSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = IgnavFlightSDK::test();
```


### Instance Methods

#### `Airport($data = null)`

Create a new `AirportEntity` instance. Pass `null` for no initial data.

#### `BookingLink($data = null)`

Create a new `BookingLinkEntity` instance. Pass `null` for no initial data.

#### `FareSearchModel($data = null)`

Create a new `FareSearchModelEntity` instance. Pass `null` for no initial data.

#### `FareSearchResponseModel($data = null)`

Create a new `FareSearchResponseModelEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): IgnavFlightUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AirportEntity

```php
$airport = $client->Airport();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Airport()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AirportEntity`

Create a new `AirportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BookingLinkEntity

```php
$booking_link = $client->BookingLink();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `mixed` | No |  |
| `child` | `mixed` | No |  |
| `departure_date` | `mixed` | No |  |
| `destination` | `mixed` | No |  |
| `ignav_id` | `string` | No |  |
| `inbound_carrier_code` | `mixed` | No |  |
| `inbound_flight_number` | `int` | No |  |
| `infants_in_seat` | `mixed` | No |  |
| `infants_on_lap` | `mixed` | No |  |
| `market` | `mixed` | No |  |
| `origin` | `mixed` | No |  |
| `outbound_carrier_code` | `mixed` | No |  |
| `outbound_flight_number` | `int` | No |  |
| `return_date` | `mixed` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->BookingLink()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BookingLinkEntity`

Create a new `BookingLinkEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FareSearchModelEntity

```php
$fare_search_model = $client->FareSearchModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `int` | No |  |
| `airlines_exclude` | `mixed` | No |  |
| `airlines_include` | `mixed` | No |  |
| `allow_self_transfer` | `bool` | No |  |
| `cabin_class` | `string` | No |  |
| `child` | `int` | No |  |
| `infants_in_seat` | `int` | No |  |
| `infants_on_lap` | `int` | No |  |
| `itinerary` | `array` | Yes |  |
| `leg` | `array` | Yes |  |
| `market` | `string` | No |  |
| `max_price` | `mixed` | No |  |
| `min_carry_on_bag` | `mixed` | No |  |
| `min_checked_bag` | `mixed` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->FareSearchModel()->create([
  "itinerary" => null, // array
  "leg" => null, // array
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FareSearchModelEntity`

Create a new `FareSearchModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FareSearchResponseModelEntity

```php
$fare_search_response_model = $client->FareSearchResponseModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `int` | No |  |
| `airlines_exclude` | `mixed` | No |  |
| `airlines_include` | `mixed` | No |  |
| `allow_self_transfer` | `bool` | No |  |
| `cabin_class` | `string` | No |  |
| `child` | `int` | No |  |
| `departure_date` | `string` | Yes |  |
| `departure_time_range` | `mixed` | No |  |
| `destination` | `string` | Yes |  |
| `infants_in_seat` | `int` | No |  |
| `infants_on_lap` | `int` | No |  |
| `itinerary` | `array` | Yes |  |
| `market` | `string` | No |  |
| `max_price` | `mixed` | No |  |
| `max_stop` | `mixed` | No |  |
| `min_carry_on_bag` | `mixed` | No |  |
| `min_checked_bag` | `mixed` | No |  |
| `origin` | `string` | Yes |  |
| `return_date` | `mixed` | No |  |
| `return_time_range` | `mixed` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->FareSearchResponseModel()->create([
  "departure_date" => null, // string
  "destination" => null, // string
  "itinerary" => null, // array
  "origin" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FareSearchResponseModelEntity`

Create a new `FareSearchResponseModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new IgnavFlightSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

