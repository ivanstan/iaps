<?php

namespace App\Controller;

use App\Repository\SourceDataRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api")]
class SourceController extends AbstractController
{
    #[Route("/source/{name}/info", name: "source_info")]
    public function info(
        string $name,
        SourceDataRepository $repository
    ): JsonResponse {
        return new JsonResponse(
            $repository->getInfo($name)
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
