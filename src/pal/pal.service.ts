import { Pal } from './pal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePalDto } from './pal.dto';
@Injectable()
export class PalService {
    constructor(@InjectModel(Pal.name) private model: Model<Pal>) {}
    create(pal: CreatePalDto) {
        return this.model.create(pal);
      }
}