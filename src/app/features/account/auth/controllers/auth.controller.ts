import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('sign-up')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }
}
