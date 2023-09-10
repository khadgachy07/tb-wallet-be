import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const encryptedPass = await bcrypt.hash(password, 10);
    const user = await this.userRepository.create({
      ...rest,
      encryptedPassword: encryptedPass,
    });
    await this.userRepository.save(user);
    return { message: 'User registered successfully', user };
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOneUser(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.findByEmail(email);
    const isPasswordValid = await this.verifyPassword(email, password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    } else {
      return { message: 'Login successful', user };
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
