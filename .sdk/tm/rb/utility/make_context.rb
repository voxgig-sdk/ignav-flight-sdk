# IgnavFlight SDK utility: make_context
require_relative '../core/context'
module IgnavFlightUtilities
  MakeContext = ->(ctxmap, basectx) {
    IgnavFlightContext.new(ctxmap, basectx)
  }
end
