import { ROLE } from '@libs/constants';
import { ROLES_KEY } from '@libs/decorators/Role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'apps/main/src/user/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector,private userServie:UserService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const requiredRoles = this.reflector.getAllAndMerge<ROLE[]>(ROLES_KEY,[context.getHandler(),context.getClass()])
    if(!requiredRoles){
    return true;

    }

    const req = context.switchToHttp().getRequest();
    const user = await this.userServie.findOneById(req.user.userId)

    return requiredRoles.some(o=>user.roles.includes(o));

  }
}
