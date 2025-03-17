import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUsersTableAddDocument1711037429429 implements MigrationInterface {
    name = 'AlterUsersTableAddDocument1711037429429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adiciona a coluna "document" como NULLABLE primeiro
        await queryRunner.query(`ALTER TABLE "users" ADD "document" VARCHAR(14) NULL`);
        
        // Altera o tipo de "password" para VARCHAR(255) e permite NULOS
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(255)`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Altera o tipo de "password" para VARCHAR(255) e não permite NULOS
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" TYPE VARCHAR(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "document"`);
    }
}