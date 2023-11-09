import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PalDocument = HydratedDocument<Pal>;

@Schema({ timestamps: true })
export class Pal {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    promoterId: string;
    @Prop()
    participantId: string;
}

export const PalSchema = SchemaFactory.createForClass(Pal);