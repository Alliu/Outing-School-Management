
import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends  PartialType(CreateUserDto) {}

// declare const UpdateUserDto_base: any;
// export declare class UpdateUserDto extends UpdateUserDto_base {
// }
// export {};