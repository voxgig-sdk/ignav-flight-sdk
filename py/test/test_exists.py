# ProjectName SDK exists test

import pytest
from ignavflight_sdk import IgnavFlightSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IgnavFlightSDK.test(None, None)
        assert testsdk is not None
