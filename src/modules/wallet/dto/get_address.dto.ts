import { IsNotEmpty, IsString } from 'class-validator';

export class GetAddressDto {
  @IsNotEmpty()
  @IsString()
  email: string;
}
