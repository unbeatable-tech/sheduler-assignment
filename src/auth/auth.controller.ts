import { Controller, Post, NotFoundException, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { validateLoginCredentials } from '../utils/validation';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
        const validationError = validateLoginCredentials(email, password);
        if (validationError) {
            throw new BadRequestException(validationError);
        }
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return this.authService.login(user);
    }
}
