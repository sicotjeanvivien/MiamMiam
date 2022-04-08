<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220408082053 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment CHANGE updated updated DATETIME on update CURRENT_TIMESTAMP');
        $this->addSql('ALTER TABLE ingredient CHANGE updated updated DATETIME on update CURRENT_TIMESTAMP');
        $this->addSql('ALTER TABLE recipe ADD name VARCHAR(255) NOT NULL, CHANGE updated updated DATETIME on update CURRENT_TIMESTAMP');
        $this->addSql('ALTER TABLE user CHANGE updated updated DATETIME on update CURRENT_TIMESTAMP');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE comment CHANGE updated updated DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE ingredient CHANGE updated updated DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE recipe DROP name, CHANGE updated updated DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE `user` CHANGE updated updated DATETIME DEFAULT NULL');
    }
}
