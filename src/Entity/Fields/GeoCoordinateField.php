<?php

namespace App\Entity\Fields;

use Doctrine\ORM\Mapping as ORM;

trait GeoCoordinateField
{
    /**
     * @ORM\Column(type="float")
     */
    private float $latitude;

    /**
     * @ORM\Column(type="float")
     */
    private float $longitude;

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }
}