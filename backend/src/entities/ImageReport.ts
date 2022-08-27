import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity('IMAGE_REPORT')
export class ImageReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'bytea',
    nullable: false,
  })
  image: Uint8Array;

  @Column()
  userId: number;

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
