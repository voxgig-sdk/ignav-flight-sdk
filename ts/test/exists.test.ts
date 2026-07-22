
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IgnavFlightSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await IgnavFlightSDK.test()
    equal(null !== testsdk, true)
  })

})
