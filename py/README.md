# IgnavFlight Python SDK



The Python SDK for the IgnavFlight API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Airport()` — each
carrying a small, uniform set of operations (`list`, `create`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/ignav-flight-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from ignavflight_sdk import IgnavFlightSDK

client = IgnavFlightSDK({
    "apikey": os.environ.get("IGNAV_FLIGHT_APIKEY"),
})
```

### 2. List airport records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    airports = client.Airport().list()
    for airport in airports:
        print(airport)
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    airports = client.Airport().list()
    print(airports)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = IgnavFlightSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
airport = client.Airport().list()
# airport contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = IgnavFlightSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
IGNAV_FLIGHT_TEST_LIVE=TRUE
IGNAV_FLIGHT_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### IgnavFlightSDK

```python
from ignavflight_sdk import IgnavFlightSDK

client = IgnavFlightSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = IgnavFlightSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### IgnavFlightSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `Airport` | `(data) -> AirportEntity` | Create an Airport entity instance. |
| `BookingLink` | `(data) -> BookingLinkEntity` | Create a BookingLink entity instance. |
| `FareSearchModel` | `(data) -> FareSearchModelEntity` | Create a FareSearchModel entity instance. |
| `FareSearchResponseModel` | `(data) -> FareSearchResponseModelEntity` | Create a FareSearchResponseModel entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `adults` |  |
| `children` |  |
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
| `adults` |  |
| `airlines_exclude` |  |
| `airlines_include` |  |
| `allow_self_transfer` |  |
| `cabin_class` |  |
| `children` |  |
| `infants_in_seat` |  |
| `infants_on_lap` |  |
| `itineraries` |  |
| `legs` |  |
| `market` |  |
| `max_price` |  |
| `min_carry_on_bags` |  |
| `min_checked_bags` |  |

Operations: Create.

API path: `/api/fares/search`

#### FareSearchResponseModel

| Field | Description |
| --- | --- |
| `adults` |  |
| `airlines_exclude` |  |
| `airlines_include` |  |
| `allow_self_transfer` |  |
| `cabin_class` |  |
| `children` |  |
| `departure_date` |  |
| `departure_time_range` |  |
| `destination` |  |
| `infants_in_seat` |  |
| `infants_on_lap` |  |
| `itineraries` |  |
| `market` |  |
| `max_price` |  |
| `max_stops` |  |
| `min_carry_on_bags` |  |
| `min_checked_bags` |  |
| `origin` |  |
| `return_date` |  |
| `return_time_range` |  |

Operations: Create.

API path: `/api/fares/one-way`



## Entities


### Airport

Create an instance: `airport = client.Airport()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `str` |  |
| `code` | `str` |  |
| `country` | `str` |  |
| `name` | `str` |  |

#### Example: List

```python
airports = client.Airport().list()
```


### BookingLink

Create an instance: `booking_link = client.BookingLink()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adults` | `Any` |  |
| `children` | `Any` |  |
| `departure_date` | `Any` |  |
| `destination` | `Any` |  |
| `ignav_id` | `str` |  |
| `inbound_carrier_code` | `Any` |  |
| `inbound_flight_number` | `int` |  |
| `infants_in_seat` | `Any` |  |
| `infants_on_lap` | `Any` |  |
| `market` | `Any` |  |
| `origin` | `Any` |  |
| `outbound_carrier_code` | `Any` |  |
| `outbound_flight_number` | `int` |  |
| `return_date` | `Any` |  |

#### Example: Create

```python
booking_link = client.BookingLink().create({
})
```


### FareSearchModel

Create an instance: `fare_search_model = client.FareSearchModel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adults` | `int` |  |
| `airlines_exclude` | `Any` |  |
| `airlines_include` | `Any` |  |
| `allow_self_transfer` | `bool` |  |
| `cabin_class` | `str` |  |
| `children` | `int` |  |
| `infants_in_seat` | `int` |  |
| `infants_on_lap` | `int` |  |
| `itineraries` | `list` |  |
| `legs` | `list` |  |
| `market` | `str` |  |
| `max_price` | `Any` |  |
| `min_carry_on_bags` | `Any` |  |
| `min_checked_bags` | `Any` |  |

#### Example: Create

```python
fare_search_model = client.FareSearchModel().create({
    "itineraries": [],  # list
    "legs": [],  # list
})
```


### FareSearchResponseModel

Create an instance: `fare_search_response_model = client.FareSearchResponseModel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adults` | `int` |  |
| `airlines_exclude` | `Any` |  |
| `airlines_include` | `Any` |  |
| `allow_self_transfer` | `bool` |  |
| `cabin_class` | `str` |  |
| `children` | `int` |  |
| `departure_date` | `str` |  |
| `departure_time_range` | `Any` |  |
| `destination` | `str` |  |
| `infants_in_seat` | `int` |  |
| `infants_on_lap` | `int` |  |
| `itineraries` | `list` |  |
| `market` | `str` |  |
| `max_price` | `Any` |  |
| `max_stops` | `Any` |  |
| `min_carry_on_bags` | `Any` |  |
| `min_checked_bags` | `Any` |  |
| `origin` | `str` |  |
| `return_date` | `Any` |  |
| `return_time_range` | `Any` |  |

#### Example: Create

```python
fare_search_response_model = client.FareSearchResponseModel().create({
    "departure_date": "example_departure_date",  # str
    "destination": "example_destination",  # str
    "itineraries": [],  # list
    "origin": "example_origin",  # str
})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── ignavflight_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`ignavflight_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
airport = client.Airport()
airport.list()

# airport.data_get() now returns the airport data from the last list
# airport.match_get() returns the last match criteria
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
