package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAirportEntityFunc func(client *IgnavFlightSDK, entopts map[string]any) IgnavFlightEntity

var NewBookingLinkEntityFunc func(client *IgnavFlightSDK, entopts map[string]any) IgnavFlightEntity

var NewFareSearchModelEntityFunc func(client *IgnavFlightSDK, entopts map[string]any) IgnavFlightEntity

var NewFareSearchResponseModelEntityFunc func(client *IgnavFlightSDK, entopts map[string]any) IgnavFlightEntity

