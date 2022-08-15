<?php

namespace App\Controller;

use App\Repository\SourceDataObjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

#[Route("/api/climatology")]
class ClimatologyController extends AbstractController
{
    public function __construct(protected SourceDataObjectRepository $repository, protected NormalizerInterface $normalizer)
    {
    }

    #[Route("/map/{source}/{subSource}")]
    public function getMapData(string $source, string $subSource): JsonResponse
    {
        return new JsonResponse(
            $this->normalizer->normalize(
                $this->repository->getData($source, $subSource)
            )
        );
    }

    #[Route("/data/{source}")]
    public function getPointData(string $source, Request $request): JsonResponse
    {
        return new JsonResponse(
            $this->normalizer->normalize(
              $this->repository->getNeareast(
                  $source,
                  (float)$request->get('latitude'),
                  (float)$request->get('longitude'),
              )
            )
        );
    }
}
