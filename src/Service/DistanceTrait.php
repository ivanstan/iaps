<?php

namespace App\Service;

trait DistanceTrait
{
    protected function getDistanceQuery(float $latitude, float $longitude): string
    {
        return <<<"EOF"
            (3959 * ACOS(
                COS (
                    RADIANS('$latitude')) * COS(RADIANS(s.latitude)) * COS(RADIANS(s.longitude) - RADIANS('$longitude')) + SIN(RADIANS('$latitude')) * SIN(RADIANS(s.latitude))
                )
            ) AS distance
        EOF;
    }
}
