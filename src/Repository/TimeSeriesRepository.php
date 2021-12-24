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

        $rval = [];
        foreach ($result as $item) {
            $rval[$item['name']] = $this->trimEndOfYear($item);

            if (count($rval) === count($keys)) {
                break;
            }
        }

        krsort($rval);

        return array_values($rval);
    }

    /**
     * Nullifies zero data from the end of the year to the last value
     *
     * @param array $data
     * @return array
     */
    public function trimEndOfYear(array $data): array
    {
        $offset = null;

        for (end($data['value']); ($currentKey=key($data['value']))!==null; prev($data['value'])){
            $currentElement = current($data['value']);

            if ($currentElement !== '0') {
                $offset = $currentKey + 1;
                break;
            }
        }

        $count = count($data['value']);

        while ($offset < $count) {
            $data['value'][$offset] = null;

            $offset++;
        }

        return $data;
    }
}