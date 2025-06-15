import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { RegisterDto } from 'src/auth/dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return { message: 'Registered successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ access_token: string }> {
    const { access_token, refresh_token } =
      await this.authService.login(loginDto);

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    });

    return { access_token };
  }
}
