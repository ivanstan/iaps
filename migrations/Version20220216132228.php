<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220216132228 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE source_data DROP FOREIGN KEY FK_AC797660B6A263D9');
        $this->addSql('ALTER TABLE source_data ADD CONSTRAINT FK_AC797660B6A263D9 FOREIGN KEY (import_id) REFERENCES import (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE time_series DROP FOREIGN KEY FK_63E64EDBB6A263D9');
        $this->addSql('ALTER TABLE time_series ADD CONSTRAINT FK_63E64EDBB6A263D9 FOREIGN KEY (import_id) REFERENCES import (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `source_data` DROP FOREIGN KEY FK_AC797660B6A263D9');
        $this->addSql('ALTER TABLE `source_data` ADD CONSTRAINT FK_AC797660B6A263D9 FOREIGN KEY (import_id) REFERENCES import (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE `time_series` DROP FOREIGN KEY FK_63E64EDBB6A263D9');
        $this->addSql('ALTER TABLE `time_series` ADD CONSTRAINT FK_63E64EDBB6A263D9 FOREIGN KEY (import_id) REFERENCES import (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
