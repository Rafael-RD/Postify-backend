import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsUrl, ValidateIf } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsUrl()
  image: string | null;
}
