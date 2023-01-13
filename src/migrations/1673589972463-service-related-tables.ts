import { MigrationInterface, QueryRunner } from 'typeorm';

export class serviceRelatedTables1673589972463 implements MigrationInterface {
  name = 'serviceRelatedTables1673589972463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact_us" DROP CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" RENAME COLUMN "serviceId" TO "subServiceId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "image" character varying, "stateId" uuid, "serviceId" uuid, CONSTRAINT "PK_e1bbd5a512154b635bfcef2f78b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_sub_service" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "stateId" uuid, "userId" uuid, "serviceId" uuid, CONSTRAINT "PK_b2233a5a3da58cee5c762634934" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "image" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "service" ADD "typeId" uuid`);
    await queryRunner.query(`ALTER TABLE "payment" ADD "subServiceId" uuid`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7806a14d42c3244064b4a1706c" ON "service" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD CONSTRAINT "FK_9890172914c5b65b012647d2295" FOREIGN KEY ("typeId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_service" ADD CONSTRAINT "FK_a15471f0198dd98c50a474fc1da" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_service" ADD CONSTRAINT "FK_3bc65718d8c73095e9faadba2ab" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD CONSTRAINT "FK_24df9eb92c2941381df929ab8e1" FOREIGN KEY ("subServiceId") REFERENCES "sub_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sub_service" ADD CONSTRAINT "FK_ec140fde71ed9cfbdaf298c9c10" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sub_service" ADD CONSTRAINT "FK_79f22cca6102a6fd7f243e14cc8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sub_service" ADD CONSTRAINT "FK_d83b28b379c37589bf77c7e808e" FOREIGN KEY ("serviceId") REFERENCES "sub_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_a75c661fb550c842608289d3794" FOREIGN KEY ("subServiceId") REFERENCES "user_sub_service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_a75c661fb550c842608289d3794"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sub_service" DROP CONSTRAINT "FK_d83b28b379c37589bf77c7e808e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sub_service" DROP CONSTRAINT "FK_79f22cca6102a6fd7f243e14cc8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_sub_service" DROP CONSTRAINT "FK_ec140fde71ed9cfbdaf298c9c10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" DROP CONSTRAINT "FK_24df9eb92c2941381df929ab8e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_service" DROP CONSTRAINT "FK_3bc65718d8c73095e9faadba2ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sub_service" DROP CONSTRAINT "FK_a15471f0198dd98c50a474fc1da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" DROP CONSTRAINT "FK_9890172914c5b65b012647d2295"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7806a14d42c3244064b4a1706c"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "subServiceId"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "typeId"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "image"`);
    await queryRunner.query(`DROP TABLE "user_sub_service"`);
    await queryRunner.query(`DROP TABLE "sub_service"`);
    await queryRunner.query(
      `ALTER TABLE "contact_us" RENAME COLUMN "subServiceId" TO "serviceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD CONSTRAINT "FK_09be36c9bb8a35d8d8cd5f45669" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
