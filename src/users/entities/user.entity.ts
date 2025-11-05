import { IsEmail, Length } from 'class-validator';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { UserList } from 'src/userLists/userList.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  name: string;

  @Column()
  @Length(6, 50)
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => Recipe, (recipes) => recipes.user)
  recipes: Recipe[];

  @OneToMany(() => UserList, (userList) => userList.user)
  userList: UserList[];

  @OneToMany(() => Notification, (notifications) => notifications.user)
  notifications: Notification[];
}
