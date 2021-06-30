<?php

namespace App\Service;

use Location\Polygon;

class StateService
{
    private Polygon $polygon;

    public function setUp(): void {
        $data = json_decode(file_get_contents('../storage/serbia.geojson'), true, 512, JSON_THROW_ON_ERROR);

        $points = $data['features'][0]['geometry']['coordinates'][0][0] ?? [];

        dd($data);

        $this->polygon = new Polygon();
        foreach ($points as $point) {

            dd($point);

            $this->polygon->addPoint(new Coordinate(41.84, 32.55));
        }
    }
}
