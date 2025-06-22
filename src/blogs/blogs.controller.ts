import { RoleGuard } from '@/auth/guards/role.guard';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/enums/role.enum';
import { Controller, Post, UseGuards } from '@nestjs/common';

@Controller('blogs')
export class BlogsController {
  @UseGuards(RoleGuard)
  @Roles(Role.Admin)
  @Post()
  createBlog() {}
}
