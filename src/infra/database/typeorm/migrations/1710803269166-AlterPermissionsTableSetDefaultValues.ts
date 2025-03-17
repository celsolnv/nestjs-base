import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterPermissionsTableSetDefaultValues1710803269166 implements MigrationInterface {
    name = 'AlterPermissionsTableSetDefaultValues1710803269166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "create" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "read" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "update" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "delete" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "delete" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "update" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "read" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "permissions" ALTER COLUMN "create" SET DEFAULT true`);
    }
}