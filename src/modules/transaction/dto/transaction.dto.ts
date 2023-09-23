import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  walletAddress: string;
}
