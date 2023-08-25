import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsUrl()
  image: string;
}
