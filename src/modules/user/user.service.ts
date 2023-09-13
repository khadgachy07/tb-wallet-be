import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { WalletService } from '../wallet/wallet.service';
import { WalletEntity } from '../wallet/entities/wallet.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(WalletEntity)
    private walletRepository: Repository<WalletEntity>,

    private walletService: WalletService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...rest } = createUserDto;

    const encryptedPass = await this.encryptPassword(password);
    const bitAddress = await this.walletService.generateBitcoinLikeAddress();
    const ethAddress = await this.walletService.generateEthereumLikeAddress();
    if (!bitAddress && !ethAddress) {
      throw new Error('Error generating wallet address');
    }
    const wallet = new WalletEntity();
    wallet.bitAddress = bitAddress;
    wallet.ethAddress = ethAddress;
    wallet.btcBalance = 0;
    wallet.ethBalance = 0;
    const walletInfo = await this.walletRepository.save(wallet);
    const user = await this.userRepository.save({
      ...rest,
      encryptedPassword: encryptedPass,
      wallet: walletInfo,
    });
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneUser(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;
    const user = await this.findByEmail(email);
    const isPasswordValid = await this.verifyPassword(email, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    } else {
      return user;
    }
  }

  async updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<string> {
    const { email, newPassword } = updatePasswordDto;
    const user = await this.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    } else {
      const encryptedPassword = await this.encryptPassword(newPassword);
      user.encryptedPassword = encryptedPassword;
      await this.userRepository.save(user);
      return encryptedPassword;
    }
  }

  async encryptPassword(password: string): Promise<string> {
    try {
      const encryptedPass = await bcrypt.hash(password, 10);
      return encryptedPass;
    } catch (error) {
      throw new Error('Error encrypting password');
    }
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.encryptedPassword);
    return isMatch;
  }
}
