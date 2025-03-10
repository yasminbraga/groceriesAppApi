import { IsNotEmpty, IsString } from 'class-validator';

export class RequestRecipeDto {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;
  @IsString()
  @IsNotEmpty()
  public readonly instructions: string;
}
