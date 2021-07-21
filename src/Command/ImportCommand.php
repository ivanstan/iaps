<?php

namespace App\Command;

use App\Entity\Import;
use App\Entity\Index;
use App\Entity\Source;
use App\Entity\SourceData;
use App\Service\StateService;
use Doctrine\ORM\EntityManagerInterface;
use Location\Coordinate;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(
    name: 'import',
    description: 'Add a short description for your command',
)]
class ImportCommand extends Command
{
    private const BATCH_SIZE = 50;

    public function __construct(protected EntityManagerInterface $entityManager, protected StateService $service)
    {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
//        $io = new SymfonyStyle($input, $output);
//        $arg1 = $input->getArgument('arg1');
//
        //        if ($arg1) {
        //            $io->note(sprintf('You passed an argument: %s', $arg1));
        //        }
        //
        //        if ($input->getOption('option1')) {
        //            // ...
        //        }
        //
        //        $io->success('You have a new command! Now make it your own! Pass --help to see your options.');

        $polygon = $this->service->setUp();

        $import = new Import();
        $import->setDatetime(new \DateTime());
        $this->entityManager->persist($import);
        $this->entityManager->flush();

        /** @var Source $source */
        $source = $this->entityManager->getRepository(Source::class)->find(1);
        $date = new \DateTime();

        $row = 1;
        if (!(($handle = fopen('./storage/idx_03_2021.csv', 'rb')) === false)) {
            while (($data = fgetcsv($handle, 1000, ',')) !== false) {
                if ($row === 1) {
                    $row++;
                    continue;
                }

                if (!$polygon->contains(new Coordinate($data[0], $data[1]))) {
                    $row++;
                    continue;
                }

                $entity = new SourceData();
                $entity->setLatitude($data[0]);
                $entity->setLongitude($data[1]);
                $entity->setValue($data[2]);
                $entity->setDatetime($date);
                $entity->setImport($import);
                $entity->setSource($source);

                $this->entityManager->persist($entity);
                if (($row % self::BATCH_SIZE) === 0) {
                    $this->entityManager->flush();
                }

                $row++;
            }

            $this->entityManager->flush();
            $this->entityManager->clear();

            fclose($handle);
        }

        return Command::SUCCESS;
    }
}
