import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import { CardEntity } from '../card/entities/card.entity';
import { CardService } from '../card/card.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity, CardEntity])],
  controllers: [UserController],
  providers: [UserService, WalletService, CardService],
  exports: [UserService],
})
export class UserModule {}
