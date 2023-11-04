import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgresql',
  port: 5432,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'xMUhu6kqsplR7vwKRvvkCgUTjRciXPFh',
  database: process.env.DB_NAME || 'postgres',
  autoLoadEntities: true,
  entities: [join(__dirname, '/src/modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../src/**/*.migration{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
};
