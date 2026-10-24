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

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const fare_search_response_modelEntityLiveStrict = true


func TestFareSearchResponseModelEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.FareSearchResponseModel(nil)
		if ent == nil {
			t.Fatal("expected non-nil FareSearchResponseModelEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.FareSearchResponseModel(nil).Create(map[string]any{"adults": "x", "departure_date": "x", "destination": "x", "origin": "x", "return_date": "x"}, nil)
		if sdkerr, ok := err.(*core.IgnavFlightError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
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
		client := setup.client
		_ = client

		// CREATE
		fareSearchResponseModelRef01Ent := client.FareSearchResponseModel(nil)
		fareSearchResponseModelRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "fare_search_response_model"}), "fare_search_response_model_ref01"))

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
	idmap, _ := vs.Transform(
		[]any{"fare_search_response_model01", "fare_search_response_model02", "fare_search_response_model03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID": idmap,
		"IGNAV_FLIGHT_TEST_LIVE":      "FALSE",
		"IGNAV_FLIGHT_TEST_EXPLAIN":   "FALSE",
		"IGNAV_FLIGHT_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["IGNAV_FLIGHT_TEST_FARE_SEARCH_RESPONSE_MODEL_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IGNAV_FLIGHT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["IGNAV_FLIGHT_APIKEY"],
			},
			extraOpts,
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
