import { ROLE } from '@libs/constants';
import { SetMetadata } from '@nestjs/common';
export const ROLES_KEY = 'roles'
export const Role = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
