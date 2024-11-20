import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  PureAbility,
} from '@casl/ability';
import { Action, Role } from '@libs/constants';

import { PrismaQuery, createPrismaAbility } from './casl.prisma';
import { PrismaSubjects } from './casl.subjects';
import { Injectable } from '@nestjs/common';

import { Post } from '@prisma/client';
const { MANAGE, UPDATE, DELETE, CREATE, READ } = Action;
const { ADMIN, USER } = Role;

type ExtendedSubjects = 'all';
export type AppSubjects = PrismaSubjects | ExtendedSubjects;
export type AppAbility = PureAbility<[Action, AppSubjects], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
  async createAbilityForUser(user: any & { roles: Role[] }) {
    const { can, build, cannot } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    if (user.roles.includes(ADMIN)) {
      can(MANAGE, 'all');
    } else {
      if (user.roles.includes(USER)) {
        can(MANAGE, 'all');
        cannot(DELETE, 'Post');
        cannot(DELETE, 'User');
        cannot(DELETE, 'Chatroom');
      }
    }

    return build();
  }
}
