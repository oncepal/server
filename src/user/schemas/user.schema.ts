import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Role } from '../../role/schemas/role.schema';

/**
 * 用户模型
 * @param id id
 * @param avatar 头像 
 * @param phoneNumber 手机号 13996092354
 * @param name 用户真实姓名
 * @param sex 1-男 0-女
 * @param introduction 自我介绍
 */

@Schema({ timestamps: true ,toJSON: {
    transform: (doc: HydratedDocument<User>, ret) => {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
    }
} })
export class User {
    @Prop()
    id:string
    @Prop()
    avatar: string
    @Prop()
    name: string;
    // @Prop(raw({
    //     name: { type: String },
    //     account: { type: String }
    //   }))
    // wechatInfo: Record<string, any>
    @Prop()
    phoneNumber: string
    @Prop()
    sex: number;
    @Prop()
    introduction: string;
    @Prop()
    isFrozen:boolean
    @Prop()
    roles:Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);