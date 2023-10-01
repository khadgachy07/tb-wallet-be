import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from '../enum/user-type.enum';
import { WalletEntity } from '../../wallet/entities/wallet.entity';
import { CardEntity } from '../../card/entities/card.entity';
import { TransactionEntity } from '../../transaction/entities/transaction.entity';
import { RequestEntity } from '../../request/entities/request.entity';

@Entity('users')
export class UserEntity {
  @Index()
  @PrimaryGeneratedColumn()
  userId!: number;

  @Column({ length: 255 })
  firstName!: string;

  @Column({ length: 255 })
  lastName: string;

  @Index()
  @Column({ unique: true })
  email!: string;

  @Column()
  encryptedPassword!: string;

  @OneToOne((type) => WalletEntity, (wallet) => wallet.user)
  @JoinColumn({ name: 'walletId' })
  wallet: WalletEntity;

  @OneToOne((type) => CardEntity, (card) => card.user)
  @JoinColumn({ name: 'cardId' })
  card: CardEntity;

  @OneToMany((type) => TransactionEntity, (transactions) => transactions.user)
  transactions: TransactionEntity[];

  @OneToMany((type) => RequestEntity, (requests) => requests.user)
  requests: RequestEntity[];

  @Column({ default: UserType.USER })
  userType: UserType;
}
