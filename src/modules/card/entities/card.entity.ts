import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardStatus } from '../enum/card_status.enum';
import { CardType } from '../enum/card_type.enum';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn()
  cardId: number;

  @Column({ unique: true })
  cardNumber: string;

  @Column()
  cardHolder: string;

  @Column()
  cvv: string;

  @CreateDateColumn({
    type: 'date',
    default: () => `NOW() + INTERVAL '1 year'`,
  })
  expiryDate: Date;

  @Column({ default: CardStatus.INACTIVE })
  cardStatus: CardStatus;

  @Column({ default: CardType.INACTIVE })
  cardType: CardType;

  @OneToOne((type) => UserEntity, (user) => user.card)
  user: UserEntity;
}
