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
        $result = [];

        foreach ($repository->getInfo($name) as $info) {
            $result[] = [
                'created' => $info['createdDate']->format('Y-m-d'),
                'target' => $info['targetDate']->format('Y-m-d'),
            ];
        }

        return new JsonResponse(
            [
                'available' => $result,
            ]
        );
    }


    #[Route("/source/{name}/data", name: "data")]
    public function data(
        string $name,
        SourceDataRepository $repository,
        Request $request
    ): JsonResponse {
        return new JsonResponse(
            $repository->getData($name, $request->get('created'), $request->get('target'))
        );
    }

    #[Route("/find", name: "find")]
    public function find(
        Request $request,
        SourceDataRepository $repository
    ): JsonResponse {
        $test = $repository->getDetail((float)$request->get('latitude'), (float)$request->get('longitude'));

        return new JsonResponse($test);
    }
}
