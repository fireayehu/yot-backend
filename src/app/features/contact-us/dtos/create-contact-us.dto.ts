import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { SubService } from 'src/app/entities/sub-service.entity';

export class CreateContactUsDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsUUID()
  subService: SubService;
}
