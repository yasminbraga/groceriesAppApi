import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RequestRecipeDto } from './dto/request-recipe.dto';
import { ResponseRecipeDTO } from './dto/response-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async create(@Body() createRecipeDto: RequestRecipeDto) {
    const createdRecipe = await this.recipesService.create(createRecipeDto);
    return new ResponseRecipeDTO(createdRecipe);
  }

  @Get()
  async findAll() {
    return await this.recipesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const foundRecipe = await this.recipesService.findOne(+id);
    return new ResponseRecipeDTO(foundRecipe);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: ResponseRecipeDTO,
  ) {
    return await this.recipesService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.recipesService.remove(+id);
  }
}
