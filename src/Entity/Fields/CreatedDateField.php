<?php

namespace App\Entity\Fields;

use Doctrine\ORM\Mapping as ORM;

trait CreatedDateField
{
    /**
     * @ORM\Column(type="date", name="created_date")
     */
    private \DateTimeInterface $createdDate;

    /**
     * @return \DateTimeInterface
     */
    public function getCreatedDate(): \DateTimeInterface
    {
        return $this->createdDate;
    }

    /**
     * @param \DateTimeInterface $createdDate
     */
    public function setCreatedDate(\DateTimeInterface $createdDate): void
    {
        $this->createdDate = $createdDate;
    }
}