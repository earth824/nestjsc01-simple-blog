import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { BcryptService } from './providers/bcrypt.service';
import { TokenService } from './providers/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService, TokenService],
  imports: [UsersModule, JwtModule]
})
export class AuthModule {}
