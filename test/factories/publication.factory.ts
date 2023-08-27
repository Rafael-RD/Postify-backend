import { faker } from "@faker-js/faker";
import { BaseFactory } from "./factory";
import { CreatePublicationDto } from "../../src/publications/dto/create-publication.dto";

export class publicationFactiory extends BaseFactory {
  static async createInDB(mediaId: number, postId: number) {
    return await this.prisma.publication.create({
      data: this.createDto(mediaId, postId)
    })
  }

  static createDto(mediaId: number, postId: number) {
    return {
      mediaId,
      postId,
      scheduledAt: faker.date.future()
    } as CreatePublicationDto;
  }
}