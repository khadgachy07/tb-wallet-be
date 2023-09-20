import {
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('wallet')
export class WalletEntity {
  @PrimaryGeneratedColumn()
  walletId: number;

  @Index()
  @Column({ unique: true })
  bitAddress: string;

  @Index()
  @Column({ unique: true })
  ethAddress: string;

  @Column({ default: 0, nullable: false })
  btcBalance: number;

  @Column({ default: 0, nullable: false })
  ethBalance: number;

  @OneToOne((type) => UserEntity, (user) => user.wallet)
  user: UserEntity;
}
