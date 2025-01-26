import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstname:string;

    @IsString()
    lastname:string;

    @IsEmail()
    email:string;
    
    @IsString()
    password : string
}