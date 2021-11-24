<?php

namespace App\Entity;

use App\Entity\Fields\CreatedDateField;
use App\Entity\Fields\GeoCoordinateField;
use App\Entity\Fields\ImportReference;
use App\Entity\Fields\SourceReference;
use App\Entity\Fields\TargetDateField;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="`time_series`",indexes={
 *     @ORM\Index(name="time_series", columns={"source_id", "created_date", "target_date", "latitude", "longitude"})
 * })
 */
class TimeSeries
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    use ImportReference;
    use SourceReference;
    use GeoCoordinateField;
    use CreatedDateField;
    use TargetDateField;

    /**
     * @ORM\Column(type="simple_array")
     */
    private array $value;

    /**
     * @ORM\Column(type="string", name="`interval`")
     */
    private string $interval;

    public function getValue(): array
    {
        return $this->value;
    }

    public function setValue(array $value): void
    {
        $this->value = $value;
    }

    public function getInterval(): string
    {
        return $this->interval;
    }

    public function setInterval(string $interval): void
    {
        $this->interval = $interval;
    }
}
