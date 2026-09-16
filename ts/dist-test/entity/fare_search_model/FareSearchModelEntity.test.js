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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('FareSearchModelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when IGNAV_FLIGHT_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('IGNAV_FLIGHT_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.IgnavFlightSDK.test();
        const ent = testsdk.FareSearchModel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'fare_search_model.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "adults", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "airlines_exclude", "req": false, "type": "`$ANY`", "index$": 1 }, { "active": true, "name": "airlines_include", "req": false, "type": "`$ANY`", "index$": 2 }, { "active": true, "name": "allow_self_transfer", "req": false, "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "name": "cabin_class", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "children", "req": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "infants_in_seat", "req": false, "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "infants_on_lap", "req": false, "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "itineraries", "req": true, "type": "`$ARRAY`", "index$": 8 }, { "active": true, "name": "legs", "req": true, "type": "`$ARRAY`", "index$": 9 }, { "active": true, "name": "market", "req": false, "type": "`$STRING`", "index$": 10 }, { "active": true, "name": "max_price", "req": false, "type": "`$ANY`", "index$": 11 }, { "active": true, "name": "min_carry_on_bags", "req": false, "type": "`$ANY`", "index$": 12 }, { "active": true, "name": "min_checked_bags", "req": false, "type": "`$ANY`", "index$": 13 }], "name": "fare_search_model", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/fares/search", "json": "{\"operationId\":\"search_fares_api_fares_search_post\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"adults\":{\"default\":1,\"minimum\":1,\"title\":\"Adults\",\"type\":\"integer\"},\"airlines_exclude\":{\"anyOf\":[{\"items\":{\"type\":\"string\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Airlines Exclude\"},\"airlines_include\":{\"anyOf\":[{\"items\":{\"type\":\"string\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Airlines Include\"},\"allow_self_transfer\":{\"default\":true,\"title\":\"Allow Self Transfer\",\"type\":\"boolean\"},\"cabin_class\":{\"default\":\"economy\",\"enum\":[\"economy\",\"premium_economy\",\"business\",\"first\"],\"title\":\"Cabin Class\",\"type\":\"string\"},\"children\":{\"default\":0,\"minimum\":0,\"title\":\"Children\",\"type\":\"integer\"},\"infants_in_seat\":{\"default\":0,\"minimum\":0,\"title\":\"Infants In Seat\",\"type\":\"integer\"},\"infants_on_lap\":{\"default\":0,\"minimum\":0,\"title\":\"Infants On Lap\",\"type\":\"integer\"},\"legs\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"departure_date\":{\"format\":\"date\",\"title\":\"Departure Date\",\"type\":\"string\"},\"departure_time_range\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"arrival_earliest_hour\":{\"anyOf\":[{\"maximum\":23,\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Arrival Earliest Hour\"},\"arrival_latest_hour\":{\"anyOf\":[{\"maximum\":23,\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Arrival Latest Hour\"},\"earliest_hour\":{\"anyOf\":[{\"maximum\":23,\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Earliest Hour\"},\"latest_hour\":{\"anyOf\":[{\"maximum\":23,\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Latest Hour\"}},\"title\":\"TimeRangeInput\",\"type\":\"object\"},{\"type\":\"null\"}]},\"destination\":{\"title\":\"Destination\",\"type\":\"string\"},\"max_stops\":{\"anyOf\":[{\"maximum\":2,\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Max Stops\"},\"origin\":{\"title\":\"Origin\",\"type\":\"string\"}},\"required\":[\"origin\",\"destination\",\"departure_date\"],\"title\":\"SearchLegInput\",\"type\":\"object\"},\"maxItems\":4,\"minItems\":1,\"title\":\"Legs\",\"type\":\"array\"},\"market\":{\"default\":\"US\",\"title\":\"Market\",\"type\":\"string\"},\"max_price\":{\"anyOf\":[{\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Max Price\"},\"min_carry_on_bags\":{\"anyOf\":[{\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Min Carry On Bags\"},\"min_checked_bags\":{\"anyOf\":[{\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Min Checked Bags\"}},\"required\":[\"legs\"],\"title\":\"FareSearchRequest\",\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"itineraries\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"bags\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"carry_on\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Carry On\"},\"checked\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Checked\"}},\"title\":\"BaggageAllowanceModel\",\"type\":\"object\"},{\"type\":\"null\"}]},\"cabin_class\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Cabin Class\"},\"ignav_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Ignav Id\"},\"legs\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"carrier\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Carrier\"},\"duration_minutes\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Duration Minutes\"},\"segments\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"aircraft\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Aircraft\"},\"arrival_airport\":{\"title\":\"Arrival Airport\",\"type\":\"string\"},\"arrival_time_local\":{\"title\":\"Arrival Time Local\",\"type\":\"string\"},\"arrival_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Time Utc\"},\"arrival_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Timezone\"},\"departure_airport\":{\"title\":\"Departure Airport\",\"type\":\"string\"},\"departure_time_local\":{\"title\":\"Departure Time Local\",\"type\":\"string\"},\"departure_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Time Utc\"},\"departure_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Timezone\"},\"duration_minutes\":{\"title\":\"Duration Minutes\",\"type\":\"integer\"},\"flight_number\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Flight Number\"},\"marketing_carrier_code\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Marketing Carrier Code\"},\"operating_carrier_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Operating Carrier Name\"}},\"required\":[\"marketing_carrier_code\",\"flight_number\",\"operating_carrier_name\",\"departure_airport\",\"departure_time_local\",\"departure_timezone\",\"departure_time_utc\",\"arrival_airport\",\"arrival_time_local\",\"arrival_timezone\",\"arrival_time_utc\",\"duration_minutes\",\"aircraft\"],\"title\":\"SegmentModel\",\"type\":\"object\"},\"title\":\"Segments\",\"type\":\"array\"}},\"required\":[\"segments\"],\"title\":\"LegModel\",\"type\":\"object\"},\"title\":\"Legs\",\"type\":\"array\"},\"price\":{\"additionalProperties\":false,\"properties\":{\"amount\":{\"title\":\"Amount\",\"type\":\"number\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"status\":{\"enum\":[\"verified\",\"unverified\"],\"title\":\"Status\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\",\"status\"],\"title\":\"PriceModel\",\"type\":\"object\"},\"requires_self_transfer\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"title\":\"Requires Self Transfer\"}},\"required\":[\"price\",\"legs\"],\"title\":\"SearchItineraryModel\",\"type\":\"object\"},\"title\":\"Itineraries\",\"type\":\"array\"},\"legs\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"departure_date\":{\"title\":\"Departure Date\",\"type\":\"string\"},\"destination\":{\"title\":\"Destination\",\"type\":\"string\"},\"origin\":{\"title\":\"Origin\",\"type\":\"string\"}},\"required\":[\"origin\",\"destination\",\"departure_date\"],\"title\":\"SearchLegModel\",\"type\":\"object\"},\"title\":\"Legs\",\"type\":\"array\"}},\"required\":[\"legs\",\"itineraries\"],\"title\":\"FareSearchModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"424\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Failed Dependency\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/fares/search", "segments": [{ "lit": "api" }, { "lit": "fares" }, { "lit": "search" }], "select": {}, "transform": { "req": { "adults": "`reqdata.adult`", "airlines_exclude": "`reqdata.airlines_exclude`", "airlines_include": "`reqdata.airlines_include`", "allow_self_transfer": "`reqdata.allow_self_transfer`", "cabin_class": "`reqdata.cabin_class`", "children": "`reqdata.child`", "infants_in_seat": "`reqdata.infants_in_seat`", "infants_on_lap": "`reqdata.infants_on_lap`", "legs": "`reqdata.leg`", "market": "`reqdata.market`", "max_price": "`reqdata.max_price`", "min_carry_on_bags": "`reqdata.min_carry_on_bag`", "min_checked_bags": "`reqdata.min_checked_bag`" }, "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "fare_search_model", "name__orig": "fare_search_model", "Name": "FareSearchModel", "name_": "fare_search_model", "name-": "fare-search-model", "NAME": "FARE_SEARCH_MODEL", "index$": 2 }, { "active": true, "entity": "fare_search_model", "key$": "BasicFareSearchModelFlow", "kind": "basic", "name": "BasicFareSearchModelFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "fare_search_model_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'FareSearchModel');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const fare_search_model_ref01_ent = client.FareSearchModel();
        let fare_search_model_ref01_data = setup.data.new.fare_search_model['fare_search_model_ref01'];
        fare_search_model_ref01_data = (await fare_search_model_ref01_ent.create(fare_search_model_ref01_data)).data();
        (0, node_assert_1.default)(null != fare_search_model_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/fare_search_model/FareSearchModelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.IgnavFlightSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['fare_search_model01', 'fare_search_model02', 'fare_search_model03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID': idmap,
        'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
        'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
        'IGNAV_FLIGHT_APIKEY': '',
    });
    idmap = env['IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID'];
    const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID'];
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
//# sourceMappingURL=FareSearchModelEntity.test.js.map