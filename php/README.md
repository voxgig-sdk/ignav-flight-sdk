# IgnavFlight PHP SDK



The PHP SDK for the IgnavFlight API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Airport()` — with named operations (`list`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ignav-flight-sdk/releases](https://github.com/voxgig-sdk/ignav-flight-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'ignavflight_sdk.php';

$client = new IgnavFlightSDK([
    "apikey" => getenv("IGNAV_FLIGHT_APIKEY"),
]);
```

### 2. List airport records

```php
try {
    // list() returns an array of Airport records — iterate directly.
    $airports = $client->Airport()->list();
    foreach ($airports as $item) {
        echo $item["city"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $airports = $client->Airport()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = IgnavFlightSDK::test();

// Entity ops return the bare mock record (throws on error).
$airport = $client->Airport()->list();
print_r($airport);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new IgnavFlightSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
IGNAV_FLIGHT_TEST_LIVE=TRUE
IGNAV_FLIGHT_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### IgnavFlightSDK

```php
require_once 'ignavflight_sdk.php';
$client = new IgnavFlightSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = IgnavFlightSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### IgnavFlightSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Airport` | `($data): AirportEntity` | Create an Airport entity instance. |
| `BookingLink` | `($data): BookingLinkEntity` | Create a BookingLink entity instance. |
| `FareSearchModel` | `($data): FareSearchModelEntity` | Create a FareSearchModel entity instance. |
| `FareSearchResponseModel` | `($data): FareSearchResponseModelEntity` | Create a FareSearchResponseModel entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Airport

| Field | Description |
| --- | --- |
| `city` |  |
| `code` |  |
| `country` |  |
| `name` |  |

Operations: List.

API path: `/api/airports`

#### BookingLink

| Field | Description |
| --- | --- |
| `adult` |  |
| `child` |  |
| `departure_date` |  |
| `destination` |  |
| `ignav_id` |  |
| `inbound_carrier_code` |  |
| `inbound_flight_number` |  |
| `infants_in_seat` |  |
| `infants_on_lap` |  |
| `market` |  |
| `origin` |  |
| `outbound_carrier_code` |  |
| `outbound_flight_number` |  |
| `return_date` |  |

Operations: Create.

API path: `/api/fares/booking-links`

#### FareSearchModel

| Field | Description |
| --- | --- |
| `adult` |  |
| `airlines_exclude` |  |
| `airlines_include` |  |
| `allow_self_transfer` |  |
| `cabin_class` |  |
| `child` |  |
| `infants_in_seat` |  |
| `infants_on_lap` |  |
| `itinerary` |  |
| `leg` |  |
| `market` |  |
| `max_price` |  |
| `min_carry_on_bag` |  |
| `min_checked_bag` |  |

Operations: Create.

API path: `/api/fares/search`

#### FareSearchResponseModel

| Field | Description |
| --- | --- |
| `adult` |  |
| `airlines_exclude` |  |
| `airlines_include` |  |
| `allow_self_transfer` |  |
| `cabin_class` |  |
| `child` |  |
| `departure_date` |  |
| `departure_time_range` |  |
| `destination` |  |
| `infants_in_seat` |  |
| `infants_on_lap` |  |
| `itinerary` |  |
| `market` |  |
| `max_price` |  |
| `max_stop` |  |
| `min_carry_on_bag` |  |
| `min_checked_bag` |  |
| `origin` |  |
| `return_date` |  |
| `return_time_range` |  |

Operations: Create.

API path: `/api/fares/one-way`



## Entities


### Airport

Create an instance: `$airport = $client->Airport();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `code` | `string` |  |
| `country` | `string` |  |
| `name` | `string` |  |

#### Example: List

```php
// list() returns an array of Airport records (throws on error).
$airports = $client->Airport()->list();
```


### BookingLink

Create an instance: `$booking_link = $client->BookingLink();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `mixed` |  |
| `child` | `mixed` |  |
| `departure_date` | `mixed` |  |
| `destination` | `mixed` |  |
| `ignav_id` | `string` |  |
| `inbound_carrier_code` | `mixed` |  |
| `inbound_flight_number` | `int` |  |
| `infants_in_seat` | `mixed` |  |
| `infants_on_lap` | `mixed` |  |
| `market` | `mixed` |  |
| `origin` | `mixed` |  |
| `outbound_carrier_code` | `mixed` |  |
| `outbound_flight_number` | `int` |  |
| `return_date` | `mixed` |  |

#### Example: Create

```php
$booking_link = $client->BookingLink()->create([
]);
```


### FareSearchModel

Create an instance: `$fare_search_model = $client->FareSearchModel();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `int` |  |
| `airlines_exclude` | `mixed` |  |
| `airlines_include` | `mixed` |  |
| `allow_self_transfer` | `bool` |  |
| `cabin_class` | `string` |  |
| `child` | `int` |  |
| `infants_in_seat` | `int` |  |
| `infants_on_lap` | `int` |  |
| `itinerary` | `array` |  |
| `leg` | `array` |  |
| `market` | `string` |  |
| `max_price` | `mixed` |  |
| `min_carry_on_bag` | `mixed` |  |
| `min_checked_bag` | `mixed` |  |

#### Example: Create

```php
$fare_search_model = $client->FareSearchModel()->create([
    "itinerary" => null, // array
    "leg" => null, // array
]);
```


### FareSearchResponseModel

Create an instance: `$fare_search_response_model = $client->FareSearchResponseModel();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `int` |  |
| `airlines_exclude` | `mixed` |  |
| `airlines_include` | `mixed` |  |
| `allow_self_transfer` | `bool` |  |
| `cabin_class` | `string` |  |
| `child` | `int` |  |
| `departure_date` | `string` |  |
| `departure_time_range` | `mixed` |  |
| `destination` | `string` |  |
| `infants_in_seat` | `int` |  |
| `infants_on_lap` | `int` |  |
| `itinerary` | `array` |  |
| `market` | `string` |  |
| `max_price` | `mixed` |  |
| `max_stop` | `mixed` |  |
| `min_carry_on_bag` | `mixed` |  |
| `min_checked_bag` | `mixed` |  |
| `origin` | `string` |  |
| `return_date` | `mixed` |  |
| `return_time_range` | `mixed` |  |

#### Example: Create

```php
$fare_search_response_model = $client->FareSearchResponseModel()->create([
    "departure_date" => null, // string
    "destination" => null, // string
    "itinerary" => null, // array
    "origin" => null, // string
]);
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── ignavflight_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`ignavflight_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$airport = $client->Airport();
$airport->list();

// $airport->data_get() now returns the airport data from the last list
// $airport->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
