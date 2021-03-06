<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\SourceRepository;

/**
 * @ORM\Entity(repositoryClass=SourceRepository::class)
 * @ORM\Table(name="`source`",indexes={
 *     @ORM\Index(name="name_idx", columns={"name"})
 * })
 */
class Source
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private string $title;

    /**
     * @ORM\Column(type="string", length=60, nullable=true)
     */
    private ?string $unit = null;

    /**
     * @ORM\Column(type="integer")
     */
    private string $resolution;

    /**
     * @ORM\Column(type="float")
     */
    private string $maxValue;

    /**
     * @ORM\Column(type="boolean", options={"default" : 1})
     */
    private string $hidden;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getMaxValue(): float
    {
        return $this->maxValue;
    }

    public function setMaxValue(float $maxValue): void
    {
        $this->maxValue = $maxValue;
    }

    public function getResolution(): int
    {
        return $this->resolution;
    }

    public function setResolution(int $resolution): void
    {
        $this->resolution = $resolution;
    }

    public function getUnit(): ?string
    {
        return $this->unit;
    }

    public function setUnit(?string $unit): void
    {
        $this->unit = $unit;
    }

    public function getTitle(): string
    {
        return trim($this->title);
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function isHidden(): bool
    {
        return $this->hidden;
    }

    public function setHidden(bool $hidden): void
    {
        $this->hidden = $hidden;
    }
}
