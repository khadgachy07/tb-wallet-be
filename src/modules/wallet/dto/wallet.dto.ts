import { IsNumber, IsOptional, IsString } from 'class-validator';

export class WalletDto {
  @IsString()
  @IsOptional()
  bitAddress: string;

  @IsNumber()
  @IsOptional()
  btcBalance: number;

  @IsString()
  @IsOptional()
  ethAddress: string;

  @IsNumber()
  @IsOptional()
  ethBalance: number;
}
