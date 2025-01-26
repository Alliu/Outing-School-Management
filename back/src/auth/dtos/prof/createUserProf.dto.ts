import { $Enums } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserProfDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Matches(/^[a-zA-Z]+\.[a-zA-Z]+@ac-[a-zA-Z]+\.fr$/, {
    message: "L'email doit être au format nom.prenom@ac-academie.fr.",
  })
  teacher_email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  school_name: string;

  @IsNotEmpty()
  @IsString()
  school_cp: string;

  @IsNotEmpty()
  @IsString()
  school_address: string;

  role = $Enums.user_profile_role.TEACHER;
}
