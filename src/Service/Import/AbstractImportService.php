<?php

namespace App\Service\Import;

use App\Entity\Import;
use App\Entity\Source;
use App\Repository\ImportRepository;
use App\Repository\SourceRepository;
use App\Service\StateService;
use Doctrine\ORM\EntityManagerInterface;
use http\Exception\RuntimeException;
use Symfony\Component\Finder\SplFileInfo;

abstract class AbstractImportService
{
    protected const BATCH_SIZE = 50;

    public function __construct(
        protected string $projectDir,
        protected EntityManagerInterface $entityManager,
        protected StateService $geoFilter,
        protected SourceRepository $sourceRepository,
        protected ImportRepository $importRepository,
    ) {

    }

    abstract public function import(SplFileInfo $file): ?Import;

    public function isImported(SplFileInfo $file): bool
    {
        $imports = $this->importRepository->findAll();
        $filename = $this->getFileName($file);

        foreach ($imports as $import) {
            if ($import->getFilename() === $filename) {
                return true;
            }
        }

        return false;
    }

    protected function getFileName(SplFileInfo $file): string
    {
        return str_replace($this->projectDir.'/', '', $file->getRealPath());
    }

    protected function getSource(string $name): Source
    {
        return $this->sourceRepository->getSource($name);
    }

    protected function getImport(SplFileInfo $file): Import
    {
        return $this->importRepository->add($this->getFileName($file));
    }

    protected function openFile(SplFileInfo $file): mixed
    {
        $handle = fopen($file->getRealPath(), 'rb');

        if ($handle === false) {
            throw new RuntimeException(sprintf('Unable to open file %s', $file->getRealPath()));
        }

        return $handle;
    }
}