import { Role } from '@libs/constants';
import { ROLES_KEY } from '@libs/decorators/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[context.getHandler(),context.getClass()])
    console.log(requiredRoles)
    return true;
  }
}
