import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolesTables1710703482411 implements MigrationInterface {
    name = 'CreateRolesTables1710703482411'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" (
            "id" UUID NOT NULL PRIMARY KEY, 
            "name" VARCHAR(50) NOT NULL CHECK ("name" IN ('users', 'roles')), 
            "create" BOOLEAN NOT NULL DEFAULT false, 
            "read" BOOLEAN NOT NULL DEFAULT false, 
            "update" BOOLEAN NOT NULL DEFAULT false, 
            "delete" BOOLEAN NOT NULL DEFAULT false, 
            "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "deletedAt" TIMESTAMPTZ NULL, 
            "roleId" UUID NULL
        );`);

        await queryRunner.query(`CREATE TABLE "roles" (
            "id" UUID NOT NULL PRIMARY KEY, 
            "name" VARCHAR(255) NOT NULL, 
            "is_active" BOOLEAN NOT NULL DEFAULT true, 
            "notes" VARCHAR(255) NOT NULL, 
            "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "deletedAt" TIMESTAMPTZ NULL
        );`);

        await queryRunner.query(`ALTER TABLE "permissions" 
            ADD CONSTRAINT "FK_roleId"
            FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_roleId";`);
        await queryRunner.query(`DROP TABLE "roles";`);
        await queryRunner.query(`DROP TABLE "permissions";`);
    }
}