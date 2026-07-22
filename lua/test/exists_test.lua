-- IgnavFlight SDK exists test

local sdk = require("ignav-flight_sdk")

describe("IgnavFlightSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
