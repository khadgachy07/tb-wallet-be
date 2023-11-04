import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgresql',
  port: 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'xMUhu6kqsplR7vwKRvvkCgUTjRciXPFh',
  database: process.env.DB_NAME || 'postgres',
  entities: [join(__dirname, './src/modules/**/entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './src/migrations', '*.{ts,js}')],
  migrationsRun: true,
  synchronize: false,
});
