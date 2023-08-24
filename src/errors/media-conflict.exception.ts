import { HttpException, HttpStatus } from "@nestjs/common";

export class MediaConflict extends HttpException {
  constructor() {
    super('Media already exists', HttpStatus.CONFLICT);
  }
}