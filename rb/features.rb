# IgnavFlight SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IgnavFlightFeatures
  def self.make_feature(name)
    case name
    when "base"
      IgnavFlightBaseFeature.new
    when "test"
      IgnavFlightTestFeature.new
    else
      IgnavFlightBaseFeature.new
    end
  end
end
