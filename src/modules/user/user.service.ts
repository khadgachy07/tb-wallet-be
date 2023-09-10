import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...rest } = createUserDto;
    try {
      const encryptedPass = await this.encryptPassword(password);
      const user = await this.userRepository.create({
        ...rest,
        encryptedPassword: encryptedPass,
      });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new Error('Error creating user');
    }
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
