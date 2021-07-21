<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    public function __construct(protected KernelInterface $kernel)
    {
    }

    #[Route("/", name: "home")]
    public function home(): Response
    {
        return new Response(file_get_contents($this->kernel->getProjectDir() . '/public/index.html'));
    }
}
