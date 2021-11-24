<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Finder\Finder;

abstract class AbstractSyncCommand extends Command
{
    public function __construct(protected string $projectDir)
    {
        parent::__construct($this->projectDir);
    }

    protected function getFileList(string $dir): Finder
    {
        return (new Finder())->files()->name('*.csv')->in($this->projectDir.$dir);
    }
}