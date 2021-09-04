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

    public function getData(string $name, string $created, string $target): array
    {
        return $this->createQueryBuilder('data')
            ->select('data.latitude', 'data.longitude', 'data.value')
            ->leftJoin('data.source', 'source')
            ->where('source.name = :name')->setParameter('name', $name)
            ->andWhere('data.createdDate = :created_date')->setParameter('created_date', $created)
            ->andWhere('data.targetDate = :target_date')->setParameter('target_date', $target)
            ->getQuery()
            ->getArrayResult();
    }

    public function getDetail(float $latitude, float $longitude): array
    {
        return $this->createQueryBuilder('s')
            ->select('s.latitude', 's.longitude', 's.value', $this->getDistanceQuery($latitude, $longitude))
            ->getQuery()
            ->getArrayResult();
    }
}
