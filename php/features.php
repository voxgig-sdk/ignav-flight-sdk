<?php
declare(strict_types=1);

// IgnavFlight SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IgnavFlightFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IgnavFlightBaseFeature();
            case "test":
                return new IgnavFlightTestFeature();
            default:
                return new IgnavFlightBaseFeature();
        }
    }
}
