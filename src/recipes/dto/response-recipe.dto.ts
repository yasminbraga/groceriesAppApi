import { PartialType } from '@nestjs/mapped-types';
import { RequestRecipeDto } from './request-recipe.dto';

export class ResponseRecipeDTO extends PartialType(RequestRecipeDto) {}
