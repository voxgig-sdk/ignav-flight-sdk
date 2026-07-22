# IgnavFlight Golang SDK



The Golang SDK for the IgnavFlight API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Airport(nil)` — each with the same small set of operations (`List`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/ignav-flight-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/ignav-flight-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/ignav-flight-sdk/go=../ignav-flight-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/ignav-flight-sdk/go"
)

func main() {
    client := sdk.NewIgnavFlightSDK(map[string]any{
        "apikey": os.Getenv("IGNAV_FLIGHT_APIKEY"),
    })

    // List airport records — the value is the array of records itself.
    airports, err := client.Airport(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range airports.([]any) {
        fmt.Println(item)
    }
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
airports, err := client.Airport(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = airports
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

airport, err := client.Airport(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(airport) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewIgnavFlightSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewIgnavFlightSDK

```go
func NewIgnavFlightSDK(options map[string]any) *IgnavFlightSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *IgnavFlightSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### IgnavFlightSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Airport` | `(data map[string]any) IgnavFlightEntity` | Create an Airport entity instance. |
| `BookingLink` | `(data map[string]any) IgnavFlightEntity` | Create a BookingLink entity instance. |
| `FareSearchModel` | `(data map[string]any) IgnavFlightEntity` | Create a FareSearchModel entity instance. |
| `FareSearchResponseModel` | `(data map[string]any) IgnavFlightEntity` | Create a FareSearchResponseModel entity instance. |

### Entity interface (IgnavFlightEntity)

All entities implement the `IgnavFlightEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    airport, err := client.Airport(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // airport is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Airport

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"code"` |  |
| `"country"` |  |
| `"name"` |  |

Operations: List.

API path: `/api/airports`

#### BookingLink

| Field | Description |
| --- | --- |
| `"adult"` |  |
| `"child"` |  |
| `"departure_date"` |  |
| `"destination"` |  |
| `"ignav_id"` |  |
| `"inbound_carrier_code"` |  |
| `"inbound_flight_number"` |  |
| `"infants_in_seat"` |  |
| `"infants_on_lap"` |  |
| `"market"` |  |
| `"origin"` |  |
| `"outbound_carrier_code"` |  |
| `"outbound_flight_number"` |  |
| `"return_date"` |  |

Operations: Create.

API path: `/api/fares/booking-links`

#### FareSearchModel

| Field | Description |
| --- | --- |
| `"adult"` |  |
| `"airlines_exclude"` |  |
| `"airlines_include"` |  |
| `"allow_self_transfer"` |  |
| `"cabin_class"` |  |
| `"child"` |  |
| `"infants_in_seat"` |  |
| `"infants_on_lap"` |  |
| `"itinerary"` |  |
| `"leg"` |  |
| `"market"` |  |
| `"max_price"` |  |
| `"min_carry_on_bag"` |  |
| `"min_checked_bag"` |  |

Operations: Create.

API path: `/api/fares/search`

#### FareSearchResponseModel

| Field | Description |
| --- | --- |
| `"adult"` |  |
| `"airlines_exclude"` |  |
| `"airlines_include"` |  |
| `"allow_self_transfer"` |  |
| `"cabin_class"` |  |
| `"child"` |  |
| `"departure_date"` |  |
| `"departure_time_range"` |  |
| `"destination"` |  |
| `"infants_in_seat"` |  |
| `"infants_on_lap"` |  |
| `"itinerary"` |  |
| `"market"` |  |
| `"max_price"` |  |
| `"max_stop"` |  |
| `"min_carry_on_bag"` |  |
| `"min_checked_bag"` |  |
| `"origin"` |  |
| `"return_date"` |  |
| `"return_time_range"` |  |

Operations: Create.

API path: `/api/fares/one-way`



## Entities


### Airport

Create an instance: `airport := client.Airport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `string` |  |
| `code` | `string` |  |
| `country` | `string` |  |
| `name` | `string` |  |

#### Example: List

```go
airports, err := client.Airport(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(airports) // the array of records
```


### BookingLink

Create an instance: `bookingLink := client.BookingLink(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `any` |  |
| `child` | `any` |  |
| `departure_date` | `any` |  |
| `destination` | `any` |  |
| `ignav_id` | `string` |  |
| `inbound_carrier_code` | `any` |  |
| `inbound_flight_number` | `int` |  |
| `infants_in_seat` | `any` |  |
| `infants_on_lap` | `any` |  |
| `market` | `any` |  |
| `origin` | `any` |  |
| `outbound_carrier_code` | `any` |  |
| `outbound_flight_number` | `int` |  |
| `return_date` | `any` |  |

#### Example: Create

```go
result, err := client.BookingLink(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### FareSearchModel

Create an instance: `fareSearchModel := client.FareSearchModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `int` |  |
| `airlines_exclude` | `any` |  |
| `airlines_include` | `any` |  |
| `allow_self_transfer` | `bool` |  |
| `cabin_class` | `string` |  |
| `child` | `int` |  |
| `infants_in_seat` | `int` |  |
| `infants_on_lap` | `int` |  |
| `itinerary` | `[]any` |  |
| `leg` | `[]any` |  |
| `market` | `string` |  |
| `max_price` | `any` |  |
| `min_carry_on_bag` | `any` |  |
| `min_checked_bag` | `any` |  |

#### Example: Create

```go
result, err := client.FareSearchModel(nil).Create(map[string]any{
    "itinerary": []any{},
    "leg": []any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### FareSearchResponseModel

Create an instance: `fareSearchResponseModel := client.FareSearchResponseModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `int` |  |
| `airlines_exclude` | `any` |  |
| `airlines_include` | `any` |  |
| `allow_self_transfer` | `bool` |  |
| `cabin_class` | `string` |  |
| `child` | `int` |  |
| `departure_date` | `string` |  |
| `departure_time_range` | `any` |  |
| `destination` | `string` |  |
| `infants_in_seat` | `int` |  |
| `infants_on_lap` | `int` |  |
| `itinerary` | `[]any` |  |
| `market` | `string` |  |
| `max_price` | `any` |  |
| `max_stop` | `any` |  |
| `min_carry_on_bag` | `any` |  |
| `min_checked_bag` | `any` |  |
| `origin` | `string` |  |
| `return_date` | `any` |  |
| `return_time_range` | `any` |  |

#### Example: Create

```go
result, err := client.FareSearchResponseModel(nil).Create(map[string]any{
    "departure_date": "example_departure_date",
    "destination": "example_destination",
    "itinerary": []any{},
    "origin": "example_origin",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/ignav-flight-sdk/go/
├── ignav-flight.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/ignav-flight-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
airport := client.Airport(nil)
airport.List(nil, nil)

// airport.Data() now returns the airport data from the last list
// airport.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
