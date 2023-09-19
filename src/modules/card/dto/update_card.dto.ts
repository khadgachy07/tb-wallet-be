import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CardType } from '../enum/card_type.enum';

export class UpdateCardDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  cardType: CardType;
}
