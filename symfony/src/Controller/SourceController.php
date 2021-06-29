<?php

namespace App\Controller;

use App\Repository\SourceDataRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SourceController extends AbstractController
{
    #[Route("/", name: "data")]
    public function data(SourceDataRepository $repository)
    {
        return new JsonResponse($repository->getData());
    }
}
