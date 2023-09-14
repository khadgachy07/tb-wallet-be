import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { UserEntity } from '../user/entities/user.entity';
import { WalletService } from './wallet.service';
import { CardEntity } from '../card/entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, UserEntity, CardEntity])],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
