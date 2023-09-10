import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enum/user-type.enum';

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

  @Column({ default: UserType.USER })
  userType: UserType;
}
