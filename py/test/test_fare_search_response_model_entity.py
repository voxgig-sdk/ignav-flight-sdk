# FareSearchResponseModel entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from ignavflight_sdk import IgnavFlightSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestFareSearchResponseModelEntity:

    def test_should_create_instance(self):
        testsdk = IgnavFlightSDK.test(None, None)
        ent = testsdk.FareSearchResponseModel(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _fare_search_response_model_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "fare_search_response_model." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set IGNAVFLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        fare_search_response_model_ref01_ent = client.FareSearchResponseModel(None)
        fare_search_response_model_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.fare_search_response_model"), "fare_search_response_model_ref01"))

        fare_search_response_model_ref01_data = helpers.to_map(fare_search_response_model_ref01_ent.create(fare_search_response_model_ref01_data, None))
        assert fare_search_response_model_ref01_data is not None



def _fare_search_response_model_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/fare_search_response_model/FareSearchResponseModelTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = IgnavFlightSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["fare_search_response_model01", "fare_search_response_model02", "fare_search_response_model03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "IGNAVFLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "IGNAVFLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID": idmap,
        "IGNAVFLIGHT_TEST_LIVE": "FALSE",
        "IGNAVFLIGHT_TEST_EXPLAIN": "FALSE",
        "IGNAVFLIGHT_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("IGNAVFLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("IGNAVFLIGHT_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("IGNAVFLIGHT_APIKEY"),
            },
            extra or {},
        ])
        client = IgnavFlightSDK(helpers.to_map(merged_opts))

    _live = env.get("IGNAVFLIGHT_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("IGNAVFLIGHT_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
