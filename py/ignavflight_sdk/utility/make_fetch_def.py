# IgnavFlight SDK utility: make_fetch_def

from __future__ import annotations
from ignavflight_sdk.utility.media import request_body


def make_fetch_def_util(ctx):
    spec = ctx.spec
    if spec is None:
        return None, ctx.make_error("fetchdef_no_spec",
            "Expected context spec property to be defined.")

    from ignavflight_sdk.core.result import IgnavFlightResult
    if ctx.result is None:
        ctx.result = IgnavFlightResult({})

    spec.step = "prepare"

    url, err = ctx.utility.make_url(ctx)
    if err is not None:
        return None, err

    spec.url = url

    fetchdef = {
        "url": url,
        "method": spec.method,
        "headers": spec.headers,
    }

    if spec.body is not None:
        fetchdef["body"] = request_body(ctx.point, spec.body)

    return fetchdef, None
