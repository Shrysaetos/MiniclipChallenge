import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { ImageReport } from '../imageReport/imageReport.entity';

@Entity('USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  role: string;

  @OneToMany(() => ImageReport, (report) => report.user)
  reports: ImageReport[];

  @BeforeInsert()
  async saltPassword() {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
  }
}
