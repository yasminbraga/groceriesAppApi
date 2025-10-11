import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserList } from './userList.entity';
import { UserListService } from './userList.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserList])],
  providers: [UserListService],
})
export class UserListModule {}
