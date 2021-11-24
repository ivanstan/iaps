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
 * @ORM\Table(name="`source_data`",indexes={
 *     @ORM\Index(name="source_idx", columns={"source_id", "created_date", "target_date", "latitude", "longitude"})
 * })
 */
class SourceData
{
    use ImportReference;
    use SourceReference;
    use GeoCoordinateField;
    use CreatedDateField;
    use TargetDateField;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private ?float $value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?float
    {
        return $this->value;
    }

    public function setValue(?float $value): self
    {
        $this->value = $value;

        return $this;
    }
}
