import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register-auth.dto';
import { plainToClass } from 'class-transformer';
import { LoginDTO } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() account: RegisterDTO) {
    const validatedAccount = plainToClass(RegisterDTO, account, {
      excludeExtraneousValues: true,
    });
    return await this.authService.register(validatedAccount);
  }
  @Post('login')
  async login(@Body() account: LoginDTO) {
    const validatedAccount = plainToClass(LoginDTO, account, {
      excludeExtraneousValues: true,
    });
    return this.authService.login(validatedAccount);
  }
}
