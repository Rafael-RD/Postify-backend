import { Transform } from "class-transformer";
import { IsDate, IsDateString, IsDefined, IsNotEmpty, IsNumber, Min, MinDate } from "class-validator";

export class CreatePublicationDto {
  @IsNumber()
  @Min(1)
  mediaId: number;

  @IsNumber()
  @Min(1)
  postId: number;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  scheduledAt: Date;
}
