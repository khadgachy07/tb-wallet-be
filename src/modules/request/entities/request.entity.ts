import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RequestType } from '../enum/request_type.enum';

@Entity('requests')
export class RequestEntity {
  @Index()
  @PrimaryGeneratedColumn()
  requestId: number;

  @Column()
  subject: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: RequestType })
  requestType: RequestType;

  @ManyToOne((type) => UserEntity, (user) => user.requests)
  user: UserEntity;
}
