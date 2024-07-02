import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginRequest, AuthRegisterRequest } from '../models/auth.model';
import { AuthService } from '../services/auth.service';
import { Public } from '../decorators/auth.decorators';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    

    
    
    @Post('login')
    @Public()
    @HttpCode(200)
    async login(
        @Body() request: AuthLoginRequest
    ) {
        return await this.authService.login(request);
    }

    @Post('register')
    @Public()
    @HttpCode(200)
    async register(
        @Body() request: AuthRegisterRequest
    ) {
        return await this.authService.register(request);
    }
}
