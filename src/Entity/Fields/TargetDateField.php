<?php

namespace App\Entity\Fields;

use Doctrine\ORM\Mapping as ORM;

trait TargetDateField
{
    /**
     * @ORM\Column(type="date", name="target_date")
     */
    private \DateTimeInterface $targetDate;

    /**
     * @return \DateTimeInterface
     */
    public function getTargetDate(): \DateTimeInterface
    {
        return $this->targetDate;
    }

    /**
     * @param \DateTimeInterface $targetDate
     */
    public function setTargetDate(\DateTimeInterface $targetDate): void
    {
        $this->targetDate = $targetDate;
    }
}