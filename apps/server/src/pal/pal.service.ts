import { Need, NeedDocument } from './schemas/need.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateNeedDto, UpdateNeedDto } from './dto/need.dto';
@Injectable()
export class PalService {
  @InjectModel(Need.name)
  private needModel: Model<Need>;

  async create(need: Partial<CreateNeedDto>) {
    return await this.needModel.create(need);
  }

  async find(skip: number, limit: number, query?: Partial<Need>) {
    console.log(query);

    const findQuery = this.needModel
      .find({
        $or: [{ keywords: { $regex: new RegExp(query?.keywords, 'i') } }],
      })
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);

    const needList = await findQuery;
    const total = await this.needModel.count();
    return { needList, total };
  }

  async findOneById(id: string) {
    return await this.needModel.findById(id).exec();
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    return await this.needModel.findOne({ phoneNumber }).exec();
  }
  async findOne(need: Record<string, any>) {
    return await this.needModel.findOne(need).exec();
  }
  async update(need: UpdateNeedDto) {
    return await this.needModel
      .findByIdAndUpdate(need.id, need, { new: true })
      .exec();
  }
  async delete(id: string) {
    const deletedNeed =  await this.needModel.findByIdAndRemove(id)
    console.log(deletedNeed);
    
    return {}

  }
  async deleteAll() {
    return await this.needModel.deleteMany();
  }
}
