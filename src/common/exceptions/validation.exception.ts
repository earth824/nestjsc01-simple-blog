import { HttpStatus } from '@nestjs/common';

export enum ErrCode {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST'
}

export abstract class BaseException extends Error {
  abstract errCode: string;
  details?: any;
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }
}

export class ValidationException extends BaseException {
  errCode: string = ErrCode.VALIDATION_FAILED;
  statusCode: number = HttpStatus.BAD_REQUEST;

  constructor(details: unknown) {
    super('Validation failed');
    this.details = details;
  }
}
