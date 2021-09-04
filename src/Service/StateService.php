<?php

namespace App\Service;

use Location\Coordinate;
use Location\Polygon;

class StateService
{
    private Polygon $polygon;

    public function __construct(protected string $projectDir)
    {
    }

    public function setUp(): Polygon
    {
        $data = json_decode(file_get_contents($this->projectDir . '/static/serbia.geojson'), true, 512, JSON_THROW_ON_ERROR);

        $points = $data['features'][0]['geometry']['coordinates'][0][0] ?? [];

        $this->polygon = new Polygon();
        foreach ($points as $point) {
            $this->polygon->addPoint(new Coordinate($point[1], $point[0]));
        }

        return $this->polygon;
    }
}
