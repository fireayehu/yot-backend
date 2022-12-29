import { MigrationInterface, QueryRunner } from 'typeorm';

export class phonenumberColumnUserTable1672329332654
  implements MigrationInterface
{
  name = 'phonenumberColumnUserTable1672329332654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "countryCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "phoneNumber" character varying`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f2578043e491921209f5dadd08" ON "user" ("phoneNumber") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f2578043e491921209f5dadd08"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "countryCode"`);
  }
}
