import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';
import { TransactionType } from './enum/trans_type.enum';
import { PayMethod } from './enum/pay_method.enum';
import { TransactionStatus } from './enum/trans_status.enum';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    private userService: UserService,
    private walletService: WalletService,
  ) {}

  async createTransaction(
    email: string,
    amount: number,
    walletAddress: string,
    transactionType: TransactionType,
    status: TransactionStatus,
    user: UserEntity,
  ) {
    const senderUser = await this.userService.findByEmail(email);
    const receiverUser = await this.walletService.findUserByWalledAddress(
      walletAddress,
    );
    let pay_method: PayMethod;
    if (walletAddress[0] == 'b') {
      pay_method = PayMethod.BITCOIN;
    } else if (walletAddress[0] == '0') {
      pay_method = PayMethod.ETHEREUM;
    } else {
      return new Error('Not a valid Wallet Address');
    }
    const transaction = await this.transactionRepository.create({
      sender: `${senderUser.firstName} ${senderUser.lastName}`,
      receiver: `${receiverUser.firstName} ${receiverUser.lastName}`,
      amount,
      description: `Your wallet has been ${transactionType}ed with amount ${amount}`,
      walletAddress,
      transactionType,
      paymentMethod: pay_method,
      status,
      user,
    });
    await this.transactionRepository.save(transaction);
    if (!transaction) {
      return new Error('Failed Creating Transaction');
    }
    return transaction;
  }

  async sendTransaction(email: string, amount: number, walletAddress: string) {
    const senderUser = await this.userService.findByEmail(email);
    const transaction = await this.createTransaction(
      email,
      amount,
      walletAddress,
      TransactionType.CREDIT,
      TransactionStatus.SUCCESS,
      senderUser,
    );
    if (!transaction) {
      return new Error('Failed Creating Transaction');
    }
    return transaction;
  }

  async receiveTransaction(
    email: string,
    amount: number,
    walletAddress: string,
  ) {
    const receiverUser = await this.walletService.findUserByWalledAddress(
      walletAddress,
    );
    const transaction = await this.createTransaction(
      email,
      amount,
      walletAddress,
      TransactionType.CREDIT,
      TransactionStatus.PENDING,
      receiverUser,
    );
    if (!transaction) {
      return new Error('Failed Creating Transaction');
    }
    return transaction;
  }

  async findAllTransactionOfUser(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return new Error('User not found');
    }
    const transactions = await this.transactionRepository.findAndCount({
      where: { user },
    });
    return transactions;
  }
}
