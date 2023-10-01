import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { RequestEntity } from './entities/request.entity';
import { UserService } from '../user/user.service';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { WalletService } from '../wallet/wallet.service';
import { CardEntity } from '../card/entities/card.entity';
import { CardService } from '../card/card.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RequestEntity,
      WalletEntity,
      CardEntity,
    ]),
  ],
  providers: [RequestService, UserService, WalletService, CardService],
  controllers: [RequestController],
})
export class RequestModule {}
