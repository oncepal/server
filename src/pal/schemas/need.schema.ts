import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
/**
 * @param id
 * @param minAge 头像
 * @param name 名字
 */
export type Pal = { id: number; avatar: number; name: number };
export type NeedDocument = HydratedDocument<Need>;

@Schema({ timestamps: true })
/**
 * 搭子需求模型
 * @param time 时间 2023-11-30 hh:mm
 * @param keyword 关键词
 * @param location 地点 “大坪”
 * @param description 具体描述介绍 “有没有....”
 * @param images 图片
 * @param promoterId 发起人的id SylasXu
 * @param palLimits 参与者人数限制 4
 * @param palIds 参与者们的id数组
 * @param paymentMethod 支付方式 0-无需费用 1-承担自己费用
 */
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc: NeedDocument, ret) => {
      delete ret.__v;
      ret.id = ret._id;
      delete ret._id;
    },
  },
})
export class Need {
  @Prop()
  id: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  keywords: string;
  @Prop()
  time: string;
  @Prop()
  location: string;
  @Prop()
  images: Array<string>;
  @Prop()
  description: string;
  @Prop()
  creatorUserId: string;
  @Prop({ type: mongoose.Schema.Types.Map })
  pals: Array<Pal>;
  @Prop({ length: 2, type: mongoose.Schema.Types.Map })
  palAge: Array<number>;
  @Prop()
  palSex: number;
  @Prop()
  palNumber: number;
  @Prop()
  paymentMethod: number;
}

export const NeedSchema = SchemaFactory.createForClass(Need);
