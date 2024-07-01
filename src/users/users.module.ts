import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/common/prisma.service';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
