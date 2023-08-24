import { HttpException, HttpStatus } from "@nestjs/common";

export class MediaNotFound extends HttpException {
  private _mediaId: number;

  constructor(mediaId: number) {
    super(`Media with id ${mediaId} not found`, HttpStatus.NOT_FOUND);
    this._mediaId = mediaId;
  }

  get mediaId() {
    return this._mediaId;
  }
}