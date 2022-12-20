import { MigrationInterface, QueryRunner } from 'typeorm';

export class rolePermissionGrantedColumn1671515260752
  implements MigrationInterface
{
  name = 'rolePermissionGrantedColumn1671515260752';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD "granted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP COLUMN "granted"`,
    );
  }
}
