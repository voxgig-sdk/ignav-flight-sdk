-- IgnavFlight SDK error

local IgnavFlightError = {}
IgnavFlightError.__index = IgnavFlightError


function IgnavFlightError.new(code, msg, ctx)
  local self = setmetatable({}, IgnavFlightError)
  self.is_sdk_error = true
  self.sdk = "IgnavFlight"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function IgnavFlightError:error()
  return self.msg
end


function IgnavFlightError:__tostring()
  return self.msg
end


return IgnavFlightError
