<?php

namespace App\Controller;

use App\Repository\SourceDataRepository;
use App\Service\StateService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api")]
class SourceController extends AbstractController
{
    #[Route("/data", name: "data")]
    public function data(SourceDataRepository $repository, StateService $service): JsonResponse
    {
        $test = $repository->getData();

        return new JsonResponse($test);
    }

    #[Route("/find", name: "find")]
    public function find(Request $request, SourceDataRepository $repository): JsonResponse
    {
        $test = $repository->getDetail((float)$request->get('latitude'), (float)$request->get('longitude'));

        return new JsonResponse($test);
    }
}
