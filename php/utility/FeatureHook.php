<?php
declare(strict_types=1);

// IgnavFlight SDK utility: feature_hook

class IgnavFlightFeatureHook
{
    public static function call(IgnavFlightContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
