import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../notifications/entities/notification.entity';
import { NotificationsModule } from '../notifications/notifications.module';
import { Product } from '../products/entities/product.entity';
import { Recipe } from '../recipes/entities/recipe.entity';
import { UserList } from '../userLists/userList.entity';
import { User } from '../users/entities/user.entity';
import { List } from './entities/list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      List,
      Recipe,
      Product,
      UserList,
      User,
      Notification,
    ]),
    NotificationsModule,
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
