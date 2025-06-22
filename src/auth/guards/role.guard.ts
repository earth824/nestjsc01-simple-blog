import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { Role } from '@/enums/role.enum';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    const req = context.switchToHttp().getRequest<Request>();

    if (req.user?.role && roles.includes(req.user.role as Role)) return true;

    throw new ForbiddenException(
      'You do not have a permission to perform this action'
    );
  }
}
