

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('AirportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IGNAV_FLIGHT_TEST_LIVE=TRUE.
  afterEach(liveDelay('IGNAV_FLIGHT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IgnavFlightSDK.test()
    const ent = testsdk.Airport()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'airport.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"city","req":true,"type":"`$STRING`","index$":0},{"active":true,"name":"code","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"country","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"name","req":true,"type":"`$STRING`","index$":3}],"name":"airport","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /api/airports","json":"{\"operationId\":\"search_airports_api_airports_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"q\",\"required\":true,\"schema\":{\"title\":\"Q\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":10,\"maximum\":20,\"minimum\":1,\"title\":\"Limit\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"city\":{\"title\":\"City\",\"type\":\"string\"},\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"country\":{\"title\":\"Country\",\"type\":\"string\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"}},\"required\":[\"code\",\"name\",\"city\",\"country\"],\"title\":\"AirportModel\",\"type\":\"object\"},\"title\":\"Response Search Airports Api Airports Get\",\"type\":\"array\"}}},\"description\":\"Successful Response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/airports","segments":[{"lit":"api"},{"lit":"airports"}],"select":{"exist":["limit","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"airport","name__orig":"airport","Name":"Airport","name_":"airport","name-":"airport","NAME":"AIRPORT","index$":0}, {"active":true,"entity":"airport","key$":"BasicAirportFlow","kind":"basic","name":"BasicAirportFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"airport_ref01"}}],"index$":0}]}, 'Airport')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let airport_ref01_data = Object.values(setup.data.existing.airport)[0] as any

    // LIST
    const airport_ref01_ent = client.Airport()
    const airport_ref01_match: any = {}

    const airport_ref01_list = (await airport_ref01_ent.list(airport_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/airport/AirportTestData.json')

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
    ['airport01','airport02','airport03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IGNAV_FLIGHT_TEST_AIRPORT_ENTID': idmap,
    'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
    'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
    'IGNAV_FLIGHT_APIKEY': '',
  })

  idmap = env['IGNAV_FLIGHT_TEST_AIRPORT_ENTID']

  const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IGNAV_FLIGHT_TEST_AIRPORT_ENTID']
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
  
