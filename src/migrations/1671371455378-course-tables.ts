import { MigrationInterface, QueryRunner } from "typeorm";

export class courseTables1671371455378 implements MigrationInterface {
    name = 'courseTables1671371455378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "stateId" uuid, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "stateId" uuid, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_language" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "stateId" uuid, "courseId" uuid, "languageId" uuid, CONSTRAINT "PK_cd9c4a844a8a41eebebd3fbb678" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "stateId" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "stateId" uuid, "courseId" uuid, "tagId" uuid, CONSTRAINT "PK_6c6a0ad4b5f67db91353e5b2ae1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prerequisite" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "order" integer NOT NULL, "stateId" uuid, "courseId" uuid, CONSTRAINT "PK_79e022943cb1a2aee541f7eca89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "totalStudent" integer NOT NULL DEFAULT '0', "stateId" uuid, "courseId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "price" numeric NOT NULL DEFAULT '0', "duration" numeric NOT NULL DEFAULT '0', "preview" character varying, "image" character varying, "thumbnail" character varying, "rating" numeric NOT NULL DEFAULT '0', "totalReview" integer NOT NULL DEFAULT '0', "totalStudent" integer NOT NULL DEFAULT '0', "stateId" uuid, "categoryId" uuid, "instructorId" uuid, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course_discount" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric NOT NULL, "isPercentage" boolean NOT NULL, "validFrom" TIMESTAMP WITH TIME ZONE NOT NULL, "validUntil" TIMESTAMP WITH TIME ZONE NOT NULL, "stateId" uuid, "courseId" uuid, CONSTRAINT "PK_a8c95e77851e791254d1ff3765e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "enrolment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "stateId" uuid, "courseId" uuid, "userId" uuid, "sessionId" uuid, CONSTRAINT "PK_5d2679f6c891d77c58aa0e05f2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_dc90eb33b49dbbe83426074440" ON "enrolment" ("userId", "sessionId") `);
        await queryRunner.query(`CREATE TABLE "lesson" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "order" integer NOT NULL, "duration" numeric NOT NULL DEFAULT '0', "stateId" uuid, "durationUnitId" uuid, "sectionId" uuid, CONSTRAINT "PK_0ef25918f0237e68696dee455bd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "order" integer NOT NULL, "stateId" uuid, "moduleId" uuid, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "module" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying, "order" integer NOT NULL, "stateId" uuid, "courseId" uuid, CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_0f1747366193343a5ef77266bde" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_7bcdc035ce141672b7e2190b3ae" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_language" ADD CONSTRAINT "FK_42515bd00f46da1a84a3bfb688b" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_language" ADD CONSTRAINT "FK_2018defc91ff0c9f8b42d8ce949" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_language" ADD CONSTRAINT "FK_f85c9cea5ce0c2f79be5ed1d8de" FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_c39a83763f88c8efd6566b3a4bb" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_tag" ADD CONSTRAINT "FK_a5fd68f509a01ec58068c6d7b40" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_tag" ADD CONSTRAINT "FK_f3ad3d4417c248a437d1745883f" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_tag" ADD CONSTRAINT "FK_063751f655f43b428be845fa7d3" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prerequisite" ADD CONSTRAINT "FK_85630b26671ba89246777866d09" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prerequisite" ADD CONSTRAINT "FK_9ed5859c29f937542f6e2978d8a" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_c5d216abe580e6af6182d18d774" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_2440b236e81d633ff0613ae59d4" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_f73acc2d4d8a76b05ea09e74644" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_c6c48d73b3b32e47e9cc1cfc4c4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_32d94af473bb59d808d9a68e17b" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_discount" ADD CONSTRAINT "FK_d9d22cb03b9924c7664d643061e" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course_discount" ADD CONSTRAINT "FK_cf8b9e8c26ef2096bea1060088e" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD CONSTRAINT "FK_1de4bf3ce901849df7e79739a39" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD CONSTRAINT "FK_32654bfec59f2a78ee4c2d6c9f1" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD CONSTRAINT "FK_23a5e90b5adf89dfdfe4218b982" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrolment" ADD CONSTRAINT "FK_b19f9f6f196b4e1ed3b4793ab24" FOREIGN KEY ("sessionId") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_653ab80854f057f3a4e46d8f005" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_e61f3dee6f10afc34060ebd7df9" FOREIGN KEY ("durationUnitId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lesson" ADD CONSTRAINT "FK_70eb01d08acf5be68e3a17451b0" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_7338b6c95ef26838d30cf75ed46" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section" ADD CONSTRAINT "FK_0f905b6fa815ff6e21da6f27fb6" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "module" ADD CONSTRAINT "FK_d616d3a6a177f067ab16a454a11" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "module" ADD CONSTRAINT "FK_47d4039ae15a387ef27eccf3825" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "FK_47d4039ae15a387ef27eccf3825"`);
        await queryRunner.query(`ALTER TABLE "module" DROP CONSTRAINT "FK_d616d3a6a177f067ab16a454a11"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_0f905b6fa815ff6e21da6f27fb6"`);
        await queryRunner.query(`ALTER TABLE "section" DROP CONSTRAINT "FK_7338b6c95ef26838d30cf75ed46"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_70eb01d08acf5be68e3a17451b0"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_e61f3dee6f10afc34060ebd7df9"`);
        await queryRunner.query(`ALTER TABLE "lesson" DROP CONSTRAINT "FK_653ab80854f057f3a4e46d8f005"`);
        await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_b19f9f6f196b4e1ed3b4793ab24"`);
        await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_23a5e90b5adf89dfdfe4218b982"`);
        await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_32654bfec59f2a78ee4c2d6c9f1"`);
        await queryRunner.query(`ALTER TABLE "enrolment" DROP CONSTRAINT "FK_1de4bf3ce901849df7e79739a39"`);
        await queryRunner.query(`ALTER TABLE "course_discount" DROP CONSTRAINT "FK_cf8b9e8c26ef2096bea1060088e"`);
        await queryRunner.query(`ALTER TABLE "course_discount" DROP CONSTRAINT "FK_d9d22cb03b9924c7664d643061e"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_32d94af473bb59d808d9a68e17b"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_c6c48d73b3b32e47e9cc1cfc4c4"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_f73acc2d4d8a76b05ea09e74644"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_2440b236e81d633ff0613ae59d4"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_c5d216abe580e6af6182d18d774"`);
        await queryRunner.query(`ALTER TABLE "prerequisite" DROP CONSTRAINT "FK_9ed5859c29f937542f6e2978d8a"`);
        await queryRunner.query(`ALTER TABLE "prerequisite" DROP CONSTRAINT "FK_85630b26671ba89246777866d09"`);
        await queryRunner.query(`ALTER TABLE "course_tag" DROP CONSTRAINT "FK_063751f655f43b428be845fa7d3"`);
        await queryRunner.query(`ALTER TABLE "course_tag" DROP CONSTRAINT "FK_f3ad3d4417c248a437d1745883f"`);
        await queryRunner.query(`ALTER TABLE "course_tag" DROP CONSTRAINT "FK_a5fd68f509a01ec58068c6d7b40"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_c39a83763f88c8efd6566b3a4bb"`);
        await queryRunner.query(`ALTER TABLE "course_language" DROP CONSTRAINT "FK_f85c9cea5ce0c2f79be5ed1d8de"`);
        await queryRunner.query(`ALTER TABLE "course_language" DROP CONSTRAINT "FK_2018defc91ff0c9f8b42d8ce949"`);
        await queryRunner.query(`ALTER TABLE "course_language" DROP CONSTRAINT "FK_42515bd00f46da1a84a3bfb688b"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_7bcdc035ce141672b7e2190b3ae"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_0f1747366193343a5ef77266bde"`);
        await queryRunner.query(`DROP TABLE "module"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "lesson"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc90eb33b49dbbe83426074440"`);
        await queryRunner.query(`DROP TABLE "enrolment"`);
        await queryRunner.query(`DROP TABLE "course_discount"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "prerequisite"`);
        await queryRunner.query(`DROP TABLE "course_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "course_language"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
