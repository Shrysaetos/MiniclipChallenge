import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export const STATUS_PENDING = 0;
export const STATUS_REJECTED = 1;
export const STATUS_APPROVED = 2;

@Entity('IMAGE_REPORT')
export class ImageReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  image: string;

  @Column({
    nullable: false,
  })
  userId: number;

  @Column()
  comment: string;

  @Column({
    nullable: false,
  })
  status: number;

  @Column({
    nullable: false,
  })
  evaluation: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
