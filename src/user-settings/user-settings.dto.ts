import { IsInt, Min, Max } from 'class-validator';

export class UpdateUserSettingsDto {
  @IsInt()
  @Min(1)
  @Max(31)
  monthlyCutoffDay: number;
}