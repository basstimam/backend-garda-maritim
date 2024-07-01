import { User } from "@prisma/client";

export class AuthLoginRequest{
    email: string;
    password: string;
}

export class AuthLoginResponse{
    token: string;
    user?: User;
}

export class AuthRegisterRequest{
    email: string;
    password: string;
    name: string;
}

export class AuthRegisterResponse{
    token: string;
    user: User;
}

