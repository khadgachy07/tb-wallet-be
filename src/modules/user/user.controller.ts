import { Controller, Post, Get, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { message: 'User registered successfully', user };
  }

  @Post('admin/register')
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createAdmin(createUserDto);
    return { message: 'Admin registered successfully', user };
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      const user = await this.userService.loginUser(loginUserDto);
      return { message: 'Login successful', user };
    } catch (error) {
      return { message: 'Login failed', error: error.message };
    }
  }

  @Get('find')
  async findUserByEmail(@Body() updatePasswordDto: UpdatePasswordDto) {
    const { email } = updatePasswordDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    } else {
      return { message: 'User found', user };
    }
  }

  @Patch('updatePassword')
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const data: any = await this.userService.updatePassword(updatePasswordDto);
    return { message: 'Password updated.', data };
  }
}
