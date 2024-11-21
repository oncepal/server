import { AppAbility, CaslAbilityFactory, AppSubjects, ExtractSubjectType } from '@libs/casl';
import { Action, CHECK_POLICIES_KEY } from '@libs/constants';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// @Get()
// @UseGuards(PoliciesGuard)
// @CheckPolicies(new DeleteUserPolicyHandler())
// deleteAll() {
//   return this.userService.deleteAll();
// }

interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
export class DeleteUserPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.DELETE, 'User');
  }
}
export class DeletePostPolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.DELETE, 'Post');
  }
}
export const CheckPolicies = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const permissions = this.getPermissionsForUser(user); // 假设有一个方法来获取用户的权限
    const ability = await this.caslAbilityFactory.createAbilityForUser(user, permissions);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private getPermissionsForUser(user: any): { action: Action, subject: ExtractSubjectType<AppSubjects> }[] {
    // 这里需要实现一个方法来获取用户的权限
    // 例如，从数据库或其他服务中获取
    return [
      { action: Action.READ, subject: 'Post' as ExtractSubjectType<AppSubjects> },
      { action: Action.CREATE, subject: 'Post' as ExtractSubjectType<AppSubjects> },
      { action: Action.UPDATE, subject: 'Post' as ExtractSubjectType<AppSubjects> },
      { action: Action.DELETE, subject: 'Post' as ExtractSubjectType<AppSubjects> },
    ];
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
