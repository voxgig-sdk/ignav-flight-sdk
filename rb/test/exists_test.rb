# IgnavFlight SDK exists test

require "minitest/autorun"
require_relative "../IgnavFlight_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = IgnavFlightSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
