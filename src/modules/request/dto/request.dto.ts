import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RequestDto {
  @IsString()
  @IsOptional()
  subject: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;
}
