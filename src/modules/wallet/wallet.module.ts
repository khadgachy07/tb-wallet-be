import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, UserEntity])],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
