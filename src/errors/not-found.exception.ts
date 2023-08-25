import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundError extends HttpException {
  constructor(entity: Entity, entityId: number) {
    super(`${entity.charAt(0).toUpperCase() + entity.slice(1)} with id ${entityId} not found`, HttpStatus.NOT_FOUND);
  }
}

type Entity = 'post' | 'media' | 'publication';