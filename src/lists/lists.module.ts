import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { UserList } from 'src/userLists/userList.entity';
import { User } from 'src/users/entities/user.entity';
import { List } from './entities/list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, Recipe, Product, UserList, User])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
