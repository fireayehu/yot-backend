import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
