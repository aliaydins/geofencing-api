import { MigrationInterface, QueryRunner } from 'typeorm';
import { db } from '../../app/config';

export class migrationOne implements MigrationInterface {
   name = 'mg1673690191135';

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TYPE "${db.schema}"."event_status_enum" AS ENUM('sent', 'failed')
        `);
      await queryRunner.query(`
            CREATE TYPE "${db.schema}"."event_detect_enum" AS ENUM('enter', 'exit', 'inside', 'outside', 'crosses')
        `);
      await queryRunner.query(`
            CREATE TABLE "${db.schema}"."event" (
                "id" SERIAL NOT NULL,
                "user_id" character varying NOT NULL,
                "status" "${db.schema}"."event_status_enum" NOT NULL,
                "detect" "${db.schema}"."event_detect_enum" NOT NULL,
                "message" character varying NOT NULL,
                "event" jsonb NOT NULL,
                CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
            )
        `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "${db.schema}"."event"
        `);
      await queryRunner.query(`
            DROP TYPE "${db.schema}"."event_detect_enum"
        `);
      await queryRunner.query(`
            DROP TYPE "${db.schema}"."event_status_enum"
        `);
   }
}
