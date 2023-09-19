import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './entities/card.entity';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity, WalletEntity, UserEntity])],
  providers: [CardService, UserService, WalletService],
  controllers: [CardController],
  exports: [CardService],
})
export class CardModule {}
