import { HttpException, HttpStatus } from "@nestjs/common";

export class ConflictError extends HttpException {
  constructor(entity: Entity) {
    super(`${entity.charAt(0).toUpperCase() + entity.slice(1)} conflicts with an existing entry`, HttpStatus.CONFLICT);
  }
}

type Entity = 'post' | 'media' | 'publication' | string;