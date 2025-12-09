import { IsEmail, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Notification } from '../../notifications/entities/notification.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { UserList } from '../../userLists/userList.entity';

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
