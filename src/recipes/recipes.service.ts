import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestRecipeDto } from './dto/request-recipe.dto';
import { ResponseRecipeDTO } from './dto/response-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}
  async create(requestRecipeDto: RequestRecipeDto) {
    const newRecipe = this.recipeRepository.create(requestRecipeDto);
    return await this.recipeRepository.save(newRecipe);
  }

  async findAll() {
    return await this.recipeRepository.find();
  }

  async findOne(id: number) {
    return await this.recipeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRecipeDto: ResponseRecipeDTO) {
    return await this.recipeRepository.update(id, updateRecipeDto);
  }

  async remove(id: number) {
    return await this.recipeRepository.delete(id);
  }
}
