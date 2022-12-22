import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserTableDeleteField1671704775404 implements MigrationInterface {
    name = 'updateUserTableDeleteField1671704775404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    }

}
