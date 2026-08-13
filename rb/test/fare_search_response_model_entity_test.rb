# FareSearchResponseModel entity test

require "minitest/autorun"
require "json"
require_relative "../IgnavFlight_sdk"
require_relative "runner"

class FareSearchResponseModelEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IgnavFlightSDK.test(nil, nil)
    ent = testsdk.FareSearchResponseModel(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = fare_search_response_model_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "fare_search_response_model." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    fare_search_response_model_ref01_ent = client.FareSearchResponseModel(nil)
    fare_search_response_model_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.fare_search_response_model"), "fare_search_response_model_ref01"))

    fare_search_response_model_ref01_data_result = fare_search_response_model_ref01_ent.create(fare_search_response_model_ref01_data, nil)
    fare_search_response_model_ref01_data = Helpers.to_map(fare_search_response_model_ref01_data_result.respond_to?(:data_get) ? fare_search_response_model_ref01_data_result.data_get : fare_search_response_model_ref01_data_result)
    assert !fare_search_response_model_ref01_data.nil?

  end
end

def fare_search_response_model_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "fare_search_response_model", "FareSearchResponseModelTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IgnavFlightSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["fare_search_response_model01", "fare_search_response_model02", "fare_search_response_model03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID" => idmap,
    "IGNAV_FLIGHT_TEST_LIVE" => "FALSE",
    "IGNAV_FLIGHT_TEST_EXPLAIN" => "FALSE",
    "IGNAV_FLIGHT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IGNAV_FLIGHT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["IGNAV_FLIGHT_APIKEY"],
      },
      extra || {},
    ])
    client = IgnavFlightSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IGNAV_FLIGHT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IGNAV_FLIGHT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
