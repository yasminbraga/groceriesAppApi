import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  checked: boolean;

  @Column()
  quantity: string;

  @ManyToOne(() => List, (list) => list.products, { onDelete: 'CASCADE' })
  list: List;
}
