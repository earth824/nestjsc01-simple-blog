import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ValidationException } from '@/common/exceptions/validation.exception';
import { GlobalFilter } from '@/common/filters/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory(errors) {
        const details = errors.reduce<Record<string, string[]>>((acc, el) => {
          if (el.constraints) {
            acc[el.property] = Object.values(el.constraints);
          }
          return acc;
        }, {});

        // throw new BadRequestException({
        //   details,
        //   statusCode: HttpStatus.BAD_REQUEST,
        //   message: 'Validation failed',
        //   error: 'Bad Request'
        // });

        throw new ValidationException(details);
      }
    })
  );

  app.useGlobalFilters(new GlobalFilter());

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

// [
//   ValidationError {
//     target: RegisterDto {
//       firstName: undefined,
//       lastName: undefined,
//       email: undefined,
//       password: undefined,
//       role: 'user',
//       details: [Object]
//     },
//     value: { firstName: [Array], lastName: [Array] },
//     property: 'details',
//     children: undefined,
//     constraints: { whitelistValidation: 'property details should not exist' }
//   },
//   ValidationError {
//     target: RegisterDto {
//       firstName: undefined,
//       lastName: undefined,
//       email: undefined,
//       password: undefined,
//       role: 'user',
//       details: [Object]
//     },
//     value: undefined,
//     property: 'firstName',
//     children: [],
//     constraints: {
//       isNotEmpty: 'firstName should not be empty',
//       isString: 'firstName must be a string'
//     }
//   },
//   ValidationError {
//     target: RegisterDto {
//       firstName: undefined,
//       lastName: undefined,
//       email: undefined,
//       password: undefined,
//       role: 'user',
//       details: [Object]
//     },
//     value: undefined,
//     property: 'lastName',
//     children: [],
//     constraints: {
//       isNotEmpty: 'lastName should not be empty',
//       isString: 'lastName must be a string'
//     }
//   },
//   ValidationError {
//     target: RegisterDto {
//       firstName: undefined,
//       lastName: undefined,
//       email: undefined,
//       password: undefined,
//       role: 'user',
//       details: [Object]
//     },
//     value: undefined,
//     property: 'email',
//     children: [],
//     constraints: { isEmail: 'email must be an email' }
//   },
//   ValidationError {
//     target: RegisterDto {
//       firstName: undefined,
//       lastName: undefined,
//       email: undefined,
//       password: undefined,
//       role: 'user',
//       details: [Object]
//     },
//     value: undefined,
//     property: 'password',
//     children: [],
//     constraints: {
//       minLength: 'password must be longer than or equal to 6 characters',
//       isAlphanumeric: 'password must contain only letters and numbers',
//       isString: 'password must be a string'
//     }
//   }
// ]
