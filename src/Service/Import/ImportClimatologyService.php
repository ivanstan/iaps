<?php

namespace App\Service\Import;

use App\Entity\Import;
use App\Entity\SourceDataObject;
use Symfony\Component\Finder\SplFileInfo;

class ImportClimatologyService extends AbstractImportService
{
    public function import(SplFileInfo $file): ?Import
    {
        $import = $this->getImport($file);
        $source = $this->getSource($file->getFilenameWithoutExtension());

        $handle = $this->openFile($file);

        $row = 0;
        while (($data = fgetcsv($handle, 10000, ',')) !== false) {
            $entity = new SourceDataObject();
            $entity->setLatitude($data[0]);
            $entity->setLongitude($data[1]);
            $entity->setSource($source);
            $entity->setImport($import);

            $value = [
                'avg_jan' => $data[2],
                'avg_feb' => $data[3],
                'avg_mar' => $data[4],
                'avg_apr' => $data[5],
                'avg_may' => $data[6],
                'avg_jun' => $data[7],
                'avg_jul' => $data[8],
                'avg_avg' => $data[9],
                'avg_sep' => $data[10],
                'avg_oct' => $data[11],
                'avg_nov' => $data[12],
                'avg_dec' => $data[13],
                'avg_vegetation' => $data[14],
                'avg_year' => $data[15],

                'med_jan' => $data[16],
                'med_feb' => $data[17],
                'med_mar' => $data[18],
                'med_apr' => $data[19],
                'med_may' => $data[20],
                'med_jun' => $data[21],
                'med_jul' => $data[22],
                'med_avg' => $data[23],
                'med_sep' => $data[24],
                'med_oct' => $data[25],
                'med_nov' => $data[26],
                'med_dec' => $data[27],
                'med_vegetation' => $data[28],
                'med_year' => $data[29],

                'p10_jan' => $data[30],
                'p10_feb' => $data[31],
                'p10_mar' => $data[32],
                'p10_apr' => $data[33],
                'p10_may' => $data[34],
                'p10_jun' => $data[35],
                'p10_jul' => $data[36],
                'p10_avg' => $data[37],
                'p10_sep' => $data[38],
                'p10_oct' => $data[39],
                'p10_nov' => $data[40],
                'p10_dec' => $data[41],
                'p10_vegetation' => $data[42],
                'p10_year' => $data[43],

                'p25_jan' => $data[44],
                'p25_feb' => $data[45],
                'p25_mar' => $data[46],
                'p25_apr' => $data[47],
                'p25_may' => $data[48],
                'p25_jun' => $data[49],
                'p25_jul' => $data[50],
                'p25_avg' => $data[51],
                'p25_sep' => $data[52],
                'p25_oct' => $data[53],
                'p25_nov' => $data[54],
                'p25_dec' => $data[55],
                'p25_vegetation' => $data[56],
                'p25_year' => $data[57],

                'p75_jan' => $data[57],
                'p75_feb' => $data[58],
                'p75_mar' => $data[59],
                'p75_apr' => $data[60],
                'p75_may' => $data[61],
                'p75_jun' => $data[62],
                'p75_jul' => $data[63],
                'p75_avg' => $data[64],
                'p75_sep' => $data[65],
                'p75_oct' => $data[66],
                'p75_nov' => $data[67],
                'p75_dec' => $data[68],
                'p75_vegetation' => $data[69],
                'p75_year' => $data[70],

                'p90_jan' => $data[71],
                'p90_feb' => $data[72],
                'p90_mar' => $data[73],
                'p90_apr' => $data[74],
                'p90_may' => $data[75],
                'p90_jun' => $data[76],
                'p90_jul' => $data[77],
                'p90_avg' => $data[78],
                'p90_sep' => $data[79],
                'p90_oct' => $data[80],
                'p90_nov' => $data[81],
                'p90_dec' => $data[82],
                'p90_vegetation' => $data[83],
                'p90_year' => $data[84],
            ];

            $value = array_map('floatval', $value);

            $entity->setValue($value);

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
