import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletModule } from './modules/wallet/wallet.module';
import { CardModule } from './modules/card/card.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { RequestModule } from './modules/request/request.module';

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
    CardModule,
    TransactionModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
