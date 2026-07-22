# IgnavFlight SDK utility: make_context

from core.context import IgnavFlightContext


def make_context_util(ctxmap, basectx):
    return IgnavFlightContext(ctxmap, basectx)
