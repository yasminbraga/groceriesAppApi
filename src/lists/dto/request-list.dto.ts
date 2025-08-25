import { IsOptional } from 'class-validator';

export class RequestListDto {
  public readonly title: string;

  @IsOptional()
  public readonly products?: Array<{
    name: string;
    quantity: string;
    checked: boolean;
  }>;

  @IsOptional()
  public readonly recipeId?: number;
}
