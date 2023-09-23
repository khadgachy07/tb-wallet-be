import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { WalletService } from '../wallet/wallet.service';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { CardService } from '../card/card.service';
import { CardEntity } from '../card/entities/card.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      UserEntity,
      WalletEntity,
      CardEntity,
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, UserService, WalletService, CardService],
})
export class TransactionModule {}
