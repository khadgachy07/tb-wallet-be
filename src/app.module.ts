import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => databaseConfig,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }),
    UserModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
