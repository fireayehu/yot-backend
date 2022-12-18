import { MigrationInterface, QueryRunner } from 'typeorm';

export class paymentTables1671378926336 implements MigrationInterface {
  name = 'paymentTables1671378926336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "code" character varying NOT NULL, "logo" character varying, "accountNumber" character varying, "stateId" uuid, "typeId" uuid, CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying, "index" integer, "remark" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric, "transactionNumber" character varying, "stateId" uuid, "enrolmentId" uuid, "payerId" uuid, "methodId" uuid, "statusId" uuid, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_8a985423adc99c210aa72f210c5" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_be2150307aa6f1664ca798accf1" FOREIGN KEY ("typeId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_113fbe4c463fb81660a92289035" FOREIGN KEY ("stateId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_5c1b774e349705a78ce82fe29ce" FOREIGN KEY ("enrolmentId") REFERENCES "enrolment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_19461d51f833307a075f8ef9ddc" FOREIGN KEY ("payerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_28fc985bf30366ec34ff1072a59" FOREIGN KEY ("methodId") REFERENCES "payment_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_c2704326ac03123ea970d31e8ca" FOREIGN KEY ("statusId") REFERENCES "data_lookup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_c2704326ac03123ea970d31e8ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_28fc985bf30366ec34ff1072a59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_19461d51f833307a075f8ef9ddc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_5c1b774e349705a78ce82fe29ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_113fbe4c463fb81660a92289035"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_be2150307aa6f1664ca798accf1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_8a985423adc99c210aa72f210c5"`,
    );
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "payment_method"`);
  }
}
