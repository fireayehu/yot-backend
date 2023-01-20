import { MigrationInterface, QueryRunner } from 'typeorm';

export class blogJsonbContentColumn1674201611151 implements MigrationInterface {
  name = 'blogJsonbContentColumn1674201611151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog_post" DROP COLUMN "content"`);
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD "content" jsonb NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog_post" DROP COLUMN "content"`);
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD "content" character varying`,
    );
  }
}
