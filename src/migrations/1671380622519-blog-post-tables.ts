import { MigrationInterface, QueryRunner } from 'typeorm';

export class blogPostTables1671380622519 implements MigrationInterface {
  name = 'blogPostTables1671380622519';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "stateId" uuid, CONSTRAINT "PK_32b67ddf344608b5c2fb95bc90c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "content" character varying, "image" character varying, "duration" numeric, "stateId" uuid, "durationUnitId" uuid, "categoryId" uuid, "authorId" uuid, CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_category" ADD CONSTRAINT "FK_75e2df5671091e15bcca57ada6e" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD CONSTRAINT "FK_30ef81e1bdcafa5d2f20746431f" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD CONSTRAINT "FK_532d28da4cfdae8637ab7b59e4c" FOREIGN KEY ("durationUnitId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD CONSTRAINT "FK_a1ba67336686c3de21bbed2d7cc" FOREIGN KEY ("categoryId") REFERENCES "blog_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD CONSTRAINT "FK_657e11001f05ef48b5383f5a637" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_657e11001f05ef48b5383f5a637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_a1ba67336686c3de21bbed2d7cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_532d28da4cfdae8637ab7b59e4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_30ef81e1bdcafa5d2f20746431f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_category" DROP CONSTRAINT "FK_75e2df5671091e15bcca57ada6e"`,
    );
    await queryRunner.query(`DROP TABLE "blog_post"`);
    await queryRunner.query(`DROP TABLE "blog_category"`);
  }
}
