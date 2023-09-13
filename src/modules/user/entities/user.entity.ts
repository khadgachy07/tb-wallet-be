import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserType } from '../enum/user-type.enum';
import { WalletEntity } from '../../wallet/entities/wallet.entity';

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

  @Column({ default: UserType.USER })
  userType: UserType;
}
