# BookingLink entity test

require "minitest/autorun"
require "json"
require_relative "../IgnavFlight_sdk"
require_relative "runner"

class BookingLinkEntityTest < Minitest::Test
  def test_create_instance
    testsdk = IgnavFlightSDK.test(nil, nil)
    ent = testsdk.BookingLink(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = booking_link_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "booking_link." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    booking_link_ref01_ent = client.BookingLink(nil)
    booking_link_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.booking_link"), "booking_link_ref01"))

    booking_link_ref01_data_result = booking_link_ref01_ent.create(booking_link_ref01_data, nil)
    booking_link_ref01_data = Helpers.to_map(booking_link_ref01_data_result)
    assert !booking_link_ref01_data.nil?

  end
end

def booking_link_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "booking_link", "BookingLinkTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = IgnavFlightSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["booking_link01", "booking_link02", "booking_link03"],
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
  entid_env_raw = ENV["IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID" => idmap,
    "IGNAVFLIGHT_TEST_LIVE" => "FALSE",
    "IGNAVFLIGHT_TEST_EXPLAIN" => "FALSE",
    "IGNAVFLIGHT_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["IGNAVFLIGHT_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["IGNAVFLIGHT_APIKEY"],
      },
      extra || {},
    ])
    client = IgnavFlightSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["IGNAVFLIGHT_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["IGNAVFLIGHT_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
