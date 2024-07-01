import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginRequest, AuthRegisterRequest } from './auth.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    @HttpCode(200)
    async login(
        @Body() request: AuthLoginRequest
    ) {
        return await this.authService.login(request);
    }

    @Post('register')
    @HttpCode(200)
    async register(
        @Body() request: AuthRegisterRequest
    ) {
        return await this.authService.register(request);
    }
}
