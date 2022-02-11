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

    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SourceDataObject::class);
    }

    public function getData(string $source, string $subSource)
    {
        $builder = $this->createQueryBuilder('data');
        $builder->select(['data.latitude', 'data.longitude', 'data.value']);
        $builder->join('data.source', 'source');
        $builder->where('source.name = :source')->setParameter('source', $source);

        $data = $builder->getQuery()->getArrayResult();

        foreach ($data as $key => $item) {
            $data[$key]['value'] = $item['value'][$subSource];
        }

        $source = $this->getEntityManager()->getRepository(Source::class)->getSource($source);

        return [
            'data' => $data,
            'info' => $source
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

        return $builder->getQuery()->getArrayResult()[0];
    }
}
