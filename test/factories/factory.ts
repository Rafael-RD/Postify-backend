import { PrismaService } from "../../src/prisma/prisma.service";

export class BaseFactory {
  static prisma: PrismaService = new PrismaService();

  static async cleanDb() {
    await this.prisma.publication.deleteMany();
    await this.prisma.media.deleteMany();
    await this.prisma.post.deleteMany();
  }
}
