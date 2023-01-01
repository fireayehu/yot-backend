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
import { CreateInstructorDto } from '../dtos/create-instructor.dto';
import { GetInstructorParamDto } from '../dtos/get-instructor.dto';
import { GetInstructorsQueryDto } from '../dtos/get-instructors.dto';
import {
  UpdateInstructorDto,
  UpdateInstructorParamDto,
} from '../dtos/update-instructor.dto';
import { InstructorFilter } from '../filters/instructor.filter';
import { InstructorService } from '../services/instructor.service';

@Controller('instructors')
export class InstructorController {
  constructor(
    private readonly instructorService: InstructorService,
    private readonly instructorFilter: InstructorFilter,
  ) {}

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() getInstructorsQueryDto: GetInstructorsQueryDto) {
    const filter = this.instructorFilter.findAll(getInstructorsQueryDto);
    const page = getInstructorsQueryDto._page;
    const limit = getInstructorsQueryDto._limit;

    return this.instructorService.findAll(filter, page, limit);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_READ),
  )
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() getInstructorParamDto: GetInstructorParamDto) {
    return this.instructorService.findOne(getInstructorParamDto.id);
  }

  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_CREATE),
  )
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @UploadedFile() file: Express.MulterS3.File,
    @Body() createInstructorDto: CreateInstructorDto,
  ) {
    if (file) {
      createInstructorDto.profilePicture = file.key;
    }
    return this.instructorService.create(createInstructorDto);
  }

  @UseInterceptors(FileInterceptor('profilePicture'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((permissions: string[]) =>
    permissions.includes(PermissionType.INSTRUCTOR_UPDATE),
  )
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @UploadedFile() file: Express.MulterS3.File,
    @Param() updateInstructorParamDto: UpdateInstructorParamDto,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    if (file) {
      updateInstructorDto.profilePicture = file.key;
    }
    return this.instructorService.update(
      updateInstructorParamDto.id,
      updateInstructorDto,
    );
  }
}
