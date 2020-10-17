import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602865295755 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
          name: 'images',
          columns: [
            {
              name: 'id',
              type: 'integer',
              unsigned: true,
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment'
            },
            {
              name: 'path',
              type: 'varchar'
            },
            {
              name: 'orphanageId',
              type: 'integer'
            }
          ],
          foreignKeys: [
            {
              name: 'ImageOrphanage',
              columnNames: ['orphanageId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'orphanages',
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
            }
          ]
        }))
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images')
      }
}
    