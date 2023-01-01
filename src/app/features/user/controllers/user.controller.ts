import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckPolicies } from '../../account/auth/decorator/policy.decorator';
import { JwtAuthGuard } from '../../account/auth/guards/jwt.guard';
import { PoliciesGuard } from '../../account/auth/guards/policy.guard';
import { PermissionType } from '../../account/permission/enums/permission.enum';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserParamDto } from '../dtos/get-user.dto';
import { GetUsersQueryDto } from '../dtos/get-users.dto';
import { UpdateUserDto, UpdateUserParamDto } from '../dtos/update-user.dto';
import { UserFilter } from '../filters/user.filter';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFilter: UserFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getUsersQueryDto: GetUsersQueryDto) {
    const filter = this.userFilter.findAll(getUsersQueryDto);
    const page = getUsersQueryDto._page;
    const limit = getUsersQueryDto._limit;

    return this.userService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getUserParamDto: GetUserParamDto) {
    return this.userService.findOne(getUserParamDto.id);
  }

  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (file) {
      createUserDto.profilePicture = file.key;
    }
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.USER_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @UploadedFile() file: Express.MulterS3.File,
    @Param() updateUserParamDto: UpdateUserParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (file) {
      updateUserDto.profilePicture = file.key;
    }
    return this.userService.update(updateUserParamDto.id, updateUserDto);
  }
}
