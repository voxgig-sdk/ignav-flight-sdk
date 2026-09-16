

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"adults","req":false,"type":"`$ANY`","index$":0},{"active":true,"name":"children","req":false,"type":"`$ANY`","index$":1},{"active":true,"name":"departure_date","req":false,"type":"`$ANY`","index$":2},{"active":true,"name":"destination","req":false,"type":"`$ANY`","index$":3},{"active":true,"name":"ignav_id","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"inbound_carrier_code","req":false,"type":"`$ANY`","index$":5},{"active":true,"name":"inbound_flight_number","req":false,"type":"`$INTEGER`","index$":6},{"active":true,"name":"infants_in_seat","req":false,"type":"`$ANY`","index$":7},{"active":true,"name":"infants_on_lap","req":false,"type":"`$ANY`","index$":8},{"active":true,"name":"market","req":false,"type":"`$ANY`","index$":9},{"active":true,"name":"origin","req":false,"type":"`$ANY`","index$":10},{"active":true,"name":"outbound_carrier_code","req":false,"type":"`$ANY`","index$":11},{"active":true,"name":"outbound_flight_number","req":false,"type":"`$INTEGER`","index$":12},{"active":true,"name":"return_date","req":false,"type":"`$ANY`","index$":13}],"name":"booking_link","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/fares/booking-links","json":"{\"operationId\":\"get_booking_links_api_fares_booking_links_post\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"adults\":{\"anyOf\":[{\"minimum\":1,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Adults\"},\"children\":{\"anyOf\":[{\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Children\"},\"departure_date\":{\"anyOf\":[{\"format\":\"date\",\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Date\"},\"destination\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Destination\"},\"ignav_id\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Ignav Id\"},\"inbound_carrier_code\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Inbound Carrier Code\"},\"inbound_flight_number\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Inbound Flight Number\"},\"infants_in_seat\":{\"anyOf\":[{\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Infants In Seat\"},\"infants_on_lap\":{\"anyOf\":[{\"minimum\":0,\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Infants On Lap\"},\"market\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Market\"},\"origin\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Origin\"},\"outbound_carrier_code\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Outbound Carrier Code\"},\"outbound_flight_number\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Outbound Flight Number\"},\"return_date\":{\"anyOf\":[{\"format\":\"date\",\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Return Date\"}},\"title\":\"BookingLinksRequest\",\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"booking_options\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"legs\":{\"items\":{\"enum\":[\"outbound\",\"inbound\"],\"type\":\"string\"},\"title\":\"Legs\",\"type\":\"array\"},\"links\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"fare_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Fare Name\"},\"price\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"amount\":{\"title\":\"Amount\",\"type\":\"number\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"status\":{\"enum\":[\"verified\",\"unverified\"],\"title\":\"Status\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\",\"status\"],\"title\":\"PriceModel\",\"type\":\"object\"},{\"type\":\"null\"}]},\"provider_name\":{\"title\":\"Provider Name\",\"type\":\"string\"},\"provider_type\":{\"enum\":[\"airline\",\"third_party\"],\"title\":\"Provider Type\",\"type\":\"string\"},\"url\":{\"title\":\"Url\",\"type\":\"string\"}},\"required\":[\"provider_name\",\"url\",\"provider_type\"],\"title\":\"BookingLinkModel\",\"type\":\"object\"},\"title\":\"Links\",\"type\":\"array\"}},\"required\":[\"legs\",\"links\"],\"title\":\"BookingOptionModel\",\"type\":\"object\"},\"title\":\"Booking Options\",\"type\":\"array\"},\"itinerary\":{\"additionalProperties\":false,\"properties\":{\"bags\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"carry_on\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Carry On\"},\"checked\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Checked\"}},\"title\":\"BaggageAllowanceModel\",\"type\":\"object\"},{\"type\":\"null\"}]},\"cabin_class\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Cabin Class\"},\"inbound\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"carrier\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Carrier\"},\"duration_minutes\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Duration Minutes\"},\"segments\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"aircraft\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Aircraft\"},\"arrival_airport\":{\"title\":\"Arrival Airport\",\"type\":\"string\"},\"arrival_time_local\":{\"title\":\"Arrival Time Local\",\"type\":\"string\"},\"arrival_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Time Utc\"},\"arrival_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Timezone\"},\"departure_airport\":{\"title\":\"Departure Airport\",\"type\":\"string\"},\"departure_time_local\":{\"title\":\"Departure Time Local\",\"type\":\"string\"},\"departure_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Time Utc\"},\"departure_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Timezone\"},\"duration_minutes\":{\"title\":\"Duration Minutes\",\"type\":\"integer\"},\"flight_number\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Flight Number\"},\"marketing_carrier_code\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Marketing Carrier Code\"},\"operating_carrier_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Operating Carrier Name\"}},\"required\":[\"marketing_carrier_code\",\"flight_number\",\"operating_carrier_name\",\"departure_airport\",\"departure_time_local\",\"departure_timezone\",\"departure_time_utc\",\"arrival_airport\",\"arrival_time_local\",\"arrival_timezone\",\"arrival_time_utc\",\"duration_minutes\",\"aircraft\"],\"title\":\"SegmentModel\",\"type\":\"object\"},\"title\":\"Segments\",\"type\":\"array\"}},\"required\":[\"segments\"],\"title\":\"LegModel\",\"type\":\"object\"},{\"type\":\"null\"}]},\"outbound\":{\"additionalProperties\":false,\"properties\":{\"carrier\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Carrier\"},\"duration_minutes\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Duration Minutes\"},\"segments\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"aircraft\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Aircraft\"},\"arrival_airport\":{\"title\":\"Arrival Airport\",\"type\":\"string\"},\"arrival_time_local\":{\"title\":\"Arrival Time Local\",\"type\":\"string\"},\"arrival_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Time Utc\"},\"arrival_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Timezone\"},\"departure_airport\":{\"title\":\"Departure Airport\",\"type\":\"string\"},\"departure_time_local\":{\"title\":\"Departure Time Local\",\"type\":\"string\"},\"departure_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Time Utc\"},\"departure_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Timezone\"},\"duration_minutes\":{\"title\":\"Duration Minutes\",\"type\":\"integer\"},\"flight_number\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Flight Number\"},\"marketing_carrier_code\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Marketing Carrier Code\"},\"operating_carrier_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Operating Carrier Name\"}},\"required\":[\"marketing_carrier_code\",\"flight_number\",\"operating_carrier_name\",\"departure_airport\",\"departure_time_local\",\"departure_timezone\",\"departure_time_utc\",\"arrival_airport\",\"arrival_time_local\",\"arrival_timezone\",\"arrival_time_utc\",\"duration_minutes\",\"aircraft\"],\"title\":\"SegmentModel\",\"type\":\"object\"},\"title\":\"Segments\",\"type\":\"array\"}},\"required\":[\"segments\"],\"title\":\"LegModel\",\"type\":\"object\"},\"price\":{\"additionalProperties\":false,\"properties\":{\"amount\":{\"title\":\"Amount\",\"type\":\"number\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"status\":{\"enum\":[\"verified\",\"unverified\"],\"title\":\"Status\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\",\"status\"],\"title\":\"PriceModel\",\"type\":\"object\"},\"requires_self_transfer\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"title\":\"Requires Self Transfer\"}},\"required\":[\"price\",\"outbound\"],\"title\":\"BookingItineraryModel\",\"type\":\"object\"}},\"required\":[\"itinerary\",\"booking_options\"],\"title\":\"BookingOptionsResponseModel\",\"type\":\"object\"},{\"additionalProperties\":false,\"properties\":{\"booking_options\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"leg_indexes\":{\"items\":{\"type\":\"integer\"},\"title\":\"Leg Indexes\",\"type\":\"array\"},\"links\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"fare_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Fare Name\"},\"price\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"amount\":{\"title\":\"Amount\",\"type\":\"number\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"status\":{\"enum\":[\"verified\",\"unverified\"],\"title\":\"Status\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\",\"status\"],\"title\":\"PriceModel\",\"type\":\"object\"},{\"type\":\"null\"}]},\"provider_name\":{\"title\":\"Provider Name\",\"type\":\"string\"},\"provider_type\":{\"enum\":[\"airline\",\"third_party\"],\"title\":\"Provider Type\",\"type\":\"string\"},\"url\":{\"title\":\"Url\",\"type\":\"string\"}},\"required\":[\"provider_name\",\"url\",\"provider_type\"],\"title\":\"BookingLinkModel\",\"type\":\"object\"},\"title\":\"Links\",\"type\":\"array\"}},\"required\":[\"leg_indexes\",\"links\"],\"title\":\"SearchBookingOptionModel\",\"type\":\"object\"},\"title\":\"Booking Options\",\"type\":\"array\"},\"itinerary\":{\"additionalProperties\":false,\"properties\":{\"bags\":{\"anyOf\":[{\"additionalProperties\":false,\"properties\":{\"carry_on\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Carry On\"},\"checked\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Checked\"}},\"title\":\"BaggageAllowanceModel\",\"type\":\"object\"},{\"type\":\"null\"}]},\"cabin_class\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Cabin Class\"},\"legs\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"carrier\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Carrier\"},\"duration_minutes\":{\"anyOf\":[{\"type\":\"integer\"},{\"type\":\"null\"}],\"title\":\"Duration Minutes\"},\"segments\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"aircraft\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Aircraft\"},\"arrival_airport\":{\"title\":\"Arrival Airport\",\"type\":\"string\"},\"arrival_time_local\":{\"title\":\"Arrival Time Local\",\"type\":\"string\"},\"arrival_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Time Utc\"},\"arrival_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Arrival Timezone\"},\"departure_airport\":{\"title\":\"Departure Airport\",\"type\":\"string\"},\"departure_time_local\":{\"title\":\"Departure Time Local\",\"type\":\"string\"},\"departure_time_utc\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Time Utc\"},\"departure_timezone\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Departure Timezone\"},\"duration_minutes\":{\"title\":\"Duration Minutes\",\"type\":\"integer\"},\"flight_number\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Flight Number\"},\"marketing_carrier_code\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Marketing Carrier Code\"},\"operating_carrier_name\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Operating Carrier Name\"}},\"required\":[\"marketing_carrier_code\",\"flight_number\",\"operating_carrier_name\",\"departure_airport\",\"departure_time_local\",\"departure_timezone\",\"departure_time_utc\",\"arrival_airport\",\"arrival_time_local\",\"arrival_timezone\",\"arrival_time_utc\",\"duration_minutes\",\"aircraft\"],\"title\":\"SegmentModel\",\"type\":\"object\"},\"title\":\"Segments\",\"type\":\"array\"}},\"required\":[\"segments\"],\"title\":\"LegModel\",\"type\":\"object\"},\"title\":\"Legs\",\"type\":\"array\"},\"price\":{\"additionalProperties\":false,\"properties\":{\"amount\":{\"title\":\"Amount\",\"type\":\"number\"},\"currency\":{\"title\":\"Currency\",\"type\":\"string\"},\"status\":{\"enum\":[\"verified\",\"unverified\"],\"title\":\"Status\",\"type\":\"string\"}},\"required\":[\"amount\",\"currency\",\"status\"],\"title\":\"PriceModel\",\"type\":\"object\"},\"requires_self_transfer\":{\"anyOf\":[{\"type\":\"boolean\"},{\"type\":\"null\"}],\"title\":\"Requires Self Transfer\"}},\"required\":[\"price\",\"legs\"],\"title\":\"SearchBookingItineraryModel\",\"type\":\"object\"}},\"required\":[\"itinerary\",\"booking_options\"],\"title\":\"SearchBookingOptionsResponseModel\",\"type\":\"object\"}],\"title\":\"Response Get Booking Links Api Fares Booking Links Post\"}}},\"description\":\"Successful Response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Not Found\"},\"424\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":false,\"properties\":{\"error\":{\"additionalProperties\":false,\"properties\":{\"code\":{\"title\":\"Code\",\"type\":\"string\"},\"field\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"null\"}],\"title\":\"Field\"},\"message\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Type\",\"type\":\"string\"}},\"required\":[\"type\",\"code\",\"message\"],\"title\":\"ErrorDetailModel\",\"type\":\"object\"}},\"required\":[\"error\"],\"title\":\"ErrorResponseModel\",\"type\":\"object\"}}},\"description\":\"Failed Dependency\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"in\":\"header\",\"name\":\"X-Api-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/fares/booking-links","segments":[{"lit":"api"},{"lit":"fares"},{"lit":"booking-links"}],"select":{},"transform":{"req":{"adults":"`reqdata.adult`","children":"`reqdata.child`","departure_date":"`reqdata.departure_date`","destination":"`reqdata.destination`","ignav_id":"`reqdata.ignav_id`","inbound_carrier_code":"`reqdata.inbound_carrier_code`","inbound_flight_number":"`reqdata.inbound_flight_number`","infants_in_seat":"`reqdata.infants_in_seat`","infants_on_lap":"`reqdata.infants_on_lap`","market":"`reqdata.market`","origin":"`reqdata.origin`","outbound_carrier_code":"`reqdata.outbound_carrier_code`","outbound_flight_number":"`reqdata.outbound_flight_number`","return_date":"`reqdata.return_date`"},"res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"booking_link","name__orig":"booking_link","Name":"BookingLink","name_":"booking_link","name-":"booking-link","NAME":"BOOKING_LINK","index$":1}, {"active":true,"entity":"booking_link","key$":"BasicBookingLinkFlow","kind":"basic","name":"BasicBookingLinkFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"booking_link_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'BookingLink')
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
  
