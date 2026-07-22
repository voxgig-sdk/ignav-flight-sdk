<?php
declare(strict_types=1);

// IgnavFlight SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

IgnavFlightUtility::setRegistrar(function (IgnavFlightUtility $u): void {
    $u->clean = [IgnavFlightClean::class, 'call'];
    $u->done = [IgnavFlightDone::class, 'call'];
    $u->make_error = [IgnavFlightMakeError::class, 'call'];
    $u->feature_add = [IgnavFlightFeatureAdd::class, 'call'];
    $u->feature_hook = [IgnavFlightFeatureHook::class, 'call'];
    $u->feature_init = [IgnavFlightFeatureInit::class, 'call'];
    $u->fetcher = [IgnavFlightFetcher::class, 'call'];
    $u->make_fetch_def = [IgnavFlightMakeFetchDef::class, 'call'];
    $u->make_context = [IgnavFlightMakeContext::class, 'call'];
    $u->make_options = [IgnavFlightMakeOptions::class, 'call'];
    $u->make_request = [IgnavFlightMakeRequest::class, 'call'];
    $u->make_response = [IgnavFlightMakeResponse::class, 'call'];
    $u->make_result = [IgnavFlightMakeResult::class, 'call'];
    $u->make_point = [IgnavFlightMakePoint::class, 'call'];
    $u->make_spec = [IgnavFlightMakeSpec::class, 'call'];
    $u->make_url = [IgnavFlightMakeUrl::class, 'call'];
    $u->param = [IgnavFlightParam::class, 'call'];
    $u->prepare_auth = [IgnavFlightPrepareAuth::class, 'call'];
    $u->prepare_body = [IgnavFlightPrepareBody::class, 'call'];
    $u->prepare_headers = [IgnavFlightPrepareHeaders::class, 'call'];
    $u->prepare_method = [IgnavFlightPrepareMethod::class, 'call'];
    $u->prepare_params = [IgnavFlightPrepareParams::class, 'call'];
    $u->prepare_path = [IgnavFlightPreparePath::class, 'call'];
    $u->prepare_query = [IgnavFlightPrepareQuery::class, 'call'];
    $u->result_basic = [IgnavFlightResultBasic::class, 'call'];
    $u->result_body = [IgnavFlightResultBody::class, 'call'];
    $u->result_headers = [IgnavFlightResultHeaders::class, 'call'];
    $u->transform_request = [IgnavFlightTransformRequest::class, 'call'];
    $u->transform_response = [IgnavFlightTransformResponse::class, 'call'];
});
