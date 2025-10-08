import { Body, Controller, Post } from '@nestjs/common';
import { RequestUserDto } from './dto/request-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() requestUserDto: RequestUserDto) {
    return this.usersService.register(requestUserDto);
  }
}
