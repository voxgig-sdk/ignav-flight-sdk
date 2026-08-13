<?php
declare(strict_types=1);

// BookingLink entity test

require_once __DIR__ . '/../ignavflight_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BookingLinkEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = IgnavFlightSDK::test(null, null);
        $ent = $testsdk->BookingLink(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = booking_link_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "booking_link." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $booking_link_ref01_ent = $client->BookingLink(null);
        $booking_link_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.booking_link"), "booking_link_ref01"));

        $booking_link_ref01_data_result = $booking_link_ref01_ent->create($booking_link_ref01_data, null);
        $booking_link_ref01_data = Helpers::to_map(is_object($booking_link_ref01_data_result) && method_exists($booking_link_ref01_data_result, 'data_get') ? $booking_link_ref01_data_result->data_get() : $booking_link_ref01_data_result);
        $this->assertNotNull($booking_link_ref01_data);

    }
}

function booking_link_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/booking_link/BookingLinkTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = IgnavFlightSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["booking_link01", "booking_link02", "booking_link03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID" => $idmap,
        "IGNAV_FLIGHT_TEST_LIVE" => "FALSE",
        "IGNAV_FLIGHT_TEST_EXPLAIN" => "FALSE",
        "IGNAV_FLIGHT_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["IGNAV_FLIGHT_TEST_BOOKING_LINK_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["IGNAV_FLIGHT_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["IGNAV_FLIGHT_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new IgnavFlightSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["IGNAV_FLIGHT_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["IGNAV_FLIGHT_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
