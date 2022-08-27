import { MigrationInterface, QueryRunner } from 'typeorm';

export class createsUserAndImageReportTables1661612337218
  implements MigrationInterface
{
  name = 'createsUserAndImageReportTables1661612337218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "USER" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "IMAGE_REPORT" ("id" SERIAL NOT NULL, "image" bytea NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_90418fe378e9c173f604f9de778" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "IMAGE_REPORT" ADD CONSTRAINT "FK_9674c5f22d2a645e22c719dc327" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "IMAGE_REPORT" DROP CONSTRAINT "FK_9674c5f22d2a645e22c719dc327"`,
    );
    await queryRunner.query(`DROP TABLE "IMAGE_REPORT"`);
    await queryRunner.query(`DROP TABLE "USER"`);
  }
}
