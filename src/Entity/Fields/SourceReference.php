<?php

namespace App\Entity\Fields;

use App\Entity\Source;
use Doctrine\ORM\Mapping as ORM;

trait SourceReference
{
    /**
     * @ORM\ManyToOne(targetEntity=Source::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private Source $source;

    public function getSource(): Source
    {
        return $this->source;
    }

    public function setSource(Source $source): self
    {
        $this->source = $source;

        return $this;
    }
}