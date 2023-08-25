import { HttpException, HttpStatus } from "@nestjs/common";

export class ConstraintError extends HttpException {
  constructor(constraint: string, id: number) {
    super(`Constraint Error: (${constraint}: ${id}) Not found`, HttpStatus.NOT_FOUND);
  }
}