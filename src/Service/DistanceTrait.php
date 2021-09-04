<?php

namespace App\Service;

trait DistanceTrait
{
    protected function getDistanceQuery(float $latitude, float $longitude, string $alias): string
    {
        return <<<"EOF"
            (3959 * ACOS(
                COS (
                    RADIANS('$latitude')) * COS(RADIANS($alias.latitude)) * COS(RADIANS($alias.longitude) - RADIANS('$longitude')) + SIN(RADIANS('$latitude')) * SIN(RADIANS($alias.latitude))
                )
            ) AS distance
        EOF;
    }
}
