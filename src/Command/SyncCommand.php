<?php

namespace App\Command;

use App\Service\ImportService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Finder\Finder;

#[AsCommand(
    name: 'sync',
    description: 'Sync data from file system',
)]
class SyncCommand extends Command
{
    public function __construct(protected string $projectDir, protected ImportService $service)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $files = $this->getFileList();

        foreach ($files as $file) {
            if (!$this->service->isImported($file)) {
                $this->service->import($file);
            }
        }

        return self::SUCCESS;
    }

    protected function getFileList(): Finder
    {
        $finder = new Finder();

        return $finder->files()->name('*.csv')->in($this->projectDir . '/var/data');
    }
}
