import { join } from 'path';
import { DataSource } from 'typeorm';


export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'dpg-ck7enivsasqs73almqj0-a',
  port: 5432,
  username: process.env.DB_USERNAME || 'tb_wallet',
  password: process.env.DB_PASSWORD || 'MoQNQqeUx1ZFXx9ezmGFjD56Q2rN6t6n',
  database: process.env.DB_NAME || 'tb_wallet',
  entities: [join(__dirname, './src/modules/**/entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './src/migrations', '*.{ts,js}')],
  migrationsRun: true,
  synchronize: false,
});
