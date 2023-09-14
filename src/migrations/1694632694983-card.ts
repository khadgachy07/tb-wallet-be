import { MigrationInterface, QueryRunner } from "typeorm";

export class Card1694632694983 implements MigrationInterface {
    name = 'Card1694632694983'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "card" ("cardId" SERIAL NOT NULL, "cardNumber" integer NOT NULL, "cardHolder" character varying NOT NULL, "cvv" integer NOT NULL, "expiryDate" character varying NOT NULL, "cardStatus" character varying NOT NULL DEFAULT 'INACTIVE', "cardType" character varying NOT NULL DEFAULT 'CLASSIC', CONSTRAINT "UQ_8ebe167503f779123f14c35dd43" UNIQUE ("cardNumber"), CONSTRAINT "PK_da6bb682664de7601d3f1a7cc5d" PRIMARY KEY ("cardId"))`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "cardId" integer`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "UQ_5b0d1be5123fd3d17897e813089" UNIQUE ("cardId")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_5b0d1be5123fd3d17897e813089" FOREIGN KEY ("cardId") REFERENCES "card"("cardId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_5b0d1be5123fd3d17897e813089"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "UQ_5b0d1be5123fd3d17897e813089"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "cardId"`);
        await queryRunner.query(`DROP TABLE "card"`);
    }

}
