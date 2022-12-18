import { MigrationInterface, QueryRunner } from 'typeorm';

export class contactUsTable1671381009320 implements MigrationInterface {
  name = 'contactUsTable1671381009320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_us" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying, "message" character varying NOT NULL, "stateId" uuid, "serviceId" uuid, CONSTRAINT "PK_b61766a4d93470109266b976cfe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD CONSTRAINT "FK_3c5e827197e9cd06bc009efc72a" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669" FOREIGN KEY ("serviceId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_us" DROP CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" DROP CONSTRAINT "FK_3c5e827197e9cd06bc009efc72a"`,
    );
    await queryRunner.query(`DROP TABLE "contact_us"`);
  }
}
