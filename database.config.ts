import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'dpg-ckcsm0siibqc73e90m00-a',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'tb_wallet',
  password: process.env.DB_PASSWORD || '83rFOcL3EsNAoX6B2ZlxBO9G02MGpUXd',
  database: process.env.DB_NAME || 'tb_wallet_q7hj',
  autoLoadEntities: true,
  entities: [join(__dirname, '/src/modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../src/**/*.migration{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
};
