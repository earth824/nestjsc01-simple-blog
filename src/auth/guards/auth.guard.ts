import { TokenService } from '@/auth/providers/token.service';
import { IS_PUBLIC_KEY } from '@/common/decorators/public.decorator';
import { UsersService } from '@/users/users.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractJwtFromHeader(req);

    if (!token)
      throw new UnauthorizedException('Invalid bearer authorization header');

    let userId: string;
    try {
      const payload = await this.tokenService.verifyAccessToken(token);
      userId = payload.sub;
      // { sub: string } sub is authenticated user id
    } catch {
      throw new UnauthorizedException('Invalid JWT');
    }

    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    req.user = user;

    return true;
  }

  extractJwtFromHeader(req: Request): string | undefined {
    const [bearer, token] = req.headers.authorization?.split(' ') ?? []; // Bearer jwt ==> ['Bearer', 'jwt' ]
    return bearer === 'Bearer' ? token : undefined;
  }
}
