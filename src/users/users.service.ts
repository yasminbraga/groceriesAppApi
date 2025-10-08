import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { RequestUserDto } from './dto/request-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register({ name, email, password }: RequestUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOneBy({ email: email });
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(password, 10);
    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }

  async findOneBy(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: email });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
