import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { SubService } from 'src/app/entities/sub-service.entity';
import { User } from 'src/app/entities/user.entity';

export class CreateUserSubServiceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  user: User;

  @IsNotEmpty()
  @IsUUID()
  service: SubService;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
