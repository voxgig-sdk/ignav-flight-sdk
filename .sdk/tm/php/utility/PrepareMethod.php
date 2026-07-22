<?php
declare(strict_types=1);

// IgnavFlight SDK utility: prepare_method

class IgnavFlightPrepareMethod
{
    private const METHOD_MAP = [
        'create' => 'POST',
        'update' => 'PUT',
        'load' => 'GET',
        'list' => 'GET',
        'remove' => 'DELETE',
        'patch' => 'PATCH',
    ];

    public static function call(IgnavFlightContext $ctx): string
    {
        return self::METHOD_MAP[$ctx->op->name] ?? 'GET';
    }
}
