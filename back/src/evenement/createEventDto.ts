import { $Enums } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class createEventDto {
  @IsNotEmpty()
  @IsNumber()
  organiser_id: number;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_start: Date;
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_end?: Date;
  @IsNotEmpty()
  @IsString()
  place: string;

  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsNumber()
  budget: number;
  @IsString()
  detail: string | null;
  @IsNotEmpty()
  theme: $Enums.theme;
  @IsNotEmpty()
  @IsBoolean()
  askHelp: boolean;
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Task)
  task: Task[] | [];
  @IsOptional()
  @IsString()
  path: string;
}

export class Task {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
