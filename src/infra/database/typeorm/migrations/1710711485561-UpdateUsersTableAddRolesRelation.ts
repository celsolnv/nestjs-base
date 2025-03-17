import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUsersTableAddRolesRelation1710711485561 implements MigrationInterface {
    name = 'UpdateUsersTableAddRolesRelation1710711485561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" UUID NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_role_id" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_role_id";`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id";`);
    }
}