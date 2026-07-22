<?php
declare(strict_types=1);

// IgnavFlight SDK utility: result_body

class IgnavFlightResultBody
{
    public static function call(IgnavFlightContext $ctx): ?IgnavFlightResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
