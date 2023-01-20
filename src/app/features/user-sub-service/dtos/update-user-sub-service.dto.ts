import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateUserSubServiceDto } from './create-user-sub-service.dto';

export class UpdateUserSubServiceDto extends PartialType(
  CreateUserSubServiceDto,
) {}

export class UpdateUserSubServiceParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
