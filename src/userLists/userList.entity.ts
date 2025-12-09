import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../lists/entities/list.entity';
import { User } from '../users/entities/user.entity';

@Entity()
export class UserList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  listId: string;

  @Column()
  isCreatedByTheUser: boolean;

  @ManyToOne(() => User, (user) => user.userList)
  user: User;

  @ManyToOne(() => List, (list) => list.userList)
  list: List;
}
