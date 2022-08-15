<?php

namespace App\Entity;

use App\Entity\Fields\GeoCoordinateField;
use App\Entity\Fields\ImportReference;
use App\Entity\Fields\SourceReference;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SourceDataObjectRepository")
 * @ORM\Table(name="`source_data_object`",indexes={
 *     @ORM\Index(name="source_idx", columns={"source_id", "latitude", "longitude"})
 * })
 */
class SourceDataObject
{
    use ImportReference;
    use SourceReference;
    use GeoCoordinateField;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private ?array $value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?array
    {
        return $this->value;
    }

    public function setValue(?array $value): self
    {
        $this->value = $value;

        return $this;
    }
}
