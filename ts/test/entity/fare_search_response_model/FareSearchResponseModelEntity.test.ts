

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { IgnavFlightSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('FareSearchResponseModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IGNAV_FLIGHT_TEST_LIVE=TRUE.
  afterEach(liveDelay('IGNAV_FLIGHT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IgnavFlightSDK.test()
    const ent = testsdk.FareSearchResponseModel()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = IgnavFlightSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.FareSearchResponseModel().create({"adults":"x","departure_date":"x","destination":"x","origin":"x","return_date":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fare_search_response_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adults":{"a":true,"h":"Adults","n":"adults","r":false,"t":"`$INTEGER`","key$":"adults","index$":0},"airlines_exclude":{"a":true,"h":"Airlines Exclude","n":"airlines_exclude","r":false,"t":"`$ANY`","key$":"airlines_exclude","index$":1},"airlines_include":{"a":true,"h":"Airlines Include","n":"airlines_include","r":false,"t":"`$ANY`","key$":"airlines_include","index$":2},"allow_self_transfer":{"a":true,"h":"Allow Self Transfer","n":"allow_self_transfer","r":false,"t":"`$BOOLEAN`","key$":"allow_self_transfer","index$":3},"cabin_class":{"a":true,"h":"Cabin Class","n":"cabin_class","r":false,"t":"`$STRING`","key$":"cabin_class","index$":4},"children":{"a":true,"h":"Children","n":"children","r":false,"t":"`$INTEGER`","key$":"children","index$":5},"departure_date":{"a":true,"fo":"date","h":"Departure Date","n":"departure_date","r":true,"t":"`$STRING`","key$":"departure_date","index$":6},"departure_time_range":{"a":true,"h":"Departure Time Range","n":"departure_time_range","r":false,"t":"`$ANY`","key$":"departure_time_range","index$":7},"destination":{"a":true,"h":"Destination","n":"destination","r":true,"t":"`$STRING`","key$":"destination","index$":8},"infants_in_seat":{"a":true,"h":"Infants In Seat","n":"infants_in_seat","r":false,"t":"`$INTEGER`","key$":"infants_in_seat","index$":9},"infants_on_lap":{"a":true,"h":"Infants On Lap","n":"infants_on_lap","r":false,"t":"`$INTEGER`","key$":"infants_on_lap","index$":10},"itineraries":{"a":true,"h":"Itineraries","n":"itineraries","r":true,"t":"`$ARRAY`","key$":"itineraries","index$":11},"market":{"a":true,"h":"Market","n":"market","r":false,"t":"`$STRING`","key$":"market","index$":12},"max_price":{"a":true,"h":"Max Price","n":"max_price","r":false,"t":"`$ANY`","key$":"max_price","index$":13},"max_stops":{"a":true,"h":"Max Stops","n":"max_stops","r":false,"t":"`$ANY`","key$":"max_stops","index$":14},"min_carry_on_bags":{"a":true,"h":"Min Carry On Bags","n":"min_carry_on_bags","r":false,"t":"`$ANY`","key$":"min_carry_on_bags","index$":15},"min_checked_bags":{"a":true,"h":"Min Checked Bags","n":"min_checked_bags","r":false,"t":"`$ANY`","key$":"min_checked_bags","index$":16},"origin":{"a":true,"h":"Origin","n":"origin","r":true,"t":"`$STRING`","key$":"origin","index$":17},"return_date":{"a":true,"h":"Return Date","n":"return_date","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$ANY`","key$":"return_date","index$":18},"return_time_range":{"a":true,"h":"Return Time Range","n":"return_time_range","r":false,"t":"`$ANY`","key$":"return_time_range","index$":19}},"name":"fare_search_response_model","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["adults","airlines_exclude","airlines_include","allow_self_transfer","cabin_class","children","departure_date","departure_time_range","destination","infants_in_seat","infants_on_lap","market","max_price","max_stops","min_carry_on_bags","min_checked_bags","origin"],"co":{"id":"POST /api/fares/one-way","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/fares/one-way","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"fares"},{"lit":"one-way"}],"t":{"req":{"adults":"`reqdata.adult`","airlines_exclude":"`reqdata.airlines_exclude`","airlines_include":"`reqdata.airlines_include`","allow_self_transfer":"`reqdata.allow_self_transfer`","cabin_class":"`reqdata.cabin_class`","children":"`reqdata.child`","departure_date":"`reqdata.departure_date`","departure_time_range":"`reqdata.departure_time_range`","destination":"`reqdata.destination`","infants_in_seat":"`reqdata.infants_in_seat`","infants_on_lap":"`reqdata.infants_on_lap`","market":"`reqdata.market`","max_price":"`reqdata.max_price`","max_stops":"`reqdata.max_stop`","min_carry_on_bags":"`reqdata.min_carry_on_bag`","min_checked_bags":"`reqdata.min_checked_bag`","origin":"`reqdata.origin`"},"res":"`body`"},"index$":0},{"a":true,"bf":["adults","airlines_exclude","airlines_include","allow_self_transfer","cabin_class","children","departure_date","departure_time_range","destination","infants_in_seat","infants_on_lap","market","max_price","max_stops","min_carry_on_bags","min_checked_bags","origin","return_date","return_time_range"],"co":{"id":"POST /api/fares/round-trip","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/fares/round-trip","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"api"},{"lit":"fares"},{"lit":"round-trip"}],"t":{"req":{"adults":"`reqdata.adult`","airlines_exclude":"`reqdata.airlines_exclude`","airlines_include":"`reqdata.airlines_include`","allow_self_transfer":"`reqdata.allow_self_transfer`","cabin_class":"`reqdata.cabin_class`","children":"`reqdata.child`","departure_date":"`reqdata.departure_date`","departure_time_range":"`reqdata.departure_time_range`","destination":"`reqdata.destination`","infants_in_seat":"`reqdata.infants_in_seat`","infants_on_lap":"`reqdata.infants_on_lap`","market":"`reqdata.market`","max_price":"`reqdata.max_price`","max_stops":"`reqdata.max_stop`","min_carry_on_bags":"`reqdata.min_carry_on_bag`","min_checked_bags":"`reqdata.min_checked_bag`","origin":"`reqdata.origin`","return_date":"`reqdata.return_date`","return_time_range":"`reqdata.return_time_range`"},"res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"fare_search_response_model","name__orig":"fare_search_response_model","Name":"FareSearchResponseModel","name_":"fare_search_response_model","name-":"fare-search-response-model","NAME":"FARE_SEARCH_RESPONSE_MODEL","index$":3}, {"active":true,"entity":"fare_search_response_model","key$":"BasicFareSearchResponseModelFlow","kind":"basic","name":"BasicFareSearchResponseModelFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"fare_search_response_model_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'FareSearchResponseModel', {"POST /api/fares/one-way":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"origin":{"type":"string","title":"Origin","key$":"origin"},"destination":{"type":"string","title":"Destination","key$":"destination"},"departure_date":{"type":"string","format":"date","title":"Departure Date","key$":"departure_date"},"adults":{"type":"integer","minimum":1,"title":"Adults","default":1,"key$":"adults"},"children":{"type":"integer","minimum":0,"title":"Children","default":0,"key$":"children"},"infants_in_seat":{"type":"integer","minimum":0,"title":"Infants In Seat","default":0,"key$":"infants_in_seat"},"infants_on_lap":{"type":"integer","minimum":0,"title":"Infants On Lap","default":0,"key$":"infants_on_lap"},"cabin_class":{"type":"string","enum":["economy","premium_economy","business","first"],"title":"Cabin Class","default":"economy","key$":"cabin_class"},"max_stops":{"anyOf":[{"type":"integer","maximum":2,"minimum":0},{"type":"null"}],"title":"Max Stops","key$":"max_stops"},"min_carry_on_bags":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Min Carry On Bags","key$":"min_carry_on_bags"},"min_checked_bags":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Min Checked Bags","key$":"min_checked_bags"},"max_price":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Max Price","key$":"max_price"},"departure_time_range":{"anyOf":[{"properties":{"earliest_hour":{},"latest_hour":{},"arrival_earliest_hour":{},"arrival_latest_hour":{}},"additionalProperties":false,"type":"object","title":"TimeRangeInput","x-ref":"#/components/schemas/TimeRangeInput"},{"type":"null"}],"key$":"departure_time_range"},"airlines_include":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Airlines Include","key$":"airlines_include"},"airlines_exclude":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Airlines Exclude","key$":"airlines_exclude"},"allow_self_transfer":{"type":"boolean","title":"Allow Self Transfer","default":true,"key$":"allow_self_transfer"},"market":{"type":"string","title":"Market","default":"US","key$":"market"}},"additionalProperties":false,"type":"object","required":["origin","destination","departure_date"],"title":"OneWayRequest","x-ref":"#/components/schemas/OneWayRequest","index$":1}}},"required":true},"parameters":[]},"POST /api/fares/round-trip":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"origin":{"type":"string","title":"Origin","key$":"origin"},"destination":{"type":"string","title":"Destination","key$":"destination"},"departure_date":{"type":"string","format":"date","title":"Departure Date","key$":"departure_date"},"adults":{"type":"integer","minimum":1,"title":"Adults","default":1,"key$":"adults"},"children":{"type":"integer","minimum":0,"title":"Children","default":0,"key$":"children"},"infants_in_seat":{"type":"integer","minimum":0,"title":"Infants In Seat","default":0,"key$":"infants_in_seat"},"infants_on_lap":{"type":"integer","minimum":0,"title":"Infants On Lap","default":0,"key$":"infants_on_lap"},"cabin_class":{"type":"string","enum":["economy","premium_economy","business","first"],"title":"Cabin Class","default":"economy","key$":"cabin_class"},"max_stops":{"anyOf":[{"type":"integer","maximum":2,"minimum":0},{"type":"null"}],"title":"Max Stops","key$":"max_stops"},"min_carry_on_bags":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Min Carry On Bags","key$":"min_carry_on_bags"},"min_checked_bags":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Min Checked Bags","key$":"min_checked_bags"},"max_price":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Max Price","key$":"max_price"},"departure_time_range":{"anyOf":[{"properties":{"earliest_hour":{},"latest_hour":{},"arrival_earliest_hour":{},"arrival_latest_hour":{}},"additionalProperties":false,"type":"object","title":"TimeRangeInput","x-ref":"#/components/schemas/TimeRangeInput"},{"type":"null"}],"key$":"departure_time_range"},"airlines_include":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Airlines Include","key$":"airlines_include"},"airlines_exclude":{"anyOf":[{"items":{"type":"string"},"type":"array"},{"type":"null"}],"title":"Airlines Exclude","key$":"airlines_exclude"},"allow_self_transfer":{"type":"boolean","title":"Allow Self Transfer","default":true,"key$":"allow_self_transfer"},"market":{"type":"string","title":"Market","default":"US","key$":"market"},"return_date":{"title":"Return Date","type":"string","format":"date","key$":"return_date"},"return_time_range":{"anyOf":[{"properties":{"earliest_hour":{},"latest_hour":{},"arrival_earliest_hour":{},"arrival_latest_hour":{}},"additionalProperties":false,"type":"object","title":"TimeRangeInput","x-ref":"#/components/schemas/TimeRangeInput"},{"type":"null"}],"key$":"return_time_range"}},"additionalProperties":false,"type":"object","required":["origin","destination","departure_date","return_date"],"title":"RoundTripRequest","x-ref":"#/components/schemas/RoundTripRequest","index$":1}}},"required":true},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const fare_search_response_model_ref01_ent = client.FareSearchResponseModel()
    let fare_search_response_model_ref01_data = setup.data.new.fare_search_response_model['fare_search_response_model_ref01']

    fare_search_response_model_ref01_data = (await fare_search_response_model_ref01_ent.create(fare_search_response_model_ref01_data)).data()
    assert(null != fare_search_response_model_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fare_search_response_model/FareSearchResponseModelTestData.json')

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
    ['fare_search_response_model01','fare_search_response_model02','fare_search_response_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID': idmap,
    'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
    'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
    'IGNAV_FLIGHT_APIKEY': '',
  })

  idmap = env['IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID']

  const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID']
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
  
