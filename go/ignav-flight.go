package voxgigignavflightsdk

import (
	"github.com/voxgig-sdk/ignav-flight-sdk/go/core"
	"github.com/voxgig-sdk/ignav-flight-sdk/go/entity"
	"github.com/voxgig-sdk/ignav-flight-sdk/go/feature"
	_ "github.com/voxgig-sdk/ignav-flight-sdk/go/utility"
)

// Type aliases preserve external API.
type IgnavFlightSDK = core.IgnavFlightSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type IgnavFlightEntity = core.IgnavFlightEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type IgnavFlightError = core.IgnavFlightError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAirportEntityFunc = func(client *core.IgnavFlightSDK, entopts map[string]any) core.IgnavFlightEntity {
		return entity.NewAirportEntity(client, entopts)
	}
	core.NewBookingLinkEntityFunc = func(client *core.IgnavFlightSDK, entopts map[string]any) core.IgnavFlightEntity {
		return entity.NewBookingLinkEntity(client, entopts)
	}
	core.NewFareSearchModelEntityFunc = func(client *core.IgnavFlightSDK, entopts map[string]any) core.IgnavFlightEntity {
		return entity.NewFareSearchModelEntity(client, entopts)
	}
	core.NewFareSearchResponseModelEntityFunc = func(client *core.IgnavFlightSDK, entopts map[string]any) core.IgnavFlightEntity {
		return entity.NewFareSearchResponseModelEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewIgnavFlightSDK = core.NewIgnavFlightSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewIgnavFlightSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *IgnavFlightSDK  { return NewIgnavFlightSDK(nil) }
func Test() *IgnavFlightSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
