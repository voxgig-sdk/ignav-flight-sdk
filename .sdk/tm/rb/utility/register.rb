# IgnavFlight SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IgnavFlightUtility.registrar = ->(u) {
  u.clean = IgnavFlightUtilities::Clean
  u.done = IgnavFlightUtilities::Done
  u.make_error = IgnavFlightUtilities::MakeError
  u.feature_add = IgnavFlightUtilities::FeatureAdd
  u.feature_hook = IgnavFlightUtilities::FeatureHook
  u.feature_init = IgnavFlightUtilities::FeatureInit
  u.fetcher = IgnavFlightUtilities::Fetcher
  u.make_fetch_def = IgnavFlightUtilities::MakeFetchDef
  u.make_context = IgnavFlightUtilities::MakeContext
  u.make_options = IgnavFlightUtilities::MakeOptions
  u.make_request = IgnavFlightUtilities::MakeRequest
  u.make_response = IgnavFlightUtilities::MakeResponse
  u.make_result = IgnavFlightUtilities::MakeResult
  u.make_point = IgnavFlightUtilities::MakePoint
  u.make_spec = IgnavFlightUtilities::MakeSpec
  u.make_url = IgnavFlightUtilities::MakeUrl
  u.param = IgnavFlightUtilities::Param
  u.prepare_auth = IgnavFlightUtilities::PrepareAuth
  u.prepare_body = IgnavFlightUtilities::PrepareBody
  u.prepare_headers = IgnavFlightUtilities::PrepareHeaders
  u.prepare_method = IgnavFlightUtilities::PrepareMethod
  u.prepare_params = IgnavFlightUtilities::PrepareParams
  u.prepare_path = IgnavFlightUtilities::PreparePath
  u.prepare_query = IgnavFlightUtilities::PrepareQuery
  u.result_basic = IgnavFlightUtilities::ResultBasic
  u.result_body = IgnavFlightUtilities::ResultBody
  u.result_headers = IgnavFlightUtilities::ResultHeaders
  u.transform_request = IgnavFlightUtilities::TransformRequest
  u.transform_response = IgnavFlightUtilities::TransformResponse
}
