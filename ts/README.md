# IgnavFlight TypeScript SDK



The TypeScript SDK for the IgnavFlight API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Airport()` — each with a small set of operations (`list`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/ignav-flight-sdk/releases](https://github.com/voxgig-sdk/ignav-flight-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { IgnavFlightSDK } from '@voxgig-sdk/ignav-flight'

const client = new IgnavFlightSDK({
  apikey: process.env.IGNAV_FLIGHT_APIKEY,
})
```

### 2. List airport records

`list()` resolves to an array of Airport objects — iterate it directly:

```ts
const airports = await client.Airport().list()

for (const airport of airports) {
  console.log(airport)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const airports = await client.Airport().list()
  console.log(airports)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = IgnavFlightSDK.test()

const airport = await client.Airport().list()
// airport is a bare entity populated with mock response data
console.log(airport)
```

You can also use the instance method:

```ts
const client = new IgnavFlightSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Airport()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new IgnavFlightSDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### IgnavFlightSDK

#### Constructor

```ts
new IgnavFlightSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Airport(data?)` | `AirportEntity` | Create an Airport entity instance. |
| `BookingLink(data?)` | `BookingLinkEntity` | Create a BookingLink entity instance. |
| `FareSearchModel(data?)` | `FareSearchModelEntity` | Create a FareSearchModel entity instance. |
| `FareSearchResponseModel(data?)` | `FareSearchResponseModelEntity` | Create a FareSearchResponseModel entity instance. |
| `tester(testopts?, sdkopts?)` | `IgnavFlightSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `IgnavFlightSDK.test(testopts?, sdkopts?)` | `IgnavFlightSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): IgnavFlightSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `create` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Airport

| Field | Description |
| --- | --- |
| `city` |  |
| `code` |  |
| `country` |  |
| `name` |  |

Operations: list.

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

Operations: create.

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

Operations: create.

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

Operations: create.

API path: `/api/fares/one-way`



## Entities


### Airport

Create an instance: `const airport = client.Airport()`

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

```ts
const airports = await client.Airport().list()
```


### BookingLink

Create an instance: `const booking_link = client.BookingLink()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `any` |  |
| `child` | `any` |  |
| `departure_date` | `any` |  |
| `destination` | `any` |  |
| `ignav_id` | `string` |  |
| `inbound_carrier_code` | `any` |  |
| `inbound_flight_number` | `number` |  |
| `infants_in_seat` | `any` |  |
| `infants_on_lap` | `any` |  |
| `market` | `any` |  |
| `origin` | `any` |  |
| `outbound_carrier_code` | `any` |  |
| `outbound_flight_number` | `number` |  |
| `return_date` | `any` |  |

#### Example: Create

```ts
const booking_link = await client.BookingLink().create({
})
```


### FareSearchModel

Create an instance: `const fare_search_model = client.FareSearchModel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `number` |  |
| `airlines_exclude` | `any` |  |
| `airlines_include` | `any` |  |
| `allow_self_transfer` | `boolean` |  |
| `cabin_class` | `string` |  |
| `child` | `number` |  |
| `infants_in_seat` | `number` |  |
| `infants_on_lap` | `number` |  |
| `itinerary` | `any[]` |  |
| `leg` | `any[]` |  |
| `market` | `string` |  |
| `max_price` | `any` |  |
| `min_carry_on_bag` | `any` |  |
| `min_checked_bag` | `any` |  |

#### Example: Create

```ts
const fare_search_model = await client.FareSearchModel().create({
  itinerary: [],
  leg: [],
})
```


### FareSearchResponseModel

Create an instance: `const fare_search_response_model = client.FareSearchResponseModel()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adult` | `number` |  |
| `airlines_exclude` | `any` |  |
| `airlines_include` | `any` |  |
| `allow_self_transfer` | `boolean` |  |
| `cabin_class` | `string` |  |
| `child` | `number` |  |
| `departure_date` | `string` |  |
| `departure_time_range` | `any` |  |
| `destination` | `string` |  |
| `infants_in_seat` | `number` |  |
| `infants_on_lap` | `number` |  |
| `itinerary` | `any[]` |  |
| `market` | `string` |  |
| `max_price` | `any` |  |
| `max_stop` | `any` |  |
| `min_carry_on_bag` | `any` |  |
| `min_checked_bag` | `any` |  |
| `origin` | `string` |  |
| `return_date` | `any` |  |
| `return_time_range` | `any` |  |

#### Example: Create

```ts
const fare_search_response_model = await client.FareSearchResponseModel().create({
  departure_date: 'example_departure_date',
  destination: 'example_destination',
  itinerary: [],
  origin: 'example_origin',
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
ignav-flight/
├── src/
│   ├── IgnavFlightSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { IgnavFlightSDK } from '@voxgig-sdk/ignav-flight'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const airport = client.Airport()
await airport.list()

// airport.data() now returns the airport data from the last `list`
// airport.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
