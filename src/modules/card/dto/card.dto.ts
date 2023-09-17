import { IsOptional, IsString } from 'class-validator';

export class CardDto {
  @IsString()
  @IsOptional()
  cardHolder: string;

  @IsString()
  @IsOptional()
  cardNumber: string;
}
