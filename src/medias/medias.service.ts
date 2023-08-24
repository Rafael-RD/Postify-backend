import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { MediaNotFound } from '../errors/media-not-found.exception';
import { MediaConflict } from '../errors/media-conflict.exception';

@Injectable()
export class MediasService {

  constructor(private readonly repository: MediasRepository) { }

  async create(createMediaDto: CreateMediaDto) {
    try {

      const createdMedia = await this.repository.create(createMediaDto);
      return createdMedia;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new MediaConflict();
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    try {
      const media = await this.repository.findOne(id);
      return media;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new MediaNotFound(id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    try {
      const updatedMedia = await this.repository.update(id, updateMediaDto);
      return updateMediaDto;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new MediaNotFound(id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: number) {
    try {
      const deletedMedia = await this.repository.remove(id);
      return deletedMedia;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new MediaNotFound(id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
