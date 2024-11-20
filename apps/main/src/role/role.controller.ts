import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Prisma, Role as RoleModel } from '@prisma/client';
import { CreateRoleDto, GetRolesDto, UpdateRoleDto } from '@libs/dtos';
import { PoliciesGuard, CheckPolicies } from '@libs/guards';
import { DeleteRolePolicyHandler } from '@libs/guards/delete-role.policy.handler';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 创建角色
   * @body role 角色信息
   * @returns 创建好的角色信息
   */
  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleModel> {
    return this.roleService.create(createRoleDto);
  }

  /**
   * 查询匹配条件的角色
   * @query querys 查询条件
   * @returns 满足条件的角色列表
   */
  @Get()
  async getRoles(@Query() querys: GetRolesDto): Promise<RoleModel[]> {
    const { skip, take, cursor, where, orderBy } = querys;
    return this.roleService.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 查询角色详情
   * @param id 角色id
   * @returns 角色详情对象
   */
  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<RoleModel> {
    return this.roleService.findOneById(id);
  }

  /**
   * 修改角色信息
   * @body 角色信息
   * @returns 修改后的角色信息
   */
  @Patch(':id')
  async updateRole(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleModel> {
    return this.roleService.updateRoleById(id, updateRoleDto);
  }

  /**
   * 删除角色
   * @param id 角色id
   * @returns 删除成功与否
   */
  @Delete(':id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteRolePolicyHandler())
  async deleteRole(@Param('id') id: string): Promise<RoleModel> {
    return this.roleService.delete({ id });
  }

  /**
   * 清空角色
   * @returns 删除成功与否
   */
  @Delete()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(new DeleteRolePolicyHandler())
  async deleteRoles(): Promise<Prisma.BatchPayload> {
    return this.roleService.deleteAll();
  }
}
