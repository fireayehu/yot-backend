import { MigrationInterface, QueryRunner } from 'typeorm';

export class educationPlaceTable1672344332340 implements MigrationInterface {
  name = 'educationPlaceTable1672344332340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "instructor" RENAME COLUMN "educationPlace" TO "educationPlaceId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "education_place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "stateId" uuid, CONSTRAINT "PK_e20bfd933a64dcc074a0abdb65a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP COLUMN "educationPlaceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD "educationPlaceId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_place" ADD CONSTRAINT "FK_39642c287e20e143d96ad4cddd6" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD CONSTRAINT "FK_1d956b7f13fa98a5228e17d8af0" FOREIGN KEY ("educationPlaceId") REFERENCES "education_place"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP CONSTRAINT "FK_1d956b7f13fa98a5228e17d8af0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_place" DROP CONSTRAINT "FK_39642c287e20e143d96ad4cddd6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" DROP COLUMN "educationPlaceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD "educationPlaceId" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "education_place"`);
    await queryRunner.query(
      `ALTER TABLE "instructor" RENAME COLUMN "educationPlaceId" TO "educationPlace"`,
    );
  }
}
