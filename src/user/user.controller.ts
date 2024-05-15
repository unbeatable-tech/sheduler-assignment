import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { validateCreateUser } from '../utils/validation'; 

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const validationError = validateCreateUser(createUserDto); 
        if (validationError) {
            throw new ConflictException(validationError); 
        }

        const existingUser = await this.userService.findOneByEmail(createUserDto.email);
        if (existingUser) {
            throw new ConflictException('Email is already in use'); 
        }

        return this.userService.createUser(createUserDto.fullName, createUserDto.email, createUserDto.password);
    }
}
