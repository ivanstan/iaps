<?php

namespace App\Entity\Fields;

use App\Entity\Import;
use Doctrine\ORM\Mapping as ORM;

trait ImportReference
{
    /**
     * @ORM\ManyToOne(targetEntity=Import::class)
     * @ORM\JoinColumn(nullable=false)
     */
    private Import $import;

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
