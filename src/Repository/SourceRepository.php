<?php

namespace App\Repository;

use App\Entity\Import;
use App\Entity\Source;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Source|null find($id, $lockMode = null, $lockVersion = null)
 * @method Source|null findOneBy(array $criteria, array $orderBy = null)
 * @method Source[]    findAll()
 * @method Source[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SourceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Source::class);
    }

    public function getSource(string $name): Source
    {
        $source = $this->findOneBy(['name' => $name]);

        if ($source !== null) {
            return $source;
        }

        $source = new Source();
        $source->setName($name);

        $this->getEntityManager()->persist($source);
        $this->getEntityManager()->flush();

        return $source;
    }
}
