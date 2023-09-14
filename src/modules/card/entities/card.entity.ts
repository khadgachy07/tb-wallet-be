import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardStatus } from '../enum/card_status.enum';
import { CardType } from '../enum/card_type.enum';
import { WalletEntity } from '../../wallet/entities/wallet.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  cardId: number;

  @Column({ unique: true })
  cardNumber: number;

  @Column()
  cardHolder: string;

  @Column()
  cvv: number;

  @Column()
  expiryDate: string;

  @Column({ default: CardStatus.INACTIVE })
  cardStatus: CardStatus;

  @Column({ default: CardType.CLASSIC })
  cardType: CardType;

  @OneToOne((type) => WalletEntity, (wallet) => wallet.card)
  wallet: WalletEntity;
}
