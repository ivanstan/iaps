<?php

namespace App;

use Symfony\Bundle\FrameworkBundle\Kernel\MicroKernelTrait;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;
use Symfony\Component\HttpKernel\Kernel as BaseKernel;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class Kernel extends BaseKernel
{
    use MicroKernelTrait;

    protected function configureContainer(ContainerConfigurator $container): void
    {
        $container->import('../etc/{packages}/*.yaml');
        $container->import('../etc/{packages}/'.$this->environment.'/*.yaml');

        if (is_file(\dirname(__DIR__).'/etc/services.yaml')) {
            $container->import('../etc/services.yaml');
            $container->import('../etc/{services}_'.$this->environment.'.yaml');
        } else {
            $container->import('../etc/{services}.php');
        }
    }

    protected function configureRoutes(RoutingConfigurator $routes): void
    {
        $routes->import('../etc/{routes}/'.$this->environment.'/*.yaml');
        $routes->import('../etc/{routes}/*.yaml');

        if (is_file(\dirname(__DIR__).'/etc/routes.yaml')) {
            $routes->import('../etc/routes.yaml');
        } else {
            $routes->import('../etc/{routes}.php');
        }
    }
}
