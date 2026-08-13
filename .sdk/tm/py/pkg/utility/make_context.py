# IgnavFlight SDK utility: make_context

from projectname_sdk.core.context import IgnavFlightContext


def make_context_util(ctxmap, basectx):
    return IgnavFlightContext(ctxmap, basectx)
