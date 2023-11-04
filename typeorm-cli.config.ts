import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: 'postgres://admin:<xMUhu6kqsplR7vwKRvvkCgUTjRciXPFh>@btph50.stackhero-network.com:5432/admin?sslmode=require',
  entities: [join(__dirname, './src/modules/**/entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './src/migrations', '*.{ts,js}')],
  migrationsRun: true,
  synchronize: false,
});
