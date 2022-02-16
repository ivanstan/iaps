<?php

namespace App\Repository;

use App\Entity\Source;
use App\Entity\SourceDataObject;
use App\Service\DistanceTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class SourceDataObjectRepository extends ServiceEntityRepository
{
    use DistanceTrait;

    protected const POSSIBLE_JSON_KEYS = [
        'avg_jan',
        'med_jan',
        'p25_jan',
        'p75_jan',
        'p10_jan',
        'p90_jan',
        'avg_feb',
        'med_feb',
        'p25_feb',
        'p75_feb',
        'p10_feb',
        'p90_feb',
        'avg_mar',
        'med_mar',
        'p25_mar',
        'p75_mar',
        'p10_mar',
        'p90_mar',
        'avg_apr',
        'med_apr',
        'p25_apr',
        'p75_apr',
        'p10_apr',
        'p90_apr',
        'avg_may',
        'med_may',
        'p25_may',
        'p75_may',
        'p10_may',
        'p90_may',
        'avg_jun',
        'med_jun',
        'p25_jun',
        'p75_jun',
        'p10_jun',
        'p90_jun',
        'avg_jul',
        'med_jul',
        'p25_jul',
        'p75_jul',
        'p10_jul',
        'p90_jul',
        'avg_aug',
        'med_aug',
        'p25_aug',
        'p75_aug',
        'p10_aug',
        'p90_aug',
        'avg_sep',
        'med_sep',
        'p25_sep',
        'p75_sep',
        'p10_sep',
        'p90_sep',
        'avg_oct',
        'med_oct',
        'p25_oct',
        'p75_oct',
        'p10_oct',
        'p90_oct',
        'avg_nov',
        'med_nov',
        'p25_nov',
        'p75_nov',
        'p10_nov',
        'p90_nov',
        'avg_dec',
        'med_dec',
        'p25_dec',
        'p75_dec',
        'p10_dec',
        'p90_dec',
        'avg_vegetation',
        'med_vegetation',
        'p25_vegetation',
        'p75_vegetation',
        'p10_vegetation',
        'p90_vegetation',
        'avg_year',
        'med_year',
        'p25_year',
        'p75_year',
        'p10_year',
        'p90_year',
    ];

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SourceDataObject::class);
    }

    public function getData(string $source, string $subSource): array
    {
        if (!in_array($subSource, self::POSSIBLE_JSON_KEYS)) {
            throw new \RuntimeException(\sprintf('Invalid sub source %s', $subSource));
        }

        $builder = $this->createQueryBuilder('data');
        $builder->select([
            'data.latitude',
            'data.longitude',
            'JSON_EXTRACT(data.value, \'$.'.$subSource.'\') AS value',
        ]);
        $builder->join('data.source', 'source');
        $builder->where('source.name = :source')->setParameter('source', $source);

        return [
            'data' => $builder->getQuery()->getArrayResult(),
            'info' => $this->getEntityManager()->getRepository(Source::class)->getSource($source),
        ];
    }

    public function getNeareast(string $source, float $lat, float $lng)
    {
        $builder = $this->createQueryBuilder('data')
            ->select(
                'data.latitude',
                'data.longitude',
                'data.value',
                $this->getDistanceQuery($lat, $lng, 'data'),
                'source.name',
            )
            ->leftJoin('data.source', 'source')
            ->where('source.name = :name')->setParameter('name', $source);

        $builder->orderBy('distance', 'ASC');
        $builder->setMaxResults(1);

        return $builder->getQuery()->getArrayResult()[0] ?? null;
    }
}
