import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, 10);
  }

  compare(plain: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plain, digest);
  }
}
