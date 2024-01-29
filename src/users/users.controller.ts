import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignInKakaoDto } from './dto/create-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from './user.enum';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-in/kakao')
  async signInKaKao(
    @Body('code') code: string,
    @Body('redirectUri') redirectUri: string,
  ) {
    const signInKakaoDto: SignInKakaoDto = {
      code,
      redirectUri,
    };
    const { accessToken, refreshToken } = await this.usersService.signInKakao(
      signInKakaoDto,
    );
    return { accessToken, refreshToken };
  }

  @Get('refresh-token')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    if (!refreshToken) return;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.usersService.refreshToken(refreshToken);

    return { accessToken, refreshToken };
  }

  @Delete('delete/:id')
  @Roles(ROLE.USER)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get('me')
  @Roles(ROLE.USER)
  getMe(@User() user: UserEntity) {
    return this.usersService.getMe(user);
  }
}
