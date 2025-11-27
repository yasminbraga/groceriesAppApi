import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/lists/entities/list.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserList } from './userList.entity';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(UserList)
    private userListRepository: Repository<UserList>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(List) private listRepository: Repository<List>,
  ) {}

  async addUserToList(
    userId: string,
    listId: string,
    isCreatedByTheUser: boolean,
  ) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not Found');
    }

    const list = await this.listRepository.findOne({ where: { id: listId } });
    if (!list) {
      throw new NotFoundException('List not Found');
    }

    const userList = this.userListRepository.create({
      user,
      list,
      isCreatedByTheUser,
    });
    return await this.userListRepository.save(userList);
  }
}
