import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  checked: boolean;

  @Column()
  quantity: string;

  @ManyToOne(() => List, (list) => list.products, { onDelete: 'CASCADE' })
  list: List;
}
