import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BlogsModule } from './blogs/blogs.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'src/config/validate';
import jwtConfig from 'src/config/jwt.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    BlogsModule,
    CommentsModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      load: [jwtConfig]
    })
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
})
export class AppModule {}
