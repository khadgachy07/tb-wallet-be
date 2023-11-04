import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgres://admin:<xMUhu6kqsplR7vwKRvvkCgUTjRciXPFh>@btph50.stackhero-network.com:5432/admin?sslmode=require',
  autoLoadEntities: true,
  entities: [join(__dirname, '/src/modules/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../src/**/*.migration{.ts,.js}')],
  migrationsRun: true,
  synchronize: false,
};
