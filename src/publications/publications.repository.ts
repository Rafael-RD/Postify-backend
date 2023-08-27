import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdatePublicationDto } from "./dto/update-publication.dto";
import { CreatePublicationDto } from "./dto/create-publication.dto";

@Injectable()
export class PublicationsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreatePublicationDto) {
    return await this.prisma.publication.create({
      data
    });
  }

  async findAll(published: boolean | undefined, after: Date | undefined) {
    const publishedFilter = published === undefined ? {} : published ? { lt: new Date() } : { gt: new Date() };
    const afterFilter = after === undefined ? {} : { gt: after };

    return await this.prisma.publication.findMany({
      where: {
        AND: [{
          scheduledAt: publishedFilter
        },{
          scheduledAt: afterFilter
        }]
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.publication.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  async update(id: number, data: UpdatePublicationDto) {
    return await this.prisma.publication.update({
      where: {
        id
      },
      data
    });
  }

  async remove(id: number) {
    return await this.prisma.publication.delete({
      where: {
        id
      }
    });
  }
}