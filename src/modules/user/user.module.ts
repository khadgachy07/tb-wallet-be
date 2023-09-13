import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { WalletEntity } from '../wallet/entities/wallet.entity';
import { WalletService } from '../wallet/wallet.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, WalletEntity])],
  controllers: [UserController],
  providers: [UserService, WalletService],
  exports: [UserService],
})
export class UserModule {}
