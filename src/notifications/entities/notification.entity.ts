import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  fromId: string;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  type: 'LIST_SHARED' | 'ITEM_CHECKED' | 'OTHER';

  @Column()
  resourceUrl: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
