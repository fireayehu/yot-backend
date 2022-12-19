import { MigrationInterface, QueryRunner } from 'typeorm';

export class educationTables1671433867927 implements MigrationInterface {
  name = 'educationTables1671433867927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP CONSTRAINT "FK_0f33fb13e4d86de18cd29152a3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP CONSTRAINT "FK_758189aae020c90bd150b53a347"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" DROP CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669"`,
    );
    await queryRunner.query(
      `CREATE TABLE "education_field" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "stateId" uuid, CONSTRAINT "PK_d9cd496bfabf32d810abb1a6db3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "education_level" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "shortCode" character varying, "stateId" uuid, CONSTRAINT "PK_9a1eefa72d49ac5c0dd91dabcc1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "stateId" uuid, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "data_lookup" ADD "isActive" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_field" ADD CONSTRAINT "FK_1e3b09f13ffe0a8b304527fa2e4" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_level" ADD CONSTRAINT "FK_e4a6bf4886045ed9d85023fadf2" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD CONSTRAINT "FK_0f33fb13e4d86de18cd29152a3e" FOREIGN KEY ("educationFieldId") REFERENCES "education_field"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD CONSTRAINT "FK_758189aae020c90bd150b53a347" FOREIGN KEY ("educationLevelId") REFERENCES "education_level"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_b42272e856c81062d4daa2622ba" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_us" DROP CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_b42272e856c81062d4daa2622ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP CONSTRAINT "FK_758189aae020c90bd150b53a347"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP CONSTRAINT "FK_0f33fb13e4d86de18cd29152a3e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_level" DROP CONSTRAINT "FK_e4a6bf4886045ed9d85023fadf2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_field" DROP CONSTRAINT "FK_1e3b09f13ffe0a8b304527fa2e4"`,
    );
    await queryRunner.query(`ALTER TABLE "data_lookup" DROP COLUMN "isActive"`);
    await queryRunner.query(`DROP TABLE "service"`);
    await queryRunner.query(`DROP TABLE "education_level"`);
    await queryRunner.query(`DROP TABLE "education_field"`);
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669" FOREIGN KEY ("serviceId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD CONSTRAINT "FK_758189aae020c90bd150b53a347" FOREIGN KEY ("educationLevelId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD CONSTRAINT "FK_0f33fb13e4d86de18cd29152a3e" FOREIGN KEY ("educationFieldId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
