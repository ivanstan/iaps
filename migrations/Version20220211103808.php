<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220211103808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `source_data_object` (id INT AUTO_INCREMENT NOT NULL, import_id INT NOT NULL, source_id INT NOT NULL, value JSON DEFAULT NULL, latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL, INDEX IDX_F42CCA55B6A263D9 (import_id), INDEX IDX_F42CCA55953C1C61 (source_id), INDEX source_idx (source_id, latitude, longitude), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `source_data_object` ADD CONSTRAINT FK_F42CCA55B6A263D9 FOREIGN KEY (import_id) REFERENCES import (id)');
        $this->addSql('ALTER TABLE `source_data_object` ADD CONSTRAINT FK_F42CCA55953C1C61 FOREIGN KEY (source_id) REFERENCES `source` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE `source_data_object`');
    }
}
