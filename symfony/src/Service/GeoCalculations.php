<?php

namespace App\Service;

class GeoCalculations
{
    public const EARTH_RADIUS = 6378.14; //km

    function getLocationFromBearingAndDistance($lat1, $long1, $d, $angle): array
    {
        $R = self::EARTH_RADIUS;

        # Degree to Radian
        $latitude1 = $lat1 * (M_PI / 180);
        $longitude1 = $long1 * (M_PI / 180);
        $brng = $angle * (M_PI / 180);

        $latitude2 = asin(sin($latitude1) * cos($d / $R) + cos($latitude1) * sin($d / $R) * cos($brng));
        $longitude2 = $longitude1 + atan2(sin($brng) * sin($d / $R) * cos($latitude1), cos($d / $R) - sin($latitude1) * sin($latitude2));

        return [
            'latitude' => round($latitude2 * (180 / M_PI), 6),
            'longitude' => round($longitude2 * (180 / M_PI), 6),
        ];
    }
}
