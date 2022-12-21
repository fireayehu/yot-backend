import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeColumnsAbstractTable1671619658897
  implements MigrationInterface
{
  name = 'removeColumnsAbstractTable1671619658897';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog_category" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "blog_category" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "blog_category" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "contact_us" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "contact_us" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "contact_us" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "language" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "course_language" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "course_language" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_language" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "course_tag" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "course_tag" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "course_tag" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "prerequisite" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "prerequisite" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "prerequisite" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "education_field" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "education_field" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_field" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "education_level" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "education_level" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_level" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "instructor" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "instructor" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "instructor" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "role_permission" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "course_discount" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "course_discount" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_discount" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "blog_post" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "blog_post" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "blog_post" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "course_review" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "course_review" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "course_review" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "payment_method" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "payment_method" DROP COLUMN "index"`);
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "enrolment" DROP COLUMN "remark"`);
    await queryRunner.query(
      `ALTER TABLE "instructor_review" DROP COLUMN "slug"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor_review" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor_review" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "job_category" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "job_location" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "job_location" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "job_location" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "job_post" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "job_post" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "job_post" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "job_application" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP COLUMN "index"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP COLUMN "remark"`,
    );
    await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "lesson" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "remark"`);
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "index"`);
    await queryRunner.query(`ALTER TABLE "module" DROP COLUMN "remark"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "module" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "module" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "module" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "section" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "section" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "section" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "lesson" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "lesson" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "job_post" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "job_post" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_location" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "job_location" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "job_location" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "job_category" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "job_category" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor_review" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor_review" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor_review" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolment" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "enrolment" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "enrolment" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "payment" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "payment_method" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_review" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "course_review" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "course_review" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "blog_post" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "blog_post" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_discount" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_discount" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_discount" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "course" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "course" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "index" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "slug" character varying`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "student" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "student" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "role" ADD "index" integer`);
    await queryRunner.query(`ALTER TABLE "role" ADD "slug" character varying`);
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "permission" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "permission" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "resource" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "resource" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "resource" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "instructor" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "instructor" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_level" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_level" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_level" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_field" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_field" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "education_field" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "session" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "prerequisite" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "prerequisite" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "prerequisite" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_tag" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "course_tag" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "course_tag" ADD "slug" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "tag" ADD "remark" character varying`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "index" integer`);
    await queryRunner.query(`ALTER TABLE "tag" ADD "slug" character varying`);
    await queryRunner.query(
      `ALTER TABLE "course_language" ADD "remark" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_language" ADD "index" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_language" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "language" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "language" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "language" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "category" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "contact_us" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "contact_us" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "service" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "service" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "service" ADD "slug" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_category" ADD "remark" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "blog_category" ADD "index" integer`);
    await queryRunner.query(
      `ALTER TABLE "blog_category" ADD "slug" character varying`,
    );
  }
}
