import { Demand, DemandDocument } from '@libs/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateDemandDto, UpdateDemandDto } from '@libs/dtos';
@Injectable()
export class DemandService {
  @InjectModel(Demand.name)
  private demandModel: Model<Demand>;

  async create(demand: Partial<CreateDemandDto>) {
    return await this.demandModel.create(demand);
  }

  async find(skip: number, limit: number, query?: Partial<Demand>) {

    const findQuery = this.demandModel
      .find({
        $or: [{ keywords: { $regex: new RegExp(query?.keywords, 'i') } }],
      })
      .sort({ id: 1 })
      .skip(skip)
      .limit(limit);

    const demandList = await findQuery;
    const total = await this.demandModel.count();
    return { demandList, total };
  }

  async findOneById(id: string) {
    return await this.demandModel.findById(id).exec();
  }
  async findOneByPhoneNumber(phoneNumber: string) {
    return await this.demandModel.findOne({ phoneNumber }).exec();
  }
  async findOne(demand: Record<string, any>) {
    return await this.demandModel.findOne(demand).exec();
  }
  async update(demand: UpdateDemandDto) {
    return await this.demandModel
      .findByIdAndUpdate((demand as any)?.id, demand, { new: true })
      .exec();
  }
  async delete(id: string) {
    const deletedDemand =  await this.demandModel.findByIdAndRemove(id)
    
    return {}

  }
  async deleteAll() {
    return await this.demandModel.deleteMany();
  }
}
