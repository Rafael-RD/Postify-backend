import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsModule } from '../src/posts/posts.module';
import { PostFactory } from './factories';
import { Post } from '@prisma/client';

describe('PostController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostsModule],
    }).overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await PostFactory.cleanDb();
  });

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect([]);
  });

  it('/posts/:id (GET)', async () => {
    const post = await PostFactory.createInDB();

    const res = await request(app.getHttpServer())
      .get(`/posts/${post.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: post.id,
      title: post.title,
      text: post.text,
      image: post.image ? post.image : null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    } as Post);
  });

  it('/posts (POST)', async () => {
    const postDTO = PostFactory.createDto();

    const res = await request(app.getHttpServer())
      .post('/posts')
      .send(postDTO);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(Number),
      title: postDTO.title,
      text: postDTO.text,
      image: postDTO.image ? postDTO.image : null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    } as Post);
  });

  it('/posts/:id (PUT)', async () => {
    const post = await PostFactory.createInDB();
    const postDTO = PostFactory.createDto();

    const res = await request(app.getHttpServer())
      .put(`/posts/${post.id}`)
      .send(postDTO);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: post.id,
      title: postDTO.title,
      text: postDTO.text,
      image: postDTO.image ? postDTO.image : post.image ? post.image : null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    } as Post);
  });

  it('/posts/:id (DELETE)', async () => {
    const post = await PostFactory.createInDB();

    const res = await request(app.getHttpServer())
      .delete(`/posts/${post.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: post.id,
      title: post.title,
      text: post.text,
      image: post.image ? post.image : null,
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    } as Post);
  });
});