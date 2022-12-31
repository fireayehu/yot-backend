import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/app/entities/user.entity';
import { GetUser } from '../decorator/user.decorator';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { LoginDto } from '../dtos/login.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login/instructor')
  instructorLogin(@Body() loginDto: LoginDto) {
    return this.authService.instructorLogin(loginDto);
  }

  @Post('login/staff')
  staffLogin(@Body() loginDto: LoginDto) {
    return this.authService.staffLogin(loginDto);
  }

  @Post('sign-up')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signup(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return { user };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(
    @GetUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(user.id, updateProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(user, changePasswordDto);
  }
}
