import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {}

export class UpdateSessionParamDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
