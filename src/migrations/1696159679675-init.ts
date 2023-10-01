import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1696159679675 implements MigrationInterface {
  name = 'Init1696159679675';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wallet" ("walletId" SERIAL NOT NULL, "bitAddress" character varying NOT NULL, "ethAddress" character varying NOT NULL, "btcBalance" integer NOT NULL DEFAULT '0', "ethBalance" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_fb90371cd1be33e6168f5e89562" UNIQUE ("bitAddress"), CONSTRAINT "UQ_5a3f377955c73e4f2d651ab7c8a" UNIQUE ("ethAddress"), CONSTRAINT "PK_34c52cc4af652ae30a6bea87929" PRIMARY KEY ("walletId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb90371cd1be33e6168f5e8956" ON "wallet" ("bitAddress") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5a3f377955c73e4f2d651ab7c8" ON "wallet" ("ethAddress") `,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("transactionId" SERIAL NOT NULL, "sender" character varying NOT NULL, "receiver" character varying NOT NULL, "amount" integer NOT NULL, "date" date NOT NULL DEFAULT NOW(), "description" character varying NOT NULL, "walletAddress" character varying NOT NULL, "transactionType" "public"."transactions_transactiontype_enum" NOT NULL, "paymentMethod" "public"."transactions_paymentmethod_enum" NOT NULL, "status" "public"."transactions_status_enum" NOT NULL DEFAULT 'PENDING', "userUserId" integer, CONSTRAINT "PK_1eb69759461752029252274c105" PRIMARY KEY ("transactionId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "requests" ("requestId" SERIAL NOT NULL, "subject" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, "userUserId" integer, CONSTRAINT "PK_e8dfe8db6fcf07139c194fa09d8" PRIMARY KEY ("requestId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8dfe8db6fcf07139c194fa09d" ON "requests" ("requestId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("userId" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "email" character varying NOT NULL, "encryptedPassword" character varying NOT NULL, "userType" character varying NOT NULL DEFAULT 'user', "walletId" integer, "cardId" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_0a95e6aab86ff1b0278c18cf48" UNIQUE ("walletId"), CONSTRAINT "REL_501578f69c24fba9ec42553591" UNIQUE ("cardId"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8bf09ba754322ab9c22a215c91" ON "users" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "card" ("cardId" SERIAL NOT NULL, "cardNumber" character varying NOT NULL, "cardHolder" character varying NOT NULL, "cvv" character varying NOT NULL, "expiryDate" date NOT NULL DEFAULT NOW() + INTERVAL '1 year', "cardStatus" character varying NOT NULL DEFAULT 'INACTIVE', "cardType" character varying NOT NULL DEFAULT 'INACTIVE', CONSTRAINT "UQ_8ebe167503f779123f14c35dd43" UNIQUE ("cardNumber"), CONSTRAINT "PK_da6bb682664de7601d3f1a7cc5d" PRIMARY KEY ("cardId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_2d0b98e9ed2e7dc806d2301dd38" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "FK_bcb830785bdec5d705a31173df5" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e" FOREIGN KEY ("walletId") REFERENCES "wallet"("walletId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_501578f69c24fba9ec425535917" FOREIGN KEY ("cardId") REFERENCES "card"("cardId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_501578f69c24fba9ec425535917"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "FK_bcb830785bdec5d705a31173df5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_2d0b98e9ed2e7dc806d2301dd38"`,
    );
    await queryRunner.query(`DROP TABLE "card"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8bf09ba754322ab9c22a215c91"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8dfe8db6fcf07139c194fa09d"`,
    );
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5a3f377955c73e4f2d651ab7c8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fb90371cd1be33e6168f5e8956"`,
    );
    await queryRunner.query(`DROP TABLE "wallet"`);
  }
}
