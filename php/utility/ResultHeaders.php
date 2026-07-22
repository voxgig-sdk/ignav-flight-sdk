<?php
declare(strict_types=1);

// IgnavFlight SDK utility: result_headers

class IgnavFlightResultHeaders
{
    public static function call(IgnavFlightContext $ctx): ?IgnavFlightResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
