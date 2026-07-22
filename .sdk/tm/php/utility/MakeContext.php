<?php
declare(strict_types=1);

// IgnavFlight SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IgnavFlightMakeContext
{
    public static function call(array $ctxmap, ?IgnavFlightContext $basectx): IgnavFlightContext
    {
        return new IgnavFlightContext($ctxmap, $basectx);
    }
}
