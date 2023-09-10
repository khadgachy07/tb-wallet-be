import { IsOptional, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsOptional()
  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  newPassword: string;
}
