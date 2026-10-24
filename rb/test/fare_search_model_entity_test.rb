# FareSearchModel entity test

require "minitest/autorun"
require "json"
require_relative "../IgnavFlight_sdk"
require_relative "runner"

class FareSearchModelEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = IgnavFlightSDK.test(nil, nil)
    ent = testsdk.FareSearchModel(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = IgnavFlightConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = IgnavFlightSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.FareSearchModel(nil).create({ "adults" => "x", "legs" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = fare_search_model_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "fare_search_model." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # CREATE
    fare_search_model_ref01_ent = client.FareSearchModel(nil)
    fare_search_model_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.fare_search_model"), "fare_search_model_ref01"))

    fare_search_model_ref01_data_result = fare_search_model_ref01_ent.create(fare_search_model_ref01_data, nil)
    fare_search_model_ref01_data = Helpers.to_map(fare_search_model_ref01_data_result.respond_to?(:data_get) ? fare_search_model_ref01_data_result.data_get : fare_search_model_ref01_data_result)
    assert !fare_search_model_ref01_data.nil?

  end
end

def fare_search_model_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "fare_search_model", "FareSearchModelTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IgnavFlightSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["fare_search_model01", "fare_search_model02", "fare_search_model03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID" => idmap,
    "IGNAV_FLIGHT_TEST_LIVE" => "FALSE",
    "IGNAV_FLIGHT_TEST_EXPLAIN" => "FALSE",
    "IGNAV_FLIGHT_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["IGNAV_FLIGHT_TEST_FARE_SEARCH_MODEL_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IGNAV_FLIGHT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
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
