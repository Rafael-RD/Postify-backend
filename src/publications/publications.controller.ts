import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.remove(id);
  }
}
