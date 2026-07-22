<?php
declare(strict_types=1);

// IgnavFlight SDK base feature

class IgnavFlightBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IgnavFlightContext $ctx, array $options): void {}
    public function PostConstruct(IgnavFlightContext $ctx): void {}
    public function PostConstructEntity(IgnavFlightContext $ctx): void {}
    public function SetData(IgnavFlightContext $ctx): void {}
    public function GetData(IgnavFlightContext $ctx): void {}
    public function GetMatch(IgnavFlightContext $ctx): void {}
    public function SetMatch(IgnavFlightContext $ctx): void {}
    public function PrePoint(IgnavFlightContext $ctx): void {}
    public function PreSpec(IgnavFlightContext $ctx): void {}
    public function PreRequest(IgnavFlightContext $ctx): void {}
    public function PreResponse(IgnavFlightContext $ctx): void {}
    public function PreResult(IgnavFlightContext $ctx): void {}
    public function PreDone(IgnavFlightContext $ctx): void {}
    public function PreUnexpected(IgnavFlightContext $ctx): void {}
}
