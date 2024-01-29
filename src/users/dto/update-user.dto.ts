import { PartialType } from '@nestjs/mapped-types';
import { SignInKakaoDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(SignInKakaoDto) {}
