import { BaseException } from '@/common/exceptions/validation.exception';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BaseException)
export class GlobalFilter implements ExceptionFilter {
  catch(exception: BaseException, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>();
    const res = host.switchToHttp().getResponse<Response>();
    res.status(exception.statusCode).json({
      statusCode: exception.statusCode,
      details: exception.details as unknown,
      timestamp: new Date().toISOString(),
      success: false,
      message: exception.message,
      path: req.path
    });
  }
}
