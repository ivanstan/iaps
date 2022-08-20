<?php

namespace App\Command;

use App\Service\Import\ImportClimatologyService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'sync:climatology',
)]
class SyncClimatologyCommand extends AbstractSyncCommand
{
    public function __construct(protected string $projectDir, protected ImportClimatologyService $service)
    {
        parent::__construct($this->projectDir);
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $files = $this->getFileList('/var/data/climatology');

        foreach ($files as $file) {
            if (!$this->service->isImported($file)) {
                $this->service->import($file);
            }
        }

        return self::SUCCESS;
    }
}
