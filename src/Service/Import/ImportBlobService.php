<?php

namespace App\Service\Import;

use App\Entity\Import;
use App\Entity\SourceDataObject;
use Symfony\Component\Finder\SplFileInfo;

class ImportBlobService extends AbstractImportService
{
    public function import(SplFileInfo $file): ?Import
    {
        $import = $this->getImport($file);
        $source = $this->getSource($file->getFilenameWithoutExtension());

        $handle = $this->openFile($file);

        $row = 0;
        $header = [];
        while (($data = fgetcsv($handle, 10000, ',')) !== false) {
            if ($row === 0) {
                $header = $data;
                $row++;
                continue;
            }

            $entity = new SourceDataObject();
            $entity->setLatitude($data[0]);
            $entity->setLongitude($data[1]);
            $entity->setSource($source);
            $entity->setImport($import);

            $entity->setValue(array_combine($header, $data));

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
}
