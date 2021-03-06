<?php

namespace App\Repository;

use App\Entity\SourceData;
use App\Service\DistanceTrait;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SourceData|null find($id, $lockMode = null, $lockVersion = null)
 * @method SourceData|null findOneBy(array $criteria, array $orderBy = null)
 * @method SourceData[]    findAll()
 * @method SourceData[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SourceDataRepository extends ServiceEntityRepository
{
    use DistanceTrait;

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SourceData::class);
    }

    public function getInfo(string $name): array
    {
        $availableData = $this->createQueryBuilder('data')
            ->select('DISTINCT data.createdDate, data.targetDate')
            ->leftJoin('data.source', 'source')
            ->where('source.name = :name')->setParameter('name', $name)
            ->orderBy('data.createdDate', 'DESC')
            ->addOrderBy('data.targetDate', 'DESC')
            ->getQuery()
            ->getArrayResult();

        $statistics = $this->createQueryBuilder('data')
            ->select('MIN(data.value) as min')
            ->addSelect('MAX(data.value) as max')
            ->addSelect('ROUND(AVG(data.value), 2) as average')
            ->leftJoin('data.source', 'source')
            ->where('source.name = :name')->setParameter('name', $name)
            ->getQuery()
            ->getSingleResult();

        $available = [];
        foreach ($availableData as $item) {
            $createdDate = $item['createdDate']->format('Y-m-d');

            $available[$createdDate][] = [
                'created' => $createdDate,
                'target' => $item['targetDate']->format('Y-m-d'),
            ];
        }

        return [
            'statistics' => $statistics,
            'available' => $available,
        ];
    }

    public function getData(string $name, ?string $created, ?string $target): array
    {
        $builder = $this->createQueryBuilder('data')
            ->select('data.latitude', 'data.longitude', 'data.value')
            ->leftJoin('data.source', 'source')
            ->where('source.name = :name')->setParameter('name', $name);

        if ($created) {
            $builder->andWhere('data.createdDate = :created_date')->setParameter('created_date', $created);
        }

        if ($target) {
            $builder->andWhere('data.targetDate = :target_date')->setParameter('target_date', $target);
        }

        return $builder->getQuery()->getArrayResult();
    }

    public function getDetail(string $name, float $latitude, float $longitude, ?string $created, ?string $target): array
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
            ->where('source.name = :name')->setParameter('name', $name);

        if ($created !== null) {
            $query->andWhere('data.createdDate = :created_date')->setParameter('created_date', $created);
        }

        if ($target !== null) {
            $query->andWhere('data.targetDate = :target_date')->setParameter('target_date', $target);
        }

        $query->orderBy('distance', 'ASC');

        return $query
            ->getQuery()
            ->getArrayResult();
    }
}
