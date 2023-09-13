import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1694595312925 implements MigrationInterface {
    name = 'Init1694595312925'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("walletId" SERIAL NOT NULL, "bitAddress" character varying NOT NULL, "ethAddress" character varying NOT NULL, "btcBalance" integer NOT NULL, "ethBalance" integer NOT NULL, CONSTRAINT "UQ_fb90371cd1be33e6168f5e89562" UNIQUE ("bitAddress"), CONSTRAINT "UQ_5a3f377955c73e4f2d651ab7c8a" UNIQUE ("ethAddress"), CONSTRAINT "PK_34c52cc4af652ae30a6bea87929" PRIMARY KEY ("walletId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb90371cd1be33e6168f5e8956" ON "wallet" ("bitAddress") `);
        await queryRunner.query(`CREATE INDEX "IDX_5a3f377955c73e4f2d651ab7c8" ON "wallet" ("ethAddress") `);
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "email" character varying NOT NULL, "encryptedPassword" character varying NOT NULL, "userType" character varying NOT NULL DEFAULT 'user', "walletId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_0a95e6aab86ff1b0278c18cf48" UNIQUE ("walletId"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8bf09ba754322ab9c22a215c91" ON "users" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e" FOREIGN KEY ("walletId") REFERENCES "wallet"("walletId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8bf09ba754322ab9c22a215c91"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5a3f377955c73e4f2d651ab7c8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb90371cd1be33e6168f5e8956"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
