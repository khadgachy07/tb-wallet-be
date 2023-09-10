import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return { message: 'User registered successfully', user };
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

  @Get(':userId')
  async getUserById(@Param('userId') userId: number) {
    try {
      const user = await this.userService.findOneUser(userId);
      if (!user) {
        return { message: 'User not found' };
      }
      return { message: 'User found', user };
    } catch (error) {
      return { message: 'Error retrieving user', error: error.message };
    }
  }
}
