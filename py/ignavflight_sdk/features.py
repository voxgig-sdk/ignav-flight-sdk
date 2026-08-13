# IgnavFlight SDK feature factory

from ignavflight_sdk.feature.base_feature import IgnavFlightBaseFeature
from ignavflight_sdk.feature.test_feature import IgnavFlightTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IgnavFlightBaseFeature(),
        "test": lambda: IgnavFlightTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
