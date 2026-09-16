# IgnavFlight SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IgnavFlightFeatures
  def self.make_feature(name)
    case name
    when "base"
      IgnavFlightBaseFeature.new
    when "ratelimit"
      IgnavFlightRatelimitFeature.new
    when "retry"
      IgnavFlightRetryFeature.new
    when "test"
      IgnavFlightTestFeature.new
    when "timeout"
      IgnavFlightTimeoutFeature.new
    else
      IgnavFlightBaseFeature.new
    end
  end
end
