import { INestApplication } from "@nestjs/common";
import { PrismaService } from "../src/prisma/prisma.service";
import { publicationFactiory } from "./factories/publication.factory";
import { PublicationsModule } from "../src/publications/publications.module";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from 'supertest';
import { MediaFactory, PostFactory } from "./factories";

describe('PublicationController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PublicationsModule],
    }).overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await publicationFactiory.cleanDb();
  });

  it('/publications (GET)', () => {
    return request(app.getHttpServer())
      .get('/publications')
      .expect(200)
      .expect([]);
  });

  it('/publications/:id (GET)', async () => {
    const media = await MediaFactory.createInDB();
    const post = await PostFactory.createInDB();
    const publication = await publicationFactiory.createInDB(media.id, post.id);

    const res = await request(app.getHttpServer())
      .get(`/publications/${publication.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: publication.id,
      mediaId: publication.mediaId,
      postId: publication.postId,
      scheduledAt: publication.scheduledAt.toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('/publications (POST)', async () => {
    const media = await MediaFactory.createInDB();
    const post = await PostFactory.createInDB();
    const publicationDTO = publicationFactiory.createDto(media.id, post.id);

    const res = await request(app.getHttpServer())
      .post('/publications')
      .send(publicationDTO);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(Number),
      mediaId: publicationDTO.mediaId,
      postId: publicationDTO.postId,
      scheduledAt: publicationDTO.scheduledAt.toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('/publications/:id (PUT)', async () => {
    const media = await MediaFactory.createInDB();
    const post = await PostFactory.createInDB();
    const publication = await publicationFactiory.createInDB(media.id, post.id);
    const publicationDTO = publicationFactiory.createDto(media.id, post.id);

    const res = await request(app.getHttpServer())
      .put(`/publications/${publication.id}`)
      .send(publicationDTO);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: publication.id,
      mediaId: publicationDTO.mediaId,
      postId: publicationDTO.postId,
      scheduledAt: publicationDTO.scheduledAt.toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });

  it('/publications/:id (DELETE)', async () => {
    const media = await MediaFactory.createInDB();
    const post = await PostFactory.createInDB();
    const publication = await publicationFactiory.createInDB(media.id, post.id);

    const res = await request(app.getHttpServer())
      .delete(`/publications/${publication.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: publication.id,
      mediaId: publication.mediaId,
      postId: publication.postId,
      scheduledAt: publication.scheduledAt.toISOString(),
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    });
  });
});