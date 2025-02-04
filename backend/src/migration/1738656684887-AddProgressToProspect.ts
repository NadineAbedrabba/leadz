import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProgressToProspect1637269237173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('prospects', new TableColumn({
      name: 'progress',
      type: 'float',
      default: 0,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('prospects', 'progress');
  }
}
