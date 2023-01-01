import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @UseInterceptors(FileInterceptor('profilePicture'))
  @Post('sign-up')
  signup(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() signUpDto: SignUpDto,
  ) {
    if (file) {
      signUpDto.profilePicture = file.key;
    }
    return this.authService.signup(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return { user };
  }

  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(
    @GetUser() user: User,
    @UploadedFile() file: Express.MulterS3.File,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    if (file) {
      updateProfileDto.profilePicture = file.key;
    }
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
