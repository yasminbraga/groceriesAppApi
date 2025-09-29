import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<{ token: string }> {
    const user = await this.usersService.findOneBy(email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordValid = await compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    const token = await this.jwtService.signAsync(payload);
    return { token };
  }
}
