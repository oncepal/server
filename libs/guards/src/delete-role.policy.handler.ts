import { Ability, PureAbility } from '@casl/ability';
import { Action } from '@libs/constants';

export interface IPolicyHandler {
  handle(ability: PureAbility): boolean;
}

export class DeleteRolePolicyHandler implements IPolicyHandler {
  handle(ability: PureAbility): boolean {
    return ability.can(Action.DELETE, 'Role');
  }
}
