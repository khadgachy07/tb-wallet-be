import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tb-wallet',
  autoLoadEntities: true,
  entities: [join(__dirname, '/src/modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../src/**/*.migration{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
};
