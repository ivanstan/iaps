<?php

namespace App\Service\Import;

use App\Entity\Import;
use App\Entity\TimeSeries;
use Symfony\Component\Finder\SplFileInfo;

class ImportGraphService extends AbstractImportService
{
    public function import(SplFileInfo $file): ?Import
    {
        $fileInfo = $this->getFileNameInfo($file);

        $source = $this->getSource($fileInfo['source'].'_'.$fileInfo['subname']);
        $import = $this->getImport($file);

        $handle = $this->openFile($file);

        $row = 0;
        while (($data = fgetcsv($handle, 10000, ',')) !== false) {
            $entity = new TimeSeries();
            $entity->setLatitude($data[0]);
            $entity->setLongitude($data[1]);
            $entity->setSource($source);
            $entity->setImport($import);

            $targetDate = new \DateTime();
            $targetDate->setDate($fileInfo['created_date']->format('Y'), 1, 1);

            $entity->setCreatedDate($fileInfo['created_date']);
            $entity->setTargetDate($targetDate);

            $value = array_slice($data, 2);

            $value = array_filter($value, static fn($value) => !is_null($value) && $value !== '');
            $value = array_map('floatval', $value);

            $entity->setValue($value);
            $entity->setInterval('P1D');

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

        return [
            'source' => $fileParts[0],
            'created_date' => $createdDate,
            'subname' => $fileParts[2],
        ];
    }
}