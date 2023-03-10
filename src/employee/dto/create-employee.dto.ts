import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

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
  @IsOptional()
  status: string;
}
