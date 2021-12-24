<?php

namespace App\Repository;

use App\Entity\TimeSeries;
use App\Service\DistanceTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TimeSeriesRepository extends ServiceEntityRepository
{
    use DistanceTrait;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, TimeSeries::class);
    }

    public function getInfo(string $name) {
        $builder = $this->createQueryBuilder('data')
            ->select(['data.createdDate'])
            ->leftJoin('data.source', 'source')
            ->where('source.name LIKE :name')->setParameter('name', $name.'%');

        $builder->groupBy('data.createdDate');
        $builder->orderBy('data.createdDate', 'DESC');

        return $builder->getQuery()->getArrayResult();
    }

    public function getData(string $name, float $latitude, float $longitude, ?string $created): array|int|string
    {
        $query = $this->createQueryBuilder('data')
            ->select(
                'data.latitude',
                'data.longitude',
                'data.value',
                $this->getDistanceQuery($latitude, $longitude, 'data'),
                'source.name',
                'data.createdDate',
                'data.targetDate'
            )
            ->leftJoin('data.source', 'source')
            ->where('source.name LIKE :name')->setParameter('name', $name.'%');

        if ($created !== null) {
            $query->andWhere('data.createdDate = :created_date')->setParameter('created_date', $created);
        }

        $query->orderBy('distance', 'ASC');

        $query->setMaxResults(10);

        $result = $query
            ->getQuery()
            ->getArrayResult();

        $keys = array_unique(array_column($result, 'name'));
        sort($keys);

        $rval = [];
        foreach ($result as $item) {
            $rval[$item['name']] = $item;

            if (count($rval) === count($keys)) {
                break;
            }
        }

        krsort($rval);

        return array_values($rval);
    }
}