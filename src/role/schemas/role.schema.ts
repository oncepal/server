import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Permission } from './permission.schema';

/**
 * 角色模型
 * @param id id
 * @param name 角色名 
 * @param permissions 权限 
 */

@Schema({ timestamps: true ,toJSON: {
    transform: (doc: HydratedDocument<Role>, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
} })
export class Role {
    @Prop()
    id:string
    @Prop()
    permissions:Permission[]
}

export const RoleSchema = SchemaFactory.createForClass(Role);