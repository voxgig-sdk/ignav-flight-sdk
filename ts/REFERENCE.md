# IgnavFlight TypeScript SDK Reference

Complete API reference for the IgnavFlight TypeScript SDK.


## IgnavFlightSDK

### Constructor

```ts
new IgnavFlightSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IgnavFlightSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = IgnavFlightSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `IgnavFlightSDK` instance in test mode.


### Instance Methods

#### `Airport(data?: object)`

Create a new `Airport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AirportEntity` instance.

#### `BookingLink(data?: object)`

Create a new `BookingLink` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BookingLinkEntity` instance.

#### `FareSearchModel(data?: object)`

Create a new `FareSearchModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FareSearchModelEntity` instance.

#### `FareSearchResponseModel(data?: object)`

Create a new `FareSearchResponseModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FareSearchResponseModelEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `IgnavFlightSDK.test()`.

**Returns:** `IgnavFlightSDK` instance in test mode.


---

## AirportEntity

```ts
const airport = client.Airport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `string` | Yes |  |
| `code` | `string` | Yes |  |
| `country` | `string` | Yes |  |
| `name` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Airport().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AirportEntity` instance with the same client and
options.

#### `client()`

Return the parent `IgnavFlightSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BookingLinkEntity

```ts
const booking_link = client.BookingLink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adults` | `any` | No |  |
| `children` | `any` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BookingLink().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BookingLinkEntity` instance with the same client and
options.

#### `client()`

Return the parent `IgnavFlightSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FareSearchModelEntity

```ts
const fare_search_model = client.FareSearchModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adults` | `number` | No |  |
| `airlines_exclude` | `any` | No |  |
| `airlines_include` | `any` | No |  |
| `allow_self_transfer` | `boolean` | No |  |
| `cabin_class` | `string` | No |  |
| `children` | `number` | No |  |
| `infants_in_seat` | `number` | No |  |
| `infants_on_lap` | `number` | No |  |
| `itineraries` | `any[]` | Yes |  |
| `legs` | `any[]` | Yes |  |
| `market` | `string` | No |  |
| `max_price` | `any` | No |  |
| `min_carry_on_bags` | `any` | No |  |
| `min_checked_bags` | `any` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FareSearchModel().create({
  itineraries: [],
  legs: [],
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FareSearchModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `IgnavFlightSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FareSearchResponseModelEntity

```ts
const fare_search_response_model = client.FareSearchResponseModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adults` | `number` | No |  |
| `airlines_exclude` | `any` | No |  |
| `airlines_include` | `any` | No |  |
| `allow_self_transfer` | `boolean` | No |  |
| `cabin_class` | `string` | No |  |
| `children` | `number` | No |  |
| `departure_date` | `string` | Yes |  |
| `departure_time_range` | `any` | No |  |
| `destination` | `string` | Yes |  |
| `infants_in_seat` | `number` | No |  |
| `infants_on_lap` | `number` | No |  |
| `itineraries` | `any[]` | Yes |  |
| `market` | `string` | No |  |
| `max_price` | `any` | No |  |
| `max_stops` | `any` | No |  |
| `min_carry_on_bags` | `any` | No |  |
| `min_checked_bags` | `any` | No |  |
| `origin` | `string` | Yes |  |
| `return_date` | `any` | No |  |
| `return_time_range` | `any` | No |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `adults` | - |
| `airlines_exclude` | - |
| `airlines_include` | - |
| `allow_self_transfer` | - |
| `cabin_class` | - |
| `children` | - |
| `departure_date` | - |
| `departure_time_range` | - |
| `destination` | - |
| `infants_in_seat` | - |
| `infants_on_lap` | - |
| `itineraries` | - |
| `market` | - |
| `max_price` | - |
| `max_stops` | - |
| `min_carry_on_bags` | - |
| `min_checked_bags` | - |
| `origin` | - |
| `return_date` | Yes |
| `return_time_range` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.FareSearchResponseModel().create({
  departure_date: 'example_departure_date',
  destination: 'example_destination',
  itineraries: [],
  origin: 'example_origin',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FareSearchResponseModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `IgnavFlightSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new IgnavFlightSDK({
  feature: {
    test: { active: true },
  }
})
```

