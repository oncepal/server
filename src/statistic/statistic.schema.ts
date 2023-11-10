import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StatisticDocument = HydratedDocument<Statistic>;

@Schema({ timestamps: true })
/**
 * 搭子活动模型
 * @param type 需求搭子类型 “饭”，“livehouse”
 * @param time 时间 2023.11-30
 * @param location 地点 “大坪”
 * @param description 具体描述介绍 “有没有....”
 * @param img 图片 
 * @param promoterId 发起人的id SylasXu
 * @param participantLimit 参与者人数限制 4
 * @param participantIds 参与者们的id SylasXu huangqian
 * @param paymentMethod 支付方式 0-AA 1-提前收款
 */
export class Statistic {
    @Prop()
    type: string;
    @Prop()
    time: string;
    @Prop()
    location: string;
    @Prop()
    img: Array<string>;
    @Prop()
    description: string;
    @Prop()
    promoterId: string;
    @Prop()
    participantIds: Array<string>;
    @Prop()
    paymentMethod:number
    @Prop()
    participantLimit:number
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);