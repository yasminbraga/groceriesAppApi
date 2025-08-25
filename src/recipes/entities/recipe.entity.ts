import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', array: true })
  instructions: string[];

  @Column({ type: 'jsonb' })
  ingredients: { name: string; quantity: string }[];

  @OneToOne(() => List, (list) => list.recipe)
  list?: List;
}
