<?php

namespace App\Controller;

use App\Repository\SourceDataRepository;
use App\Service\StateService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SourceController extends AbstractController
{
    #[Route("/", name: "data")]
    public function data(SourceDataRepository $repository, StateService $service)
    {
        $test = $repository->getData();

        return new JsonResponse($test);
    }
}
