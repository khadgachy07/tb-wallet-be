import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TransactionStatus } from '../enum/trans_status.enum';
import { TransactionType } from '../enum/trans_type.enum';
import { PayMethod } from '../enum/pay_method.enum';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @Column()
  amount: number;

  @CreateDateColumn({ type: 'date', default: () => `NOW()` })
  date: Date;

  @Column()
  description: string;

  @Column()
  walletAddress: string;

  @Column({ type: 'enum', enum: TransactionType })
  transactionType: TransactionType;

  @Column({ type: 'enum', enum: PayMethod })
  paymentMethod: PayMethod;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @ManyToOne((type) => UserEntity, (user) => user.transactions)
  user: UserEntity;
}
