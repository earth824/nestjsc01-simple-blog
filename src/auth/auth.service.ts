import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
import { TokenService } from 'src/auth/providers/token.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly tokenService: TokenService
  ) {}

  async register(registerDto: RegisterDto): Promise<void> {
    const existUser = await this.usersService.findByEmail(registerDto.email);
    if (existUser) throw new BadRequestException('Email already in use');

    registerDto.password = await this.bcryptService.hash(registerDto.password);

    await this.usersService.create(registerDto);
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await this.bcryptService.compare(
      loginDto.password,
      user.password
    );
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    const payload = { sub: user.id };
    const access_token = await this.tokenService.generateAccessToken(payload);
    const refresh_token = await this.tokenService.generateRefreshToken(payload);
    return { access_token, refresh_token };
  }
}
