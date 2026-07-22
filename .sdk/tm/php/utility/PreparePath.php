<?php
declare(strict_types=1);

// IgnavFlight SDK utility: prepare_path

class IgnavFlightPreparePath
{
    public static function call(IgnavFlightContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
