<?php

namespace App\Controller;

use App\Repository\SourceDataRepository;
use App\Repository\SourceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api")]
class SourceController extends AbstractController
{
    #[Route('/sources', name: 'source_list')]
    public function list(SourceRepository $repository, NormalizerInterface $normalizer): JsonResponse
    {
        return new JsonResponse(
            $normalizer->normalize($repository->findAll())
        );
    }

    #[Route("/source/{name}/info", name: "source_info")]
    public function info(
        string $name,
        SourceDataRepository $sourceDataRepository,
        SourceRepository $sourceRepository,
    ): JsonResponse {
        $source = $sourceRepository->findOneBy(['name' => $name]);

        if ($source === null) {
            throw new NotFoundHttpException(\sprintf('Unable to find source "%s"', $name));
        }

        return new JsonResponse(
            array_merge(
                [
                    'name' => $source->getName(),
                    'resolution' => $source->getResolution(),
                    'maxValue' => $source->getMaxValue(),
                ],
                $sourceDataRepository->getInfo($name),
            )
        );
    }


    #[Route("/source/{name}/data", name: "source_data")]
    public function data(
        string $name,
        SourceDataRepository $repository,
        Request $request
    ): JsonResponse {
        return new JsonResponse(
            $repository->getData($name, $request->get('created'), $request->get('target'))
        );
    }

    #[Route("/source/{name}/point", name: "source_point")]
    public function find(
        string $name,
        Request $request,
        SourceDataRepository $repository
    ): JsonResponse {
        $data = $repository->getDetail(
            $name,
            (float)$request->get('latitude'),
            (float)$request->get('longitude'),
            $request->get('created'),
            $request->get('target')
        );

        return new JsonResponse($data[0] ?? []);
    }
}
