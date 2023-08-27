import { faker } from "@faker-js/faker";
import { BaseFactory } from "./factory";
import { CreatePostDto } from "../../src/posts/dto/create-post.dto";

export class PostFactory extends BaseFactory {
  static async createInDB() {
    return await this.prisma.post.create({
      data: this.createDto()
    })
  }

  static createDto() {
    const image = Math.random() > 0.5 ? { image: faker.image.url() } : {};
    return {
      title: faker.lorem.sentence(),
      text: faker.lorem.paragraph(),
      ...image
    } as CreatePostDto;
  }
}