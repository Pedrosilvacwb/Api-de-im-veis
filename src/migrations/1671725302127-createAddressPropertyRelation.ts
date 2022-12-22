import { MigrationInterface, QueryRunner } from "typeorm";

export class createAddressPropertyRelation1671725302127 implements MigrationInterface {
    name = 'createAddressPropertyRelation1671725302127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ADD "addressesId" uuid`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "UQ_26a719ca228cd83b596b68bb3ca" UNIQUE ("addressesId")`);
        await queryRunner.query(`ALTER TABLE "properties" ADD CONSTRAINT "FK_26a719ca228cd83b596b68bb3ca" FOREIGN KEY ("addressesId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "FK_26a719ca228cd83b596b68bb3ca"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP CONSTRAINT "UQ_26a719ca228cd83b596b68bb3ca"`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "addressesId"`);
    }

}
