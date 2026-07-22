
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { IgnavFlightSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('FareSearchResponseModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when IGNAVFLIGHT_TEST_LIVE=TRUE.
  afterEach(liveDelay('IGNAVFLIGHT_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = IgnavFlightSDK.test()
    const ent = testsdk.FareSearchResponseModel()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.IGNAV_FLIGHT_TEST_LIVE
    for (const op of ['create']) {
      if (maybeSkipControl(t, 'entityOp', 'fare_search_response_model.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const fare_search_response_model_ref01_ent = client.FareSearchResponseModel()
    let fare_search_response_model_ref01_data = setup.data.new.fare_search_response_model['fare_search_response_model_ref01']

    fare_search_response_model_ref01_data = await fare_search_response_model_ref01_ent.create(fare_search_response_model_ref01_data)
    assert(null != fare_search_response_model_ref01_data)


  })
})



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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID': idmap,
    'IGNAV_FLIGHT_TEST_LIVE': 'FALSE',
    'IGNAV_FLIGHT_TEST_EXPLAIN': 'FALSE',
    'IGNAV_FLIGHT_APIKEY': 'NONE',
  })

  idmap = env['IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID']

  const live = 'TRUE' === env.IGNAV_FLIGHT_TEST_LIVE

  if (live) {
    client = new IgnavFlightSDK(merge([
      {
        apikey: env.IGNAV_FLIGHT_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
