import { Pal } from './pal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreatePalDto,UpdatePalDto,FindPalDto } from './pal.dto';
@Injectable()
export class PalService {
    constructor(@InjectModel(Pal.name) private model: Model<Pal>) { }
    create(pal: CreatePalDto) {
        return this.model.create(pal);
    }

    find(filter?: FindPalDto) {
        return this.model.find(filter);
    }
   
    update(id: string, pal: UpdatePalDto) {
        return this.model.findByIdAndUpdate(id, pal, { new: true });
    }
    delete(id: string) {
        return this.model.findByIdAndRemove(id);
    }
}