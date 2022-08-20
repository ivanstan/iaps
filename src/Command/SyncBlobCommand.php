<?php

namespace App\Command;

use App\Service\Import\ImportBlobService;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'sync:blob',
)]
class SyncBlobCommand extends AbstractSyncCommand
{
    public function __construct(protected string $projectDir, protected ImportBlobService $service)
    {
        parent::__construct($this->projectDir);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $files = $this->getFileList('/var/data/blob');

        foreach ($files as $file) {
            if (!$this->service->isImported($file)) {
                $output->write(sprintf('Importing %s', $file->getFilename()));

                $this->service->import($file);
            }
        }

        return self::SUCCESS;
    }
}

