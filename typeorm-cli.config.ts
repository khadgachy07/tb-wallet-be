import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'dpg-ckcsm0siibqc73e90m00-a',
  port: 5432,
  username: process.env.DB_USERNAME || 'tb_wallet',
  password: process.env.DB_PASSWORD || '83rFOcL3EsNAoX6B2ZlxBO9G02MGpUXd',
  database: process.env.DB_NAME || 'tb_wallet_q7hj',
  entities: [join(__dirname, './src/modules/**/entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './src/migrations', '*.{ts,js}')],
  migrationsRun: true,
  synchronize: false,
});
