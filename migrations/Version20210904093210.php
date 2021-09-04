<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210904093210 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE import (id INT AUTO_INCREMENT NOT NULL, filename VARCHAR(255) NOT NULL, datetime DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `source` (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, INDEX name_idx (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `source_data` (id INT AUTO_INCREMENT NOT NULL, source_id INT NOT NULL, import_id INT NOT NULL, target_date DATETIME NOT NULL, created_date DATETIME NOT NULL, latitude DOUBLE PRECISION NOT NULL, longitude DOUBLE PRECISION NOT NULL, value DOUBLE PRECISION DEFAULT NULL, INDEX IDX_AC797660953C1C61 (source_id), INDEX IDX_AC797660B6A263D9 (import_id), INDEX source_idx (source_id, created_date, target_date, latitude, longitude), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `source_data` ADD CONSTRAINT FK_AC797660953C1C61 FOREIGN KEY (source_id) REFERENCES `source` (id)');
        $this->addSql('ALTER TABLE `source_data` ADD CONSTRAINT FK_AC797660B6A263D9 FOREIGN KEY (import_id) REFERENCES import (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `source_data` DROP FOREIGN KEY FK_AC797660B6A263D9');
        $this->addSql('ALTER TABLE `source_data` DROP FOREIGN KEY FK_AC797660953C1C61');
        $this->addSql('DROP TABLE import');
        $this->addSql('DROP TABLE `source`');
        $this->addSql('DROP TABLE `source_data`');
    }
}
