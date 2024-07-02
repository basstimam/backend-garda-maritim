import { Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { AuthLoginRequest, AuthLoginResponse, AuthRegisterRequest, AuthRegisterResponse } from '../models/auth.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4} from 'uuid';
import { Role } from '@prisma/client';



@Injectable()
export class AuthService {
    constructor(private prismaService : PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private jwtService: JwtService
    ) {}

    async login(request : AuthLoginRequest) : Promise<AuthLoginResponse>
    {
        const user = await this.prismaService.user.findUnique({
            where : {
                email : request.email
            }
        });

        if(!user)
        {
            this.logger.error('User not found');
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(request.password, user.password);

        if(!isPasswordValid)
        {
            this.logger.error('Invalid password');
            throw new Error('Invalid password');
        }

        return {
            token: this.jwtService.sign({
                id: user.id,
                email: user.email,
                role : user.role
            }),
            user
                
        
        }

        
        
    }

    async register (request : AuthRegisterRequest) : Promise<AuthRegisterResponse>{
        const existingUser = await this.prismaService.user.findUnique({
            where : {
                email : request.email
            }
        });

        if(existingUser)
        {
            this.logger.error('User already exists');
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(request.password, 10);

        const user = await this.prismaService.user.create({
            data: {
                id: uuidv4(),
                email: request.email,
                password: hashedPassword,
                name: request.name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            
        });

        return {
            token: this.jwtService.sign({
                id: user.id,
                email: user.email,
                role : user.role
            }),
            user
        }

        


    }



}
