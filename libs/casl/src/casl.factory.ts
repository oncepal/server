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
export type AppAbility = PureAbility<[Action, ExtractSubjectType<AppSubjects>], PrismaQuery>;

@Injectable()
export class CaslAbilityFactory {
  async createAbilityForUser(user: any & { roles: Role[] }, permissions: { action: Action, subject: ExtractSubjectType<AppSubjects> }[]) {
    const { can, build, cannot } = new AbilityBuilder<AppAbility>(
      createPrismaAbility,
    );

    // 动态分配权限
    permissions.forEach(({ action, subject }) => {
      can(action, subject);
    });

    return build();
  }
}
