<?php

namespace App\Service\Import;

use App\Entity\Import;
use App\Entity\SourceData;
use Symfony\Component\Finder\SplFileInfo;

class ImportMapService extends AbstractImportService
{
    public function import(SplFileInfo $file): ?Import
    {
        $fileInfo = $this->getFileNameInfo($file);

        $source = $this->getSource($fileInfo['source']);
        $import = $this->getImport($file);

        $handle = $this->openFile($file);

        $row = 1;
        while (($data = fgetcsv($handle, 1000, ',')) !== false) {
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

        return $import;
    }

    protected function getFileNameInfo(SplFileInfo $file): array
    {
        $fileParts = explode('_', $file->getFilenameWithoutExtension());

        $createdYear = (int)substr($fileParts[1], 0, 4);
        $createdMonth = (int)substr($fileParts[1], 4, 2) + 1;

        $createdDate = new \DateTime();
        $createdDate->setDate($createdYear, $createdMonth, 0);

        $targetYear = (int)substr($fileParts[2], 0, 4);
        $targetMonth = (int)substr($fileParts[2], 4, 2) + 1;

        $targetDate = new \DateTime();
        $targetDate->setDate($targetYear, $targetMonth, 0);

        return [
            'source' => $fileParts[0],
            'created_date' => $createdDate,
            'target_date' => $targetDate,
        ];
    }
}
