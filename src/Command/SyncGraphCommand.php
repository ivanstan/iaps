<?php

namespace App\Command;

use App\Service\Import\ImportGraphService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'sync:graph',
)]
class SyncGraphCommand extends AbstractSyncCommand
{
    public function __construct(protected string $projectDir, protected ImportGraphService $service)
    {
        parent::__construct($this->projectDir);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $files = $this->getFileList('/var/data/graph');

        foreach ($files as $file) {
            if (!$this->service->isImported($file)) {
                $this->service->import($file);
            }
        }

        return self::SUCCESS;
    }
}