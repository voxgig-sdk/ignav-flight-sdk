
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IgnavFlightSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IgnavFlightSDK.test()
    equal(testsdk instanceof IgnavFlightSDK, true,
      'IgnavFlightSDK.test() must return a client synchronously')
  })

})
