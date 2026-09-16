# IgnavFlight SDK feature factory

from ignavflight_sdk.feature.base_feature import IgnavFlightBaseFeature
from ignavflight_sdk.feature.ratelimit_feature import IgnavFlightRatelimitFeature
from ignavflight_sdk.feature.retry_feature import IgnavFlightRetryFeature
from ignavflight_sdk.feature.test_feature import IgnavFlightTestFeature
from ignavflight_sdk.feature.timeout_feature import IgnavFlightTimeoutFeature


_FEATURES = {
    "base": lambda: IgnavFlightBaseFeature(),
    "ratelimit": lambda: IgnavFlightRatelimitFeature(),
    "retry": lambda: IgnavFlightRetryFeature(),
    "test": lambda: IgnavFlightTestFeature(),
    "timeout": lambda: IgnavFlightTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
