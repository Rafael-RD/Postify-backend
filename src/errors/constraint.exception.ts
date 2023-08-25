import { HttpException, HttpStatus } from "@nestjs/common";

export class ConstraintError extends HttpException {
  constructor(constraint: string) {
    super(`Constraint Error: ${constraint}`, HttpStatus.FORBIDDEN);
  }
}