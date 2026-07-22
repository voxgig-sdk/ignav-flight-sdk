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

func TestBookingLinkEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BookingLink(nil)
		if ent == nil {
			t.Fatal("expected non-nil BookingLinkEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := booking_linkBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "booking_link." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		bookingLinkRef01Ent := client.BookingLink(nil)
		bookingLinkRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "booking_link"}, setup.data), "booking_link_ref01"))

		bookingLinkRef01DataResult, err := bookingLinkRef01Ent.Create(bookingLinkRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		bookingLinkRef01Data = core.ToMapAny(bookingLinkRef01DataResult)
		if bookingLinkRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func booking_linkBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "booking_link", "BookingLinkTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read booking_link test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse booking_link test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"booking_link01", "booking_link02", "booking_link03"},
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
	entidEnvRaw := os.Getenv("IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID": idmap,
		"IGNAVFLIGHT_TEST_LIVE":      "FALSE",
		"IGNAVFLIGHT_TEST_EXPLAIN":   "FALSE",
		"IGNAVFLIGHT_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["IGNAVFLIGHT_TEST_BOOKING_LINK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["IGNAVFLIGHT_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["IGNAVFLIGHT_APIKEY"],
			},
			extra,
		})
		client = sdk.NewIgnavFlightSDK(core.ToMapAny(mergedOpts))
	}

	live := env["IGNAVFLIGHT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["IGNAVFLIGHT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
