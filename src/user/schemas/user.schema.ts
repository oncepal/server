import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    wxAccount: string
    @Prop()
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);