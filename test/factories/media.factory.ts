import { faker } from "@faker-js/faker";
import { CreateMediaDto } from "../../src/medias/dto/create-media.dto";
import { BaseFactory } from "./factory";

export class MediaFactory extends BaseFactory {
  static async createInDB() {
    return await this.prisma.media.create({
      data: this.createDto()
    })
  }

  static createDto(): CreateMediaDto {
    return {
      title: faker.company.name(),
      username: faker.internet.userName(),
    } as CreateMediaDto;
  }
}
