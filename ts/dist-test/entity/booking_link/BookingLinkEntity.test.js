"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('BookingLinkEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IGNAV_FLIGHT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IGNAV_FLIGHT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IgnavFlightSDK.test();
        const ent = testsdk.BookingLink();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'booking_link.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "adults": { "a": true, "h": "Adults", "n": "adults", "r": false, "t": "`$ANY`", "key$": "adults", "index$": 0 }, "children": { "a": true, "h": "Children", "n": "children", "r": false, "t": "`$ANY`", "key$": "children", "index$": 1 }, "departure_date": { "a": true, "h": "Departure Date", "n": "departure_date", "r": false, "t": "`$ANY`", "key$": "departure_date", "index$": 2 }, "destination": { "a": true, "h": "Destination", "n": "destination", "r": false, "t": "`$ANY`", "key$": "destination", "index$": 3 }, "ignav_id": { "a": true, "h": "Ignav Id", "n": "ignav_id", "r": false, "t": "`$STRING`", "key$": "ignav_id", "index$": 4 }, "inbound_carrier_code": { "a": true, "h": "Inbound Carrier Code", "n": "inbound_carrier_code", "r": false, "t": "`$ANY`", "key$": "inbound_carrier_code", "index$": 5 }, "inbound_flight_number": { "a": true, "h": "Inbound Flight Number", "n": "inbound_flight_number", "r": false, "t": "`$INTEGER`", "key$": "inbound_flight_number", "index$": 6 }, "infants_in_seat": { "a": true, "h": "Infants In Seat", "n": "infants_in_seat", "r": false, "t": "`$ANY`", "key$": "infants_in_seat", "index$": 7 }, "infants_on_lap": { "a": true, "h": "Infants On Lap", "n": "infants_on_lap", "r": false, "t": "`$ANY`", "key$": "infants_on_lap", "index$": 8 }, "market": { "a": true, "h": "Market", "n": "market", "r": false, "t": "`$ANY`", "key$": "market", "index$": 9 }, "origin": { "a": true, "h": "Origin", "n": "origin", "r": false, "t": "`$ANY`", "key$": "origin", "index$": 10 }, "outbound_carrier_code": { "a": true, "h": "Outbound Carrier Code", "n": "outbound_carrier_code", "r": false, "t": "`$ANY`", "key$": "outbound_carrier_code", "index$": 11 }, "outbound_flight_number": { "a": true, "h": "Outbound Flight Number", "n": "outbound_flight_number", "r": false, "t": "`$INTEGER`", "key$": "outbound_flight_number", "index$": 12 }, "return_date": { "a": true, "h": "Return Date", "n": "return_date", "r": false, "t": "`$ANY`", "key$": "return_date", "index$": 13 } }, "name": "booking_link", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/fares/booking-links", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/fares/booking-links", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "fares" }, { "lit": "booking-links" }], "t": { "req": { "adults": "`reqdata.adult`", "children": "`reqdata.child`", "departure_date": "`reqdata.departure_date`", "destination": "`reqdata.destination`", "ignav_id": "`reqdata.ignav_id`", "inbound_carrier_code": "`reqdata.inbound_carrier_code`", "inbound_flight_number": "`reqdata.inbound_flight_number`", "infants_in_seat": "`reqdata.infants_in_seat`", "infants_on_lap": "`reqdata.infants_on_lap`", "market": "`reqdata.market`", "origin": "`reqdata.origin`", "outbound_carrier_code": "`reqdata.outbound_carrier_code`", "outbound_flight_number": "`reqdata.outbound_flight_number`", "return_date": "`reqdata.return_date`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "booking_link", "name__orig": "booking_link", "Name": "BookingLink", "name_": "booking_link", "name-": "booking-link", "NAME": "BOOKING_LINK", "index$": 1 }, { "active": true, "entity": "booking_link", "key$": "BasicBookingLinkFlow", "kind": "basic", "name": "BasicBookingLinkFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "booking_link_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'BookingLink', { "POST /api/fares/booking-links": { "protocol": "http", "operationId": "get_booking_links_api_fares_booking_links_post", "requestBody": { "content": { "application/json": { "schema": { "properties": { "ignav_id": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Ignav Id", "key$": "ignav_id" }, "origin": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Origin", "key$": "origin" }, "destination": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Destination", "key$": "destination" }, "departure_date": { "anyOf": [{ "type": "string", "format": "date" }, { "type": "null" }], "title": "Departure Date", "key$": "departure_date" }, "outbound_carrier_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Outbound Carrier Code", "key$": "outbound_carrier_code" }, "outbound_flight_number": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Outbound Flight Number", "key$": "outbound_flight_number" }, "return_date": { "anyOf": [{ "type": "string", "format": "date" }, { "type": "null" }], "title": "Return Date", "key$": "return_date" }, "inbound_carrier_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Inbound Carrier Code", "key$": "inbound_carrier_code" }, "inbound_flight_number": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Inbound Flight Number", "key$": "inbound_flight_number" }, "adults": { "anyOf": [{ "type": "integer", "minimum": 1 }, { "type": "null" }], "title": "Adults", "key$": "adults" }, "children": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "title": "Children", "key$": "children" }, "infants_in_seat": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "title": "Infants In Seat", "key$": "infants_in_seat" }, "infants_on_lap": { "anyOf": [{ "type": "integer", "minimum": 0 }, { "type": "null" }], "title": "Infants On Lap", "key$": "infants_on_lap" }, "market": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Market", "key$": "market" } }, "additionalProperties": false, "type": "object", "title": "BookingLinksRequest", "x-ref": "#/components/schemas/BookingLinksRequest", "index$": 1 } } }, "required": true }, "responses": { "200": { "description": "Successful Response", "content": { "application/json": { "schema": { "anyOf": [{ "properties": { "itinerary": { "properties": { "price": { "properties": { "amount": { "type": "number", "title": "Amount" }, "currency": { "type": "string", "title": "Currency" }, "status": { "type": "string", "enum": ["verified", "unverified"], "title": "Status" } }, "additionalProperties": false, "type": "object", "required": ["amount", "currency", "status"], "title": "PriceModel", "x-ref": "#/components/schemas/PriceModel" }, "outbound": { "properties": { "carrier": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Carrier" }, "duration_minutes": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Duration Minutes" }, "segments": { "items": { "properties": { "marketing_carrier_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Marketing Carrier Code" }, "flight_number": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Flight Number" }, "operating_carrier_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Operating Carrier Name" }, "departure_airport": { "type": "string", "title": "Departure Airport" }, "departure_time_local": { "type": "string", "title": "Departure Time Local" }, "departure_timezone": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Departure Timezone" }, "departure_time_utc": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Departure Time Utc" }, "arrival_airport": { "type": "string", "title": "Arrival Airport" }, "arrival_time_local": { "type": "string", "title": "Arrival Time Local" }, "arrival_timezone": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Arrival Timezone" }, "arrival_time_utc": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Arrival Time Utc" }, "duration_minutes": { "type": "integer", "title": "Duration Minutes" }, "aircraft": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Aircraft" } }, "additionalProperties": false, "type": "object", "required": ["marketing_carrier_code", "flight_number", "operating_carrier_name", "departure_airport", "departure_time_local", "departure_timezone", "departure_time_utc", "arrival_airport", "arrival_time_local", "arrival_timezone", "arrival_time_utc", "duration_minutes", "aircraft"], "title": "SegmentModel", "x-ref": "#/components/schemas/SegmentModel" }, "type": "array", "title": "Segments" } }, "additionalProperties": false, "type": "object", "required": ["segments"], "title": "LegModel", "x-ref": "#/components/schemas/LegModel" }, "inbound": { "anyOf": [{ "properties": { "carrier": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Carrier" }, "duration_minutes": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Duration Minutes" }, "segments": { "items": { "properties": { "marketing_carrier_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Marketing Carrier Code" }, "flight_number": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Flight Number" }, "operating_carrier_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Operating Carrier Name" }, "departure_airport": { "type": "string", "title": "Departure Airport" }, "departure_time_local": { "type": "string", "title": "Departure Time Local" }, "departure_timezone": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Departure Timezone" }, "departure_time_utc": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Departure Time Utc" }, "arrival_airport": { "type": "string", "title": "Arrival Airport" }, "arrival_time_local": { "type": "string", "title": "Arrival Time Local" }, "arrival_timezone": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Arrival Timezone" }, "arrival_time_utc": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Arrival Time Utc" }, "duration_minutes": { "type": "integer", "title": "Duration Minutes" }, "aircraft": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Aircraft" } }, "additionalProperties": false, "type": "object", "required": ["marketing_carrier_code", "flight_number", "operating_carrier_name", "departure_airport", "departure_time_local", "departure_timezone", "departure_time_utc", "arrival_airport", "arrival_time_local", "arrival_timezone", "arrival_time_utc", "duration_minutes", "aircraft"], "title": "SegmentModel", "x-ref": "#/components/schemas/SegmentModel" }, "type": "array", "title": "Segments" } }, "additionalProperties": false, "type": "object", "required": ["segments"], "title": "LegModel", "x-ref": "#/components/schemas/LegModel" }, { "type": "null" }] }, "cabin_class": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Cabin Class" }, "bags": { "anyOf": [{ "properties": { "carry_on": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Carry On" }, "checked": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Checked" } }, "additionalProperties": false, "type": "object", "title": "BaggageAllowanceModel", "x-ref": "#/components/schemas/BaggageAllowanceModel" }, { "type": "null" }] }, "requires_self_transfer": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Requires Self Transfer" } }, "additionalProperties": false, "type": "object", "required": ["price", "outbound"], "title": "BookingItineraryModel", "x-ref": "#/components/schemas/BookingItineraryModel" }, "booking_options": { "items": { "properties": { "legs": { "items": { "type": "string", "enum": ["outbound", "inbound"] }, "type": "array", "title": "Legs" }, "links": { "items": { "properties": { "provider_name": { "type": "string", "title": "Provider Name" }, "provider_type": { "title": "Provider Type", "type": "string", "enum": ["airline", "third_party"] }, "fare_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Fare Name" }, "price": { "anyOf": [{ "properties": { "amount": { "type": "number", "title": "Amount" }, "currency": { "type": "string", "title": "Currency" }, "status": { "type": "string", "enum": ["verified", "unverified"], "title": "Status" } }, "additionalProperties": false, "type": "object", "required": ["amount", "currency", "status"], "title": "PriceModel", "x-ref": "#/components/schemas/PriceModel" }, { "type": "null" }] }, "url": { "type": "string", "title": "Url" } }, "additionalProperties": false, "type": "object", "required": ["provider_name", "url", "provider_type"], "title": "BookingLinkModel", "x-ref": "#/components/schemas/BookingLinkModel" }, "type": "array", "title": "Links" } }, "additionalProperties": false, "type": "object", "required": ["legs", "links"], "title": "BookingOptionModel", "x-ref": "#/components/schemas/BookingOptionModel" }, "type": "array", "title": "Booking Options" } }, "additionalProperties": false, "type": "object", "required": ["itinerary", "booking_options"], "title": "BookingOptionsResponseModel", "x-ref": "#/components/schemas/BookingOptionsResponseModel" }, { "properties": { "itinerary": { "properties": { "price": { "properties": { "amount": { "type": "number", "title": "Amount" }, "currency": { "type": "string", "title": "Currency" }, "status": { "type": "string", "enum": ["verified", "unverified"], "title": "Status" } }, "additionalProperties": false, "type": "object", "required": ["amount", "currency", "status"], "title": "PriceModel", "x-ref": "#/components/schemas/PriceModel" }, "legs": { "items": { "properties": { "carrier": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Carrier" }, "duration_minutes": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Duration Minutes" }, "segments": { "items": { "properties": { "marketing_carrier_code": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Marketing Carrier Code" }, "flight_number": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Flight Number" }, "operating_carrier_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Operating Carrier Name" }, "departure_airport": { "type": "string", "title": "Departure Airport" }, "departure_time_local": { "type": "string", "title": "Departure Time Local" }, "departure_timezone": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Departure Timezone" }, "departure_time_utc": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Departure Time Utc" }, "arrival_airport": { "type": "string", "title": "Arrival Airport" }, "arrival_time_local": { "type": "string", "title": "Arrival Time Local" }, "arrival_timezone": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Arrival Timezone" }, "arrival_time_utc": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Arrival Time Utc" }, "duration_minutes": { "type": "integer", "title": "Duration Minutes" }, "aircraft": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Aircraft" } }, "additionalProperties": false, "type": "object", "required": ["marketing_carrier_code", "flight_number", "operating_carrier_name", "departure_airport", "departure_time_local", "departure_timezone", "departure_time_utc", "arrival_airport", "arrival_time_local", "arrival_timezone", "arrival_time_utc", "duration_minutes", "aircraft"], "title": "SegmentModel", "x-ref": "#/components/schemas/SegmentModel" }, "type": "array", "title": "Segments" } }, "additionalProperties": false, "type": "object", "required": ["segments"], "title": "LegModel", "x-ref": "#/components/schemas/LegModel" }, "type": "array", "title": "Legs" }, "cabin_class": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Cabin Class" }, "bags": { "anyOf": [{ "properties": { "carry_on": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Carry On" }, "checked": { "anyOf": [{ "type": "integer" }, { "type": "null" }], "title": "Checked" } }, "additionalProperties": false, "type": "object", "title": "BaggageAllowanceModel", "x-ref": "#/components/schemas/BaggageAllowanceModel" }, { "type": "null" }] }, "requires_self_transfer": { "anyOf": [{ "type": "boolean" }, { "type": "null" }], "title": "Requires Self Transfer" } }, "additionalProperties": false, "type": "object", "required": ["price", "legs"], "title": "SearchBookingItineraryModel", "x-ref": "#/components/schemas/SearchBookingItineraryModel" }, "booking_options": { "items": { "properties": { "leg_indexes": { "items": { "type": "integer" }, "type": "array", "title": "Leg Indexes" }, "links": { "items": { "properties": { "provider_name": { "type": "string", "title": "Provider Name" }, "provider_type": { "title": "Provider Type", "type": "string", "enum": ["airline", "third_party"] }, "fare_name": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Fare Name" }, "price": { "anyOf": [{ "properties": { "amount": { "type": "number", "title": "Amount" }, "currency": { "type": "string", "title": "Currency" }, "status": { "type": "string", "enum": ["verified", "unverified"], "title": "Status" } }, "additionalProperties": false, "type": "object", "required": ["amount", "currency", "status"], "title": "PriceModel", "x-ref": "#/components/schemas/PriceModel" }, { "type": "null" }] }, "url": { "type": "string", "title": "Url" } }, "additionalProperties": false, "type": "object", "required": ["provider_name", "url", "provider_type"], "title": "BookingLinkModel", "x-ref": "#/components/schemas/BookingLinkModel" }, "type": "array", "title": "Links" } }, "additionalProperties": false, "type": "object", "required": ["leg_indexes", "links"], "title": "SearchBookingOptionModel", "x-ref": "#/components/schemas/SearchBookingOptionModel" }, "type": "array", "title": "Booking Options" } }, "additionalProperties": false, "type": "object", "required": ["itinerary", "booking_options"], "title": "SearchBookingOptionsResponseModel", "x-ref": "#/components/schemas/SearchBookingOptionsResponseModel" }], "title": "Response Get Booking Links Api Fares Booking Links Post", "index$": 0 } } } }, "400": { "description": "Bad Request", "content": { "application/json": { "schema": { "properties": { "error": { "properties": { "type": { "type": "string", "title": "Type" }, "code": { "type": "string", "title": "Code" }, "message": { "type": "string", "title": "Message" }, "field": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Field" } }, "additionalProperties": false, "type": "object", "required": ["type", "code", "message"], "title": "ErrorDetailModel", "x-ref": "#/components/schemas/ErrorDetailModel" } }, "additionalProperties": false, "type": "object", "required": ["error"], "title": "ErrorResponseModel", "x-ref": "#/components/schemas/ErrorResponseModel" } } } }, "401": { "description": "Unauthorized", "content": { "application/json": { "schema": { "properties": { "error": { "properties": { "type": { "type": "string", "title": "Type" }, "code": { "type": "string", "title": "Code" }, "message": { "type": "string", "title": "Message" }, "field": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Field" } }, "additionalProperties": false, "type": "object", "required": ["type", "code", "message"], "title": "ErrorDetailModel", "x-ref": "#/components/schemas/ErrorDetailModel" } }, "additionalProperties": false, "type": "object", "required": ["error"], "title": "ErrorResponseModel", "x-ref": "#/components/schemas/ErrorResponseModel" } } } }, "404": { "description": "Not Found", "content": { "application/json": { "schema": { "properties": { "error": { "properties": { "type": { "type": "string", "title": "Type" }, "code": { "type": "string", "title": "Code" }, "message": { "type": "string", "title": "Message" }, "field": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Field" } }, "additionalProperties": false, "type": "object", "required": ["type", "code", "message"], "title": "ErrorDetailModel", "x-ref": "#/components/schemas/ErrorDetailModel" } }, "additionalProperties": false, "type": "object", "required": ["error"], "title": "ErrorResponseModel", "x-ref": "#/components/schemas/ErrorResponseModel" } } } }, "424": { "description": "Failed Dependency", "content": { "application/json": { "schema": { "properties": { "error": { "properties": { "type": { "type": "string", "title": "Type" }, "code": { "type": "string", "title": "Code" }, "message": { "type": "string", "title": "Message" }, "field": { "anyOf": [{ "type": "string" }, { "type": "null" }], "title": "Field" } }, "additionalProperties": false, "type": "object", "required": ["type", "code", "message"], "title": "ErrorDetailModel", "x-ref": "#/components/schemas/ErrorDetailModel" } }, "additionalProperties": false, "type": "object", "required": ["error"], "title": "ErrorResponseModel", "x-ref": "#/components/schemas/ErrorResponseModel" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "definition", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-Api-Key" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const booking_link_ref01_ent = client.BookingLink();
        let booking_link_ref01_data = setup.data.new.booking_link['booking_link_ref01'];
        booking_link_ref01_data = (await booking_link_ref01_ent.create(booking_link_ref01_data)).data();
        (0, node_assert_1.default)(null != booking_link_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/booking_link/BookingLinkTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IgnavFlightSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['booking_link01', 'booking_link02', 'booking_link03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID': idmap,
        'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
        'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
        'IGNAV_FLIGHT_APIKEY': '',
    });
    idmap = env['IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID'];
    const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.IgnavFlightSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.IGNAV_FLIGHT_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.IGNAV_FLIGHT_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=BookingLinkEntity.test.js.map