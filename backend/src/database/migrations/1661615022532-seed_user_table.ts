import { MigrationInterface } from 'typeorm';

import AppDataSource from '../data-source';
import { User } from '../../user/user.entity';
import { UserSeed } from '../seeds/user.seed';

export class seedUserTable1661615022532 implements MigrationInterface {
  public async up(): Promise<void> {
    await UserSeed.map(async (user) => {
      const newUser = AppDataSource.manager.create(User, user);
      await AppDataSource.manager.save(newUser);
      console.info('User successfully create', user);
    });
  }

  public async down(): Promise<void> {
    console.log('Nothing to do');
  }
}
