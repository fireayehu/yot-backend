import { MigrationInterface, QueryRunner } from "typeorm";

export class reviewTables1671377558704 implements MigrationInterface {
    name = 'reviewTables1671377558704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course_review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying, "rating" integer NOT NULL, "stateId" uuid, "courseId" uuid, "userId" uuid, CONSTRAINT "PK_6778f8a83352215ea3268869658" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_345392edda3012b2b49aee648d" ON "course_review" ("userId", "courseId") `);
        await queryRunner.query(`CREATE TABLE "instructor_review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "comment" character varying, "rating" integer NOT NULL, "stateId" uuid, "instructorId" uuid, "userId" uuid, CONSTRAINT "PK_91638ec5df018345be6f0137155" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_a05a887ac1accd80d1297c06ec" ON "instructor_review" ("userId", "instructorId") `);
        await queryRunner.query(`ALTER TABLE "course_review" ADD CONSTRAINT "FK_aa5e601c3e6e6ac8086c63b9c8a" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_review" ADD CONSTRAINT "FK_9fac4258c1f8b81a63bc5fd46b8" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_review" ADD CONSTRAINT "FK_6a98c500e1ee246e073af304c5b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor_review" ADD CONSTRAINT "FK_282d81653860ed8f94b3ce296b1" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor_review" ADD CONSTRAINT "FK_3b1d6523769c0a6b7f13773a7bf" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "instructor_review" ADD CONSTRAINT "FK_eff3a6849168590452021e9b52b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructor_review" DROP CONSTRAINT "FK_eff3a6849168590452021e9b52b"`);
        await queryRunner.query(`ALTER TABLE "instructor_review" DROP CONSTRAINT "FK_3b1d6523769c0a6b7f13773a7bf"`);
        await queryRunner.query(`ALTER TABLE "instructor_review" DROP CONSTRAINT "FK_282d81653860ed8f94b3ce296b1"`);
        await queryRunner.query(`ALTER TABLE "course_review" DROP CONSTRAINT "FK_6a98c500e1ee246e073af304c5b"`);
        await queryRunner.query(`ALTER TABLE "course_review" DROP CONSTRAINT "FK_9fac4258c1f8b81a63bc5fd46b8"`);
        await queryRunner.query(`ALTER TABLE "course_review" DROP CONSTRAINT "FK_aa5e601c3e6e6ac8086c63b9c8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a05a887ac1accd80d1297c06ec"`);
        await queryRunner.query(`DROP TABLE "instructor_review"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_345392edda3012b2b49aee648d"`);
        await queryRunner.query(`DROP TABLE "course_review"`);
    }

}
