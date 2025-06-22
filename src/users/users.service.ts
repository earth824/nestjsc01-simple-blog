import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    await this.prismaService.user.create({ data });
  }

  async findById(id: string): Promise<Omit<User, 'password'> | null> {
    return this.prismaService.user.findUnique({
      where: { id },
      omit: { password: true }
    });
  }
}
