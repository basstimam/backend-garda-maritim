import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findAll() {
        return this.usersService.findAll();
    }

    
    
}
