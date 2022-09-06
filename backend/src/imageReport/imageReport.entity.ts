import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterInsert,
  AfterUpdate,
  BeforeUpdate,
} from 'typeorm';
import { User } from '../user/user.entity';

export const STATUS_PENDING = 0;
export const STATUS_REJECTED = 1;
export const STATUS_APPROVED = 2;

@Entity('IMAGE_REPORT')
export class ImageReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  userId: number;

  @Column({
    nullable: true,
  })
  comment: string;

  @Column()
  status: number;

  @Column({
    nullable: true,
    type: 'float',
  })
  evaluation: number;

  @Column()
  callback: string;

  //TODO: Add new field userId for foreign api calls and replace this by loggedUser
  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
