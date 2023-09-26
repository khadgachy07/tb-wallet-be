import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post('sendTransaction')
  async sendTransaction(@Body() transactionDto: TransactionDto) {
    return await this.transactionService.sendTransaction(
      transactionDto.email,
      transactionDto.amount,
      transactionDto.walletAddress,
    );
  }

  @Post('receiveTransaction')
  async receiveTransaction(@Body() transactionDto: TransactionDto) {
    return await this.transactionService.receiveTransaction(
      transactionDto.email,
      transactionDto.amount,
      transactionDto.walletAddress,
    );
  }

  @Get('getTransaction')
  async findAllTransactionOfUser(@Query() transactionDto: TransactionDto) {
    const { email } = transactionDto;
    return await this.transactionService.findAllTransactionOfUser(email);
  }
}
