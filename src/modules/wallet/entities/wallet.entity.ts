import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('wallet')
export class WalletEntity {
  @PrimaryGeneratedColumn()
  walletId: number;

  @Index()
  @Column({ unique: true, nullable: false })
  bitAddress: string;

  @Index()
  @Column({ unique: true, nullable: false })
  ethAddress: string;

  @Column()
  btcBalance: number;

  @Column()
  ethBalance: number;

  @OneToOne((type) => UserEntity, (user) => user.wallet)
  user: UserEntity;
}
