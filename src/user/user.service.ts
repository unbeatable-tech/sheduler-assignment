import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async findOneByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async createUser(fullName: string, email: string, password: string) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userDetail = await this.prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            },
        });
        return {
            status: 'success',
            message: 'User created successfully.',
        }

    }
}
