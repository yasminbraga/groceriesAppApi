import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ok } from 'assert';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Product } from 'src/products/entities/product.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { UserList } from 'src/userLists/userList.entity';
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
    @InjectRepository(UserList)
    private userListRepository: Repository<UserList>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
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

    const list = this.listRepository.create({
      title,
      products: productsFromRecipe?.map((product) =>
        this.productRepository.create(product),
      ),
      ...(recipe && { recipe }),
    });

    await this.listRepository.save(list);

    const userList = this.userListRepository.create({
      list,
      user,
      isCreatedByTheUser: true,
    });
    await this.userListRepository.save(userList);

    return list;
  }

  async findAllByLoggedUser(userId: string): Promise<List[]> {
    return await this.listRepository
      .createQueryBuilder('list')
      .leftJoinAndSelect('list.products', 'product')
      .leftJoinAndSelect('list.recipe', 'recipe')
      .innerJoin('list.userList', 'ul')
      .where('ul.user.id = :userId', { userId })
      .orderBy('list.createdAt', 'DESC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.listRepository.findOne({ where: { id } });
  }

  async update(id: string, responseListDto: ResponseListDto) {
    return await this.listRepository.update(id, responseListDto);
  }

  async remove(id: string) {
    return await this.listRepository.delete(id);
  }

  async share(id: string, email: string, fromId: string) {
    // pegar o user a ser compartilhado pelo email
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const fromUser = await this.userRepository.findOne({
      where: { id: fromId },
    });
    if (!fromUser) {
      throw new NotFoundException('User not Found');
    }
    //pegar a lista pelo id
    const list = await this.listRepository.findOne({ where: { id } });
    if (!list) {
      throw new NotFoundException('List not Found');
    }
    //criar listUser com list e id e isCreatedByUser: false
    const userList = this.userListRepository.create({
      list,
      user,
      isCreatedByTheUser: false,
    });
    await this.userListRepository.save(userList);

    const type = 'LIST_SHARED';
    const message = `${fromUser.name} compartilhou a lista ${list.title} com você!`;
    const resourceUrl = `/lists/${list.id}`;

    //gerar uma notificacao para o usuario compartilhado
    const notification = this.notificationRepository.create({
      user,
      message,
      type,
      resourceUrl,
      fromId,
    });
    await this.notificationRepository.save(notification);

    return ok;
  }
}
