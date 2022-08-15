<?php

namespace App\Controller;

use App\Repository\TimeSeriesRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api")]
class TimeSeriesController extends AbstractController
{
    #[Route("/graph/{name}/info")]
    public function info(string $name, TimeSeriesRepository $repository): JsonResponse
    {
        return new JsonResponse(
            $repository->getInfo($name)
        );
    }

    #[Route("/graph/{name}/data")]
    public function data(string $name, Request $request, TimeSeriesRepository $repository): JsonResponse
    {
        return new JsonResponse(
            $repository->getData(
                $name,
                (float)$request->get('latitude'),
                (float)$request->get('longitude'),
                $request->get('created'),
            )
        );
    }
}
