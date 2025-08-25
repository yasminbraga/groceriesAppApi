import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class IngredientsValidator {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
  @IsString()
  @IsNotEmpty()
  public readonly quantity: string;
}
export class RequestRecipeDto {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  public readonly instructions: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => IngredientsValidator)
  public readonly ingredients: IngredientsValidator[];
}
