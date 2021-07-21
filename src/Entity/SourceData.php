<?php

namespace App\Entity;

use App\Repository\SourceDataRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=IndexDataRepository::class)
 * @ORM\Table(name="`source_data`",indexes={
 *     @ORM\Index(name="source_idx", columns={"source_id", "datetime", "latitude", "longitude"})
 * })
 */
class SourceData
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $datetime;

    /**
     * @ORM\Column(type="float")
     */
    private float $latitude;

    /**
     * @ORM\Column(type="float")
     */
    private float $longitude;

    /**
     * @ORM\ManyToOne(targetEntity=Source::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private Source $source;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private ?float $value;

    /**
     * @ORM\ManyToOne(targetEntity=Import::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private Import $import;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatetime(): ?\DateTimeInterface
    {
        return $this->datetime;
    }

    public function setDatetime(\DateTimeInterface $datetime): self
    {
        $this->datetime = $datetime;

        return $this;
    }

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

    public function getSource(): Source
    {
        return $this->source;
    }

    public function setSource(Source $source): self
    {
        $this->source = $source;

        return $this;
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

    public function getImport(): Import
    {
        return $this->import;
    }

    public function setImport(Import $import): self
    {
        $this->import = $import;

        return $this;
    }
}
