import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestListDto } from './dto/request-list.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { List } from './entities/list.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listRepository: Repository<List>,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(requestListDto: RequestListDto, userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const { recipeId, title, products } = requestListDto;

    let recipe: Recipe | null = null;
    let productsFromRecipe = products;
    if (recipeId) {
      recipe = await this.recipeRepository.findOne({
        where: { id: recipeId },
      });

      productsFromRecipe = recipe?.ingredients.map((item) => ({
        ...item,
        checked: false,
      }));

      if (!recipe) {
        throw new NotFoundException('Recipe not found!');
      }
    }

    // const existingList = await this.listRepository.findOne({
    //   where: { recipe: { id: recipe_id } },
    // });

    // if (existingList) {
    //   console.log(existingList);
    //   throw new Error('This recipe is already associated with another list');
    // }

    const newList = this.listRepository.create({
      title,
      products: productsFromRecipe?.map((product) =>
        this.productRepository.create(product),
      ),
      ...(recipe && { recipe }),
    });

    return await this.listRepository.save(newList);
  }

  async findAll() {
    return await this.listRepository.find({ relations: ['recipe'] });
  }

  async findOne(id: number) {
    return await this.listRepository.findOne({ where: { id } });
  }

  async update(id: number, responseListDto: ResponseListDto) {
    return await this.listRepository.update(id, responseListDto);
  }

  async remove(id: number) {
    return await this.listRepository.delete(id);
  }
}
