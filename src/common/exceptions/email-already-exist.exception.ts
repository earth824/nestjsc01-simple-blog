import {
  BaseException,
  ErrCode
} from '@/common/exceptions/validation.exception';
import { HttpStatus } from '@nestjs/common';

export class EmailAlreadyExist extends BaseException {
  errCode: string = ErrCode.EMAIL_ALREADY_EXIST;
  statusCode: number = HttpStatus.CONFLICT;

  constructor() {
    super('Email alreay exist');
  }
}
