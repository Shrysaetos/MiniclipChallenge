import { MigrationInterface, QueryRunner } from 'typeorm';

import { User } from '../../user/user.entity';
import { UserSeed } from '../seeds/user.seed';

export class seedUserTable1661615022532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      UserSeed.map(async (user) => {
        const newUser = await queryRunner.manager.create(User, user);
        await queryRunner.manager.save(newUser);
        console.info('User successfully create', user);
      }),
    );
  }

  public async down(): Promise<void> {
    console.log('Nothing to do');
  }
}
