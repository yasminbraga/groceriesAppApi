import { Product } from 'src/products/entities/product.entity';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { UserList } from 'src/userLists/userList.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'lists' })
export class List {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Product, (product) => product.list, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
  products?: Product[];

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

  @OneToOne(() => Recipe, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'recipe_id' })
  recipe?: Recipe;

  @OneToMany(() => UserList, (userList) => userList.list)
  userList: UserList[];
}
