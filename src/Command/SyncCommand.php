<?php

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'sync',
)]
class SyncCommand extends Command
{
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->getApplication()->find('sync:map')->run(new ArrayInput([]), $output);
        $this->getApplication()->find('sync:graph')->run(new ArrayInput([]), $output);
        $this->getApplication()->find('sync:climatology')->run(new ArrayInput([]), $output);

        return self::SUCCESS;
    }
}
