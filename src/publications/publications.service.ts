import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { NotFoundError } from '../errors';

@Injectable()
export class PublicationsService {
  constructor(private readonly publicationsRepository: PublicationsRepository) { }

  async create(createPublicationDto: CreatePublicationDto) {
    try {
      const createdPublication = await this.publicationsRepository.create(createPublicationDto);
      return createdPublication;
    } catch (error) {
      if (error.code === 'P2003') {
        const constraint = error.meta.field_name.split('_')[1];
        throw new NotFoundError(constraint, createPublicationDto[constraint]);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findAll() {
    return await this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    try {
      const publication = await this.publicationsRepository.findOne(id);
      return publication;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('publication', id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    try {
      const updatedPublication = await this.publicationsRepository.update(id, updatePublicationDto);
      return updatedPublication;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('publication', id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async remove(id: number) {
    try {
      const deletedPublication = await this.publicationsRepository.remove(id);
      return deletedPublication;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError('publication', id);
      } else {
        console.error(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
