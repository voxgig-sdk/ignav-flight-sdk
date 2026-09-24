

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IgnavFlightSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('FareSearchModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IGNAV_FLIGHT_TEST_LIVE=TRUE.
  afterEach(liveDelay('IGNAV_FLIGHT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IgnavFlightSDK.test()
    const ent = testsdk.FareSearchModel()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fare_search_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adults":{"a":true,"h":"Adults","n":"adults","r":false,"t":"`$INTEGER`","key$":"adults","index$":0},"airlines_exclude":{"a":true,"h":"Airlines Exclude","n":"airlines_exclude","r":false,"t":"`$ANY`","key$":"airlines_exclude","index$":1},"airlines_include":{"a":true,"h":"Airlines Include","n":"airlines_include","r":false,"t":"`$ANY`","key$":"airlines_include","index$":2},"allow_self_transfer":{"a":true,"h":"Allow Self Transfer","n":"allow_self_transfer","r":false,"t":"`$BOOLEAN`","key$":"allow_self_transfer","index$":3},"cabin_class":{"a":true,"h":"Cabin Class","n":"cabin_class","r":false,"t":"`$STRING`","key$":"cabin_class","index$":4},"children":{"a":true,"h":"Children","n":"children","r":false,"t":"`$INTEGER`","key$":"children","index$":5},"infants_in_seat":{"a":true,"h":"Infants In Seat","n":"infants_in_seat","r":false,"t":"`$INTEGER`","key$":"infants_in_seat","index$":6},"infants_on_lap":{"a":true,"h":"Infants On Lap","n":"infants_on_lap","r":false,"t":"`$INTEGER`","key$":"infants_on_lap","index$":7},"itineraries":{"a":true,"h":"Itineraries","n":"itineraries","r":true,"t":"`$ARRAY`","key$":"itineraries","index$":8},"legs":{"a":true,"h":"Legs","n":"legs","r":true,"t":"`$ARRAY`","key$":"legs","index$":9},"market":{"a":true,"h":"Market","n":"market","r":false,"t":"`$STRING`","key$":"market","index$":10},"max_price":{"a":true,"h":"Max Price","n":"max_price","r":false,"t":"`$ANY`","key$":"max_price","index$":11},"min_carry_on_bags":{"a":true,"h":"Min Carry On Bags","n":"min_carry_on_bags","r":false,"t":"`$ANY`","key$":"min_carry_on_bags","index$":12},"min_checked_bags":{"a":true,"h":"Min Checked Bags","n":"min_checked_bags","r":false,"t":"`$ANY`","key$":"min_checked_bags","index$":13}},"name":"fare_search_model","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/fares/search","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/fares/search","q":{},"r":{},"s":[{"lit":"api"},{"lit":"fares"},{"lit":"search"}],"t":{"req":{"adults":"`reqdata.adult`","airlines_exclude":"`reqdata.airlines_exclude`","airlines_include":"`reqdata.airlines_include`","allow_self_transfer":"`reqdata.allow_self_transfer`","cabin_class":"`reqdata.cabin_class`","children":"`reqdata.child`","infants_in_seat":"`reqdata.infants_in_seat`","infants_on_lap":"`reqdata.infants_on_lap`","legs":"`reqdata.leg`","market":"`reqdata.market`","max_price":"`reqdata.max_price`","min_carry_on_bags":"`reqdata.min_carry_on_bag`","min_checked_bags":"`reqdata.min_checked_bag`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"fare_search_model","name__orig":"fare_search_model","Name":"FareSearchModel","name_":"fare_search_model","name-":"fare-search-model","NAME":"FARE_SEARCH_MODEL","index$":2}, {"active":true,"entity":"fare_search_model","key$":"BasicFareSearchModelFlow","kind":"basic","name":"BasicFareSearchModelFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"fare_search_model_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'FareSearchModel', {"POST /api/fares/search":{"protocol":"http","operationId":"search_fares_api_fares_search_post","requestBody":{"content":{"application/json":{"schema":{"properties":{"legs":{"items":{"properties":{"origin":{"type":"string","title":"Origin"},"destination":{"type":"string","title":"Destination"},"departure_date":{"type":"string","format":"date","title":"Departure Date"},"max_stops":{"anyOf":[{"type":"integer","maximum":2,"minimum":0},{"type":"null"}],"title":"Max Stops"},"departure_time_range":{"anyOf":[{"properties":{"earliest_hour":{"anyOf":[{"type":"integer","maximum":23,"minimum":0},{"type":"null"}],"title":"Earliest Hour"},"latest_hour":{"anyOf":[{"type":"integer","maximum":23,"minimum":0},{"type":"null"}],"title":"Latest Hour"},"arrival_earliest_hour":{"anyOf":[{"type":"integer","maximum":23,"minimum":0},{"type":"null"}],"title":"Arrival Earliest Hour"},"arrival_latest_hour":{"anyOf":[{"type":"integer","maximum":23,"minimum":0},{"type":"null"}],"title":"Arrival Latest Hour"}},"additionalProperties":false,"type":"object","title":"TimeRangeInput","x-ref":"#/components/schemas/TimeRangeInput"},{"type":"null"}]}},"additionalProperties":false,"type":"object","required":["origin","destination","departure_date"],"title":"SearchLegInput","x-ref":"#/components/schemas/SearchLegInput"},"type":"array","maxItems":4,"minItems":1,"title":"Legs","key$":"legs"},"adults":{"type":"integer","minimum":1,"title":"Adults","default":1,"key$":"adults"},"children":{"type":"integer","minimum":0,"title":"Children","default":0,"key$":"children"},"infants_in_seat":{"type":"integer","minimum":0,"title":"Infants In Seat","default":0,"key$":"infants_in_seat"},"infants_on_lap":{"type":"integer","minimum":0,"title":"Infants On Lap","default":0,"key$":"infants_on_lap"},"cabin_class":{"type":"string","enum":["economy","premium_economy","business","first"],"title":"Cabin Class","default":"economy","key$":"cabin_class"},"min_carry_on_bags":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Min Carry On Bags","key$":"min_carry_on_bags"},"min_checked_bags":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Min Checked Bags","key$":"min_checked_bags"},"max_price":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Max Price","key$":"max_price"},"airlines_include":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Airlines Include","key$":"airlines_include"},"airlines_exclude":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Airlines Exclude","key$":"airlines_exclude"},"allow_self_transfer":{"type":"boolean","title":"Allow Self Transfer","default":true,"key$":"allow_self_transfer"},"market":{"type":"string","title":"Market","default":"US","key$":"market"}},"additionalProperties":false,"type":"object","required":["legs"],"title":"FareSearchRequest","x-ref":"#/components/schemas/FareSearchRequest","index$":1}}},"required":true},"responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"properties":{"legs":{"items":{"properties":{"origin":{"type":"string","title":"Origin"},"destination":{"type":"string","title":"Destination"},"departure_date":{"type":"string","title":"Departure Date"}},"additionalProperties":false,"type":"object","required":["origin","destination","departure_date"],"title":"SearchLegModel","x-ref":"#/components/schemas/SearchLegModel"},"type":"array","title":"Legs","key$":"legs"},"itineraries":{"items":{"properties":{"price":{"properties":{"amount":{"type":"number","title":"Amount"},"currency":{"type":"string","title":"Currency"},"status":{"type":"string","enum":["verified","unverified"],"title":"Status"}},"additionalProperties":false,"type":"object","required":["amount","currency","status"],"title":"PriceModel","x-ref":"#/components/schemas/PriceModel"},"legs":{"items":{"properties":{"carrier":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Carrier"},"duration_minutes":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Duration Minutes"},"segments":{"items":{"properties":{"marketing_carrier_code":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Marketing Carrier Code"},"flight_number":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Flight Number"},"operating_carrier_name":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Operating Carrier Name"},"departure_airport":{"type":"string","title":"Departure Airport"},"departure_time_local":{"type":"string","title":"Departure Time Local"},"departure_timezone":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Departure Timezone"},"departure_time_utc":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Departure Time Utc"},"arrival_airport":{"type":"string","title":"Arrival Airport"},"arrival_time_local":{"type":"string","title":"Arrival Time Local"},"arrival_timezone":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Arrival Timezone"},"arrival_time_utc":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Arrival Time Utc"},"duration_minutes":{"type":"integer","title":"Duration Minutes"},"aircraft":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Aircraft"}},"additionalProperties":false,"type":"object","required":["marketing_carrier_code","flight_number","operating_carrier_name","departure_airport","departure_time_local","departure_timezone","departure_time_utc","arrival_airport","arrival_time_local","arrival_timezone","arrival_time_utc","duration_minutes","aircraft"],"title":"SegmentModel","x-ref":"#/components/schemas/SegmentModel"},"type":"array","title":"Segments"}},"additionalProperties":false,"type":"object","required":["segments"],"title":"LegModel","x-ref":"#/components/schemas/LegModel"},"type":"array","title":"Legs"},"cabin_class":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Cabin Class"},"bags":{"anyOf":[{"properties":{"carry_on":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Carry On"},"checked":{"anyOf":[{"type":"integer"},{"type":"null"}],"title":"Checked"}},"additionalProperties":false,"type":"object","title":"BaggageAllowanceModel","x-ref":"#/components/schemas/BaggageAllowanceModel"},{"type":"null"}]},"requires_self_transfer":{"anyOf":[{"type":"boolean"},{"type":"null"}],"title":"Requires Self Transfer"},"ignav_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Ignav Id"}},"additionalProperties":false,"type":"object","required":["price","legs"],"title":"SearchItineraryModel","x-ref":"#/components/schemas/SearchItineraryModel"},"type":"array","title":"Itineraries","key$":"itineraries"}},"additionalProperties":false,"type":"object","required":["legs","itineraries"],"title":"FareSearchModel","x-ref":"#/components/schemas/FareSearchModel","index$":0}}}},"400":{"description":"Bad Request","content":{"application/json":{"schema":{"properties":{"error":{"properties":{"type":{"type":"string","title":"Type"},"code":{"type":"string","title":"Code"},"message":{"type":"string","title":"Message"},"field":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Field"}},"additionalProperties":false,"type":"object","required":["type","code","message"],"title":"ErrorDetailModel","x-ref":"#/components/schemas/ErrorDetailModel"}},"additionalProperties":false,"type":"object","required":["error"],"title":"ErrorResponseModel","x-ref":"#/components/schemas/ErrorResponseModel"}}}},"401":{"description":"Unauthorized","content":{"application/json":{"schema":{"properties":{"error":{"properties":{"type":{"type":"string","title":"Type"},"code":{"type":"string","title":"Code"},"message":{"type":"string","title":"Message"},"field":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Field"}},"additionalProperties":false,"type":"object","required":["type","code","message"],"title":"ErrorDetailModel","x-ref":"#/components/schemas/ErrorDetailModel"}},"additionalProperties":false,"type":"object","required":["error"],"title":"ErrorResponseModel","x-ref":"#/components/schemas/ErrorResponseModel"}}}},"424":{"description":"Failed Dependency","content":{"application/json":{"schema":{"properties":{"error":{"properties":{"type":{"type":"string","title":"Type"},"code":{"type":"string","title":"Code"},"message":{"type":"string","title":"Message"},"field":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Field"}},"additionalProperties":false,"type":"object","required":["type","code","message"],"title":"ErrorDetailModel","x-ref":"#/components/schemas/ErrorDetailModel"}},"additionalProperties":false,"type":"object","required":["error"],"title":"ErrorResponseModel","x-ref":"#/components/schemas/ErrorResponseModel"}}}}},"parameters":[],"security":[{"ApiKeyAuth":[]}],"securitySource":"definition","securitySchemes":{"ApiKeyAuth":{"type":"apiKey","in":"header","name":"X-Api-Key"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const fare_search_model_ref01_ent = client.FareSearchModel()
    let fare_search_model_ref01_data = setup.data.new.fare_search_model['fare_search_model_ref01']

    fare_search_model_ref01_data = (await fare_search_model_ref01_ent.create(fare_search_model_ref01_data)).data()
    assert(null != fare_search_model_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fare_search_model/FareSearchModelTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = IgnavFlightSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['fare_search_model01','fare_search_model02','fare_search_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID': idmap,
    'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
    'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
    'IGNAV_FLIGHT_APIKEY': '',
  })

  idmap = env['IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID']

  const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new IgnavFlightSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
