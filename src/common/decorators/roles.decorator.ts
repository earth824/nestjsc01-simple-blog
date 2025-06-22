import { Role } from '@/enums/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES_KEY';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
