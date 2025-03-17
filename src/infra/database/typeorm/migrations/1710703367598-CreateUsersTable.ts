import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1710703367598 implements MigrationInterface {
    name = 'CreateUsersTable1710703367598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" (
            "id" UUID NOT NULL PRIMARY KEY, 
            "name" VARCHAR(255) NOT NULL, 
            "is_active" BOOLEAN NOT NULL DEFAULT true, 
            "email" VARCHAR(255) NOT NULL, 
            "password" VARCHAR(255) NOT NULL, 
            "notes" VARCHAR(255) NOT NULL DEFAULT '', 
            "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "deletedAt" TIMESTAMPTZ NULL
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users";`);
    }
}