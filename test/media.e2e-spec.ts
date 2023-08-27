import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../src/prisma/prisma.service";
import * as request from 'supertest';
import { MediasModule } from "../src/medias/medias.module";
import { MediaFactory } from "./factories";
import { Media } from "@prisma/client";

describe('MediaController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MediasModule],
    }).overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await MediaFactory.cleanDb();
  });

  it('/medias (GET)', () => {
    return request(app.getHttpServer())
      .get('/medias')
      .expect(200)
      .expect([]);
  });

  it('/medias/:id (GET)', async () => {
    const media = await MediaFactory.createInDB();

    const res = await request(app.getHttpServer())
      .get(`/medias/${media.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual<Media>({
      id: media.id,
      title: media.title,
      username: media.username,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('/medias (POST)', async () => {
    const mediaDTO = MediaFactory.createDto();

    const res = await request(app.getHttpServer())
      .post('/medias')
      .send(mediaDTO);

    expect(res.status).toBe(201);
    expect(res.body).toEqual<Media>({
      id: expect.any(Number),
      title: mediaDTO.title,
      username: mediaDTO.username,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('/medias/:id (PUT)', async () => {
    const media = await MediaFactory.createInDB();
    const mediaDTO = MediaFactory.createDto();

    const res = await request(app.getHttpServer())
      .put(`/medias/${media.id}`)
      .send(mediaDTO);

    expect(res.status).toBe(200);
    expect(res.body).toEqual<Media>({
      id: media.id,
      title: mediaDTO.title,
      username: mediaDTO.username,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('/medias/:id (DELETE)', async () => {
    const media = await MediaFactory.createInDB();

    const res = await request(app.getHttpServer())
      .delete(`/medias/${media.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual<Media>({
      id: media.id,
      title: media.title,
      username: media.username,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

});
