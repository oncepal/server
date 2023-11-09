import { Pal } from './pal.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {  } from './pal.dto';
@Injectable()
export class PalService {
    constructor(@InjectModel(Pal.name) private model: Model<Pal>) {}

}