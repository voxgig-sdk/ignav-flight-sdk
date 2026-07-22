# IgnavFlight Python SDK Reference

Complete API reference for the IgnavFlight Python SDK.


## IgnavFlightSDK

### Constructor

```python
from ignavflight_sdk import IgnavFlightSDK

client = IgnavFlightSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `IgnavFlightSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = IgnavFlightSDK.test()
```


### Instance Methods

#### `Airport(data=None)`

Create a new `AirportEntity` instance. Pass `None` for no initial data.

#### `BookingLink(data=None)`

Create a new `BookingLinkEntity` instance. Pass `None` for no initial data.

#### `FareSearchModel(data=None)`

Create a new `FareSearchModelEntity` instance. Pass `None` for no initial data.

#### `FareSearchResponseModel(data=None)`

Create a new `FareSearchResponseModelEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AirportEntity

```python
airport = client.Airport()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `str` | Yes |  |
| `code` | `str` | Yes |  |
| `country` | `str` | Yes |  |
| `name` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Airport().list()
for airport in results:
    print(airport)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AirportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BookingLinkEntity

```python
booking_link = client.BookingLink()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `Any` | No |  |
| `child` | `Any` | No |  |
| `departure_date` | `Any` | No |  |
| `destination` | `Any` | No |  |
| `ignav_id` | `str` | No |  |
| `inbound_carrier_code` | `Any` | No |  |
| `inbound_flight_number` | `int` | No |  |
| `infants_in_seat` | `Any` | No |  |
| `infants_on_lap` | `Any` | No |  |
| `market` | `Any` | No |  |
| `origin` | `Any` | No |  |
| `outbound_carrier_code` | `Any` | No |  |
| `outbound_flight_number` | `int` | No |  |
| `return_date` | `Any` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.BookingLink().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BookingLinkEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FareSearchModelEntity

```python
fare_search_model = client.FareSearchModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `int` | No |  |
| `airlines_exclude` | `Any` | No |  |
| `airlines_include` | `Any` | No |  |
| `allow_self_transfer` | `bool` | No |  |
| `cabin_class` | `str` | No |  |
| `child` | `int` | No |  |
| `infants_in_seat` | `int` | No |  |
| `infants_on_lap` | `int` | No |  |
| `itinerary` | `list` | Yes |  |
| `leg` | `list` | Yes |  |
| `market` | `str` | No |  |
| `max_price` | `Any` | No |  |
| `min_carry_on_bag` | `Any` | No |  |
| `min_checked_bag` | `Any` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FareSearchModel().create({
    "itinerary": [],  # list
    "leg": [],  # list
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FareSearchModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FareSearchResponseModelEntity

```python
fare_search_response_model = client.FareSearchResponseModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adult` | `int` | No |  |
| `airlines_exclude` | `Any` | No |  |
| `airlines_include` | `Any` | No |  |
| `allow_self_transfer` | `bool` | No |  |
| `cabin_class` | `str` | No |  |
| `child` | `int` | No |  |
| `departure_date` | `str` | Yes |  |
| `departure_time_range` | `Any` | No |  |
| `destination` | `str` | Yes |  |
| `infants_in_seat` | `int` | No |  |
| `infants_on_lap` | `int` | No |  |
| `itinerary` | `list` | Yes |  |
| `market` | `str` | No |  |
| `max_price` | `Any` | No |  |
| `max_stop` | `Any` | No |  |
| `min_carry_on_bag` | `Any` | No |  |
| `min_checked_bag` | `Any` | No |  |
| `origin` | `str` | Yes |  |
| `return_date` | `Any` | No |  |
| `return_time_range` | `Any` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.FareSearchResponseModel().create({
    "departure_date": "example_departure_date",  # str
    "destination": "example_destination",  # str
    "itinerary": [],  # list
    "origin": "example_origin",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FareSearchResponseModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = IgnavFlightSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

