import { MigrationInterface, QueryRunner } from 'typeorm';

export class jobPostTables1671379896729 implements MigrationInterface {
  name = 'jobPostTables1671379896729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "stateId" uuid, CONSTRAINT "PK_15f44c4b9fbb84e28a0346e930f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "stateId" uuid, CONSTRAINT "PK_9331dcc9601546cc211e12d9be6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "content" character varying, "stateId" uuid, "typeId" uuid, "categoryId" uuid, "locationId" uuid, CONSTRAINT "PK_a70f902a85e6de57340d153c813" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "job_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying, "resume" character varying, "stateId" uuid, "jobId" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD CONSTRAINT "FK_b95feebb9a689c705fbe4c083f3" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_location" ADD CONSTRAINT "FK_2f8b11bb4b18d44239f658a3732" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD CONSTRAINT "FK_1e304bc348159b90bbbb2a2a2ac" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD CONSTRAINT "FK_bc92904b94be09aa5fe4662db1b" FOREIGN KEY ("typeId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD CONSTRAINT "FK_74b4a0afb8518b85ba868bf8ddb" FOREIGN KEY ("categoryId") REFERENCES "job_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD CONSTRAINT "FK_f0a5f7fd4b225ae5d4ed1fa2852" FOREIGN KEY ("locationId") REFERENCES "job_location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD CONSTRAINT "FK_b2cbb02efdc602bde6493514b64" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD CONSTRAINT "FK_d0452612ad9cb0e20f6f320ebc0" FOREIGN KEY ("jobId") REFERENCES "job_post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP CONSTRAINT "FK_d0452612ad9cb0e20f6f320ebc0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP CONSTRAINT "FK_b2cbb02efdc602bde6493514b64"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" DROP CONSTRAINT "FK_f0a5f7fd4b225ae5d4ed1fa2852"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" DROP CONSTRAINT "FK_74b4a0afb8518b85ba868bf8ddb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" DROP CONSTRAINT "FK_bc92904b94be09aa5fe4662db1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" DROP CONSTRAINT "FK_1e304bc348159b90bbbb2a2a2ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_location" DROP CONSTRAINT "FK_2f8b11bb4b18d44239f658a3732"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" DROP CONSTRAINT "FK_b95feebb9a689c705fbe4c083f3"`,
    );
    await queryRunner.query(`DROP TABLE "job_application"`);
    await queryRunner.query(`DROP TABLE "job_post"`);
    await queryRunner.query(`DROP TABLE "job_location"`);
    await queryRunner.query(`DROP TABLE "job_category"`);
  }
}
