package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/ignav-flight-sdk/go"
	"github.com/voxgig-sdk/ignav-flight-sdk/go/core"

	vs "github.com/voxgig-sdk/ignav-flight-sdk/go/utility/struct"
)

func TestFareSearchResponseModelEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FareSearchResponseModel(nil)
		if ent == nil {
			t.Fatal("expected non-nil FareSearchResponseModelEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := fare_search_response_modelBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "fare_search_response_model." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		fareSearchResponseModelRef01Ent := client.FareSearchResponseModel(nil)
		fareSearchResponseModelRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "fare_search_response_model"}, setup.data), "fare_search_response_model_ref01"))

		fareSearchResponseModelRef01DataResult, err := fareSearchResponseModelRef01Ent.Create(fareSearchResponseModelRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		fareSearchResponseModelRef01Data = core.ToMapAny(entityData(fareSearchResponseModelRef01DataResult))
		if fareSearchResponseModelRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func fare_search_response_modelBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "fare_search_response_model", "FareSearchResponseModelTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read fare_search_response_model test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse fare_search_response_model test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"fare_search_response_model01", "fare_search_response_model02", "fare_search_response_model03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID": idmap,
		"IGNAV_FLIGHT_TEST_LIVE":      "FALSE",
		"IGNAV_FLIGHT_TEST_EXPLAIN":   "FALSE",
		"IGNAV_FLIGHT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IGNAV_FLIGHT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IGNAV_FLIGHT_APIKEY"],
			},
			extra,
		})
		client = sdk.NewIgnavFlightSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IGNAV_FLIGHT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IGNAV_FLIGHT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
