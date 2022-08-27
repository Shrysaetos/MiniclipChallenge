import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/../entities/*.ts'],
  subscribers: [__dirname + '/../subscribers/*.ts'],
  migrations: [__dirname + '/../database/migrations/*.ts'],
  migrationsTableName: 'TYPEORM_MIGRATIONS',
  extra: {
    trustServerCertificate: true,
  },
});

export default AppDataSource;
