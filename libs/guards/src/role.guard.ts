import { Role } from '@libs/constants';
import { ROLES_KEY } from '@libs/decorators/roles.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { UserService } from 'apps/main/src/user/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  //,private userServie:UserService
  constructor(private reflector:Reflector){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    // const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY,[context.getHandler(),context.getClass()])
    // if(!requiredRoles){
    // }
    return true;

    // const req = context.switchToHttp().getRequest();
    // const user = await this.userServie.findOneByPhoneNumber(req.user.phoneNumber)
    // const roleNames = user.roles.map
    // user
  }
}
