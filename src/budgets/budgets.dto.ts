import { IsNumber, IsString } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber()
  amount: number;

  @IsString()
  categoryId: string;

  @IsString()
  period?: string;
}

export class UpdateBudgetDto {
  @IsNumber()
  amount: number;
}