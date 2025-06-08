import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const existUser = await this.usersService.findByEmail(registerDto.email);
    if (existUser) throw new BadRequestException('Email already in use');

    registerDto.password = await this.bcryptService.hash(registerDto.password);

    await this.usersService.create(registerDto);
  }
}
