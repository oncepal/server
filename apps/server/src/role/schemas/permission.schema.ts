import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

/**
 * 权限模型
 * @param id id
 * @param name 权限码 
 * @param description 权限描述
 */

@Schema({ timestamps: true ,toJSON: {
    transform: (doc: HydratedDocument<Permission>, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
} })
export class Permission {
    @Prop()
    id:string
    @Prop()
    code:string
    @Prop()
    description:string
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);