import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  amount: number;

  @IsString()
  type: 'expense' | 'income';

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  type?: 'expense' | 'income';

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}