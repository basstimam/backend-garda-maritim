import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){

    }

    findOne(email: string){
        return this.prismaService.user.findUnique({
            where: {
                email
            }
        })

    }

    findAll(){
        return this.prismaService.user.findMany()
    }

}
