<?php

namespace App\Repository;

use App\Entity\Source;
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

    // /**
    //  * @return IndexData[] Returns an array of IndexData objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function getData(): array
    {
        return $this->createQueryBuilder('s')
            ->select('s.latitude', 's.longitude', 's.value')
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
