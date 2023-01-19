import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { DataLookup } from 'src/app/entities/data-lookup.entity';
import { Module } from 'src/app/entities/module.entity';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  module: Module;

  @IsNotEmpty()
  @IsUUID()
  state: DataLookup;
}
