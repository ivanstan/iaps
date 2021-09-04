<?php

namespace App\Service;

use App\Entity\SourceData;
use App\Repository\ImportRepository;
use App\Repository\SourceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Location\Coordinate;
use Symfony\Component\Finder\SplFileInfo;

class ImportService
{
    private const BATCH_SIZE = 50;

    public function __construct(
        protected string $projectDir,
        protected EntityManagerInterface $entityManager,
        protected StateService $geoFilter,
        protected SourceRepository $sourceRepository,
        protected ImportRepository $importRepository,
    ) {
    }

    public function import(SplFileInfo $file): void
    {
        $fileInfo = $this->getFileNameInfo($file);

        $source = $this->sourceRepository->getSource($fileInfo['source']);
        $import = $this->importRepository->add($this->getFileName($file));

        $polygon = $this->geoFilter->setUp();

        $row = 1;
        if (!(($handle = fopen($file->getRealPath(), 'rb')) === false)) {
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if (!$polygon->contains(new Coordinate($data[0], $data[1]))) {
                    $row++;
                    continue;
                }

                $entity = new SourceData();
                $entity->setLatitude($data[0]);
                $entity->setLongitude($data[1]);
                $entity->setValue($data[2]);
                $entity->setTargetDate($fileInfo['target_date']);
                $entity->setCreatedDate($fileInfo['created_date']);
                $entity->setImport($import);
                $entity->setSource($source);

                $this->entityManager->persist($entity);
                if (($row % self::BATCH_SIZE) === 0) {
                    $this->entityManager->flush();
                }

                $row++;
            }

            $this->entityManager->flush();
            $this->entityManager->clear();

            fclose($handle);
        }
    }

    protected function getFileNameInfo(SplFileInfo $file): array
    {
        $fileParts = explode('_', $file->getFilenameWithoutExtension());

        $createdYear = (int)substr($fileParts[1], 0, 4);
        $createdMonth = (int)substr($fileParts[1], 4, 2);

        $createdDate = new \DateTime();
        $createdDate->setDate($createdYear, $createdMonth, 0);
        $createdDate->setTime(0, 0, 0);

        $targetYear = (int)substr($fileParts[2], 0, 4);
        $targetMonth = (int)substr($fileParts[2], 4, 2);

        $targetDate = new \DateTime();
        $targetDate->setDate($targetYear, $targetMonth, 0);
        $targetDate->setTime(0, 0, 0);

        return [
            'source' => $fileParts[0],
            'created_date' => $createdDate,
            'target_date' => $targetDate,
        ];
    }

    protected function getFileName(SplFileInfo $file): string {
        return str_replace($this->projectDir . '/', '', $file->getRealPath());
    }

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
}
