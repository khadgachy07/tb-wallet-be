import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'dpg-ck7enivsasqs73almqj0-a',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'tb_wallet',
  password: process.env.DB_PASSWORD || 'MoQNQqeUx1ZFXx9ezmGFjD56Q2rN6t6n',
  database: process.env.DB_NAME || 'tb_wallet',
  autoLoadEntities: true,
  entities: [join(__dirname, '/src/modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../src/**/*.migration{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
};
