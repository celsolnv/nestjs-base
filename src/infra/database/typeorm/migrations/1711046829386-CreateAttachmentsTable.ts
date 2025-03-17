import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAttachmentsTable1711046829386 implements MigrationInterface {
    name = 'CreateAttachmentsTable1711046829386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachments" (
            "id" UUID NOT NULL, 
            "fieldname" VARCHAR(255) NOT NULL, 
            "originalname" VARCHAR(255) NOT NULL, 
            "mimetype" VARCHAR(255) NOT NULL, 
            "destination" VARCHAR(255) NOT NULL, 
            "filename" VARCHAR(255) NOT NULL, 
            "path" VARCHAR(255) NULL, 
            "size" INT NOT NULL, 
            "fileUrl" VARCHAR(255) NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
            "deletedAt" TIMESTAMP(6) NULL, 
            PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "attachments"`);
    }
}