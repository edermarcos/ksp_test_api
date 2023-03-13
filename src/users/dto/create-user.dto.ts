import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserLoginDto } from './user-login.dto';

export class CreateUserDto extends PartialType(UserLoginDto) {
  @IsString()
  @IsNotEmpty()
  fullName: string;
}
