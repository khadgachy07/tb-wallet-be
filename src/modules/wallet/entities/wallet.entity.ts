import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CardEntity } from '../../card/entities/card.entity';

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

  @OneToOne((type) => CardEntity, (card) => card.wallet)
  @JoinColumn({ name: 'cardId' })
  card: CardEntity;
}
