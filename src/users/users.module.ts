import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/common/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  imports: [],
  exports: [UsersService],
})
export class UsersModule {}
