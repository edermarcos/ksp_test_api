import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  salary: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
