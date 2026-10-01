

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


describe('BookingLinkEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IGNAV_FLIGHT_TEST_LIVE=TRUE.
  afterEach(liveDelay('IGNAV_FLIGHT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IgnavFlightSDK.test()
    const ent = testsdk.BookingLink()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'booking_link.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adults":{"a":true,"h":"Adults","n":"adults","r":false,"t":"`$ANY`","key$":"adults","index$":0},"children":{"a":true,"h":"Children","n":"children","r":false,"t":"`$ANY`","key$":"children","index$":1},"departure_date":{"a":true,"h":"Departure Date","n":"departure_date","r":false,"t":"`$ANY`","key$":"departure_date","index$":2},"destination":{"a":true,"h":"Destination","n":"destination","r":false,"t":"`$ANY`","key$":"destination","index$":3},"ignav_id":{"a":true,"h":"Ignav Id","n":"ignav_id","r":false,"t":"`$STRING`","key$":"ignav_id","index$":4},"inbound_carrier_code":{"a":true,"h":"Inbound Carrier Code","n":"inbound_carrier_code","r":false,"t":"`$ANY`","key$":"inbound_carrier_code","index$":5},"inbound_flight_number":{"a":true,"h":"Inbound Flight Number","n":"inbound_flight_number","r":false,"t":"`$INTEGER`","key$":"inbound_flight_number","index$":6},"infants_in_seat":{"a":true,"h":"Infants In Seat","n":"infants_in_seat","r":false,"t":"`$ANY`","key$":"infants_in_seat","index$":7},"infants_on_lap":{"a":true,"h":"Infants On Lap","n":"infants_on_lap","r":false,"t":"`$ANY`","key$":"infants_on_lap","index$":8},"market":{"a":true,"h":"Market","n":"market","r":false,"t":"`$ANY`","key$":"market","index$":9},"origin":{"a":true,"h":"Origin","n":"origin","r":false,"t":"`$ANY`","key$":"origin","index$":10},"outbound_carrier_code":{"a":true,"h":"Outbound Carrier Code","n":"outbound_carrier_code","r":false,"t":"`$ANY`","key$":"outbound_carrier_code","index$":11},"outbound_flight_number":{"a":true,"h":"Outbound Flight Number","n":"outbound_flight_number","r":false,"t":"`$INTEGER`","key$":"outbound_flight_number","index$":12},"return_date":{"a":true,"h":"Return Date","n":"return_date","r":false,"t":"`$ANY`","key$":"return_date","index$":13}},"name":"booking_link","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/fares/booking-links","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/fares/booking-links","q":{},"r":{},"s":[{"lit":"api"},{"lit":"fares"},{"lit":"booking-links"}],"t":{"req":{"adults":"`reqdata.adult`","children":"`reqdata.child`","departure_date":"`reqdata.departure_date`","destination":"`reqdata.destination`","ignav_id":"`reqdata.ignav_id`","inbound_carrier_code":"`reqdata.inbound_carrier_code`","inbound_flight_number":"`reqdata.inbound_flight_number`","infants_in_seat":"`reqdata.infants_in_seat`","infants_on_lap":"`reqdata.infants_on_lap`","market":"`reqdata.market`","origin":"`reqdata.origin`","outbound_carrier_code":"`reqdata.outbound_carrier_code`","outbound_flight_number":"`reqdata.outbound_flight_number`","return_date":"`reqdata.return_date`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"booking_link","name__orig":"booking_link","Name":"BookingLink","name_":"booking_link","name-":"booking-link","NAME":"BOOKING_LINK","index$":1}, {"active":true,"entity":"booking_link","key$":"BasicBookingLinkFlow","kind":"basic","name":"BasicBookingLinkFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"booking_link_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BookingLink', {"POST /api/fares/booking-links":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"properties":{"ignav_id":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Ignav Id","key$":"ignav_id"},"origin":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Origin","key$":"origin"},"destination":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Destination","key$":"destination"},"departure_date":{"anyOf":[{"type":"string","format":"date"},{"type":"null"}],"title":"Departure Date","key$":"departure_date"},"outbound_carrier_code":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Outbound Carrier Code","key$":"outbound_carrier_code"},"outbound_flight_number":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Outbound Flight Number","key$":"outbound_flight_number"},"return_date":{"anyOf":[{"type":"string","format":"date"},{"type":"null"}],"title":"Return Date","key$":"return_date"},"inbound_carrier_code":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Inbound Carrier Code","key$":"inbound_carrier_code"},"inbound_flight_number":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Inbound Flight Number","key$":"inbound_flight_number"},"adults":{"anyOf":[{"type":"integer","minimum":1},{"type":"null"}],"title":"Adults","key$":"adults"},"children":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Children","key$":"children"},"infants_in_seat":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Infants In Seat","key$":"infants_in_seat"},"infants_on_lap":{"anyOf":[{"type":"integer","minimum":0},{"type":"null"}],"title":"Infants On Lap","key$":"infants_on_lap"},"market":{"anyOf":[{"type":"string"},{"type":"null"}],"title":"Market","key$":"market"}},"additionalProperties":false,"type":"object","title":"BookingLinksRequest","x-ref":"#/components/schemas/BookingLinksRequest","index$":1}}},"required":true},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const booking_link_ref01_ent = client.BookingLink()
    let booking_link_ref01_data = setup.data.new.booking_link['booking_link_ref01']

    booking_link_ref01_data = (await booking_link_ref01_ent.create(booking_link_ref01_data)).data()
    assert(null != booking_link_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/booking_link/BookingLinkTestData.json')

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
    ['booking_link01','booking_link02','booking_link03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID': idmap,
    'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
    'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
    'IGNAV_FLIGHT_APIKEY': '',
  })

  idmap = env['IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID']

  const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID']
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
  
