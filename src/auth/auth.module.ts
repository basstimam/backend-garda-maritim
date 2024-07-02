import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PrismaService } from 'src/common/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { JwtStrategy } from './guards/jwt.strategy';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    CommonModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
