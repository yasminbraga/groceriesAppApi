import { List } from 'src/lists/entities/list.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  listId: number;

  @Column()
  isCreatedByTheUser: boolean;

  @ManyToOne(() => User, (user) => user.userList)
  user: User;

  @ManyToOne(() => List, (list) => list.userList)
  list: List;
}
