import { MigrationInterface, QueryRunner } from 'typeorm';

export class indexCourseTagAndLanguage1674132130006
  implements MigrationInterface
{
  name = 'indexCourseTagAndLanguage1674132130006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_ee2a1bfbc6738eacd1d0646c50" ON "course_language" ("courseId", "languageId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_0e626e90b3e668015f171f8fc6" ON "course_tag" ("courseId", "tagId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0e626e90b3e668015f171f8fc6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ee2a1bfbc6738eacd1d0646c50"`,
    );
  }
}
