<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    public function __construct(protected string $projectDir)
    {
    }

    #[Route("/", name: "home")]
    public function home(): Response
    {
        return new Response(file_get_contents($this->projectDir . '/public/index.html'));
    }
}
