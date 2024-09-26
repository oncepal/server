import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/prisma';
import { $Enums, Prisma, Demand } from '@prisma/client';

@Injectable()
export class DemandService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async create(demand: Prisma.DemandUncheckedCreateInput): Promise<Demand> {
    const createDemand = await this.prismaService.demand.create({ data: demand });
    
    return createDemand;
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DemandWhereUniqueInput;
    where?: Prisma.DemandWhereInput;
    orderBy?: Prisma.DemandOrderByWithRelationInput;
  }): Promise<Demand[]> {
    
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.demand.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    // return { results, count };
  }

  async findOne(
    demandWhereUniqueInput: Prisma.DemandWhereUniqueInput,
  ): Promise<Demand | null> {
    return this.prismaService.demand.findUnique({
      where: demandWhereUniqueInput,
    });
  }
  
  async findOneById(id: string) {
    const demand = await this.findOne({
      id,
    });

    return demand;
  }

  async update(params: {
    where: Prisma.DemandWhereUniqueInput;
    data: Prisma.DemandUncheckedUpdateInput;
  }): Promise<Demand> {
    const { data, where } = params;
    return this.prismaService.demand.update({
      data,
      where,
    });
  }

  async updateDemandById(demandId:string, data: Prisma.DemandUncheckedUpdateInput): Promise<Demand> {
    const where = {
      id:demandId
    }
    return this.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.DemandWhereUniqueInput): Promise<Demand> {
    return this.prismaService.demand.delete({
      where,
    });
  }

  async deleteAll() {
    return await this.prismaService.demand.deleteMany();
  }
}
