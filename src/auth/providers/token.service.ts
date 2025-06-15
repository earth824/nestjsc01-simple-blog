import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

type Payload = { sub: string };

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  generateAccessToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfiguration.JWT_ACCESS_SECRET,
      expiresIn: this.jwtConfiguration.JWT_ACCESS_EXPIRES
    });
  }

  generateRefreshToken(payload: Payload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.jwtConfiguration.JWT_REFRESH_SECRET,
      expiresIn: this.jwtConfiguration.JWT_REFRESH_EXPIRES
    });
  }
  // verifyAccessToken(token: string): Promise<any> {}
  // verifyRefreshToken(token: string) {}
}
