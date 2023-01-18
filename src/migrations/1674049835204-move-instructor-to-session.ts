import { MigrationInterface, QueryRunner } from 'typeorm';

export class moveInstructorToSession1674049835204
  implements MigrationInterface
{
  name = 'moveInstructorToSession1674049835204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" DROP CONSTRAINT "FK_32d94af473bb59d808d9a68e17b"`,
    );
    await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "instructorId"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "instructorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_ff332cf157954f03f1e8a1712b5" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_ff332cf157954f03f1e8a1712b5"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "instructorId"`);
    await queryRunner.query(`ALTER TABLE "course" ADD "instructorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "course" ADD CONSTRAINT "FK_32d94af473bb59d808d9a68e17b" FOREIGN KEY ("instructorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
