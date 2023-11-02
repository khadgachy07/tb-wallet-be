import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'ec2-3-83-61-239.compute-1.amazonaws.com',
  port: 5432,
  username: process.env.DB_USERNAME || 'wdgvrqjhrajfoy',
  password: process.env.DB_PASSWORD || '30a69fbd1e5ca4fea4dfde264705b27191dcbffaf11377986bfca4d99af220cd',
  database: process.env.DB_NAME || 'dbv339hvg91nsh',
  entities: [join(__dirname, './src/modules/**/entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './src/migrations', '*.{ts,js}')],
  migrationsRun: true,
  synchronize: false,
});
