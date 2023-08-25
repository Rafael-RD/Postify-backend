import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { ConstraintError, NotFoundError } from '../errors';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) { }

  async create(createPostDto: CreatePostDto) {
    try {
      const createdPost = await this.postsRepository.create(createPostDto);
      return createdPost;
    } catch (error) {
      console.error(error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.postsRepository.findAll();
  }

  async findOne(id: number) {
    try {
      const post = await this.postsRepository.findOne(id);
      return post;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('post', id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const updatedPost = await this.postsRepository.update(id, updatePostDto);
      return updatedPost;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('post', id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: number) {
    try {
      const deletedPost = await this.postsRepository.remove(id);
      return deletedPost;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('post', id);
      } else if (error.code === 'P2003') {
        throw new ConstraintError('publication');
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    };
  }
}
