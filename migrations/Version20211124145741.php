<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211124145741 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `time_series` (id INT AUTO_INCREMENT NOT NULL, import_id INT NOT NULL, source_id INT NOT NULL, value LONGTEXT NOT NULL COMMENT \'(DC2Type:simple_array)\', `interval` VARCHAR(255) NOT NULL, latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL, created_date DATE NOT NULL, target_date DATE NOT NULL, INDEX IDX_63E64EDBB6A263D9 (import_id), INDEX IDX_63E64EDB953C1C61 (source_id), INDEX time_series (source_id, created_date, target_date, latitude, longitude), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `time_series` ADD CONSTRAINT FK_63E64EDBB6A263D9 FOREIGN KEY (import_id) REFERENCES import (id)');
        $this->addSql('ALTER TABLE `time_series` ADD CONSTRAINT FK_63E64EDB953C1C61 FOREIGN KEY (source_id) REFERENCES `source` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE `time_series`');
    }
}
