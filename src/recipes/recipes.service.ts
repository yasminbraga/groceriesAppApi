import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestRecipeDto } from './dto/request-recipe.dto';
import { ResponseRecipeDTO } from './dto/response-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(requestRecipeDto: RequestRecipeDto, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const newRecipe = this.recipeRepository.create({
      ...requestRecipeDto,
      user,
    });
    await this.recipeRepository.save(newRecipe);
    return newRecipe;
  }

  async findAll() {
    return await this.recipeRepository.find({ relations: ['user'] });
  }

  async createMany(requestRecipeDto: RequestRecipeDto[], userId: string) {
    const data = requestRecipeDto.map((recipe) => ({ ...recipe, userId }));
    return await this.recipeRepository.save(data);
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
