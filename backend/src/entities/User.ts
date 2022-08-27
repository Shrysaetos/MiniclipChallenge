import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ImageReport } from './ImageReport';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @OneToMany(() => ImageReport, (report) => report.user)
  reports: ImageReport[];
}
